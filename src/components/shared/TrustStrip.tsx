"use client";

import { motion } from "framer-motion";
import { Building, Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustStripProps {
  className?: string;
}

const trustItems = [
  {
    icon: Building,
    text: "Locally owned since 1961",
  },
  {
    icon: Users,
    text: "Pharmacist-led care",
  },
  {
    icon: ShieldCheck,
    text: "Privacy-first",
  },
];

export function TrustStrip({ className }: TrustStripProps) {
  return (
    <section className={cn("bg-muted/50 border-t border-border py-8", className)}>
      <div className="container-wide">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
