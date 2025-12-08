// ============================================
// LOCALSTORAGE HELPERS
// Safe localStorage utilities with TypeScript support
// ============================================

const PREFIX = "app_";

// Check if localStorage is available
const isLocalStorageAvailable = (): boolean => {
  try {
    const testKey = "__test__";
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

// Get item from localStorage with type safety
export function getItem<T>(key: string, defaultValue: T): T {
  if (!isLocalStorageAvailable()) return defaultValue;

  try {
    const item = window.localStorage.getItem(PREFIX + key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

// Set item in localStorage
export function setItem<T>(key: string, value: T): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// Remove item from localStorage
export function removeItem(key: string): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    window.localStorage.removeItem(PREFIX + key);
    return true;
  } catch {
    return false;
  }
}

// Clear all items with prefix
export function clearAll(): boolean {
  if (!isLocalStorageAvailable()) return false;

  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith(PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
    return true;
  } catch {
    return false;
  }
}

// Get all keys with prefix
export function getAllKeys(): string[] {
  if (!isLocalStorageAvailable()) return [];

  const keys: string[] = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key?.startsWith(PREFIX)) {
      keys.push(key.replace(PREFIX, ""));
    }
  }
  return keys;
}

// Storage with expiration
interface StoredItemWithExpiry<T> {
  value: T;
  expiry: number;
}

export function setItemWithExpiry<T>(
  key: string,
  value: T,
  ttlMs: number
): boolean {
  const item: StoredItemWithExpiry<T> = {
    value,
    expiry: Date.now() + ttlMs,
  };
  return setItem(key, item);
}

export function getItemWithExpiry<T>(key: string, defaultValue: T): T {
  const item = getItem<StoredItemWithExpiry<T> | null>(key, null);
  
  if (!item) return defaultValue;
  
  if (Date.now() > item.expiry) {
    removeItem(key);
    return defaultValue;
  }
  
  return item.value;
}

// React hook for localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    return getItem(key, initialValue);
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setItem(key, valueToStore);
  };

  return [storedValue, setValue];
}

import * as React from "react";

export const storage = {
  get: getItem,
  set: setItem,
  remove: removeItem,
  clear: clearAll,
  keys: getAllKeys,
  setWithExpiry: setItemWithExpiry,
  getWithExpiry: getItemWithExpiry,
};

export default storage;
