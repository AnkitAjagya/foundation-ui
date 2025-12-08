import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const progressBarVariants = cva(
  "h-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
        gradient: "bg-gradient-to-r from-primary to-accent",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animated: false,
    },
  }
);

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  showLabel?: boolean;
  labelPosition?: "inside" | "outside" | "top";
  indeterminate?: boolean;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      size,
      variant,
      animated,
      showLabel,
      labelPosition = "outside",
      indeterminate,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    if (indeterminate) {
      return (
        <div
          ref={ref}
          className={cn(progressVariants({ size, className }))}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant }),
              "w-1/3 animate-[indeterminate_1.5s_ease-in-out_infinite]"
            )}
            style={{
              animation: "indeterminate 1.5s ease-in-out infinite",
            }}
          />
          <style>{`
            @keyframes indeterminate {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(400%); }
            }
          `}</style>
        </div>
      );
    }

    const Label = showLabel && (
      <span className="text-xs font-medium text-muted-foreground">
        {Math.round(percentage)}%
      </span>
    );

    if (labelPosition === "top" && showLabel) {
      return (
        <div className="space-y-1">
          <div className="flex justify-between">
            {Label}
          </div>
          <div
            ref={ref}
            className={cn(progressVariants({ size, className }))}
            {...props}
          >
            <div
              className={cn(progressBarVariants({ variant, animated }), "rounded-full")}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <div
          ref={ref}
          className={cn(progressVariants({ size, className }), "flex-1")}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant, animated }),
              "rounded-full flex items-center justify-end"
            )}
            style={{ width: `${percentage}%` }}
          >
            {labelPosition === "inside" && showLabel && size !== "sm" && (
              <span className="px-2 text-[10px] font-medium text-white">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
        {labelPosition === "outside" && Label}
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

// Circular Progress
interface CircularProgressProps {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  showLabel?: boolean;
  className?: string;
}

const CircularProgress = ({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 8,
  variant = "default",
  showLabel = true,
  className,
}: CircularProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantColors = {
    default: "stroke-primary",
    success: "stroke-green-500",
    warning: "stroke-yellow-500",
    error: "stroke-red-500",
    gradient: "stroke-[url(#gradient)]",
  };

  return (
    <div className={cn("relative inline-flex", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={variantColors[variant]}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: "stroke-dashoffset 0.5s ease-out",
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

export { ProgressBar, CircularProgress, progressVariants };
