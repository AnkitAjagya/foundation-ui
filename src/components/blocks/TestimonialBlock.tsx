import * as React from "react";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  content: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
}

interface TestimonialBlockProps {
  title?: string;
  description?: string;
  testimonials: Testimonial[];
  columns?: 1 | 2 | 3;
  variant?: "default" | "cards" | "quote";
  className?: string;
}

export const TestimonialBlock = ({
  title,
  description,
  testimonials,
  columns = 3,
  variant = "cards",
  className,
}: TestimonialBlockProps) => {
  const columnClasses = {
    1: "max-w-2xl mx-auto",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className={cn("py-16 lg:py-24 bg-muted/30", className)}>
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

        {/* Testimonials grid */}
        <div
          className={cn(
            "grid gap-8",
            columns > 1 ? columnClasses[columns] : columnClasses[1]
          )}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "relative",
                variant === "cards" &&
                  "rounded-2xl border border-border bg-card p-6 lg:p-8 shadow-sm",
                variant === "quote" && "text-center"
              )}
            >
              {/* Quote icon */}
              {variant === "quote" && (
                <Quote className="h-12 w-12 mx-auto mb-6 text-primary/20 fill-primary/10" />
              )}

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating!
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Content */}
              <blockquote
                className={cn(
                  "text-foreground mb-6",
                  variant === "quote" && "text-xl lg:text-2xl font-medium italic"
                )}
              >
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div
                className={cn(
                  "flex items-center gap-4",
                  variant === "quote" && "justify-center"
                )}
              >
                {testimonial.author.avatar && (
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div className={variant === "quote" ? "text-center" : ""}>
                  <p className="font-semibold">{testimonial.author.name}</p>
                  {(testimonial.author.role || testimonial.author.company) && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.author.role}
                      {testimonial.author.role &&
                        testimonial.author.company &&
                        " at "}
                      {testimonial.author.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialBlock;
