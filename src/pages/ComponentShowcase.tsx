import React, { useState } from "react";
import { 
  Home, Users, Settings, BarChart3, FileText, HelpCircle, 
  Mail, Phone, Lock, Search, Upload, Bell, Star, Zap, Shield,
  Rocket, Globe, Heart, CheckCircle, AlertTriangle, Info,
  ChevronRight, Plus, Trash2, Edit, Eye
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input, PasswordInput, SearchInput, NumberInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormGroup, FormLabel, FormError, FormHelperText, FormCard } from "@/components/ui/form-elements";
import { FileUpload } from "@/components/ui/file-upload";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertBanner, InlineAlert } from "@/components/ui/alert-banner";
import { Divider } from "@/components/ui/divider";
import { ProgressBar, CircularProgress } from "@/components/ui/progress-bar";
import { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar } from "@/components/ui/skeleton";
import { BasicTable } from "@/components/ui/basic-table";
import { AdvancedTable } from "@/components/ui/advanced-table";
import { LineChartWrapper } from "@/components/ui/line-chart";
import { BarChartWrapper } from "@/components/ui/bar-chart";
import { PieChartWrapper, DonutChartWrapper } from "@/components/ui/pie-chart";
import { SimpleList, IconList, RichList, NotificationList } from "@/components/ui/lists";
import { Stepper } from "@/components/ui/stepper";
import { EmptyState, NoResultsState, NoDataState } from "@/components/ui/empty-state";
import { ConfirmDialog, DeleteConfirmDialog } from "@/components/ui/confirm-dialog";
import { PaginationControl, PaginationInfo } from "@/components/ui/pagination-control";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Blocks
import { PageHeader, SectionHeader, StatsWidget, KPICard } from "@/components/blocks/PageBlocks";
import { HeroBlock } from "@/components/blocks/HeroBlock";
import { FeatureGrid } from "@/components/blocks/FeatureGrid";
import { TestimonialBlock } from "@/components/blocks/TestimonialBlock";
import { PricingBlock } from "@/components/blocks/PricingBlock";
import { FAQBlock } from "@/components/blocks/FAQBlock";

// Sample data
const chartData = [
  { month: "Jan", revenue: 4000, users: 2400, orders: 1200 },
  { month: "Feb", revenue: 3000, users: 1398, orders: 980 },
  { month: "Mar", revenue: 5000, users: 3800, orders: 1500 },
  { month: "Apr", revenue: 4500, users: 3908, orders: 1400 },
  { month: "May", revenue: 6000, users: 4800, orders: 1800 },
  { month: "Jun", revenue: 5500, users: 3800, orders: 1600 },
];

const pieData = [
  { name: "Desktop", value: 4500 },
  { name: "Mobile", value: 3200 },
  { name: "Tablet", value: 1800 },
  { name: "Other", value: 500 },
];

const tableData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Pending" },
];

const features = [
  { icon: Zap, title: "Lightning Fast", description: "Built for speed with optimized performance.", iconColor: "#f59e0b" },
  { icon: Shield, title: "Secure by Default", description: "Enterprise-grade security out of the box.", iconColor: "#10b981" },
  { icon: Globe, title: "Global Scale", description: "Deploy anywhere with edge computing.", iconColor: "#3b82f6" },
  { icon: Rocket, title: "Easy Deployment", description: "One-click deployment to production.", iconColor: "#8b5cf6" },
  { icon: Heart, title: "Developer Love", description: "Built by developers, for developers.", iconColor: "#ec4899" },
  { icon: Star, title: "5-Star Support", description: "24/7 support from our expert team.", iconColor: "#f97316" },
];

const testimonials = [
  {
    content: "This design system has completely transformed how we build products. The components are beautiful and incredibly well-thought-out.",
    author: { name: "Sarah Chen", role: "Product Designer", company: "TechCorp" },
    rating: 5,
  },
  {
    content: "The best UI library I've ever used. It's intuitive, flexible, and the documentation is excellent.",
    author: { name: "Michael Park", role: "Frontend Developer", company: "StartupXYZ" },
    rating: 5,
  },
  {
    content: "We shipped our product 3x faster thanks to this design system. Highly recommended for any team.",
    author: { name: "Emily Rodriguez", role: "CTO", company: "InnovateCo" },
    rating: 5,
  },
];

const pricingTiers = [
  {
    name: "Starter",
    description: "Perfect for side projects",
    price: 0,
    period: "month",
    features: ["5 projects", "Basic components", "Community support", "1GB storage"],
    cta: { label: "Get Started", onClick: () => {} },
  },
  {
    name: "Pro",
    description: "For growing teams",
    price: 29,
    period: "month",
    features: ["Unlimited projects", "All components", "Priority support", "10GB storage", "Custom themes", "Analytics"],
    highlighted: true,
    badge: "Most Popular",
    cta: { label: "Start Free Trial", onClick: () => {} },
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    features: ["Everything in Pro", "Dedicated support", "SLA guarantee", "Custom integrations", "On-premise option"],
    cta: { label: "Contact Sales", onClick: () => {} },
  },
];

const faqItems = [
  { question: "How do I get started?", answer: "Simply install the package via npm and import the components you need. Our documentation provides detailed guides for each component." },
  { question: "Is this compatible with my framework?", answer: "Yes! Our components work with React 18+ and are fully compatible with Next.js, Vite, and other popular frameworks." },
  { question: "Can I customize the theme?", answer: "Absolutely. All components use CSS variables that can be easily customized. You can also extend the Tailwind config for deeper customization." },
  { question: "Is there a free tier?", answer: "Yes, our Starter plan is completely free and includes access to basic components and community support." },
];

const ComponentShowcase = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentStep, setCurrentStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-xl flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-xl font-bold gradient-text">UI Library</span>
            <div className="hidden md:flex items-center gap-1">
              {["Overview", "Components", "Blocks", "Charts"].map((item) => (
                <Button
                  key={item}
                  variant={activeTab === item.toLowerCase() ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(item.toLowerCase())}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Documentation</Button>
            <Button variant="gradient" size="sm">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <HeroBlock
        badge="Complete Design System"
        title="Build beautiful interfaces faster"
        titleHighlight="beautiful"
        description="A comprehensive UI library with 50+ components, rich animations, and complete design tokens. Copy, paste, and customize."
        primaryAction={{ label: "Explore Components", onClick: () => setActiveTab("components") }}
        secondaryAction={{ label: "View Documentation", onClick: () => {} }}
      />

      <div className="container-xl py-12 space-y-24">
        {/* Stats */}
        <section>
          <SectionHeader title="Key Metrics" description="Real-time statistics at a glance" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatsWidget 
              title="Total Users" 
              value="12,345" 
              change={{ value: 12.5, trend: "up" }}
              icon={Users}
            />
            <StatsWidget 
              title="Revenue" 
              value="$45,231" 
              change={{ value: 8.2, trend: "up" }}
              icon={BarChart3}
              iconColor="#10b981"
            />
            <StatsWidget 
              title="Active Projects" 
              value="89" 
              change={{ value: -2.4, trend: "down" }}
              icon={FileText}
              iconColor="#f59e0b"
            />
            <StatsWidget 
              title="Conversion Rate" 
              value="3.24%" 
              change={{ value: 0, trend: "neutral" }}
              icon={Zap}
              iconColor="#8b5cf6"
            />
          </div>
        </section>

        {/* Buttons */}
        <section>
          <SectionHeader title="Buttons" description="Various button styles and states" />
          <Card>
            <CardContent className="pt-6 space-y-6">
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
              <Divider label="With Icons" />
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Plus className="h-4 w-4" />}>Add New</Button>
                <Button variant="outline" rightIcon={<ChevronRight className="h-4 w-4" />}>Continue</Button>
                <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>Delete</Button>
                <Button loading>Loading</Button>
              </div>
              <Divider label="Sizes" />
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
                <Button size="icon"><Plus className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Inputs */}
        <section>
          <SectionHeader title="Form Inputs" description="Text inputs, password fields, and more" />
          <div className="grid gap-6 lg:grid-cols-2">
            <FormCard title="Basic Inputs">
              <FormGroup>
                <FormLabel required>Email Address</FormLabel>
                <Input placeholder="Enter your email" leftIcon={<Mail className="h-4 w-4" />} />
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormGroup>
              <FormGroup>
                <FormLabel required>Password</FormLabel>
                <PasswordInput placeholder="Enter password" />
              </FormGroup>
              <FormGroup>
                <FormLabel>Search</FormLabel>
                <SearchInput placeholder="Search..." />
              </FormGroup>
              <FormGroup>
                <FormLabel>Quantity</FormLabel>
                <NumberInput min={0} max={100} />
              </FormGroup>
            </FormCard>

            <FormCard title="Text Area & File Upload">
              <FormGroup>
                <FormLabel optional>Message</FormLabel>
                <Textarea placeholder="Type your message here..." />
              </FormGroup>
              <FormGroup>
                <FormLabel>Upload Files</FormLabel>
                <FileUpload
                  onFilesChange={setFiles}
                  value={files}
                  maxFiles={3}
                  acceptedTypes={["image/*", "application/pdf"]}
                />
              </FormGroup>
            </FormCard>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <SectionHeader title="Alerts & Notifications" description="Feedback components for users" />
          <div className="space-y-4">
            <AlertBanner variant="info" title="Information" dismissible>
              This is an informational message to help guide users.
            </AlertBanner>
            <AlertBanner variant="success" title="Success!">
              Your changes have been saved successfully.
            </AlertBanner>
            <AlertBanner variant="warning" title="Warning">
              Please review your settings before proceeding.
            </AlertBanner>
            <AlertBanner variant="error" title="Error" action={<Button size="sm" variant="outline">Retry</Button>}>
              Something went wrong. Please try again.
            </AlertBanner>
            <AlertBanner variant="gradient" title="New Feature">
              Check out our latest updates and improvements!
            </AlertBanner>
          </div>
        </section>

        {/* Progress */}
        <section>
          <SectionHeader title="Progress Indicators" description="Linear and circular progress bars" />
          <Card>
            <CardContent className="pt-6 space-y-8">
              <div className="space-y-4">
                <ProgressBar value={25} max={100} showLabel />
                <ProgressBar value={50} variant="success" showLabel />
                <ProgressBar value={75} variant="warning" showLabel labelPosition="inside" size="lg" />
                <ProgressBar value={90} variant="gradient" showLabel animated />
                <ProgressBar indeterminate />
              </div>
              <Divider label="Circular Progress" />
              <div className="flex flex-wrap gap-8 items-center">
                <CircularProgress value={25} />
                <CircularProgress value={50} variant="success" />
                <CircularProgress value={75} variant="warning" size={100} />
                <CircularProgress value={100} variant="gradient" size={120} strokeWidth={10} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tables */}
        <section>
          <SectionHeader title="Data Tables" description="Basic and advanced table components" />
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic Table</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Table</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="mt-4">
              <BasicTable
                data={tableData}
                columns={[
                  { key: "name", header: "Name" },
                  { key: "email", header: "Email" },
                  { key: "role", header: "Role" },
                  { 
                    key: "status", 
                    header: "Status",
                    cell: (row) => (
                      <Badge variant={row.status === "Active" ? "default" : row.status === "Inactive" ? "secondary" : "outline"}>
                        {row.status}
                      </Badge>
                    )
                  },
                ]}
                striped
                hoverable
              />
            </TabsContent>
            <TabsContent value="advanced" className="mt-4">
              <AdvancedTable
                data={tableData}
                columns={[
                  { key: "name", header: "Name", sortable: true },
                  { key: "email", header: "Email", sortable: true },
                  { key: "role", header: "Role", sortable: true },
                  { 
                    key: "status", 
                    header: "Status",
                    cell: (row) => (
                      <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                        {row.status}
                      </Badge>
                    )
                  },
                ]}
                selectable
                pagination
                pageSize={3}
                actions={(row) => [
                  { label: "Edit", onClick: () => console.log("Edit", row) },
                  { label: "Delete", onClick: () => setShowDeleteDialog(true) },
                ]}
              />
            </TabsContent>
          </Tabs>
        </section>

        {/* Charts */}
        <section>
          <SectionHeader title="Charts" description="Data visualization components" />
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartWrapper
                  data={chartData}
                  lines={[
                    { dataKey: "revenue", name: "Revenue", color: "hsl(226, 100%, 54%)" },
                    { dataKey: "orders", name: "Orders", color: "hsl(270, 100%, 60%)", dashed: true },
                  ]}
                  xAxisKey="month"
                  height={250}
                  area
                  gradient
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key metrics comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChartWrapper
                  data={chartData}
                  bars={[
                    { dataKey: "users", name: "Users", color: "hsl(226, 100%, 54%)" },
                    { dataKey: "orders", name: "Orders", color: "hsl(270, 100%, 60%)" },
                  ]}
                  xAxisKey="month"
                  height={250}
                  gradient
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Breakdown by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartWrapper data={pieData} height={250} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribution</CardTitle>
                <CardDescription>Donut chart variant</CardDescription>
              </CardHeader>
              <CardContent>
                <DonutChartWrapper data={pieData} height={250} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stepper */}
        <section>
          <SectionHeader title="Stepper" description="Multi-step progress indicators" />
          <Card>
            <CardContent className="pt-6 space-y-8">
              <Stepper
                steps={[
                  { title: "Account", description: "Create account" },
                  { title: "Profile", description: "Setup profile" },
                  { title: "Settings", description: "Configure" },
                  { title: "Complete", description: "All done!" },
                ]}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
                  Previous
                </Button>
                <Button onClick={() => setCurrentStep(Math.min(3, currentStep + 1))}>
                  Next
                </Button>
              </div>
              <Divider label="Simple Variant" />
              <Stepper
                steps={[
                  { title: "Step 1" },
                  { title: "Step 2" },
                  { title: "Step 3" },
                ]}
                currentStep={currentStep % 3}
                variant="simple"
              />
              <Divider label="Dots Variant" />
              <div className="flex justify-center">
                <Stepper
                  steps={[{title: ""}, {title: ""}, {title: ""}, {title: ""}, {title: ""}]}
                  currentStep={currentStep % 5}
                  variant="dots"
                  onStepClick={(step) => setCurrentStep(step)}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Pagination */}
        <section>
          <SectionHeader title="Pagination" description="Navigate through pages of content" />
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <PaginationControl
                  currentPage={currentPage}
                  totalPages={10}
                  onPageChange={setCurrentPage}
                />
                <PaginationInfo currentPage={currentPage} pageSize={10} totalItems={100} />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Empty States */}
        <section>
          <SectionHeader title="Empty States" description="Placeholder content for empty views" />
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-0">
                <NoDataState onCreate={() => {}} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <NoResultsState searchQuery="design system" onClear={() => {}} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-0">
                <EmptyState
                  icon={Bell}
                  title="No notifications"
                  description="You're all caught up!"
                  size="sm"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skeletons */}
        <section>
          <SectionHeader title="Skeleton Loaders" description="Loading placeholder components" />
          <div className="grid gap-6 md:grid-cols-3">
            <SkeletonCard hasImage hasAvatar lines={3} />
            <div className="space-y-4 p-4 border rounded-xl">
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="lg" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <SkeletonText lines={4} />
            </div>
            <div className="p-4 border rounded-xl space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <SkeletonAvatar size="sm" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-2 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <FeatureGrid
          title="Why Choose Us"
          description="Everything you need to build modern applications"
          features={features}
          variant="cards"
        />

        {/* Testimonials */}
        <TestimonialBlock
          title="Loved by Developers"
          description="See what our users have to say"
          testimonials={testimonials}
          variant="cards"
        />

        {/* Pricing */}
        <PricingBlock
          title="Simple, Transparent Pricing"
          description="Choose the plan that's right for you"
          tiers={pricingTiers}
        />

        {/* FAQ */}
        <FAQBlock
          title="Frequently Asked Questions"
          description="Everything you need to know"
          items={faqItems}
          columns={2}
        />

        {/* KPI Cards */}
        <section>
          <SectionHeader title="KPI Cards" description="Track your key performance indicators" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <KPICard title="Revenue Goal" value="$45K" target="$50K" progress={90} status="on-track" />
            <KPICard title="New Users" value="892" target="1000" progress={89} status="on-track" />
            <KPICard title="Churn Rate" value="2.4%" target="2%" progress={120} status="at-risk" />
            <KPICard title="NPS Score" value="42" target="60" progress={70} status="behind" />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12">
        <div className="container-xl text-center text-muted-foreground">
          <p>Built with React, TypeScript, Tailwind CSS, and shadcn/ui</p>
          <p className="mt-2">Complete Frontend Design System</p>
        </div>
      </footer>

      {/* Dialogs */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        itemName="User"
        onConfirm={() => console.log("Deleted")}
      />
    </div>
  );
};

export default ComponentShowcase;
