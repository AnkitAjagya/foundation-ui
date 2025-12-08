// ============================================
// FORM VALIDATION HELPERS
// Common validation utilities with Zod patterns
// ============================================

import { z } from "zod";

// Common validation patterns
export const patterns = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  phone: /^\+?[1-9]\d{1,14}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  username: /^[a-zA-Z0-9_]{3,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  creditCard: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/,
  zipCode: /^\d{5}(-\d{4})?$/,
  hexColor: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
};

// Common Zod schemas
export const schemas = {
  // Email
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),

  // Password with requirements
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/\d/, "Password must contain a number"),

  // Simple password
  simplePassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  // Username
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  // Name
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),

  // Phone
  phone: z
    .string()
    .regex(patterns.phone, "Invalid phone number")
    .optional()
    .or(z.literal("")),

  // URL
  url: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),

  // Required string
  required: (fieldName: string = "This field") =>
    z.string().min(1, `${fieldName} is required`),

  // Optional string with min length when provided
  optionalWithMin: (minLength: number) =>
    z.string().optional().refine(
      (val) => !val || val.length >= minLength,
      { message: `Must be at least ${minLength} characters if provided` }
    ),

  // Positive number
  positiveNumber: z
    .number()
    .positive("Must be a positive number"),

  // Date in the past
  pastDate: z
    .date()
    .refine((date) => date < new Date(), "Date must be in the past"),

  // Date in the future
  futureDate: z
    .date()
    .refine((date) => date > new Date(), "Date must be in the future"),

  // File size validation
  fileSize: (maxSizeMB: number) =>
    z.custom<File>((file) => file instanceof File && file.size <= maxSizeMB * 1024 * 1024, {
      message: `File must be less than ${maxSizeMB}MB`,
    }),

  // File type validation
  fileType: (allowedTypes: string[]) =>
    z.custom<File>((file) => file instanceof File && allowedTypes.includes(file.type), {
      message: `File must be one of: ${allowedTypes.join(", ")}`,
    }),
};

// Password confirmation helper
export const createPasswordConfirmSchema = (passwordField: string = "password") =>
  z.object({
    [passwordField]: schemas.password,
    confirmPassword: z.string(),
  }).refine((data) => data[passwordField] === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Common form schemas
export const formSchemas = {
  // Login form
  login: z.object({
    email: schemas.email,
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().optional(),
  }),

  // Register form
  register: z.object({
    name: schemas.name,
    email: schemas.email,
    password: schemas.password,
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }),

  // Contact form
  contact: z.object({
    name: schemas.name,
    email: schemas.email,
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  }),

  // Profile update
  profile: z.object({
    name: schemas.name,
    email: schemas.email,
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    website: schemas.url,
    phone: schemas.phone,
  }),
};

// Validation result type
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// Validate with Zod schema
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult {
  const result = schema.safeParse(data);

  if (result.success) {
    return { valid: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join(".");
    errors[path] = issue.message;
  });

  return { valid: false, errors };
}

export default { patterns, schemas, formSchemas, validate };
