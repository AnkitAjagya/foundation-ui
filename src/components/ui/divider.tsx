import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const dividerVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full w-px",
    },
    variant: {
      solid: "",
      dashed: "border-dashed border-0",
      dotted: "border-dotted border-0",
      gradient: "bg-gradient-to-r from-transparent via-border to-transparent",
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      spacing: "sm",
      className: "my-2",
    },
    {
      orientation: "horizontal",
      spacing: "md",
      className: "my-4",
    },
    {
      orientation: "horizontal",
      spacing: "lg",
      className: "my-8",
    },
    {
      orientation: "vertical",
      spacing: "sm",
      className: "mx-2",
    },
    {
      orientation: "vertical",
      spacing: "md",
      className: "mx-4",
    },
    {
      orientation: "vertical",
      spacing: "lg",
      className: "mx-8",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    spacing: "md",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dividerVariants> {
  label?: string;
  labelPosition?: "left" | "center" | "right";
}

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      className,
      orientation = "horizontal",
      variant,
      spacing,
      label,
      labelPosition = "center",
      ...props
    },
    ref
  ) => {
    if (label && orientation === "horizontal") {
      const positionClasses = {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
      };

      return (
        <div
          ref={ref}
          className={cn(
            "relative flex items-center",
            spacing === "sm" && "my-2",
            spacing === "md" && "my-4",
            spacing === "lg" && "my-8",
            className
          )}
          {...props}
        >
          <div className="absolute inset-0 flex items-center">
            <div
              className={cn(
                "w-full",
                dividerVariants({ orientation: "horizontal", variant })
              )}
            />
          </div>
          <div className={cn("relative flex w-full", positionClasses[labelPosition])}>
            <span className="bg-background px-3 text-sm text-muted-foreground">
              {label}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(dividerVariants({ orientation, variant, spacing, className }))}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
