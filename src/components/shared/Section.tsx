import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "alt" | "dark";
  size?: "default" | "sm" | "lg";
  container?: "default" | "narrow" | "wide" | "none";
}

export function Section({
  children,
  className,
  variant = "default",
  size = "default",
  container = "wide",
}: SectionProps) {
  const variantClasses = {
    default: "bg-background",
    alt: "bg-section-alt",
    dark: "bg-section-dark text-section-dark-foreground",
  };

  const sizeClasses = {
    default: "section-padding",
    sm: "section-padding-sm",
    lg: "py-24 md:py-32 lg:py-40",
  };

  const containerClasses = {
    default: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl overflow-visible",
    narrow: "container-narrow",
    wide: "container-wide",
    none: "",
  };

  return (
    <section
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        "overflow-visible",
        className
      )}
    >
      <div className={containerClasses[container]}>{children}</div>
    </section>
  );
}
