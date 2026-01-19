"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface RationaleCalloutProps {
  template: string;
  note?: string;
}

export function RationaleCallout({ template, note }: RationaleCalloutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-3">
            Clinical Rationale Template
          </h3>
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <p className="text-foreground italic">&quot;{template}&quot;</p>
          </div>
          {note && <p className="text-sm text-muted-foreground">{note}</p>}
        </div>
      </div>
    </motion.div>
  );
}
