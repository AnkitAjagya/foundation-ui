import React from "react";
import { cn } from "@/lib/utils";

interface StatsGridLayoutProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
  variant?: "default" | "cards" | "compact";
  className?: string;
}

export const StatsGridLayout = ({
  children,
  columns = 4,
  gap = "md",
  variant = "default",
  className,
}: StatsGridLayoutProps) => {
  const gapClasses = {
    sm: "gap-3",
    md: "gap-4 lg:gap-6",
    lg: "gap-6 lg:gap-8",
  };

  const columnClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  };

  const variantClasses = {
    default: "",
    cards: "[&>*]:bg-card [&>*]:border [&>*]:border-border [&>*]:rounded-xl [&>*]:p-4 lg:[&>*]:p-6",
    compact: "[&>*]:py-3 [&>*]:px-4",
  };

  return (
    <div
      className={cn(
        "grid",
        columnClasses[columns],
        gapClasses[gap],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default StatsGridLayout;
