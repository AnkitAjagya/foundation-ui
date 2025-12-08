// ============================================
// FETCH WRAPPER UTILITY
// A lightweight fetch wrapper with error handling
// ============================================

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

interface FetchResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
  ok: boolean;
}

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_RETRIES = 0;
const DEFAULT_RETRY_DELAY = 1000;

export async function fetchWrapper<T>(
  url: string,
  options: FetchOptions = {}
): Promise<FetchResponse<T>> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = DEFAULT_RETRIES,
    retryDelay = DEFAULT_RETRY_DELAY,
    headers,
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  const executeRequest = async (attempt: number): Promise<FetchResponse<T>> => {
    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: defaultHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: T | null = null;
      const contentType = response.headers.get("content-type");
      
      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as unknown as T;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        data,
        error: null,
        status: response.status,
        ok: response.ok,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return executeRequest(attempt + 1);
      }

      return {
        data: null,
        error: error instanceof Error ? error : new Error("Unknown error"),
        status: 0,
        ok: false,
      };
    }
  };

  return executeRequest(0);
}

// Convenience methods
export const api = {
  get: <T>(url: string, options?: FetchOptions) =>
    fetchWrapper<T>(url, { ...options, method: "GET" }),

  post: <T>(url: string, body: unknown, options?: FetchOptions) =>
    fetchWrapper<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(url: string, body: unknown, options?: FetchOptions) =>
    fetchWrapper<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: <T>(url: string, body: unknown, options?: FetchOptions) =>
    fetchWrapper<T>(url, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: <T>(url: string, options?: FetchOptions) =>
    fetchWrapper<T>(url, { ...options, method: "DELETE" }),
};

export default fetchWrapper;
