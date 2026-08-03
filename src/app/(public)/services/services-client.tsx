"use client";

import {
  FlaskConical,
  ShieldCheck,
  Leaf,
  ArrowRightLeft,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Card } from "@/components/shared/Card";
import { CTA } from "@/components/shared/CTA";

const services = [
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "Sterile Compounding",
    description:
      "Medications prepared in our controlled sterile environment for injections, infusions, and other sterile applications.",
    href: "/services/compounding",
  },
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Non-Sterile Compounding",
    description:
      "Custom-formulated creams, capsules, gels, and other dosage forms tailored to individual patient needs.",
    href: "/services/compounding",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Supplements",
    description:
      "Professional-grade vitamins, minerals, and supplements with pharmacist guidance.",
    href: "/services/pharmaceutical-grade-vitamins-supplements",
  },
  {
    icon: <ArrowRightLeft className="h-6 w-6" />,
    title: "Transfer Your Rx",
    description:
      "Easily transfer your existing prescriptions to Mountain View Pharmacy. We handle all the paperwork.",
    href: "/patients/transfer-prescriptions",
  },
];

export default function ServicesClient() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive pharmacy services designed to improve your health outcomes and simplify your medication management."
        breadcrumbs={[{ name: "Services" }]}
        badge="What We Offer"
      />

      <Section variant="default" size="default">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
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
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold">More Than a Pharmacy</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            At Mountain View Pharmacy, we believe in providing comprehensive
            care that goes beyond simply filling prescriptions. Our services are
            designed to help you achieve better health outcomes through
            personalized attention and innovative solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/compounding-beaker.webp"
            alt="Compounding beaker"
            className="rounded-xl w-full h-64 object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/lab-work.jpg"
            alt="Lab work in progress"
            className="rounded-xl w-full h-64 object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/compounding-scale.webp"
            alt="Precision compounding scale"
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>
      </Section>

      <CTA
        title="Questions About Our Services?"
        description="Our pharmacists are here to help you find the right services for your needs."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{
          label: "Transfer Rx",
          href: "/patients/transfer-prescriptions",
        }}
      />
    </>
  );
}
