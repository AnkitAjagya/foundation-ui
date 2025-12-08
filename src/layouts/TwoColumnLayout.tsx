import React from "react";
import { cn } from "@/lib/utils";

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarPosition?: "left" | "right";
  sidebarWidth?: "narrow" | "medium" | "wide";
  sidebarSticky?: boolean;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
  mainClassName?: string;
  sidebarClassName?: string;
}

export const TwoColumnLayout = ({
  children,
  sidebar,
  sidebarPosition = "right",
  sidebarWidth = "medium",
  sidebarSticky = true,
  gap = "lg",
  className,
  mainClassName,
  sidebarClassName,
}: TwoColumnLayoutProps) => {
  const widthClasses = {
    narrow: "lg:w-64",
    medium: "lg:w-80",
    wide: "lg:w-96",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  };

  const Sidebar = (
    <aside
      className={cn(
        "w-full shrink-0",
        widthClasses[sidebarWidth],
        sidebarSticky && "lg:self-start lg:sticky lg:top-6",
        sidebarClassName
      )}
    >
      {sidebar}
    </aside>
  );

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row",
        gapClasses[gap],
        className
      )}
    >
      {sidebarPosition === "left" && Sidebar}
      
      <main className={cn("flex-1 min-w-0", mainClassName)}>
        {children}
      </main>
      
      {sidebarPosition === "right" && Sidebar}
    </div>
  );
};

export default TwoColumnLayout;
