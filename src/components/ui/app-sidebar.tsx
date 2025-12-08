import * as React from "react";
import { cn } from "@/lib/utils";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  Menu,
  X,
  Home,
  Settings,
  Users,
  BarChart3,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

// Types
interface NavItem {
  label: string;
  href?: string;
  icon?: LucideIcon;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
}

interface SidebarProps {
  items?: NavItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  className?: string;
  variant?: "default" | "floating" | "inset";
}

// Sidebar Context
interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within a Sidebar");
  }
  return context;
};

// Main Sidebar Component
export const AppSidebar = ({
  items = defaultItems,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  className,
  variant = "default",
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleCollapse = (value: boolean) => {
    setIsCollapsed(value);
    onCollapsedChange?.(value);
  };

  const variantClasses = {
    default: "border-r border-border bg-card",
    floating: "m-2 rounded-xl border border-border bg-card shadow-lg",
    inset: "bg-muted/50",
  };

  return (
    <SidebarContext.Provider value={{ collapsed: isCollapsed, setCollapsed: handleCollapse }}>
      <TooltipProvider delayDuration={0}>
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300",
            isCollapsed ? "w-16" : "w-64",
            isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            variantClasses[variant],
            className
          )}
        >
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-border">
            {!isCollapsed && (
              <span className="text-lg font-bold gradient-text animate-fade-in">
                {header || "Brand"}
              </span>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              className="hidden lg:flex"
              onClick={() => handleCollapse(!isCollapsed)}
            >
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  !isCollapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2 scrollbar-thin">
            <ul className="space-y-1">
              {items.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
            </ul>
          </nav>

          {/* Footer */}
          {footer && (
            <div className="border-t border-border p-4">
              {footer}
            </div>
          )}
        </aside>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};

// Sidebar Item Component
interface SidebarItemProps {
  item: NavItem;
  depth?: number;
}

const SidebarItem = ({ item, depth = 0 }: SidebarItemProps) => {
  const { collapsed } = useSidebarContext();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.href === location.pathname;

  const Icon = item.icon;

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-primary/10 text-primary",
        item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        depth > 0 && "ml-4 text-xs"
      )}
      onClick={() => hasChildren && setIsOpen(!isOpen)}
    >
      {Icon && <Icon className="h-5 w-5 shrink-0" />}
      {!collapsed && (
        <>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          )}
        </>
      )}
    </div>
  );

  const wrappedContent = collapsed && Icon ? (
    <Tooltip>
      <TooltipTrigger asChild>
        {item.href ? (
          <RouterNavLink to={item.href}>{content}</RouterNavLink>
        ) : (
          <div className="cursor-pointer">{content}</div>
        )}
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={10}>
        {item.label}
      </TooltipContent>
    </Tooltip>
  ) : item.href ? (
    <RouterNavLink to={item.href}>{content}</RouterNavLink>
  ) : (
    <div className="cursor-pointer">{content}</div>
  );

  return (
    <li>
      {wrappedContent}
      {hasChildren && isOpen && !collapsed && (
        <ul className="mt-1 space-y-1 animate-fade-in">
          {item.children!.map((child, index) => (
            <SidebarItem key={index} item={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

// Default navigation items
const defaultItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home },
  { label: "Analytics", href: "/analytics", icon: BarChart3, badge: "New" },
  {
    label: "Users",
    icon: Users,
    children: [
      { label: "All Users", href: "/users" },
      { label: "Teams", href: "/users/teams" },
      { label: "Roles", href: "/users/roles" },
    ],
  },
  { label: "Documents", href: "/documents", icon: FileText },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
];

export { SidebarContext, useSidebarContext };
export type { NavItem, SidebarProps };
