"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, LucideIcon } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { FAQ } from "@/components/shared/FAQ";
import { CTA } from "@/components/shared/CTA";
import { TrustStrip } from "@/components/shared/TrustStrip";
import { cn } from "@/lib/utils";

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

interface ServicePageTemplateProps {
  // Hero
  title: string;
  description: string;
  badge?: string;

  // What this helps with
  helpItems?: HelpItem[];
  helpSectionTitle?: string;

  // How it works
  steps?: Step[];
  stepsSectionTitle?: string;

  // Benefits
  benefits?: Benefit[];
  benefitsSectionTitle?: string;

  // Additional content sections
  additionalSections?: ReactNode;

  // FAQs
  faqs?: FAQItem[];

  // CTA
  ctaTitle?: string;
  ctaDescription?: string;

  // Images
  images?: { src: string; alt: string; caption?: string }[];
  imagesSectionTitle?: string;
  imagesSectionDescription?: string;
}

export function ServicePageTemplate({
  title,
  description,
  badge,
  helpItems,
  helpSectionTitle = "What This Helps With",
  steps,
  stepsSectionTitle = "How It Works",
  benefits,
  benefitsSectionTitle = "Benefits",
  additionalSections,
  faqs,
  ctaTitle = "Ready to Get Started?",
  ctaDescription = "Our pharmacists are here to help you with any questions.",
  images,
  imagesSectionTitle,
  imagesSectionDescription,
}: ServicePageTemplateProps) {
  return (
    <>
      <PageHero
        title={title}
        description={description}
        badge={badge}
        breadcrumbs={[{ name: "Services", href: "/services" }, { name: title }]}
      />

      {/* What This Helps With */}
      {helpItems && helpItems.length > 0 && (
        <Section variant="default" size="default">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">{helpSectionTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {item.icon && (
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Images Section */}
      {images && images.length > 0 && (
        <Section variant="alt" size="default">
          <div
            className={cn(
              "grid gap-8 lg:gap-12 items-center",
              images.length === 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
            )}
          >
            {/* Single image: Split layout with text */}
            {images.length === 1 && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  {imagesSectionTitle && (
                    <h2 className="text-3xl font-bold">{imagesSectionTitle}</h2>
                  )}
                  {imagesSectionDescription && (
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {imagesSectionDescription}
                    </p>
                  )}
                  {images[0].caption && (
                    <p className="text-sm text-muted-foreground italic border-l-2 border-primary pl-4">
                      {images[0].caption}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="rounded-2xl w-full aspect-[4/3] object-cover shadow-xl"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
                </motion.div>
              </>
            )}

            {/* Multiple images: Asymmetric gallery */}
            {images.length >= 2 && (
              <div className="space-y-8">
                {(imagesSectionTitle || imagesSectionDescription) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto"
                  >
                    {imagesSectionTitle && (
                      <h2 className="text-3xl font-bold mb-4">
                        {imagesSectionTitle}
                      </h2>
                    )}
                    {imagesSectionDescription && (
                      <p className="text-lg text-muted-foreground">
                        {imagesSectionDescription}
                      </p>
                    )}
                  </motion.div>
                )}
                <div
                  className={cn(
                    "grid gap-4",
                    images.length === 2 && "md:grid-cols-2",
                    images.length >= 3 && "md:grid-cols-12"
                  )}
                >
                  {images.map((image, index) => (
                    <motion.div
                      key={image.alt}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "relative group overflow-hidden rounded-2xl",
                        images.length >= 3 &&
                          index === 0 &&
                          "md:col-span-7 md:row-span-2",
                        images.length >= 3 && index > 0 && "md:col-span-5"
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt}
                        className={cn(
                          "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                          images.length === 2
                            ? "aspect-[4/3]"
                            : index === 0
                            ? "aspect-[4/3] md:aspect-auto md:h-full"
                            : "aspect-[4/3]"
                        )}
                      />
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
                      {image.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-white text-sm">{image.caption}</p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <Section variant="default" size="default">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            <FAQ items={faqs} />
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTA
        title={ctaTitle}
        description={ctaDescription}
        primaryAction={{ label: "Consult a Pharmacist", href: "/contact" }}
        secondaryAction={{
          label: "Transfer Your Prescriptions",
          href: "/patients",
        }}
      />

      <TrustStrip />
    </>
  );
}
