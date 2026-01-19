"use client";

import {
  ArrowRightLeft,
  Truck,
  ClipboardCheck,
  Syringe,
  RefreshCw,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { Card } from "@/components/shared/Card";
import { CTA } from "@/components/shared/CTA";

const patientServices = [
  {
    icon: <ArrowRightLeft className="h-6 w-6" />,
    title: "Transfer Prescriptions",
    description:
      "Easily transfer your existing prescriptions to Mountain View Pharmacy. We handle all the paperwork.",
    href: "/patients/transfer-prescriptions",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Free Home Delivery",
    description:
      "Get your medications delivered right to your door at no extra cost within our service area.",
    href: "/patients/delivery",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "Pill Packaging",
    description:
      "Simplify your medication routine with customized pill packs organized by dose and time.",
    href: "/patients/pill-packaging",
  },
  {
    icon: <Syringe className="h-6 w-6" />,
    title: "Immunizations",
    description:
      "Walk-in vaccinations for flu, COVID-19, shingles, and more. Administered by licensed pharmacists.",
    href: "/patients/immunizations",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Medication Sync",
    description:
      "Synchronize all your prescriptions to refill on the same day each month for ultimate convenience.",
    href: "/patients/med-sync",
  },
];

export default function Patients() {
  return (
    <>
      <PageHero
        title="Patient Services"
        description="Patient services designed around real life. Explore our range of convenient, personalized pharmacy solutions."
        breadcrumbs={[{ name: "Patients" }]}
        badge="For Patients"
      />

      <Section variant="default" size="default">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patientServices.map((service, index) => (
            <Card
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              href={service.href}
              variant="feature"
              className="animate-fade-in-up"
              style={
                { animationDelay: `${index * 0.1}s` } as React.CSSProperties
              }
            />
          ))}
        </div>
      </Section>

      <Section variant="alt" size="default">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pharmacists-team.jpg"
            alt="Our pharmacists team"
            className="rounded-xl w-full h-80 object-cover"
          />
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold">Why Choose Mountain View?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re not just a pharmacy — we&apos;re your health partner.
              Our team of dedicated pharmacists takes the time to understand
              your needs and provide personalized care that goes beyond filling
              prescriptions.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">60+</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Years of Service
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">5000+</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Patients Served
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">98%</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTA
        title="Ready to Get Started?"
        description="Transfer your prescriptions today and experience the Mountain View difference."
        primaryAction={{
          label: "Transfer Prescription",
          href: "/patients/transfer-prescriptions",
        }}
        secondaryAction={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
