"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: "default" | "dark" | "gradient";
  className?: string;
  children?: ReactNode;
}

export function CTA({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "dark",
  className,
  children,
}: CTAProps) {
  const variantClasses = {
    default: "bg-secondary",
    dark: "bg-section-dark text-section-dark-foreground",
    gradient: "bg-cta-gradient text-primary-foreground",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variantClasses[variant],
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pattern-grid opacity-10" />
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/10 rounded-full blur-3xl"
        animate={{ scale: [1.3, 1, 1.3], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide py-16 md:py-20 relative">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className={cn(
              "text-3xl md:text-4xl font-bold",
              variant !== "default" && "text-white"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              className={cn(
                "mt-4 text-lg",
                variant === "default" ? "text-muted-foreground" : "text-white/90"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}

          {(primaryAction || secondaryAction) && (
            <motion.div
              className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {primaryAction && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    variant={variant === "default" ? "default" : "secondary"}
                    className={
                      variant !== "default"
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : ""
                    }
                  >
                    <Link href={primaryAction.href}>{primaryAction.label}</Link>
                  </Button>
                </motion.div>
              )}
              {secondaryAction && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className={
                      variant !== "default"
                        ? "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                        : ""
                    }
                  >
                    <Link href={secondaryAction.href}>
                      {secondaryAction.label}
                    </Link>
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
