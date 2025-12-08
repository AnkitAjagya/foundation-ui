import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

interface PricingTier {
  name: string;
  description?: string;
  price: string | number;
  priceLabel?: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  cta: {
    label: string;
    onClick: () => void;
  };
}

interface PricingBlockProps {
  title?: string;
  description?: string;
  tiers: PricingTier[];
  billingToggle?: {
    monthly: string;
    yearly: string;
    value: "monthly" | "yearly";
    onChange: (value: "monthly" | "yearly") => void;
  };
  className?: string;
}

export const PricingBlock = ({
  title,
  description,
  tiers,
  billingToggle,
  className,
}: PricingBlockProps) => {
  return (
    <section className={cn("py-16 lg:py-24", className)}>
      <div className="container-xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}

          {/* Billing toggle */}
          {billingToggle && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => billingToggle.onChange("monthly")}
                className={cn(
                  "text-sm font-medium transition-colors",
                  billingToggle.value === "monthly"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {billingToggle.monthly}
              </button>
              <button
                onClick={() =>
                  billingToggle.onChange(
                    billingToggle.value === "monthly" ? "yearly" : "monthly"
                  )
                }
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  billingToggle.value === "yearly"
                    ? "bg-primary"
                    : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform",
                    billingToggle.value === "yearly" && "translate-x-5"
                  )}
                />
              </button>
              <button
                onClick={() => billingToggle.onChange("yearly")}
                className={cn(
                  "text-sm font-medium transition-colors",
                  billingToggle.value === "yearly"
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {billingToggle.yearly}
              </button>
            </div>
          )}
        </div>

        {/* Pricing cards */}
        <div
          className={cn(
            "grid gap-8 lg:gap-6 mx-auto",
            tiers.length === 2 && "max-w-3xl lg:grid-cols-2",
            tiers.length === 3 && "max-w-5xl lg:grid-cols-3",
            tiers.length >= 4 && "lg:grid-cols-4"
          )}
        >
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-2xl border p-8 transition-all",
                tier.highlighted
                  ? "border-primary bg-primary/5 shadow-lg scale-[1.02] lg:scale-105"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Sparkles className="h-3 w-3" />
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                {tier.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  {tier.priceLabel && (
                    <span className="text-sm text-muted-foreground">
                      {tier.priceLabel}
                    </span>
                  )}
                  <span className="text-4xl font-bold">
                    {typeof tier.price === "number" ? `$${tier.price}` : tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-muted-foreground">/{tier.period}</span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <Button
                className="w-full mb-6"
                variant={tier.highlighted ? "gradient" : "outline"}
                onClick={tier.cta.onClick}
              >
                {tier.cta.label}
              </Button>

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingBlock;
