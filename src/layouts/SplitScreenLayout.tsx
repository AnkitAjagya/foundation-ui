import React from "react";
import { cn } from "@/lib/utils";

interface SplitScreenLayoutProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  leftClassName?: string;
  rightClassName?: string;
  splitRatio?: "50-50" | "40-60" | "60-40" | "33-67" | "67-33";
  stackOnMobile?: boolean;
  mobileOrder?: "left-first" | "right-first";
  divider?: boolean;
  className?: string;
}

export const SplitScreenLayout = ({
  children,
  leftContent,
  rightContent,
  leftClassName,
  rightClassName,
  splitRatio = "50-50",
  stackOnMobile = true,
  mobileOrder = "left-first",
  divider = false,
  className,
}: SplitScreenLayoutProps) => {
  const ratioClasses = {
    "50-50": { left: "lg:w-1/2", right: "lg:w-1/2" },
    "40-60": { left: "lg:w-2/5", right: "lg:w-3/5" },
    "60-40": { left: "lg:w-3/5", right: "lg:w-2/5" },
    "33-67": { left: "lg:w-1/3", right: "lg:w-2/3" },
    "67-33": { left: "lg:w-2/3", right: "lg:w-1/3" },
  };

  const Left = (
    <div
      className={cn(
        "w-full",
        ratioClasses[splitRatio].left,
        leftClassName
      )}
    >
      {leftContent || children}
    </div>
  );

  const Right = (
    <div
      className={cn(
        "w-full",
        ratioClasses[splitRatio].right,
        rightClassName
      )}
    >
      {rightContent}
    </div>
  );

  return (
    <div
      className={cn(
        "min-h-screen flex",
        stackOnMobile ? "flex-col lg:flex-row" : "flex-row",
        className
      )}
    >
      {mobileOrder === "left-first" ? (
        <>
          {Left}
          {divider && (
            <div className="hidden lg:block w-px bg-border" />
          )}
          {Right}
        </>
      ) : (
        <>
          {Right}
          {divider && (
            <div className="hidden lg:block w-px bg-border" />
          )}
          {Left}
        </>
      )}
    </div>
  );
};

export default SplitScreenLayout;
