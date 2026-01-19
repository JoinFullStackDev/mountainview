"use client";

import { Clock, FileText, HeartPulse, Sparkles } from "lucide-react";
import { PatientPageTemplate } from "@/components/patients/PatientPageTemplate";
import { TransferForm } from "@/components/patients/TransferForm";
import { Section } from "@/components/shared/Section";

const helpItems = [
  {
    icon: Clock,
    title: "Save Time",
    description:
      "No more waiting in line or calling multiple pharmacies. We handle everything for you.",
  },
  {
    icon: FileText,
    title: "Simpler Paperwork",
    description:
      "We manage all the transfer paperwork directly with your previous pharmacy.",
  },
  {
    icon: HeartPulse,
    title: "Better Care",
    description:
      "Get personalized attention from pharmacists who take time to know you.",
  },
  {
    icon: Sparkles,
    title: "Streamlined Experience",
    description:
      "Consolidate all your prescriptions in one place for easier management.",
  },
];

const steps = [
  {
    title: "Tell Us Your Current Pharmacy",
    description:
      "Share where your prescriptions are currently filled. Just the pharmacy name and location is enough.",
  },
  {
    title: "Share Your Prescription Info",
    description:
      "Provide your basic information. If you have Rx numbers, great! If not, we can look them up.",
  },
  {
    title: "We Coordinate the Transfer",
    description:
      "Our team contacts your previous pharmacy directly and handles all the paperwork.",
  },
  {
    title: "We Notify You When It's Ready",
    description:
      "You'll receive a call or text when your prescriptions are ready for pickup or delivery.",
  },
];

const faqs = [
  {
    question: "How long does the transfer process take?",
    answer:
      "Most transfers are completed within 24-48 hours. For controlled substances or medications requiring prior authorization, it may take 3-5 business days.",
  },
  {
    question: "What information do I need to provide?",
    answer:
      "Just your name, date of birth, contact information, and the name/location of your current pharmacy. Prescription numbers are helpful but not required.",
  },
  {
    question: "Can controlled medications be transferred?",
    answer:
      "Yes, we can transfer most controlled substances. Some may require a new prescription from your doctor depending on state regulations and remaining refills.",
  },
  {
    question: "Will my insurance transfer too?",
    answer:
      "Your insurance information is tied to you, not the pharmacy. We'll verify your coverage and help ensure everything is set up correctly.",
  },
  {
    question: "What if my prescription has no refills left?",
    answer:
      "We'll contact your prescriber to request a new prescription. This is a common situation and we handle it regularly.",
  },
  {
    question: "Can I transfer just some of my prescriptions?",
    answer:
      "Absolutely! You can choose which prescriptions to transfer. Just let us know which ones you want moved.",
  },
];

export default function TransferPrescriptions() {
  return (
    <PatientPageTemplate
      title="Transfer Prescriptions"
      description="Switch to Mountain View Pharmacy in minutes. We handle all the paperwork so you don't have to."
      badge="Easy Transfer"
      helpItems={helpItems}
      steps={steps}
      faqs={faqs}
      ctaTitle="Questions About Transferring?"
      ctaDescription="Our pharmacists are happy to answer any questions about the transfer process."
      ctaPrimaryLabel="Call Us"
      ctaPrimaryHref="tel:+18012953439"
      ctaSecondaryLabel="Contact Form"
      ctaSecondaryHref="/contact"
      beforeSteps={
        <Section variant="default" size="default">
          <div className="max-w-2xl mx-auto">
            <TransferForm />
          </div>
        </Section>
      }
    />
  );
}
