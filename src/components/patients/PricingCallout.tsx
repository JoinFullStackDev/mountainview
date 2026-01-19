"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCalloutProps {
  price: string;
  period?: string;
  title: string;
  description?: string;
  features?: string[];
  className?: string;
}

export function PricingCallout({
  price,
  period = "/month",
  title,
  description,
  features,
  className,
}: PricingCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-6 md:p-8",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold text-foreground">
              {price}
            </span>
            <span className="text-lg text-muted-foreground">{period}</span>
          </div>
          {description && (
            <p className="mt-2 text-muted-foreground">{description}</p>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="flex-shrink-0">
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
