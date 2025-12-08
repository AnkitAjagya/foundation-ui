import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, LucideIcon } from "lucide-react";

const stepperVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

interface Step {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

interface StepperProps extends VariantProps<typeof stepperVariants> {
  steps: Step[];
  currentStep: number;
  className?: string;
  onStepClick?: (step: number) => void;
  variant?: "default" | "simple" | "dots";
}

export const Stepper = ({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  onStepClick,
  variant = "default",
}: StepperProps) => {
  const isVertical = orientation === "vertical";

  if (variant === "dots") {
    return (
      <div className={cn("flex gap-2", isVertical && "flex-col", className)}>
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => onStepClick?.(index)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              index === currentStep
                ? "w-8 bg-primary"
                : index < currentStep
                ? "w-2.5 bg-primary/60"
                : "w-2.5 bg-muted",
              onStepClick && "cursor-pointer hover:bg-primary/80"
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === "simple") {
    return (
      <div className={cn(stepperVariants({ orientation }), "gap-4", className)}>
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <button
              onClick={() => onStepClick?.(index)}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                index === currentStep
                  ? "text-primary"
                  : index < currentStep
                  ? "text-muted-foreground"
                  : "text-muted-foreground/50",
                onStepClick && "cursor-pointer hover:text-primary"
              )}
              disabled={!onStepClick}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                  index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : index < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-3 w-3" />
                ) : (
                  index + 1
                )}
              </span>
              {step.title}
            </button>
            {index < steps.length - 1 && !isVertical && (
              <div className="flex-1 h-px bg-border min-w-[2rem]" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className={cn(stepperVariants({ orientation }), "gap-0", className)}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                "flex gap-4",
                isVertical ? "flex-row" : "flex-col items-center",
                onStepClick && "cursor-pointer group"
              )}
              onClick={() => onStepClick?.(index)}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground scale-110"
                    : isCompleted
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted bg-background text-muted-foreground",
                  onStepClick && "group-hover:border-primary/50"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : Icon ? (
                  <Icon className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>

              {/* Step content */}
              <div
                className={cn(
                  "text-center",
                  isVertical && "text-left pb-8",
                  !isVertical && "mt-2"
                )}
              >
                <p
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 max-w-[120px]">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "transition-colors duration-300",
                  isVertical
                    ? "ml-5 w-0.5 h-full min-h-[2rem] -mt-4"
                    : "flex-1 h-0.5 mt-5 min-w-[2rem]",
                  isCompleted ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
