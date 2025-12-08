import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroBlockProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  image?: string;
  imageAlt?: string;
  alignment?: "left" | "center";
  showPattern?: boolean;
  className?: string;
}

export const HeroBlock = ({
  badge,
  title,
  titleHighlight,
  description,
  primaryAction,
  secondaryAction,
  image,
  imageAlt,
  alignment = "center",
  showPattern = true,
  className,
}: HeroBlockProps) => {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-20 lg:py-32",
        className
      )}
    >
      {/* Background effects */}
      {showPattern && (
        <>
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          </div>
        </>
      )}

      <div className="container-xl">
        <div
          className={cn(
            "flex flex-col gap-12 lg:gap-16",
            alignment === "center" && "items-center text-center",
            image && "lg:flex-row lg:items-center"
          )}
        >
          {/* Content */}
          <div
            className={cn(
              "flex-1 space-y-6",
              alignment === "center" && "max-w-3xl mx-auto"
            )}
          >
            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
                <Sparkles className="h-4 w-4" />
                {badge}
              </div>
            )}

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-fade-in-up">
              {titleHighlight ? (
                <>
                  {title.split(titleHighlight)[0]}
                  <span className="gradient-text">{titleHighlight}</span>
                  {title.split(titleHighlight)[1]}
                </>
              ) : (
                title
              )}
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl animate-fade-in-up delay-100">
              {description}
            </p>

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
                {primaryAction && (
                  <Button
                    size="xl"
                    variant="gradient"
                    onClick={primaryAction.onClick}
                    rightIcon={<ArrowRight className="h-5 w-5" />}
                  >
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    size="xl"
                    variant="outline"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Image */}
          {image && (
            <div className="flex-1 animate-fade-in-right delay-300">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                <img
                  src={image}
                  alt={imageAlt || "Hero image"}
                  className="relative rounded-2xl shadow-2xl border border-border/50"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroBlock;
