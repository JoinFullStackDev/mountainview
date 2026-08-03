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
    title: "Confirm Your Address",
    description:
      "Let us know your delivery address so we can get your medications to the right place.",
  },
  {
    title: "We Prepare & Deliver",
    description:
      "Your medications are carefully packaged and shipped to you quickly and securely.",
  },
  {
    title: "Call Us With Any Questions",
    description:
      "Our pharmacy team is always available to help. Call us anytime with questions about your order.",
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
      "We offer free delivery to all states where we are licensed, including Utah, Arizona, Idaho, Wyoming, Nevada, Montana, Ohio, Wisconsin, and more! Call us to see if your state is covered.",
  },
  {
    question: "What carrier do you use for delivery?",
    answer:
      "We use a mix of UPS, FedEx, and PigeonShip to ensure your medications arrive quickly and safely.",
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
    question: "When can I expect my delivery?",
    answer:
      "Most packages will be received within 1-2 business days of your order being placed.",
  },
];

export default function DeliveryClient() {
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
