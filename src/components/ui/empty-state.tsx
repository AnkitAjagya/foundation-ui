import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { LucideIcon, FileX, Search, Inbox, AlertCircle, Wifi } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  size?: "sm" | "default" | "lg";
}

export const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  secondaryAction,
  className,
  size = "default",
}: EmptyStateProps) => {
  const sizeClasses = {
    sm: {
      container: "py-8",
      icon: "h-10 w-10",
      iconWrapper: "h-16 w-16",
      title: "text-base",
      description: "text-sm",
    },
    default: {
      container: "py-12",
      icon: "h-12 w-12",
      iconWrapper: "h-20 w-20",
      title: "text-lg",
      description: "text-sm",
    },
    lg: {
      container: "py-16",
      icon: "h-16 w-16",
      iconWrapper: "h-28 w-28",
      title: "text-xl",
      description: "text-base",
    },
  };

  const sizes = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        sizes.container,
        className
      )}
    >
      <div
        className={cn(
          "rounded-full bg-muted/50 flex items-center justify-center mb-4",
          sizes.iconWrapper
        )}
      >
        <Icon className={cn("text-muted-foreground", sizes.icon)} />
      </div>
      <h3 className={cn("font-semibold text-foreground mb-1", sizes.title)}>
        {title}
      </h3>
      {description && (
        <p
          className={cn(
            "text-muted-foreground max-w-sm mb-6",
            sizes.description
          )}
        >
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            <Button variant={action.variant || "default"} onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

// Pre-built empty state variants
export const NoResultsState = ({
  searchQuery,
  onClear,
}: {
  searchQuery?: string;
  onClear?: () => void;
}) => (
  <EmptyState
    icon={Search}
    title="No results found"
    description={
      searchQuery
        ? `We couldn't find anything matching "${searchQuery}"`
        : "Try adjusting your search or filters"
    }
    action={onClear ? { label: "Clear search", onClick: onClear, variant: "outline" } : undefined}
  />
);

export const NoDataState = ({ onCreate }: { onCreate?: () => void }) => (
  <EmptyState
    icon={FileX}
    title="No data yet"
    description="Get started by creating your first item"
    action={onCreate ? { label: "Create new", onClick: onCreate } : undefined}
  />
);

export const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={AlertCircle}
    title="Something went wrong"
    description="We encountered an error while loading. Please try again."
    action={onRetry ? { label: "Try again", onClick: onRetry } : undefined}
  />
);

export const OfflineState = ({ onRetry }: { onRetry?: () => void }) => (
  <EmptyState
    icon={Wifi}
    title="You're offline"
    description="Check your internet connection and try again"
    action={onRetry ? { label: "Retry", onClick: onRetry, variant: "outline" } : undefined}
  />
);

export default EmptyState;
