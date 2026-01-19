"use client";

import {
  FileSearch,
  ClipboardCheck,
  MessageCircle,
  ListChecks,
  Users,
  Shield,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

const helpItems = [
  {
    icon: AlertTriangle,
    title: "Multiple Medications",
    description:
      "Taking 5+ medications? A review helps ensure they work well together.",
  },
  {
    icon: Users,
    title: "Multiple Providers",
    description:
      "When different doctors prescribe your medications, we help coordinate.",
  },
  {
    icon: TrendingUp,
    title: "Optimize Your Regimen",
    description:
      "Find opportunities to simplify, reduce costs, or improve effectiveness.",
  },
];

const expectSteps = [
  {
    title: "Assess All Medications",
    description:
      "We review all your prescriptions, over-the-counter medications, and supplements.",
  },
  {
    title: "Check Interactions & Effectiveness",
    description:
      "We identify potential interactions, duplications, and opportunities for improvement.",
  },
  {
    title: "Provide Recommendations",
    description:
      "You receive actionable recommendations for adjustments, alternatives, or lifestyle changes.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Identify Drug Interactions",
    description: "Catch potentially harmful combinations.",
  },
  {
    icon: ClipboardCheck,
    title: "Eliminate Duplications",
    description: "Stop taking redundant medications.",
  },
  {
    icon: TrendingUp,
    title: "Improve Outcomes",
    description: "Optimize your therapy for better results.",
  },
  {
    icon: MessageCircle,
    title: "Get Your Questions Answered",
    description: "One-on-one time with a pharmacist.",
  },
  {
    icon: ListChecks,
    title: "Simplify Your Regimen",
    description: "Reduce complexity where possible.",
  },
  {
    icon: FileSearch,
    title: "Detailed Report",
    description:
      "Receive written recommendations to share with your doctors.",
  },
];

const faqs = [
  {
    question: "What is a comprehensive medication review?",
    answer:
      "A comprehensive medication review (CMR) is an in-depth evaluation of all your medications by a pharmacist. We look for drug interactions, duplications, side effects, and opportunities to optimize your therapy.",
  },
  {
    question: "How long does the review take?",
    answer:
      "Plan for 30-60 minutes depending on the number of medications you take. We want to be thorough and answer all your questions.",
  },
  {
    question: "Is there a cost?",
    answer:
      "Many Medicare Part D plans cover comprehensive medication reviews at no cost. For others, we offer competitive self-pay rates. Call us to discuss your specific situation.",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring all your medications including prescriptions, over-the-counter drugs, vitamins, and supplements. It's helpful to bring them in their original containers.",
  },
  {
    question: "Will you contact my doctor?",
    answer:
      "With your permission, we can share our recommendations with your healthcare providers. Many patients find this helps facilitate conversations about their medication therapy.",
  },
  {
    question: "How often should I have a medication review?",
    answer:
      "We recommend an annual review, or whenever you have significant changes to your medications, health status, or healthcare providers.",
  },
];

export default function MedReview() {
  return (
    <ServicePageTemplate
      title="A Medication Plan That Works Together"
      description="A pharmacist-led review to help your medications align, reduce risk, and support better outcomes."
      badge="Medication Review"
      helpItems={helpItems}
      helpSectionTitle="Is a Medication Review Right for You?"
      steps={expectSteps}
      stepsSectionTitle="What to Expect"
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Schedule Your Medication Review"
      ctaDescription="Take the first step toward optimizing your medication therapy."
      images={[
        { src: "/images/pharmacists-team.jpg", alt: "Pharmacist consultation" },
      ]}
      imagesSectionTitle="Your Dedicated Pharmacy Team"
      imagesSectionDescription="Our experienced clinical pharmacists take the time to understand your complete medication picture. We work alongside your doctors to ensure your therapy is safe, effective, and tailored to your needs."
    />
  );
}
