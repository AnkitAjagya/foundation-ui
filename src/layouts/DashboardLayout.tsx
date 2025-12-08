import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
  sidebarWidth?: "sm" | "md" | "lg";
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const DashboardLayout = ({
  children,
  sidebar,
  header,
  className,
  sidebarWidth = "md",
  collapsible = true,
  defaultCollapsed = false,
}: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const sidebarWidths = {
    sm: "w-56",
    md: "w-64",
    lg: "w-72",
  };

  const collapsedWidth = "w-16";

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full border-r border-border bg-card transition-all duration-300",
          isCollapsed ? collapsedWidth : sidebarWidths[sidebarWidth],
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:z-30"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {!isCollapsed && (
            <span className="text-lg font-semibold gradient-text animate-fade-in">
              Brand
            </span>
          )}
          
          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Desktop Collapse Button */}
          {collapsible && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto scrollbar-thin">
          {sidebar || (
            <div className="p-4 text-sm text-muted-foreground">
              Sidebar content
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          "transition-all duration-300",
          isCollapsed ? "lg:pl-16" : `lg:${sidebarWidths[sidebarWidth].replace('w-', 'pl-')}`
        )}
        style={{
          paddingLeft: isCollapsed ? '4rem' : sidebarWidth === 'sm' ? '14rem' : sidebarWidth === 'md' ? '16rem' : '18rem'
        }}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {header || (
            <div className="flex flex-1 items-center justify-between">
              {/* Search */}
              <div className="relative hidden md:flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="h-9 w-64 rounded-lg border border-input bg-background pl-9 pr-4 text-sm focus-ring"
                />
              </div>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                    3
                  </span>
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
