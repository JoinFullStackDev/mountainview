"use client";

import {
  Calendar,
  Clock,
  RefreshCw,
  CheckCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

const helpItems = [
  {
    icon: Calendar,
    title: "Save Time with Fewer Trips",
    description:
      "Pick up all your prescriptions on one convenient day instead of multiple trips throughout the month.",
  },
  {
    icon: CheckCircle,
    title: "Everything Prepared and Ready",
    description:
      "Your medications are reviewed, prepared, and waiting for you—no more waiting at the pharmacy.",
  },
  {
    icon: Clock,
    title: "Built Around Your Schedule",
    description:
      "Choose the pickup day that works best for you and we'll coordinate everything to be ready.",
  },
];

const steps = [
  {
    title: "Enroll in Med Sync",
    description:
      "Sign up by talking to our pharmacy team. We'll review your current medications and prescriptions.",
  },
  {
    title: "Align Your Refill Dates",
    description:
      "We work with your insurance and providers to synchronize all your prescriptions to the same fill date.",
  },
  {
    title: "Monthly Ready-to-Go Pickup",
    description:
      "Each month, all your medications are ready on your chosen day. Just pick them up or request delivery.",
  },
  {
    title: "Ongoing Adjustments",
    description:
      "When medications change, we adjust your sync schedule automatically and coordinate with your providers.",
  },
];

const benefits = [
  {
    icon: Calendar,
    title: "One Pickup Day",
    description: "All your prescriptions ready on the same day each month.",
  },
  {
    icon: Clock,
    title: "Less Waiting",
    description: "Everything is prepared in advance—just pick up and go.",
  },
  {
    icon: RefreshCw,
    title: "Never Run Out",
    description: "Proactive refill management means no gaps in therapy.",
  },
  {
    icon: TrendingUp,
    title: "Better Health Outcomes",
    description: "Studies show synchronized refills improve adherence.",
  },
  {
    icon: Sparkles,
    title: "Simplified Life",
    description: "One less thing to worry about each month.",
  },
  {
    icon: CheckCircle,
    title: "Pharmacist Oversight",
    description: "Regular medication reviews catch potential issues.",
  },
];

const faqs = [
  {
    question: "What is medication synchronization?",
    answer:
      "Medication synchronization (med sync) aligns all your prescription refills to the same day each month. Instead of making multiple trips to the pharmacy, you pick up everything at once.",
  },
  {
    question: "Is there a cost for med sync?",
    answer:
      "No, medication synchronization is a free service we offer to help you better manage your medications.",
  },
  {
    question: "How do you handle different refill quantities?",
    answer:
      'We work with your insurance to adjust fill quantities so everything lines up. This is called "short-filling" and is covered by most insurance plans.',
  },
  {
    question: "What if I get a new prescription?",
    answer:
      "New prescriptions are added to your sync schedule. We'll adjust the quantities to align with your existing pickup date.",
  },
  {
    question: "Can I choose my pickup day?",
    answer:
      "Yes! You choose the day of the month that works best for your schedule. We recommend choosing a day shortly after any fixed monthly income.",
  },
  {
    question: "What if I forget to pick up?",
    answer:
      "We'll remind you before your pickup day. If you forget, we hold your medications and reach out to make sure you get them.",
  },
];

export default function MedSync() {
  return (
    <ServicePageTemplate
      title="One Pickup Day. All Your Prescriptions."
      description="Medication synchronization makes refills easier by aligning your prescriptions to a single monthly pickup."
      badge="Medication Sync"
      helpItems={helpItems}
      helpSectionTitle="Why It Matters"
      steps={steps}
      stepsSectionTitle="How It Works"
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Ready to Simplify Your Refills?"
      ctaDescription="Enroll in medication synchronization today—it's free and takes just a few minutes to set up."
      images={[{ src: "/images/pharmacy-interior-1.jpg", alt: "Pharmacy interior" }]}
      imagesSectionTitle="Your Neighborhood Pharmacy"
      imagesSectionDescription="Medication synchronization is just one of the ways we make managing your health easier. Stop by or give us a call to get started."
    />
  );
}
