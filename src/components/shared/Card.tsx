"use client";

import { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  href?: string;
  className?: string;
  variant?: "default" | "feature" | "service" | "stat";
  children?: ReactNode;
  style?: CSSProperties;
  delay?: number;
}

export function Card({
  title,
  description,
  icon,
  href,
  className,
  variant = "default",
  children,
  style,
  delay = 0,
}: CardProps) {
  const content = (
    <>
      {icon && (
        <motion.div
          className={cn(
            "flex items-center justify-center rounded-xl mb-4 transition-all duration-300",
            variant === "feature" &&
              "h-12 w-12 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
            variant === "service" && "h-11 w-11 bg-secondary text-primary",
            variant === "stat" && "h-14 w-14 bg-primary text-primary-foreground",
            variant === "default" && "h-11 w-11 bg-primary/10 text-primary"
          )}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          {icon}
        </motion.div>
      )}
      <h3
        className={cn(
          "font-semibold text-foreground",
          variant === "stat"
            ? "text-3xl md:text-4xl text-primary"
            : "text-base md:text-lg"
        )}
      >
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {children}
      {href && (
        <motion.div
          className="mt-3 flex items-center gap-1 text-sm font-medium text-primary"
          initial={{ gap: "0.25rem" }}
          whileHover={{ gap: "0.5rem" }}
        >
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </motion.div>
      )}
    </>
  );

  const cardClasses = cn(
    "bg-card rounded-[16px] border border-border p-5 transition-all duration-300 group",
    "shadow-card hover:shadow-card-hover",
    href && "cursor-pointer hover:border-primary/20",
    variant === "feature" && "hover:border-primary/30",
    variant === "stat" && "text-center",
    className
  );

  const motionProps = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, delay },
    whileHover: { y: -3, transition: { duration: 0.2 } },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className={cardClasses} style={style}>
        <Link href={href} className="block h-full">
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...motionProps} className={cardClasses} style={style}>
      {content}
    </motion.div>
  );
}
