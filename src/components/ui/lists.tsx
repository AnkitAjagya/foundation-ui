import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon, ChevronRight } from "lucide-react";

// Simple List
interface SimpleListProps {
  items: string[];
  className?: string;
  ordered?: boolean;
  marker?: "disc" | "circle" | "square" | "decimal" | "none";
}

export const SimpleList = ({
  items,
  className,
  ordered = false,
  marker = "disc",
}: SimpleListProps) => {
  const markerClasses = {
    disc: "list-disc",
    circle: "list-circle",
    square: "list-square",
    decimal: "list-decimal",
    none: "list-none",
  };

  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag className={cn("space-y-2 pl-5", markerClasses[marker], className)}>
      {items.map((item, index) => (
        <li key={index} className="text-foreground">
          {item}
        </li>
      ))}
    </Tag>
  );
};

// Icon List
interface IconListItem {
  icon: LucideIcon;
  text: string;
  iconColor?: string;
}

interface IconListProps {
  items: IconListItem[];
  className?: string;
  iconSize?: "sm" | "default" | "lg";
}

export const IconList = ({
  items,
  className,
  iconSize = "default",
}: IconListProps) => {
  const iconSizeClasses = {
    sm: "h-4 w-4",
    default: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <li key={index} className="flex items-center gap-3">
            <Icon
              className={cn(iconSizeClasses[iconSize], "shrink-0")}
              style={{ color: item.iconColor }}
            />
            <span className="text-foreground">{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
};

// Rich List (with avatar and description)
interface RichListItem {
  id: string | number;
  title: string;
  description?: string;
  avatar?: string;
  avatarFallback?: string;
  meta?: string;
  badge?: React.ReactNode;
  onClick?: () => void;
}

interface RichListProps {
  items: RichListItem[];
  className?: string;
  showDivider?: boolean;
  hoverable?: boolean;
  showArrow?: boolean;
}

export const RichList = ({
  items,
  className,
  showDivider = true,
  hoverable = true,
  showArrow = false,
}: RichListProps) => {
  return (
    <ul className={cn("space-y-0", className)}>
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "flex items-center gap-4 py-4",
            showDivider && index !== items.length - 1 && "border-b border-border",
            hoverable && "hover:bg-muted/50 -mx-4 px-4 rounded-lg transition-colors",
            item.onClick && "cursor-pointer"
          )}
          onClick={item.onClick}
        >
          {/* Avatar */}
          {(item.avatar || item.avatarFallback) && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium text-muted-foreground">
                  {item.avatarFallback}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-foreground truncate">{item.title}</p>
              {item.badge}
            </div>
            {item.description && (
              <p className="text-sm text-muted-foreground truncate">
                {item.description}
              </p>
            )}
          </div>

          {/* Meta */}
          {item.meta && (
            <span className="text-sm text-muted-foreground shrink-0">
              {item.meta}
            </span>
          )}

          {/* Arrow */}
          {showArrow && (
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          )}
        </li>
      ))}
    </ul>
  );
};

// Notification List
interface NotificationItem {
  id: string | number;
  title: string;
  message: string;
  time: string;
  read?: boolean;
  icon?: LucideIcon;
  iconBg?: string;
  onClick?: () => void;
}

interface NotificationListProps {
  items: NotificationItem[];
  className?: string;
  emptyMessage?: string;
}

export const NotificationList = ({
  items,
  className,
  emptyMessage = "No notifications",
}: NotificationListProps) => {
  if (items.length === 0) {
    return (
      <div className={cn("py-8 text-center text-muted-foreground", className)}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <ul className={cn("space-y-1", className)}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={item.id}
            className={cn(
              "flex gap-3 p-3 rounded-lg transition-colors cursor-pointer",
              item.read ? "opacity-60" : "bg-primary/5",
              "hover:bg-muted/50"
            )}
            onClick={item.onClick}
          >
            {Icon && (
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  item.iconBg || "bg-primary/10"
                )}
              >
                <Icon className="h-4 w-4 text-primary" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm", !item.read && "font-medium")}>
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {item.message}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
            </div>
            {!item.read && (
              <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />
            )}
          </li>
        );
      })}
    </ul>
  );
};


