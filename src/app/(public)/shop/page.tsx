"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Shop() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-hero-gradient overflow-hidden">
      <div className="absolute inset-0 pattern-grid opacity-30" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="h-24 w-24 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-primary" />
          </div>
        </motion.div>

        <motion.span
          className="badge-primary mb-4 inline-flex items-center gap-1.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Bell className="h-3.5 w-3.5" />
          Coming Soon
        </motion.span>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Online Shop
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          We&apos;re working on bringing you a convenient online shopping
          experience. Soon you&apos;ll be able to order supplements, health
          products, and more directly from Mountain View Pharmacy.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button asChild size="lg">
            <Link href="/contact">Get Notified</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">Explore Our Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
