import React from "react";
import { cn } from "@/lib/utils";

interface CenteredLayoutProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  verticalCenter?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}

export const CenteredLayout = ({
  children,
  maxWidth = "lg",
  verticalCenter = false,
  padding = "md",
  className,
}: CenteredLayoutProps) => {
  const maxWidthClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 py-6",
    md: "px-6 py-8",
    lg: "px-8 py-12",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        verticalCenter && "min-h-screen flex flex-col justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default CenteredLayout;
