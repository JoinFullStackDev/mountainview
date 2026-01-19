"use client";

import {
  Pill,
  Users,
  Plane,
  Clock,
  CheckCircle,
  Brain,
  ShieldCheck,
  RefreshCw,
  CalendarCheck,
  Package,
} from "lucide-react";
import { PatientPageTemplate } from "@/components/patients/PatientPageTemplate";
import { PricingCallout } from "@/components/patients/PricingCallout";
import { Section } from "@/components/shared/Section";

const helpItems = [
  {
    icon: Pill,
    title: "Multiple Medications",
    description:
      "Taking 5+ medications? Pill packs organize everything by day and time.",
  },
  {
    icon: Users,
    title: "Caregiver Support",
    description:
      "Easily manage medications for parents or loved ones in your care.",
  },
  {
    icon: Plane,
    title: "Frequent Travelers",
    description:
      "Pre-sorted packs make traveling with medications simple and secure.",
  },
  {
    icon: Clock,
    title: "Busy Lifestyles",
    description:
      "No more sorting pills or wondering if you took your morning dose.",
  },
];

const steps = [
  {
    title: "Medication Review & Setup",
    description:
      "Our pharmacist reviews all your medications to ensure everything works together safely.",
  },
  {
    title: "Schedule Alignment",
    description:
      "We sync all your prescriptions to refill at the same time each month.",
  },
  {
    title: "Packs Organized by Day & Time",
    description:
      "Your medications are sorted into easy-tear packets labeled with date and time.",
  },
  {
    title: "Pickup or Delivery",
    description:
      "Get your monthly supply at the pharmacy or have it delivered free.",
  },
  {
    title: "Ongoing Adjustments",
    description:
      "Medication changes? We update your packs immediately at no extra charge.",
  },
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Fewer Missed Doses",
    description:
      "Visual organization helps you stay on track with every dose.",
  },
  {
    icon: Brain,
    title: "Less Confusion",
    description: "No more sorting bottles or wondering what to take when.",
  },
  {
    icon: ShieldCheck,
    title: "Safer Routines",
    description: "Reduce the risk of double-dosing or dangerous interactions.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Refills",
    description:
      "We handle the refill timing so you're never caught without medication.",
  },
  {
    icon: CalendarCheck,
    title: "Monthly Convenience",
    description: "One pickup day, one delivery—everything synchronized.",
  },
  {
    icon: Package,
    title: "Travel Ready",
    description: "Pre-sorted packs are perfect for trips and on-the-go lifestyles.",
  },
];

const faqs = [
  {
    question: "What if my medications change mid-month?",
    answer:
      "No problem! We can adjust your pill packs at any time. Just let us know about the change and we'll prepare updated packs right away—usually the same day.",
  },
  {
    question: "Can vitamins and supplements be included?",
    answer:
      "Absolutely! We can include most vitamins and supplements in your pill packs. This is a great way to simplify your entire daily routine.",
  },
  {
    question: "How do travel packs work?",
    answer:
      "Just let us know your travel dates and we'll prepare a separate set of packs for your trip. Everything stays organized even when you're away from home.",
  },
  {
    question: "How are refills handled?",
    answer:
      "We proactively manage all your refills. You'll receive your next month's packs before you run out, with time to spare.",
  },
  {
    question: "What about medications I only take as needed?",
    answer:
      "PRN (as-needed) medications are typically kept separate from your scheduled packs. We'll discuss the best approach for your specific situation.",
  },
  {
    question: "Is there a commitment or contract?",
    answer:
      "No contracts! You can start or stop the service anytime. We just ask for a few days notice if you decide to stop so we don't prepare packs you won't use.",
  },
];

const pricingFeatures = [
  "All medications organized",
  "Free delivery available",
  "Pharmacist oversight",
  "No contracts",
];

export default function PatientPillPackaging() {
  return (
    <PatientPageTemplate
      title="Pill Packaging"
      description="Simplify your medication routine with customized pill packs organized by dose and time. Never wonder if you took your meds again."
      badge="Adherence Service"
      helpItems={helpItems}
      steps={steps}
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Ready to Simplify Your Medications?"
      ctaDescription="Our pharmacists will set up your personalized pill packaging system."
      ctaPrimaryLabel="Get Started"
      ctaPrimaryHref="/contact"
      ctaSecondaryLabel="Call to Learn More"
      ctaSecondaryHref="tel:+18012953439"
      beforeSteps={
        <Section variant="default" size="default">
          <div className="max-w-3xl mx-auto">
            <PricingCallout
              price="$25"
              period="/month"
              title="Simple Monthly Plan"
              description="All-inclusive pricing with no hidden fees. Includes setup, pharmacist review, and ongoing adjustments."
              features={pricingFeatures}
            />
          </div>
        </Section>
      }
    />
  );
}
