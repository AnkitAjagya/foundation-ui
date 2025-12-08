import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

// FormGroup - Wrapper for form fields
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const FormGroup = React.forwardRef<HTMLDivElement, FormGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </div>
    );
  }
);
FormGroup.displayName = "FormGroup";

// FormLabel - Enhanced label component
interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
  optional?: boolean;
}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, optional, children, ...props }, ref) => {
    return (
      <Label
        ref={ref}
        className={cn("flex items-center gap-1 text-sm font-medium", className)}
        {...props}
      >
        {children}
        {required && <span className="text-destructive">*</span>}
        {optional && (
          <span className="text-muted-foreground text-xs font-normal">(optional)</span>
        )}
      </Label>
    );
  }
);
FormLabel.displayName = "FormLabel";

// FormError - Error message display
interface FormErrorProps {
  message?: string;
  className?: string;
}

export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ message, className, ...props }, ref) => {
    if (!message) return null;

    return (
      <p
        ref={ref}
        className={cn(
          "text-sm text-destructive flex items-center gap-1.5 animate-fade-in",
          className
        )}
        {...props}
      >
        <svg
          className="h-3.5 w-3.5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {message}
      </p>
    );
  }
);
FormError.displayName = "FormError";

// FormHelperText - Helper text below inputs
interface FormHelperTextProps {
  children: React.ReactNode;
  className?: string;
}

export const FormHelperText = React.forwardRef<HTMLParagraphElement, FormHelperTextProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormHelperText.displayName = "FormHelperText";

// FormCard - Card wrapper for form sections
interface FormCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const FormCard = React.forwardRef<HTMLDivElement, FormCardProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-6 shadow-sm",
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-6">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    );
  }
);
FormCard.displayName = "FormCard";

// FormRow - Horizontal form layout
interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3 | 4;
}

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ className, columns = 2, children, ...props }, ref) => {
    const columnClasses = {
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
      <div
        ref={ref}
        className={cn("grid gap-4", columnClasses[columns], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
FormRow.displayName = "FormRow";

// FormDivider - Visual separator
interface FormDividerProps {
  label?: string;
  className?: string;
}

export const FormDivider = React.forwardRef<HTMLDivElement, FormDividerProps>(
  ({ label, className, ...props }, ref) => {
    if (label) {
      return (
        <div
          ref={ref}
          className={cn("relative my-6", className)}
          {...props}
        >
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("my-6 border-t border-border", className)}
        {...props}
      />
    );
  }
);
FormDivider.displayName = "FormDivider";

export {
  FormGroup as Group,
  FormLabel as Label,
  FormError as Error,
  FormHelperText as HelperText,
  FormCard as Card,
  FormRow as Row,
  FormDivider as Divider,
};
