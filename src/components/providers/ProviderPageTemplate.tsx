"use client";

import { ReactNode } from "react";
import { LucideIcon, Check, Phone, FileText, Mail } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { FAQ } from "@/components/shared/FAQ";
import { CTA } from "@/components/shared/CTA";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HelpItem {
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface Step {
  number?: number;
  title: string;
  description: string;
}

interface Benefit {
  icon?: LucideIcon;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ProviderPageTemplateProps {
  // Hero
  title: string;
  description: string;
  badge?: string;

  // What this helps with
  helpItems?: HelpItem[];
  helpSectionTitle?: string;
  helpColumns?: 2 | 3 | 4;

  // How it works
  steps?: Step[];
  stepsSectionTitle?: string;

  // Benefits
  benefits?: Benefit[];
  benefitsSectionTitle?: string;

  // Additional content sections
  additionalSections?: ReactNode;

  // Content to show before the steps section
  beforeSteps?: ReactNode;

  // FAQs
  faqs?: FAQItem[];

  // CTA overrides
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;

  // Show contact methods at bottom
  showContactMethods?: boolean;
}

export function ProviderPageTemplate({
  title,
  description,
  badge = "For Healthcare Providers",
  helpItems,
  helpSectionTitle = "What We Can Help With",
  helpColumns = 3,
  steps,
  stepsSectionTitle = "How to Collaborate",
  benefits,
  benefitsSectionTitle = "What Providers Can Expect",
  additionalSections,
  beforeSteps,
  faqs,
  ctaTitle = "Ready to collaborate?",
  ctaDescription = "Our pharmacists are available to discuss patient-specific compounding needs.",
  ctaPrimaryLabel = "Call 801-295-3439",
  ctaPrimaryHref = "tel:801-295-3439",
  ctaSecondaryLabel = "Contact Us",
  ctaSecondaryHref = "/contact",
  showContactMethods = true,
}: ProviderPageTemplateProps) {
  const columnClasses = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <>
      <PageHero
        title={title}
        description={description}
        badge={badge}
        breadcrumbs={[{ name: "Providers", href: "/providers" }, { name: title }]}
      />

      {/* What This Helps With */}
      {helpItems && helpItems.length > 0 && (
        <Section variant="default" size="default">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{helpSectionTitle}</h2>
          </div>
          <div className={`grid ${columnClasses[helpColumns]} gap-6`}>
            {helpItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {item.icon && (
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Before Steps Content */}
      {beforeSteps}

      {/* How It Works */}
      {steps && steps.length > 0 && (
        <Section variant="alt" size="default">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{stepsSectionTitle}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="flex gap-6"
                  >
                    <div className="relative z-10 flex-shrink-0 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {step.number ?? index + 1}
                    </div>
                    <div className="flex-1 bg-card border border-border rounded-xl p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <Section variant="default" size="default">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{benefitsSectionTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {benefit.icon ? (
                    <benefit.icon className="h-5 w-5 text-primary" />
                  ) : (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {/* Additional Sections */}
      {additionalSections}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <Section variant="alt" size="default">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <FAQ items={faqs} />
          </div>
        </Section>
      )}

      {/* Contact Methods */}
      {showContactMethods && (
        <Section variant="default" size="default">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground text-lg">
                Our pharmacists are available to discuss formulation options and
                patient-specific needs.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <motion.a
                href="tel:801-295-3439"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Call</h3>
                <p className="text-primary font-medium">801-295-3439</p>
              </motion.a>

              <motion.a
                href="tel:801-299-1696"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">Fax</h3>
                <p className="text-primary font-medium">801-299-1696</p>
              </motion.a>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <Button asChild size="sm">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTA
        title={ctaTitle}
        description={ctaDescription}
        primaryAction={{ label: ctaPrimaryLabel, href: ctaPrimaryHref }}
        secondaryAction={{ label: ctaSecondaryLabel, href: ctaSecondaryHref }}
      />

      <TrustStrip />
    </>
  );
}
