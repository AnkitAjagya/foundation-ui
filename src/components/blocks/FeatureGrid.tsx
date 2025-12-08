import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
}

interface FeatureGridProps {
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "cards" | "icons-left";
  className?: string;
}

export const FeatureGrid = ({
  title,
  description,
  features,
  columns = 3,
  variant = "default",
  className,
}: FeatureGridProps) => {
  const columnClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container-xl">
        {/* Header */}
        {(title || description) && (
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={cn("grid gap-8", columnClasses[columns])}>
          {features.map((feature, index) => {
            const Icon = feature.icon;

            if (variant === "cards") {
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                >
                  <div
                    className="mb-4 inline-flex rounded-xl p-3"
                    style={{
                      backgroundColor: feature.iconColor
                        ? `${feature.iconColor}20`
                        : "hsl(var(--primary) / 0.1)",
                    }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{
                        color: feature.iconColor || "hsl(var(--primary))",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            }

            if (variant === "icons-left") {
              return (
                <div key={index} className="flex gap-4">
                  <div
                    className="shrink-0 rounded-lg p-2.5 h-fit"
                    style={{
                      backgroundColor: feature.iconColor
                        ? `${feature.iconColor}20`
                        : "hsl(var(--primary) / 0.1)",
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{
                        color: feature.iconColor || "hsl(var(--primary))",
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            }

            // Default variant
            return (
              <div key={index} className="text-center">
                <div
                  className="mx-auto mb-4 inline-flex rounded-2xl p-4"
                  style={{
                    backgroundColor: feature.iconColor
                      ? `${feature.iconColor}20`
                      : "hsl(var(--primary) / 0.1)",
                  }}
                >
                  <Icon
                    className="h-8 w-8"
                    style={{
                      color: feature.iconColor || "hsl(var(--primary))",
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
