"use client";

import {
  Calendar,
  Clock,
  RefreshCw,
  Truck,
  CheckCircle,
  Bell,
  Pill,
  CalendarCheck,
} from "lucide-react";
import { PatientPageTemplate } from "@/components/patients/PatientPageTemplate";

const helpItems = [
  {
    icon: Calendar,
    title: "Fewer Pharmacy Trips",
    description:
      "Instead of multiple trips each month, pick up everything on one convenient day.",
  },
  {
    icon: Clock,
    title: "No More Gaps",
    description:
      "Synchronized refills mean you never run out of important medications.",
  },
  {
    icon: RefreshCw,
    title: "Busy Schedules",
    description:
      "One predictable pickup day is easier to plan around than scattered refills.",
  },
  {
    icon: Truck,
    title: "Easier Delivery",
    description:
      "Combine with free delivery for a single monthly delivery of all your meds.",
  },
];

const steps = [
  {
    title: "Enroll in Med Sync",
    description:
      "Tell us you'd like to synchronize your medications. We'll review your current prescriptions.",
  },
  {
    title: "We Align Your Refill Dates",
    description:
      "Our team works with your doctors and insurance to align all your refills to the same day.",
  },
  {
    title: "One Monthly Pickup or Delivery",
    description:
      "All your medications are ready on your sync date. Pick up at the pharmacy or get free delivery.",
  },
  {
    title: "Ongoing Maintenance",
    description:
      "We proactively manage refills and contact prescribers for renewals before you run low.",
  },
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Total Convenience",
    description: "One trip, one day, all your medications—every single month.",
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "Stop making multiple pharmacy trips. Reclaim hours each month.",
  },
  {
    icon: Bell,
    title: "Proactive Reminders",
    description:
      "We'll remind you before your sync date so you're always prepared.",
  },
  {
    icon: Pill,
    title: "Never Run Out",
    description: "Aligned refills eliminate gaps between prescriptions.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Management",
    description: "We handle the refill timing and prescriber communications.",
  },
  {
    icon: CalendarCheck,
    title: "Predictable Schedule",
    description: "Know exactly when your medications will be ready each month.",
  },
];

const faqs = [
  {
    question: "What is medication synchronization?",
    answer:
      "Med sync aligns all your prescription refills to the same day each month. Instead of picking up different medications throughout the month, everything is ready on one convenient day.",
  },
  {
    question: "How do you align medications with different day supplies?",
    answer:
      'We may provide a short "partial fill" to get everything on the same schedule. For example, if one medication has 10 days left and another has 20, we\'ll bridge the gap so they sync up.',
  },
  {
    question: "Can controlled substances be synchronized?",
    answer:
      "In most cases, yes. We work within state and federal regulations to include controlled medications in your sync schedule when possible.",
  },
  {
    question: "How does this work with my insurance?",
    answer:
      "Insurance companies generally support med sync because it improves adherence. We handle the coordination with your insurance for partial fills and timing adjustments.",
  },
  {
    question: "What if I need a medication before my sync date?",
    answer:
      "No problem! If you need something urgently or have a new prescription, we can fill it anytime. We'll then work it into your next sync cycle.",
  },
  {
    question: "Is there a cost for the med sync program?",
    answer:
      "There's no extra charge for medication synchronization. It's a free service we offer to help you manage your medications more easily.",
  },
  {
    question: "What if my doctor changes my medications?",
    answer:
      "We adjust your sync schedule automatically when prescriptions change. Just let us know about any updates and we'll incorporate them seamlessly.",
  },
];

export default function MedicationSync() {
  return (
    <PatientPageTemplate
      title="Medication Sync"
      description="One refill day. All your medications. Every month. Simplify your pharmacy routine with medication synchronization."
      badge="Free Service"
      helpItems={helpItems}
      steps={steps}
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Ready for One Refill Day?"
      ctaDescription="Enroll in med sync and simplify your monthly medication routine."
      ctaPrimaryLabel="Enroll Now"
      ctaPrimaryHref="/contact"
      ctaSecondaryLabel="Learn More"
      ctaSecondaryHref="tel:+18012953439"
    />
  );
}
