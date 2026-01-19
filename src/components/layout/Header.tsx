"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ChevronDown, Phone, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Simplified navigation - only 4 top-level items
const navigation = [
  {
    name: 'Services',
    href: '/services',
    megaMenu: true,
    children: [
      // Left column - Services
      { name: 'Compounding', href: '/services/compounding', column: 'left' },
      { name: 'Pill Packaging', href: '/services/monthly-pill-packaging', column: 'left' },
      { name: 'Medication Sync', href: '/services/medication-synchronization', column: 'left' },
      { name: 'Immunizations', href: '/services/flu-shots-immunizations', column: 'left' },
      { name: 'Medication Review', href: '/services/comprehensive-medication-review', column: 'left' },
      { name: "Workers' Comp", href: '/services/workers-compensation', column: 'left' },
      { name: 'Supplements', href: '/services/pharmaceutical-grade-vitamins-supplements', column: 'left' },
    ],
  },
  {
    name: 'Patients',
    href: '/patients',
    children: [
      { name: 'Transfer Prescriptions', href: '/patients/transfer-prescriptions' },
      { name: 'Free Delivery', href: '/patients/delivery' },
      { name: 'Pill Packaging', href: '/patients/pill-packaging' },
      { name: 'Immunizations', href: '/patients/immunizations' },
      { name: 'Medication Sync', href: '/patients/med-sync' },
    ],
  },
  {
    name: 'Providers',
    href: '/providers',
    children: [
      { name: 'Compounding Services', href: '/providers/compounding' },
      { name: 'How to Prescribe', href: '/providers/how-to-prescribe' },
      { name: 'Quality & Compliance', href: '/providers/quality-compliance' },
    ],
  },
  {
    name: 'Resources',
    href: '/about',
    children: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Medical Kits', href: '/medical-kits' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    name: 'Shop',
    href: '/shop',
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  // Auth state detection
  useEffect(() => {
    const supabase = createClient();
    
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setAuthLoading(false);
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Determine which accordion items should be open by default based on current route
  const getDefaultOpenItems = () => {
    const openItems: string[] = [];
    navigation.forEach((item) => {
      if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => pathname === child.href
        );
        if (hasActiveChild || isActive(item.href)) {
          openItems.push(item.name);
        }
      }
    });
    return openItems;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/98 backdrop-blur-sm">
      <nav className="container-wide flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/logo.svg" 
            alt="Mountain View Pharmacy" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-0.5">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
                {item.children && (
                  <motion.div
                    animate={{ rotate: openDropdown === item.name ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                )}
              </Link>

              {/* Mega Menu for Services */}
              <AnimatePresence>
                {item.megaMenu && item.children && openDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full pt-2"
                  >
                    <div className="w-[420px] rounded-xl border border-border bg-card p-4 shadow-lg grid grid-cols-2 gap-4">
                      {/* Left column - Services */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Services</p>
                        <div className="space-y-0.5">
                          {item.children.filter(c => c.column === 'left').map((child, index) => (
                            <motion.div
                              key={child.name}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03 }}
                            >
                              <Link
                                href={child.href}
                                className={cn(
                                  "block rounded-md px-2.5 py-2 text-sm transition-colors",
                                  pathname === child.href
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-foreground hover:bg-muted"
                                )}
                              >
                                {child.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      {/* Right column - Quick Actions */}
                      <div className="border-l border-border pl-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Quick Actions</p>
                        <div className="space-y-2">
                          <Link
                            href="/patients/transfer-prescriptions"
                            className="block rounded-lg bg-primary text-primary-foreground px-3 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
                          >
                            Transfer Rx →
                          </Link>
                          <Link
                            href="/contact"
                            className="block rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                          >
                            Speak with Pharmacist
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Regular Dropdown */}
              <AnimatePresence>
                {!item.megaMenu && item.children && openDropdown === item.name && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full pt-2"
                  >
                    <div className="w-52 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                      {item.children.map((child, index) => (
                        <motion.div
                          key={child.name}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <Link
                            href={child.href}
                            className={cn(
                              "block rounded-md px-2.5 py-2 text-sm transition-colors",
                              pathname === child.href
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-foreground hover:bg-muted"
                            )}
                          >
                            {child.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <a 
            href="tel:+18012953439" 
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">801-295-3439</span>
          </a>
          {authLoading ? (
            <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
          ) : user ? (
            <Button asChild size="sm" variant="outline">
              <Link href="/admin/dashboard">
                <UserIcon className="h-4 w-4 mr-1.5" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link href="/patients/transfer-prescriptions">Transfer Rx</Link>
            </Button>
          )}
        </div>

        {/* Mobile menu button */}
        <motion.button
          type="button"
          className="lg:hidden rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          whileTap={{ scale: 0.95 }}
        >
          <span className="sr-only">Open menu</span>
          <Menu className="h-5 w-5" />
        </motion.button>
      </nav>

      {/* Mobile Slide-in Navigation */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-[300px] sm:w-[340px] p-0 flex flex-col">
          {/* Header */}
          <SheetHeader className="p-4 pb-2 border-b border-border">
            <SheetTitle className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Mountain View Pharmacy" className="h-7 w-auto" />
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable Navigation Content */}
          <div className="flex-1 overflow-y-auto py-2">
            <Accordion
              type="multiple"
              defaultValue={getDefaultOpenItems()}
              className="w-full"
            >
              {navigation.map((item) =>
                item.children ? (
                  <AccordionItem
                    key={item.name}
                    value={item.name}
                    className="border-b-0"
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex-1 px-4 py-3 text-sm font-medium transition-colors",
                          isActive(item.href)
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {item.name}
                      </Link>
                      <AccordionTrigger className="px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                        <span className="sr-only">Toggle {item.name}</span>
                      </AccordionTrigger>
                    </div>
                    <AccordionContent className="pb-2">
                      <div className="ml-4 border-l-2 border-border pl-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "block py-2 text-sm transition-colors",
                              pathname === child.href
                                ? "text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div key={item.name} className="border-b-0">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-sm font-medium transition-colors",
                        isActive(item.href)
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  </div>
                )
              )}
            </Accordion>

          </div>

          {/* Footer with CTA */}
          <div className="p-4 border-t border-border bg-muted/30 space-y-3">
            <a
              href="tel:+18012953439"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>801-295-3439</span>
            </a>
            {user ? (
              <Button asChild className="w-full" size="default" variant="outline">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <UserIcon className="h-4 w-4 mr-1.5" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <Button asChild className="w-full" size="default">
                <Link
                  href="/patients/transfer-prescriptions"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Transfer Prescription
                </Link>
              </Button>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
