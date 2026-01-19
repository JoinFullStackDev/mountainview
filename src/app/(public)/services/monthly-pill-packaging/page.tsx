"use client";

import {
  Calendar,
  Clock,
  Package,
  HeartHandshake,
  CheckCircle,
  Shield,
  Users,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

const helpItems = [
  {
    icon: Users,
    title: "Multiple Medications",
    description:
      "Taking several medications throughout the day can be confusing. We organize them for you.",
  },
  {
    icon: Clock,
    title: "Busy Schedules",
    description:
      "When life gets hectic, pre-sorted packs make it easy to stay on track.",
  },
  {
    icon: HeartHandshake,
    title: "Caregiver Support",
    description:
      "Help loved ones or patients maintain proper medication adherence with clear, labeled packs.",
  },
];

const steps = [
  {
    title: "Consultation",
    description:
      "We review all your medications including prescriptions, over-the-counter drugs, and supplements.",
  },
  {
    title: "Customization",
    description:
      "Your medications are organized by the date and time you need to take them.",
  },
  {
    title: "Preparation",
    description:
      "Each pack is clearly labeled with the day, date, and time for easy identification.",
  },
  {
    title: "Delivery or Pickup",
    description:
      "Receive your monthly supply at the pharmacy or have it delivered to your door.",
  },
  {
    title: "Ongoing Support",
    description:
      "We monitor your medications and coordinate refills so you never run out.",
  },
];

const benefits = [
  {
    icon: CheckCircle,
    title: "Better Adherence",
    description: "Visual confirmation that you've taken your medications.",
  },
  {
    icon: Package,
    title: "Travel-Friendly",
    description: "Easy to pack and take with you anywhere you go.",
  },
  {
    icon: Shield,
    title: "Fewer Errors",
    description: "Pre-sorted packs reduce the risk of missed or double doses.",
  },
  {
    icon: Clock,
    title: "Time Savings",
    description: "No more sorting pills into weekly organizers yourself.",
  },
  {
    icon: HeartHandshake,
    title: "Peace of Mind",
    description: "Know exactly when and what to take every time.",
  },
  {
    icon: Calendar,
    title: "Synchronized Refills",
    description: "All medications are refilled together monthly.",
  },
];

const faqs = [
  {
    question: "How much does pill packaging cost?",
    answer:
      "Our monthly pill packaging service is just $25 per month. This includes all the organization, packaging, labeling, and ongoing support from our pharmacy team.",
  },
  {
    question: "What medications can be included?",
    answer:
      "Most oral medications including prescriptions, over-the-counter drugs, and supplements can be included. Some medications that require special storage or have specific timing requirements may need to be taken separately.",
  },
  {
    question: "Can I still get my medications at different times?",
    answer:
      "Absolutely! The packs are organized by time of day—morning, noon, evening, bedtime—whatever schedule works for you.",
  },
  {
    question: "What if my medications change?",
    answer:
      "We'll update your packs right away when there are changes. Our pharmacists coordinate with your healthcare providers to keep everything current.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No long-term commitment required. You can try the service and cancel anytime if it's not right for you.",
  },
  {
    question: "Can you deliver the pill packs?",
    answer:
      "Yes! We offer free local delivery for your convenience. Just let us know your preferred delivery day.",
  },
];

export default function PillPackaging() {
  return (
    <ServicePageTemplate
      title="Monthly Pill Packaging for $25/month"
      description="Pre-sorted, easy-to-follow packs that help you stay on track and reduce missed doses."
      badge="Pill Packaging"
      helpItems={helpItems}
      helpSectionTitle="Who It's Best For"
      steps={steps}
      stepsSectionTitle="How It Works"
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Simplify Your Medication Routine"
      ctaDescription="Start with a free consultation to see if pill packaging is right for you."
      images={[{ src: "/images/pharmacy-interior-1.jpg", alt: "Pharmacy interior" }]}
      imagesSectionTitle="Visit Our Pharmacy"
      imagesSectionDescription="Stop by to see how our pill packaging system works. Our team is happy to show you a sample pack and answer any questions."
    />
  );
}
