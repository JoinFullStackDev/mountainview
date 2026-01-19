"use client";

import {
  Accessibility,
  Users,
  Heart,
  Pill,
  Truck,
  Clock,
  ShieldCheck,
  CalendarCheck,
} from "lucide-react";
import { PatientPageTemplate } from "@/components/patients/PatientPageTemplate";

const helpItems = [
  {
    icon: Accessibility,
    title: "Mobility Challenges",
    description:
      "If getting to the pharmacy is difficult, we'll bring your medications to you.",
  },
  {
    icon: Users,
    title: "Busy Families",
    description:
      "Parents and caregivers with packed schedules benefit from doorstep delivery.",
  },
  {
    icon: Heart,
    title: "Caregivers",
    description:
      "Manage medications for loved ones without extra pharmacy trips.",
  },
  {
    icon: Pill,
    title: "Chronic Conditions",
    description:
      "Regular monthly medications delivered consistently without disruption.",
  },
];

const steps = [
  {
    title: "Confirm Your Location",
    description:
      "We deliver within our service area. Contact us to confirm you're in our delivery zone.",
  },
  {
    title: "Choose Your Delivery Window",
    description:
      "Pick a delivery time that works for your schedule. We offer flexible options.",
  },
  {
    title: "We Prepare & Deliver",
    description:
      "Your medications are carefully packaged and delivered by our trusted team.",
  },
  {
    title: "Ongoing Monthly Deliveries",
    description:
      "Set up recurring deliveries so you never have to think about refills again.",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Completely Free",
    description: "No delivery fees, no minimum orders, no hidden costs.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Choose delivery windows that fit your life, not the other way around.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Medications are carefully handled and temperature-controlled as needed.",
  },
  {
    icon: CalendarCheck,
    title: "Never Miss a Dose",
    description:
      "Reliable delivery means your medications are always there when you need them.",
  },
  {
    icon: Heart,
    title: "Caregiver Support",
    description: "Easily manage deliveries for family members in your care.",
  },
  {
    icon: Users,
    title: "Personal Touch",
    description:
      "Delivery by pharmacy staff who can answer questions on the spot.",
  },
];

const faqs = [
  {
    question: "What areas do you deliver to?",
    answer:
      "We deliver within Bountiful, Centerville, North Salt Lake, Woods Cross, and surrounding Davis County communities. Contact us to confirm your address is in our delivery area.",
  },
  {
    question: "When are deliveries made?",
    answer:
      "We typically deliver Monday through Friday. You can request morning or afternoon delivery windows, and we do our best to accommodate your schedule.",
  },
  {
    question: "Does someone need to be home to receive the delivery?",
    answer:
      "For most medications, we can leave them in a secure location you designate. Controlled substances and certain medications require a signature.",
  },
  {
    question: "Can you deliver medications that need refrigeration?",
    answer:
      "Yes, we use appropriate cold-chain packaging for temperature-sensitive medications to ensure they arrive safely.",
  },
  {
    question: "Do you deliver over-the-counter items and supplements?",
    answer:
      "Yes! We're happy to include OTC medications, vitamins, and other pharmacy items with your delivery.",
  },
  {
    question: "How do I set up recurring deliveries?",
    answer:
      "Just let us know you want automatic monthly deliveries. We'll sync your prescriptions and set up a consistent delivery schedule.",
  },
];

export default function FreeDelivery() {
  return (
    <PatientPageTemplate
      title="Free Delivery"
      description="Get your medications delivered right to your door at no extra cost. It's pharmacy care that comes to you."
      badge="Free Service"
      helpItems={helpItems}
      steps={steps}
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Ready for Doorstep Delivery?"
      ctaDescription="Contact us to set up free delivery for your prescriptions."
      ctaPrimaryLabel="Set Up Delivery"
      ctaPrimaryHref="/contact"
      ctaSecondaryLabel="Call Us"
      ctaSecondaryHref="tel:+18012953439"
    />
  );
}
