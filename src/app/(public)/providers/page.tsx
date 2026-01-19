"use client";

import Link from "next/link";
import { FlaskConical, FileText, ShieldCheck, Phone, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Card } from "@/components/shared/Card";
import { CTA } from "@/components/shared/CTA";
import { Button } from "@/components/ui/button";

const providerServices = [
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Compounding Services",
    description:
      "Custom formulations including dermatological, hormonal, pediatric, and veterinary compounds.",
    href: "/providers/compounding",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "How to Prescribe",
    description:
      "Everything you need to know about sending prescriptions to our compounding pharmacy.",
    href: "/providers/how-to-prescribe",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Quality & Compliance",
    description:
      "Learn about our accreditations, quality assurance processes, and compliance standards.",
    href: "/providers/quality-compliance",
  },
];

export default function Providers() {
  return (
    <>
      <PageHero
        title="Provider Resources"
        description="Partner with Mountain View Pharmacy for reliable compounding services, quality pharmaceutical care, and dedicated provider support."
        breadcrumbs={[{ name: "Providers" }]}
        badge="For Healthcare Providers"
      />

      <Section variant="default" size="default">
        <div className="grid md:grid-cols-3 gap-6">
          {providerServices.map((service, index) => (
            <Card
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
              variant="feature"
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
            />
          ))}
        </div>
      </Section>

      <Section variant="alt" size="default">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">Your Compounding Partner</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              At Mountain View Pharmacy, we understand that every patient is
              unique. Our state-of-the-art compounding lab allows us to create
              customized medications tailored to your patients&apos; specific needs.
            </p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Dermatological Preparations</span>
                  <p className="text-sm text-muted-foreground">
                    Custom creams, gels, and topical solutions
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Hormone Replacement Therapy</span>
                  <p className="text-sm text-muted-foreground">
                    Bio-identical hormone formulations
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Pediatric Formulations</span>
                  <p className="text-sm text-muted-foreground">
                    Child-friendly flavors and dosage forms
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <span className="font-medium">Veterinary Compounds</span>
                  <p className="text-sm text-muted-foreground">
                    Custom medications for animal patients
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="card-base p-8 text-center">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Phone className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Speak With Our Team</h3>
            <p className="mt-3 text-muted-foreground">
              Have questions about our compounding services? Our pharmacists are
              available to discuss formulations and answer your questions.
            </p>
            <div className="mt-6 space-y-3">
              <Button asChild size="lg" className="w-full">
                <a href="tel:+18012953439">
                  <Phone className="h-4 w-4" />
                  Call 801-295-3439
                </a>
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Toll Free: 1-888-201-6341
              </p>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/contact">Send a Message</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <CTA
        title="Ready to Partner With Us?"
        description="Send a prescription or reach out to discuss how we can support your patients' compounding needs."
        primaryAction={{
          label: "How to Prescribe",
          href: "/providers/how-to-prescribe",
        }}
        secondaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
