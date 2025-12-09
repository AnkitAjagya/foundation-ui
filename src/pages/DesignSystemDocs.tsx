import React, { useState } from "react";
import { 
  Palette, Type, Box, Layers, Grid, Layout, Zap, Database,
  Users, Shield, AlertCircle, Loader2, Eye, ChevronRight,
  Home, Settings, BarChart3, FileText, Mail, Lock, Search,
  Bell, Star, Heart, CheckCircle, X, Plus, Trash2, Edit,
  LogOut, Upload, Download, Filter, MoreHorizontal, ArrowRight,
  Sun, Moon, Code, Smartphone, Tablet, Monitor, ChevronDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, PasswordInput, SearchInput, NumberInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormGroup, FormLabel, FormError, FormHelperText, FormCard } from "@/components/ui/form-elements";
import { FileUpload } from "@/components/ui/file-upload";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Divider } from "@/components/ui/divider";
import { ProgressBar, CircularProgress } from "@/components/ui/progress-bar";
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Stepper } from "@/components/ui/stepper";
import { EmptyState, NoResultsState, ErrorState } from "@/components/ui/empty-state";
import { PaginationControl } from "@/components/ui/pagination-control";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Section Navigation
const sections = [
  { id: "design-tokens", label: "Design Tokens", icon: Palette },
  { id: "components", label: "UI Components", icon: Box },
  { id: "layouts", label: "Layout System", icon: Layout },
  { id: "page-blocks", label: "Page Blocks", icon: Layers },
  { id: "responsive", label: "Responsive Grid", icon: Grid },
  { id: "forms", label: "Form System", icon: FileText },
  { id: "api", label: "API Blueprint", icon: Database },
  { id: "state", label: "State Management", icon: Zap },
  { id: "auth", label: "Auth Package", icon: Shield },
  { id: "errors", label: "Error + Loader", icon: AlertCircle },
];

// Color Token Component
const ColorSwatch = ({ name, value, cssVar }: { name: string; value: string; cssVar: string }) => (
  <div className="group relative">
    <div 
      className="h-16 rounded-lg shadow-sm border border-border/50 transition-transform group-hover:scale-105"
      style={{ backgroundColor: value }}
    />
    <div className="mt-2 text-xs">
      <p className="font-medium text-foreground">{name}</p>
      <p className="text-muted-foreground">{cssVar}</p>
    </div>
  </div>
);

// Token Scale Component
const TokenScale = ({ title, items }: { title: string; items: { label: string; value: string; demo?: React.ReactNode }[] }) => (
  <div className="space-y-3">
    <h4 className="font-semibold text-foreground">{title}</h4>
    <div className="grid gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-4 p-2 rounded-lg bg-muted/50">
          <span className="w-20 text-xs font-mono text-muted-foreground">{item.label}</span>
          <span className="flex-1 text-sm">{item.value}</span>
          {item.demo}
        </div>
      ))}
    </div>
  </div>
);

// Flowchart Node Component
const FlowNode = ({ title, icon: Icon, variant = "default" }: { title: string; icon: any; variant?: "default" | "primary" | "success" | "warning" | "error" }) => {
  const variants = {
    default: "bg-card border-border",
    primary: "bg-primary/10 border-primary",
    success: "bg-green-500/10 border-green-500",
    warning: "bg-yellow-500/10 border-yellow-500",
    error: "bg-red-500/10 border-red-500",
  };
  
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 ${variants[variant]}`}>
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

const DesignSystemDocs = () => {
  const [activeSection, setActiveSection] = useState("design-tokens");
  const [isDarkPreview, setIsDarkPreview] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold">Design System</span>
              </div>
              <Badge variant="secondary">v1.0</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button variant="ghost" size="icon-sm" className="rounded-md"><Monitor className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon-sm" className="rounded-md"><Tablet className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon-sm" className="rounded-md"><Smartphone className="h-4 w-4" /></Button>
              </div>
              <Button variant="gradient" size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Section Navigation */}
      <div className="sticky top-16 z-40 border-b border-border bg-card/95 backdrop-blur overflow-x-auto">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 py-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(section.id)}
                className="whitespace-nowrap"
              >
                <section.icon className="h-4 w-4 mr-2" />
                {section.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 py-12 space-y-24">
        {/* ===== SECTION 1: DESIGN TOKENS ===== */}
        <section id="design-tokens" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Palette className="h-8 w-8 text-primary" />
              Design System Tokens
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Complete token system for colors, typography, spacing, shadows, and more.
            </p>
          </div>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle>Color Palette</CardTitle>
              <CardDescription>Primary, semantic, and neutral colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Primary Colors */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Primary & Accent</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  <ColorSwatch name="Primary" value="hsl(226, 100%, 54%)" cssVar="--primary" />
                  <ColorSwatch name="Primary FG" value="hsl(0, 0%, 100%)" cssVar="--primary-foreground" />
                  <ColorSwatch name="Accent" value="hsl(270, 100%, 60%)" cssVar="--accent" />
                  <ColorSwatch name="Accent FG" value="hsl(0, 0%, 100%)" cssVar="--accent-foreground" />
                  <ColorSwatch name="Secondary" value="hsl(220, 14%, 96%)" cssVar="--secondary" />
                  <ColorSwatch name="Muted" value="hsl(215, 16%, 47%)" cssVar="--muted-foreground" />
                </div>
              </div>

              {/* Semantic Colors */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Semantic Colors</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <ColorSwatch name="Success" value="hsl(142, 76%, 36%)" cssVar="--success" />
                  <ColorSwatch name="Warning" value="hsl(38, 92%, 50%)" cssVar="--warning" />
                  <ColorSwatch name="Error" value="hsl(0, 84%, 60%)" cssVar="--destructive" />
                  <ColorSwatch name="Info" value="hsl(199, 89%, 48%)" cssVar="--info" />
                </div>
              </div>

              {/* Background & Surface */}
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Surfaces & Backgrounds</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  <ColorSwatch name="Background" value="hsl(220, 20%, 98%)" cssVar="--background" />
                  <ColorSwatch name="Foreground" value="hsl(222, 47%, 11%)" cssVar="--foreground" />
                  <ColorSwatch name="Card" value="hsl(0, 0%, 100%)" cssVar="--card" />
                  <ColorSwatch name="Popover" value="hsl(0, 0%, 100%)" cssVar="--popover" />
                  <ColorSwatch name="Border" value="hsl(220, 13%, 91%)" cssVar="--border" />
                  <ColorSwatch name="Input" value="hsl(220, 13%, 91%)" cssVar="--input" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Light vs Dark Theme Comparison */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Light & Dark Themes</CardTitle>
                  <CardDescription>Side-by-side theme comparison</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch checked={isDarkPreview} onCheckedChange={setIsDarkPreview} />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Light Theme */}
                <div className="rounded-xl p-6 bg-[hsl(220,20%,98%)] text-[hsl(222,47%,11%)] border">
                  <div className="space-y-4">
                    <h5 className="font-semibold">Light Theme</h5>
                    <div className="space-y-2">
                      <div className="h-10 rounded-lg bg-[hsl(226,100%,54%)] text-white flex items-center justify-center text-sm">Primary Button</div>
                      <div className="h-10 rounded-lg bg-[hsl(220,14%,96%)] flex items-center justify-center text-sm border">Secondary</div>
                      <div className="h-10 rounded-lg bg-white flex items-center justify-center text-sm border">Card Surface</div>
                    </div>
                  </div>
                </div>
                
                {/* Dark Theme */}
                <div className="rounded-xl p-6 bg-[hsl(222,47%,6%)] text-[hsl(210,40%,98%)] border border-[hsl(217,33%,17%)]">
                  <div className="space-y-4">
                    <h5 className="font-semibold">Dark Theme</h5>
                    <div className="space-y-2">
                      <div className="h-10 rounded-lg bg-[hsl(226,100%,64%)] text-white flex items-center justify-center text-sm">Primary Button</div>
                      <div className="h-10 rounded-lg bg-[hsl(217,33%,17%)] flex items-center justify-center text-sm border border-[hsl(217,33%,17%)]">Secondary</div>
                      <div className="h-10 rounded-lg bg-[hsl(222,47%,9%)] flex items-center justify-center text-sm border border-[hsl(217,33%,17%)]">Card Surface</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography Scale */}
          <Card>
            <CardHeader>
              <CardTitle>Typography Scale</CardTitle>
              <CardDescription>Font sizes and weights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-xs</span>
                  <span className="text-xs">The quick brown fox (12px)</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-sm</span>
                  <span className="text-sm">The quick brown fox (14px)</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-base</span>
                  <span className="text-base">The quick brown fox (16px)</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-lg</span>
                  <span className="text-lg">The quick brown fox (18px)</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-xl</span>
                  <span className="text-xl">The quick brown fox (20px)</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-2xl</span>
                  <span className="text-2xl">The quick brown fox (24px)</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-border pb-2">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-3xl</span>
                  <span className="text-3xl">The quick brown fox (30px)</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-muted-foreground w-20">text-4xl</span>
                  <span className="text-4xl">The quick brown fox (36px)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spacing, Shadows, Radius */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Spacing Scale */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Spacing Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "0.5", value: "2px" },
                  { label: "1", value: "4px" },
                  { label: "2", value: "8px" },
                  { label: "3", value: "12px" },
                  { label: "4", value: "16px" },
                  { label: "6", value: "24px" },
                  { label: "8", value: "32px" },
                  { label: "12", value: "48px" },
                  { label: "16", value: "64px" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="w-8 text-xs font-mono text-muted-foreground">{item.label}</span>
                    <div className="h-4 bg-primary/20 rounded" style={{ width: item.value }} />
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Shadow Scale */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Shadow Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "shadow-sm", css: "0 1px 2px rgba(0,0,0,0.05)" },
                  { label: "shadow", css: "0 1px 3px rgba(0,0,0,0.1)" },
                  { label: "shadow-md", css: "0 4px 6px rgba(0,0,0,0.1)" },
                  { label: "shadow-lg", css: "0 10px 15px rgba(0,0,0,0.1)" },
                  { label: "shadow-xl", css: "0 20px 25px rgba(0,0,0,0.1)" },
                  { label: "shadow-glow", css: "0 0 20px primary/40%" },
                ].map((item) => (
                  <div key={item.label} className="p-3 bg-background rounded-lg" style={{ boxShadow: item.label === "shadow-glow" ? "0 0 20px hsl(226 100% 54% / 0.3)" : item.css }}>
                    <span className="text-xs font-mono">{item.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Border Radius */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Border Radius</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "rounded-none", value: "0px" },
                  { label: "rounded-sm", value: "4px" },
                  { label: "rounded-md", value: "6px" },
                  { label: "rounded-lg", value: "8px" },
                  { label: "rounded-xl", value: "12px" },
                  { label: "rounded-2xl", value: "16px" },
                  { label: "rounded-full", value: "9999px" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 border-2 border-primary" style={{ borderRadius: item.value }} />
                    <span className="text-xs font-mono">{item.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Animation, Z-Index, Opacity */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Animation Tokens */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Animation Tokens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "ease-spring", value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
                  { label: "ease-smooth", value: "cubic-bezier(0.23, 1, 0.32, 1)" },
                  { label: "duration-150", value: "150ms" },
                  { label: "duration-200", value: "200ms" },
                  { label: "duration-300", value: "300ms" },
                  { label: "duration-500", value: "500ms" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <span className="text-xs font-mono">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Z-Index Scale */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Z-Index Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "z-0", value: "0", use: "Base layer" },
                  { label: "z-10", value: "10", use: "Dropdowns" },
                  { label: "z-20", value: "20", use: "Headers" },
                  { label: "z-30", value: "30", use: "Sidebars" },
                  { label: "z-40", value: "40", use: "Overlays" },
                  { label: "z-50", value: "50", use: "Modals" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                    <span className="text-xs font-mono">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.use}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Opacity Scale */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Opacity Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "opacity-0", value: "0%" },
                  { label: "opacity-25", value: "25%" },
                  { label: "opacity-50", value: "50%" },
                  { label: "opacity-75", value: "75%" },
                  { label: "opacity-100", value: "100%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 bg-primary rounded" style={{ opacity: parseInt(item.value) / 100 }} />
                    <span className="text-xs font-mono">{item.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Glassmorphism Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Glassmorphism Tokens</CardTitle>
              <CardDescription>Glass effects and blur utilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="relative h-32 rounded-xl bg-gradient-to-br from-primary to-accent p-4">
                  <div className="absolute inset-2 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-sm font-medium">
                    blur-sm (4px)
                  </div>
                </div>
                <div className="relative h-32 rounded-xl bg-gradient-to-br from-primary to-accent p-4">
                  <div className="absolute inset-2 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center text-white text-sm font-medium">
                    blur (8px)
                  </div>
                </div>
                <div className="relative h-32 rounded-xl bg-gradient-to-br from-primary to-accent p-4">
                  <div className="absolute inset-2 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-sm font-medium">
                    blur-md (12px)
                  </div>
                </div>
                <div className="relative h-32 rounded-xl bg-gradient-to-br from-primary to-accent p-4">
                  <div className="absolute inset-2 rounded-lg bg-white/10 backdrop-blur-xl flex items-center justify-center text-white text-sm font-medium">
                    blur-xl (24px)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 2: UI COMPONENTS ===== */}
        <section id="components" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Box className="h-8 w-8 text-primary" />
              UI Component Library
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              50+ production-ready components for building modern interfaces.
            </p>
          </div>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>All button variants and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Variants</h4>
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="subtle">Subtle</Button>
                  <Button variant="gradient">Gradient</Button>
                  <Button variant="glow">Glow</Button>
                  <Button variant="glass">Glass</Button>
                </div>
              </div>
              <Divider />
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">Sizes</h4>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                  <Button size="icon"><Plus className="h-4 w-4" /></Button>
                  <Button size="icon-sm"><Plus className="h-3 w-3" /></Button>
                  <Button size="icon-lg"><Plus className="h-5 w-5" /></Button>
                </div>
              </div>
              <Divider />
              <div>
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">States</h4>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<Plus className="h-4 w-4" />}>With Icon</Button>
                  <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Continue</Button>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle>Input Types</CardTitle>
              <CardDescription>Text, password, search, and number inputs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input placeholder="Default input" />
                  <Input placeholder="With icon" leftIcon={<Mail className="h-4 w-4" />} />
                  <PasswordInput placeholder="Password input" />
                  <SearchInput placeholder="Search..." />
                  <NumberInput placeholder="Number input" />
                </div>
                <div className="space-y-4">
                  <Textarea placeholder="Textarea for longer content..." />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selects, Radios, Checkboxes, Switches */}
          <Card>
            <CardHeader>
              <CardTitle>Selection Controls</CardTitle>
              <CardDescription>Selects, radios, checkboxes, and switches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Select</h4>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Option 1</SelectItem>
                      <SelectItem value="2">Option 2</SelectItem>
                      <SelectItem value="3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Radio Group</h4>
                  <RadioGroup defaultValue="1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="r1" />
                      <Label htmlFor="r1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="r2" />
                      <Label htmlFor="r2">Option 2</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Checkboxes</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="c1" defaultChecked />
                      <Label htmlFor="c1">Checked</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="c2" />
                      <Label htmlFor="c2">Unchecked</Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Switches</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="s1" defaultChecked />
                      <Label htmlFor="s1">Enabled</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="s2" />
                      <Label htmlFor="s2">Disabled</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modals, Drawers, Dialogs */}
          <Card>
            <CardHeader>
              <CardTitle>Overlays</CardTitle>
              <CardDescription>Modals, drawers, and dialogs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open Modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modal Title</DialogTitle>
                      <DialogDescription>
                        This is a modal dialog with header, content, and actions.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>Modal content goes here.</p>
                    </div>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline">Open Drawer</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Drawer Title</SheetTitle>
                      <SheetDescription>
                        This drawer slides in from the right side.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                      <p>Drawer content goes here.</p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>

          {/* Alerts, Badges, Toasts */}
          <Card>
            <CardHeader>
              <CardTitle>Feedback Components</CardTitle>
              <CardDescription>Alerts, badges, and status indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Alerts</h4>
                <AlertBanner variant="info" title="Info">Informational message</AlertBanner>
                <AlertBanner variant="success" title="Success">Action completed</AlertBanner>
                <AlertBanner variant="warning" title="Warning">Caution required</AlertBanner>
                <AlertBanner variant="error" title="Error">Something went wrong</AlertBanner>
              </div>
              <Divider />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Badges</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skeletons, Spinners, Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>Skeletons and progress indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Skeletons</h4>
                  <div className="flex items-center gap-3">
                    <SkeletonAvatar />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                  <SkeletonText lines={3} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Progress</h4>
                  <ProgressBar value={30} showLabel />
                  <ProgressBar value={60} variant="success" showLabel />
                  <ProgressBar value={85} variant="gradient" showLabel animated />
                  <div className="flex gap-4">
                    <CircularProgress value={45} size={60} />
                    <CircularProgress value={75} variant="success" size={60} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs, Breadcrumbs, Pagination */}
          <Card>
            <CardHeader>
              <CardTitle>Navigation Components</CardTitle>
              <CardDescription>Tabs, breadcrumbs, and pagination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Tabs</h4>
                <Tabs defaultValue="tab1">
                  <TabsList>
                    <TabsTrigger value="tab1">Overview</TabsTrigger>
                    <TabsTrigger value="tab2">Analytics</TabsTrigger>
                    <TabsTrigger value="tab3">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="p-4 mt-2 bg-muted/30 rounded-lg">
                    Tab 1 Content
                  </TabsContent>
                </Tabs>
              </div>
              <Divider />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Breadcrumbs</h4>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Products</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Details</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <Divider />
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-muted-foreground">Pagination</h4>
                <PaginationControl currentPage={3} totalPages={10} onPageChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          {/* Cards, Tooltips, Avatars */}
          <Card>
            <CardHeader>
              <CardTitle>Display Components</CardTitle>
              <CardDescription>Cards, tooltips, and avatars</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Card Title</CardTitle>
                    <CardDescription>Card description text</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Card content area</p>
                  </CardContent>
                </Card>
                <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded-xl">
                  <h4 className="text-sm font-medium">Tooltips</h4>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">Hover me</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tooltip content</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-4 border rounded-xl">
                  <h4 className="text-sm font-medium">Avatars</h4>
                  <div className="flex -space-x-2">
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>CD</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-2 border-background">
                      <AvatarFallback>+3</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 3: LAYOUT SYSTEM ===== */}
        <section id="layouts" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Layout className="h-8 w-8 text-primary" />
              Layout System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Pre-built layout templates for common page structures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Layout */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dashboard Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden h-48 bg-muted/30">
                  <div className="flex h-full">
                    <div className="w-12 bg-card border-r flex flex-col items-center py-2 gap-2">
                      <div className="w-6 h-6 rounded bg-primary/20" />
                      <div className="w-4 h-4 rounded bg-muted" />
                      <div className="w-4 h-4 rounded bg-muted" />
                      <div className="w-4 h-4 rounded bg-muted" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="h-8 border-b bg-card flex items-center px-2">
                        <div className="w-16 h-3 rounded bg-muted" />
                      </div>
                      <div className="flex-1 p-2 grid grid-cols-2 gap-1">
                        <div className="bg-card rounded border" />
                        <div className="bg-card rounded border" />
                        <div className="bg-card rounded border col-span-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auth Layout */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Auth Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden h-48 bg-muted/30">
                  <div className="flex h-full">
                    <div className="w-1/2 bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <div className="w-12 h-12 rounded-lg bg-white/20" />
                    </div>
                    <div className="w-1/2 bg-card flex items-center justify-center p-4">
                      <div className="w-full space-y-2">
                        <div className="h-3 w-1/2 bg-muted rounded" />
                        <div className="h-6 w-full bg-muted rounded" />
                        <div className="h-6 w-full bg-muted rounded" />
                        <div className="h-6 w-full bg-primary/20 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Split Screen */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Split Screen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden h-48 bg-muted/30">
                  <div className="flex h-full">
                    <div className="w-1/2 bg-card border-r p-2 flex items-center justify-center">
                      <div className="text-xs text-muted-foreground">Left Panel</div>
                    </div>
                    <div className="w-1/2 bg-card p-2 flex items-center justify-center">
                      <div className="text-xs text-muted-foreground">Right Panel</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Two Column */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Two Column</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden h-48 bg-muted/30">
                  <div className="flex h-full p-2 gap-2">
                    <div className="w-2/3 bg-card rounded border p-2">
                      <div className="space-y-1">
                        <div className="h-2 w-3/4 bg-muted rounded" />
                        <div className="h-2 w-full bg-muted rounded" />
                        <div className="h-2 w-1/2 bg-muted rounded" />
                      </div>
                    </div>
                    <div className="w-1/3 bg-card rounded border p-2">
                      <div className="h-2 w-full bg-muted rounded mb-2" />
                      <div className="h-16 bg-muted/50 rounded" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card Grid */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Card Grid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden h-48 bg-muted/30 p-2">
                  <div className="grid grid-cols-3 gap-1 h-full">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-card rounded border" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Centered Layout */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Centered Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden h-48 bg-muted/30 flex items-center justify-center">
                  <div className="w-32 bg-card rounded-lg border p-3 space-y-2">
                    <div className="h-2 w-full bg-muted rounded" />
                    <div className="h-2 w-3/4 bg-muted rounded" />
                    <div className="h-6 w-full bg-primary/20 rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 4: PAGE BLOCKS ===== */}
        <section id="page-blocks" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Layers className="h-8 w-8 text-primary" />
              Page Blocks
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Ready-to-use page sections and content blocks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Page Header Block */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">PageHeader</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20" />
                    <div>
                      <div className="h-3 w-24 bg-foreground/20 rounded mb-1" />
                      <div className="h-2 w-32 bg-muted-foreground/20 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-primary/20 rounded" />
                    <div className="h-6 w-16 bg-muted rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section Header Block */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">SectionHeader</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/30 text-center space-y-2">
                  <div className="h-4 w-32 bg-foreground/20 rounded mx-auto" />
                  <div className="h-2 w-48 bg-muted-foreground/20 rounded mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Widget */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">StatsWidget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-card space-y-2">
                  <div className="flex justify-between">
                    <div className="h-2 w-16 bg-muted rounded" />
                    <div className="w-6 h-6 rounded bg-primary/20" />
                  </div>
                  <div className="h-6 w-20 bg-foreground/20 rounded" />
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-8 bg-green-500/30 rounded" />
                    <div className="h-2 w-16 bg-muted rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* KPI Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">KPI Card</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-card space-y-3">
                  <div className="h-2 w-20 bg-muted rounded" />
                  <div className="flex items-baseline gap-2">
                    <div className="h-5 w-16 bg-foreground/20 rounded" />
                    <div className="h-3 w-12 bg-muted rounded" />
                  </div>
                  <div className="h-2 w-full bg-primary/20 rounded-full" />
                </div>
              </CardContent>
            </Card>

            {/* Filter Bar */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">FilterBar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 bg-card flex items-center gap-2">
                  <div className="h-7 flex-1 bg-muted rounded flex items-center px-2">
                    <Search className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="h-7 w-20 bg-muted rounded flex items-center justify-center">
                    <Filter className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="h-7 w-16 bg-primary/20 rounded" />
                </div>
              </CardContent>
            </Card>

            {/* Hero Block */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">HeroBlock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-gradient-to-br from-primary/20 to-accent/20 text-center space-y-2">
                  <div className="h-2 w-16 bg-primary/40 rounded mx-auto" />
                  <div className="h-4 w-32 bg-foreground/20 rounded mx-auto" />
                  <div className="h-2 w-40 bg-muted-foreground/20 rounded mx-auto" />
                  <div className="flex justify-center gap-2 pt-2">
                    <div className="h-6 w-16 bg-primary/40 rounded" />
                    <div className="h-6 w-16 bg-muted rounded" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Empty State */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">EmptyState</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6 bg-muted/30 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="h-3 w-20 bg-foreground/20 rounded" />
                  <div className="h-2 w-28 bg-muted-foreground/20 rounded" />
                  <div className="h-6 w-16 bg-primary/20 rounded mt-1" />
                </div>
              </CardContent>
            </Card>

            {/* Feature Grid */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">FeatureGrid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-card rounded border p-2 space-y-1">
                        <div className="w-5 h-5 rounded bg-primary/20" />
                        <div className="h-2 w-12 bg-foreground/20 rounded" />
                        <div className="h-1 w-16 bg-muted rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Block */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">PricingBlock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-2 bg-muted/30">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`flex-1 rounded border p-2 ${i === 2 ? 'bg-primary/10 border-primary/30' : 'bg-card'}`}>
                        <div className="h-2 w-8 bg-muted rounded mb-1" />
                        <div className="h-3 w-10 bg-foreground/20 rounded mb-2" />
                        <div className="space-y-1">
                          <div className="h-1 w-full bg-muted rounded" />
                          <div className="h-1 w-3/4 bg-muted rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ===== SECTION 5: RESPONSIVE GRID ===== */}
        <section id="responsive" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Grid className="h-8 w-8 text-primary" />
              Responsive Grid System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Breakpoints, grid patterns, and responsive utilities.
            </p>
          </div>

          {/* Breakpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Breakpoints</CardTitle>
              <CardDescription>Tailwind CSS responsive breakpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "sm", width: "640px", desc: "Mobile landscape" },
                  { name: "md", width: "768px", desc: "Tablets" },
                  { name: "lg", width: "1024px", desc: "Laptops" },
                  { name: "xl", width: "1280px", desc: "Desktops" },
                  { name: "2xl", width: "1536px", desc: "Large screens" },
                ].map((bp) => (
                  <div key={bp.name} className="flex items-center gap-4">
                    <Badge variant="outline" className="w-12 justify-center font-mono">{bp.name}</Badge>
                    <div className="flex-1">
                      <div className="h-3 bg-primary/20 rounded-full" style={{ width: `${parseInt(bp.width) / 20}%` }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-20">{bp.width}</span>
                    <span className="text-sm text-muted-foreground hidden sm:block">{bp.desc}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Responsive Grids */}
          <Card>
            <CardHeader>
              <CardTitle>Responsive Grids</CardTitle>
              <CardDescription>Adaptive column layouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">1 → 2 → 4 columns</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-center font-mono text-sm">
                      Col {i}
                    </div>
                  ))}
                </div>
              </div>
              <Divider />
              <div>
                <p className="text-sm text-muted-foreground mb-3">1 → 3 columns</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-accent/10 rounded-lg border border-accent/20 flex items-center justify-center font-mono text-sm">
                      Col {i}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Container Widths */}
          <Card>
            <CardHeader>
              <CardTitle>Container Widths</CardTitle>
              <CardDescription>Maximum container widths</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "max-w-sm", width: "384px" },
                  { name: "max-w-md", width: "448px" },
                  { name: "max-w-lg", width: "512px" },
                  { name: "max-w-xl", width: "576px" },
                  { name: "max-w-2xl", width: "672px" },
                  { name: "max-w-4xl", width: "896px" },
                  { name: "max-w-6xl", width: "1152px" },
                  { name: "max-w-7xl", width: "1280px" },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-4">
                    <span className="font-mono text-xs w-24">{c.name}</span>
                    <div className="flex-1 h-4 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary/30" style={{ width: `${parseInt(c.width) / 14}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{c.width}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 6: FORM SYSTEM ===== */}
        <section id="forms" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Form System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Form components, validation, and layouts.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Form Components */}
            <Card>
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormGroup>
                  <FormLabel required>Email Address</FormLabel>
                  <Input placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} />
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormGroup>

                <FormGroup>
                  <FormLabel required>Password</FormLabel>
                  <Input type="password" placeholder="••••••••" />
                  <FormError message="Password must be at least 8 characters" />
                </FormGroup>

                <FormGroup>
                  <FormLabel optional>Bio</FormLabel>
                  <Textarea placeholder="Tell us about yourself..." />
                </FormGroup>
              </CardContent>
            </Card>

            {/* Form Card Example */}
            <FormCard title="Create Account" description="Enter your details to get started">
              <FormGroup>
                <FormLabel required>Full Name</FormLabel>
                <Input placeholder="John Doe" leftIcon={<Users className="h-4 w-4" />} />
              </FormGroup>
              <FormGroup>
                <FormLabel required>Email</FormLabel>
                <Input placeholder="john@example.com" leftIcon={<Mail className="h-4 w-4" />} />
              </FormGroup>
              <FormGroup>
                <FormLabel required>Password</FormLabel>
                <PasswordInput placeholder="Create a strong password" />
                <FormHelperText>Min 8 characters with uppercase and number</FormHelperText>
              </FormGroup>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">I agree to the Terms of Service</Label>
              </div>
              <Button className="w-full" variant="gradient">Create Account</Button>
            </FormCard>
          </div>

          {/* Validation States */}
          <Card>
            <CardHeader>
              <CardTitle>Validation States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <FormGroup>
                  <FormLabel>Default State</FormLabel>
                  <Input placeholder="Enter value" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Success State</FormLabel>
                  <Input placeholder="Valid input" className="border-green-500 focus-visible:ring-green-500" />
                  <p className="text-xs text-green-600 mt-1">✓ Looks good!</p>
                </FormGroup>
                <FormGroup>
                  <FormLabel>Error State</FormLabel>
                  <Input placeholder="Invalid input" className="border-destructive focus-visible:ring-destructive" />
                  <FormError message="This field is required" />
                </FormGroup>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 7: API BLUEPRINT ===== */}
        <section id="api" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Database className="h-8 w-8 text-primary" />
              API Service Blueprint
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              API architecture, request flow, and error handling.
            </p>
          </div>

          {/* API Flow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle>API Request Flow</CardTitle>
              <CardDescription>Standard request lifecycle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-4 py-8">
                <FlowNode title="Component" icon={Box} variant="primary" />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="API Service" icon={Zap} />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="Fetch Wrapper" icon={Code} />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="Backend API" icon={Database} variant="success" />
              </div>
              <Divider label="Response Path" />
              <div className="flex flex-wrap items-center justify-center gap-4 py-8">
                <FlowNode title="Response" icon={CheckCircle} variant="success" />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="Transform" icon={Zap} />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="State Update" icon={Database} />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="UI Render" icon={Eye} variant="primary" />
              </div>
            </CardContent>
          </Card>

          {/* Error Handling Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Error Handling Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Network Error</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Retry with exponential backoff (3 attempts)</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Retry 1</Badge>
                    <Badge variant="outline">Retry 2</Badge>
                    <Badge variant="outline">Retry 3</Badge>
                  </div>
                </div>
                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-red-600">
                    <X className="h-5 w-5" />
                    <span className="font-medium">4xx Errors</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Client errors - display message to user</p>
                  <Badge variant="destructive">Show Toast</Badge>
                </div>
                <div className="p-4 border rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">5xx Errors</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Server errors - retry then show error page</p>
                  <Badge variant="destructive">Error Page</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mock API Structure */}
          <Card>
            <CardHeader>
              <CardTitle>API Service Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Endpoints</h4>
                  <div className="space-y-2">
                    {["GET /users", "POST /users", "PUT /users/:id", "DELETE /users/:id"].map((endpoint) => (
                      <div key={endpoint} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                        <Badge variant="outline" className="font-mono text-xs">{endpoint.split(" ")[0]}</Badge>
                        <span className="text-sm font-mono">{endpoint.split(" ")[1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Response Format</h4>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-xs space-y-1">
                    <p className="text-muted-foreground">{"{"}</p>
                    <p className="pl-4">"success": <span className="text-green-600">true</span>,</p>
                    <p className="pl-4">"data": {"{ ... }"},</p>
                    <p className="pl-4">"meta": {"{"}</p>
                    <p className="pl-8">"page": 1,</p>
                    <p className="pl-8">"total": 100</p>
                    <p className="pl-4">{"}"},</p>
                    <p className="pl-4">"error": <span className="text-red-600">null</span></p>
                    <p className="text-muted-foreground">{"}"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 8: STATE MANAGEMENT ===== */}
        <section id="state" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Zap className="h-8 w-8 text-primary" />
              State Management Blueprint
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Application state architecture and store patterns.
            </p>
          </div>

          {/* State Stores */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Store */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">User Store</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">State</p>
                  <div className="text-sm font-mono bg-muted/50 p-2 rounded">
                    user, isAuthenticated, loading
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Actions</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">login</Badge>
                    <Badge variant="outline">logout</Badge>
                    <Badge variant="outline">updateProfile</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Store */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Theme Store</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">State</p>
                  <div className="text-sm font-mono bg-muted/50 p-2 rounded">
                    theme, colorScheme
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Actions</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">setTheme</Badge>
                    <Badge variant="outline">toggleDark</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Toast Store */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Toast Store</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">State</p>
                  <div className="text-sm font-mono bg-muted/50 p-2 rounded">
                    toasts[], maxToasts
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Actions</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">addToast</Badge>
                    <Badge variant="outline">removeToast</Badge>
                    <Badge variant="outline">clear</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar Store */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Sidebar Store</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">State</p>
                  <div className="text-sm font-mono bg-muted/50 p-2 rounded">
                    isOpen, isCollapsed
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Actions</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">toggle</Badge>
                    <Badge variant="outline">collapse</Badge>
                    <Badge variant="outline">expand</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filter Store */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Filter Store</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">State</p>
                  <div className="text-sm font-mono bg-muted/50 p-2 rounded">
                    filters{}, search, sort
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Actions</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">setFilter</Badge>
                    <Badge variant="outline">setSearch</Badge>
                    <Badge variant="outline">reset</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Cache */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Data Cache</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">State</p>
                  <div className="text-sm font-mono bg-muted/50 p-2 rounded">
                    queries{}, mutations{}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Provider</p>
                  <Badge variant="secondary">TanStack Query</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* State Flow Diagram */}
          <Card>
            <CardHeader>
              <CardTitle>State Flow Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-4 py-8">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-xl border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium">UI Layer</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">dispatch</span>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-xl border-2 border-accent bg-accent/10 flex items-center justify-center">
                    <Zap className="h-8 w-8 text-accent" />
                  </div>
                  <p className="text-sm font-medium">Store</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">update</span>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-xl border-2 border-green-500 bg-green-500/10 flex items-center justify-center">
                    <Database className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-sm font-medium">State</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="h-5 w-5 text-muted-foreground rotate-180" />
                  <span className="text-xs text-muted-foreground">subscribe</span>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-xl border-2 border-primary bg-primary/10 flex items-center justify-center">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Re-render</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 9: AUTH PACKAGE ===== */}
        <section id="auth" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Auth Package
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Authentication UI and protected route logic.
            </p>
          </div>

          {/* Auth UIs */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Login UI */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Login UI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-4 bg-card space-y-3">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 mx-auto mb-2" />
                    <div className="h-3 w-16 bg-foreground/20 rounded mx-auto" />
                  </div>
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-primary/30 rounded" />
                  <div className="text-center">
                    <div className="h-2 w-20 bg-muted rounded mx-auto" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Signup UI */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Signup UI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-4 bg-card space-y-3">
                  <div className="text-center mb-4">
                    <div className="h-3 w-20 bg-foreground/20 rounded mx-auto" />
                  </div>
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-primary/30 rounded" />
                </div>
              </CardContent>
            </Card>

            {/* Forgot Password */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Forgot Password</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-4 bg-card space-y-3">
                  <div className="text-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="h-3 w-24 bg-foreground/20 rounded mx-auto" />
                  </div>
                  <div className="h-2 w-full bg-muted-foreground/20 rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-primary/30 rounded" />
                </div>
              </CardContent>
            </Card>

            {/* Reset Password */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Reset Password</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-4 bg-card space-y-3">
                  <div className="text-center mb-4">
                    <div className="h-3 w-24 bg-foreground/20 rounded mx-auto" />
                  </div>
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-muted rounded" />
                  <div className="h-8 w-full bg-primary/30 rounded" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Protected Route Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Protected Route Flow</CardTitle>
              <CardDescription>Authentication guard logic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-4 py-8">
                <FlowNode title="Route Request" icon={ArrowRight} />
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
                <FlowNode title="Auth Check" icon={Shield} variant="warning" />
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-4">
                    <ArrowRight className="h-5 w-5 text-green-500" />
                    <span className="text-xs text-green-600">Authenticated</span>
                    <ArrowRight className="h-5 w-5 text-green-500" />
                    <FlowNode title="Render Page" icon={CheckCircle} variant="success" />
                  </div>
                  <div className="flex items-center gap-4">
                    <ArrowRight className="h-5 w-5 text-red-500" />
                    <span className="text-xs text-red-600">Not Auth</span>
                    <ArrowRight className="h-5 w-5 text-red-500" />
                    <FlowNode title="Redirect Login" icon={LogOut} variant="error" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 10: ERROR + LOADER SYSTEM ===== */}
        <section id="errors" className="scroll-mt-32 space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-primary" />
              Error + Loader System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Error pages, loading states, and feedback components.
            </p>
          </div>

          {/* Error Pages */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 404 */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">404 Page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-6 bg-muted/30 text-center space-y-3">
                  <div className="text-4xl font-bold text-muted-foreground/50">404</div>
                  <div className="h-3 w-24 bg-foreground/20 rounded mx-auto" />
                  <div className="h-2 w-32 bg-muted-foreground/20 rounded mx-auto" />
                  <div className="h-8 w-24 bg-primary/20 rounded mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* 500 */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">500 Page</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-6 bg-red-50 dark:bg-red-950/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 mx-auto flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="h-3 w-20 bg-red-200 dark:bg-red-900/50 rounded mx-auto" />
                  <div className="h-2 w-28 bg-red-100 dark:bg-red-900/30 rounded mx-auto" />
                  <div className="h-8 w-20 bg-red-200 dark:bg-red-900/50 rounded mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* Maintenance */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-6 bg-yellow-50 dark:bg-yellow-950/20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mx-auto flex items-center justify-center">
                    <Settings className="h-6 w-6 text-yellow-600 animate-spin" style={{ animationDuration: "3s" }} />
                  </div>
                  <div className="h-3 w-28 bg-yellow-200 dark:bg-yellow-900/50 rounded mx-auto" />
                  <div className="h-2 w-32 bg-yellow-100 dark:bg-yellow-900/30 rounded mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* Full Page Loader */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Full Page Loader</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-xl p-6 bg-background text-center space-y-3 flex flex-col items-center justify-center min-h-[140px]">
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  <div className="h-2 w-16 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Empty & Loading States */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-0">
                <NoResultsState searchQuery="design" onClear={() => {}} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <ErrorState onRetry={() => {}} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-8">
                <SkeletonCard hasImage hasAvatar lines={3} />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12 bg-card">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Code className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">Design System</span>
          </div>
          <p className="text-muted-foreground">
            Complete Frontend Framework Documentation
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with React • TypeScript • Tailwind CSS • shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DesignSystemDocs;
