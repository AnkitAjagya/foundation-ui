import * as React from "react";
import { cn } from "@/lib/utils";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Menu, X, ChevronDown, Bell, Search, User } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface NavbarItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavbarItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  className?: string;
}

export const Navbar = ({
  logo,
  items = defaultNavItems,
  actions,
  sticky = true,
  transparent = false,
  className,
}: NavbarProps) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-50 w-full transition-all duration-300",
        sticky && "sticky top-0",
        transparent && !scrolled
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border",
        scrolled && "shadow-sm",
        className
      )}
    >
      <div className="container-xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            {logo || (
              <RouterNavLink to="/" className="text-xl font-bold gradient-text">
                Brand
              </RouterNavLink>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {items.map((item, index) => (
                <NavbarItemComponent key={index} item={item} />
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Custom actions */}
            {actions}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-slide-in-down">
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <RouterNavLink
                      to={item.href}
                      className="block px-4 py-2 text-sm font-medium rounded-lg hover:bg-accent"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </RouterNavLink>
                  ) : (
                    <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                      {item.label}
                      {item.children && (
                        <ul className="mt-2 ml-4 space-y-1">
                          {item.children.map((child, childIndex) => (
                            <li key={childIndex}>
                              <RouterNavLink
                                to={child.href}
                                className="block py-1.5 text-sm hover:text-primary"
                                onClick={() => setIsMobileOpen(false)}
                              >
                                {child.label}
                              </RouterNavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

// Navbar Item Component
interface NavbarItemComponentProps {
  item: NavbarItem;
}

const NavbarItemComponent = ({ item }: NavbarItemComponentProps) => {
  if (item.children) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-1">
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {item.children.map((child, index) => (
            <DropdownMenuItem key={index} asChild>
              <RouterNavLink to={child.href} className="flex flex-col items-start gap-1">
                <span className="font-medium">{child.label}</span>
                {child.description && (
                  <span className="text-xs text-muted-foreground">
                    {child.description}
                  </span>
                )}
              </RouterNavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button variant="ghost" asChild>
      <RouterNavLink to={item.href || "#"}>{item.label}</RouterNavLink>
    </Button>
  );
};

// Default nav items
const defaultNavItems: NavbarItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    children: [
      { label: "Overview", href: "/products", description: "All our products" },
      { label: "Pricing", href: "/pricing", description: "Simple pricing" },
      { label: "Features", href: "/features", description: "What we offer" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type { NavbarItem, NavbarProps };
