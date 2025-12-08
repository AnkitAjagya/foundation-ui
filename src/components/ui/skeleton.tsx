import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        shimmer: "relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(skeletonVariants({ variant, className }))}
      {...props}
    />
  );
}

// Skeleton Text Lines
interface SkeletonTextProps {
  lines?: number;
  lastLineWidth?: "full" | "3/4" | "1/2" | "1/4";
  className?: string;
}

function SkeletonText({ lines = 3, lastLineWidth = "3/4", className }: SkeletonTextProps) {
  const widthClasses = {
    full: "w-full",
    "3/4": "w-3/4",
    "1/2": "w-1/2",
    "1/4": "w-1/4",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 ? widthClasses[lastLineWidth] : "w-full"
          )}
        />
      ))}
    </div>
  );
}

// Skeleton Card
interface SkeletonCardProps {
  hasImage?: boolean;
  hasAvatar?: boolean;
  lines?: number;
  className?: string;
}

function SkeletonCard({ hasImage, hasAvatar, lines = 2, className }: SkeletonCardProps) {
  return (
    <div className={cn("rounded-xl border border-border p-4 space-y-4", className)}>
      {hasImage && <Skeleton className="h-48 w-full rounded-lg" />}
      <div className="flex items-center gap-3">
        {hasAvatar && <Skeleton className="h-10 w-10 rounded-full" />}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      </div>
      <SkeletonText lines={lines} />
    </div>
  );
}

// Skeleton Avatar
interface SkeletonAvatarProps {
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
}

function SkeletonAvatar({ size = "default", className }: SkeletonAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <Skeleton className={cn("rounded-full", sizeClasses[size], className)} />
  );
}

// Skeleton Table Row
interface SkeletonTableRowProps {
  columns?: number;
  className?: string;
}

function SkeletonTableRow({ columns = 4, className }: SkeletonTableRowProps) {
  return (
    <div className={cn("flex items-center gap-4 py-3", className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-4 flex-1"
          style={{ maxWidth: i === 0 ? "200px" : undefined }}
        />
      ))}
    </div>
  );
}

// Skeleton List Item
interface SkeletonListItemProps {
  hasAvatar?: boolean;
  hasAction?: boolean;
  className?: string;
}

function SkeletonListItem({ hasAvatar, hasAction, className }: SkeletonListItemProps) {
  return (
    <div className={cn("flex items-center gap-3 py-2", className)}>
      {hasAvatar && <SkeletonAvatar size="default" />}
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      {hasAction && <Skeleton className="h-8 w-20 rounded-md" />}
    </div>
  );
}

export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonTableRow,
  SkeletonListItem,
  skeletonVariants,
};
