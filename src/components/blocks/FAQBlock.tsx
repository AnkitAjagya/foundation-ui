import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  columns?: 1 | 2;
  className?: string;
}

export const FAQBlock = ({
  title,
  description,
  items,
  columns = 1,
  className,
}: FAQBlockProps) => {
  // Split items into two columns if needed
  const midpoint = Math.ceil(items.length / 2);
  const leftItems = columns === 2 ? items.slice(0, midpoint) : items;
  const rightItems = columns === 2 ? items.slice(midpoint) : [];

  const renderAccordion = (faqItems: FAQItem[], keyPrefix: string) => (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem
          key={`${keyPrefix}-${index}`}
          value={`${keyPrefix}-${index}`}
          className="border-b border-border last:border-0"
        >
          <AccordionTrigger className="text-left hover:text-primary transition-colors py-5">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground pb-5">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );

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

        {/* FAQ Accordion */}
        {columns === 1 ? (
          <div className="max-w-3xl mx-auto">
            {renderAccordion(leftItems, "faq")}
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            <div>{renderAccordion(leftItems, "left")}</div>
            <div>{renderAccordion(rightItems, "right")}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQBlock;
