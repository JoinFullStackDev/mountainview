"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  className?: string;
  delay?: number;
}

export function Testimonial({
  quote,
  author,
  role,
  rating = 5,
  className,
  delay = 0,
}: TestimonialProps) {
  return (
    <motion.div
      className={cn("card-base relative overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      {/* Quote decoration */}
      <div className="absolute top-4 right-4 text-6xl font-serif text-primary/5 select-none">
        &ldquo;
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.1, type: "spring", stiffness: 500 }}
          >
            <Star
              className={cn(
                "h-5 w-5",
                i < rating ? "fill-warning text-warning" : "text-muted"
              )}
            />
          </motion.div>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg leading-relaxed text-foreground relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <motion.div
          className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <span className="text-sm font-semibold text-primary">
            {author.charAt(0)}
          </span>
        </motion.div>
        <div>
          <p className="font-medium text-foreground">{author}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
        </div>
      </div>
    </motion.div>
  );
}
