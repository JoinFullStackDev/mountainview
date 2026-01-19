"use client";

import {
  FlaskConical,
  ClipboardCheck,
  RefreshCw,
  Syringe,
  FileSearch,
  Briefcase,
  Leaf,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Card } from "@/components/shared/Card";
import { CTA } from "@/components/shared/CTA";

const services = [
  {
    icon: <FlaskConical className="h-6 w-6" />,
    title: "Compounding",
    description:
      "Custom-formulated medications tailored to individual patient needs when commercial options are unsuitable.",
    href: "/services/compounding",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Monthly Pill Packaging",
    description:
      "Medications organized into convenient daily packs sorted by time of day for easy adherence.",
    href: "/services/monthly-pill-packaging",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Medication Synchronization",
    description:
      "Synchronize all your prescriptions to refill on the same day each month.",
    href: "/services/medication-synchronization",
  },
  {
    icon: <Syringe className="h-6 w-6" />,
    title: "Flu Shots & Immunizations",
    description:
      "Walk-in vaccinations administered by licensed pharmacists for adults and children.",
    href: "/services/flu-shots-immunizations",
  },
  {
    icon: <FileSearch className="h-6 w-6" />,
    title: "Comprehensive Medication Review",
    description:
      "Comprehensive medication therapy management to optimize your drug regimen.",
    href: "/services/comprehensive-medication-review",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Workers' Compensation",
    description:
      "Specialized pharmacy services for workplace injury prescriptions and claims.",
    href: "/services/workers-compensation",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Vitamins & Supplements",
    description:
      "Professional-grade vitamins, minerals, and supplements with pharmacist guidance.",
    href: "/services/pharmaceutical-grade-vitamins-supplements",
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive pharmacy services designed to improve your health outcomes and simplify your medication management."
        breadcrumbs={[{ name: "Services" }]}
        badge="What We Offer"
      />

      <Section variant="default" size="default">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
