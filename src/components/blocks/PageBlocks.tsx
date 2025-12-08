import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LucideIcon } from "lucide-react";

// Page Header
interface PageHeaderProps {
  title: string;
  description?: string;
  backLink?: { label: string; onClick: () => void };
  actions?: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  backLink,
  actions,
  badge,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn("mb-8", className)}>
      {backLink && (
        <button
          onClick={backLink.onClick}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLink.label}
        </button>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};

// Section Header
interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader = ({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-6",
        className
      )}
    >
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
};

// Stats Widget
interface StatsWidgetProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export const StatsWidget = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  className,
}: StatsWidgetProps) => {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {change && (
            <p className={cn("text-sm font-medium", trendColors[change.trend])}>
              {change.trend === "up" && "↑ "}
              {change.trend === "down" && "↓ "}
              {change.value > 0 ? "+" : ""}
              {change.value}%
            </p>
          )}
        </div>
        {Icon && (
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: iconColor ? `${iconColor}20` : "hsl(var(--primary) / 0.1)" }}
          >
            <Icon
              className="h-6 w-6"
              style={{ color: iconColor || "hsl(var(--primary))" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// KPI Card
interface KPICardProps {
  title: string;
  value: string | number;
  target?: string | number;
  progress?: number;
  status?: "on-track" | "at-risk" | "behind";
  className?: string;
}

export const KPICard = ({
  title,
  value,
  target,
  progress,
  status = "on-track",
  className,
}: KPICardProps) => {
  const statusColors = {
    "on-track": "bg-green-500",
    "at-risk": "bg-yellow-500",
    behind: "bg-red-500",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={cn("h-2 w-2 rounded-full", statusColors[status])} />
      </div>
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {target && (
            <span className="text-sm text-muted-foreground">/ {target}</span>
          )}
        </div>
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", statusColors[status])}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">{progress}% complete</p>
          </div>
        )}
      </div>
    </div>
  );
};


