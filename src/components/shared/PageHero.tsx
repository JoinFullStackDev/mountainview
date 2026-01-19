"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  name: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  badge?: string;
  children?: ReactNode;
  variant?: "default" | "centered" | "minimal";
  className?: string;
}

export function PageHero({
  title,
  description,
  breadcrumbs,
  badge,
  children,
  variant = "default",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-hero-gradient overflow-hidden",
        variant === "minimal" ? "py-12 md:py-16" : "py-16 md:py-24",
        className
      )}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-grid opacity-50" />

      {/* Decorative gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            className="mb-6"
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <motion.li
                  key={crumb.name}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                  {crumb.href && index < breadcrumbs.length - 1 ? (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium">
                      {crumb.name}
                    </span>
                  )}
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        )}

        <div
          className={cn(
            variant === "centered" && "text-center max-w-3xl mx-auto"
          )}
        >
          {badge && (
            <motion.span
              className="badge-primary mb-4 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {badge}
            </motion.span>
          )}

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {description}
            </motion.p>
          )}

          {children && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
