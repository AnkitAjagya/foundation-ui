import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  LucideIcon,
} from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-xl border p-4 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-background border-border text-foreground",
        info: "bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-950/50 dark:border-blue-800 dark:text-blue-100",
        success:
          "bg-green-50 border-green-200 text-green-900 dark:bg-green-950/50 dark:border-green-800 dark:text-green-100",
        warning:
          "bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-950/50 dark:border-yellow-800 dark:text-yellow-100",
        error:
          "bg-red-50 border-red-200 text-red-900 dark:bg-red-950/50 dark:border-red-800 dark:text-red-100",
        gradient:
          "bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap: Record<string, LucideIcon> = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  gradient: Info,
};

export interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: LucideIcon | boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

const AlertBanner = React.forwardRef<HTMLDivElement, AlertBannerProps>(
  (
    {
      className,
      variant = "default",
      title,
      icon = true,
      dismissible,
      onDismiss,
      action,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    if (!isVisible) return null;

    const Icon = typeof icon === "boolean" ? iconMap[variant || "default"] : icon;
    const showIcon = icon !== false;

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), "animate-fade-in", className)}
        {...props}
      >
        <div className="flex gap-3">
          {showIcon && Icon && (
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 min-w-0">
            {title && (
              <h5 className="font-semibold text-sm mb-1">{title}</h5>
            )}
            <div className="text-sm opacity-90">{children}</div>
            {action && <div className="mt-3">{action}</div>}
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
AlertBanner.displayName = "AlertBanner";

// Inline Alert (smaller, for form validation etc)
export interface InlineAlertProps {
  variant?: "info" | "success" | "warning" | "error";
  children: React.ReactNode;
  className?: string;
}

const InlineAlert = ({ variant = "info", children, className }: InlineAlertProps) => {
  const Icon = iconMap[variant];
  
  const variantClasses = {
    info: "text-blue-600 dark:text-blue-400",
    success: "text-green-600 dark:text-green-400",
    warning: "text-yellow-600 dark:text-yellow-400",
    error: "text-red-600 dark:text-red-400",
  };

  return (
    <div className={cn("flex items-center gap-2 text-sm", variantClasses[variant], className)}>
      <Icon className="h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
};

export { AlertBanner, InlineAlert, alertVariants };
