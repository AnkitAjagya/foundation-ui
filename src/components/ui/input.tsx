import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, X } from "lucide-react";

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        filled:
          "border-transparent bg-muted focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-ring",
        flushed:
          "rounded-none border-0 border-b-2 border-input px-0 focus-visible:border-primary",
        unstyled: "border-0 bg-transparent p-0 focus-visible:ring-0",
        glass:
          "border-white/20 bg-white/10 backdrop-blur-md focus-visible:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/30",
      },
      inputSize: {
        sm: "h-9 px-3 text-xs",
        default: "h-10 px-4",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
  inputSize?: "sm" | "default" | "lg" | "xl";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, leftIcon, rightIcon, error, ...props }, ref) => {
    const hasIcon = leftIcon || rightIcon;

    if (hasIcon) {
      return (
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ variant, inputSize, className }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-destructive focus-visible:ring-destructive"
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, inputSize, className }),
          error && "border-destructive focus-visible:ring-destructive"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

// Password Input with toggle
export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative flex items-center">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// Search Input with clear button
export interface SearchInputProps extends Omit<InputProps, "type" | "leftIcon"> {
  onClear?: () => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onClear, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          className={cn("pl-10", value && "pr-10", className)}
          value={value}
          ref={ref}
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClear}
            tabIndex={-1}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

// Number Input with increment/decrement
export interface NumberInputProps extends Omit<InputProps, "type"> {
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, min, max, step = 1, value, onChange, ...props }, ref) => {
    const handleIncrement = () => {
      const currentValue = Number(value) || 0;
      const newValue = max !== undefined ? Math.min(currentValue + step, max) : currentValue + step;
      const event = { target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    const handleDecrement = () => {
      const currentValue = Number(value) || 0;
      const newValue = min !== undefined ? Math.max(currentValue - step, min) : currentValue - step;
      const event = { target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(event);
    };

    return (
      <div className="relative flex items-center">
        <button
          type="button"
          className="absolute left-1 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={handleDecrement}
          tabIndex={-1}
        >
          -
        </button>
        <Input
          type="number"
          className={cn("px-10 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none", className)}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={handleIncrement}
          tabIndex={-1}
        >
          +
        </button>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { Input, PasswordInput, SearchInput, NumberInput, inputVariants };
