"use client";

import {
  Syringe,
  Users,
  Clock,
  ShieldCheck,
  Heart,
  CheckCircle,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";
import { PatientPageTemplate } from "@/components/patients/PatientPageTemplate";
import { Section } from "@/components/shared/Section";

const vaccines = [
  {
    name: "Flu (Influenza)",
    description: "Annual protection against seasonal flu strains",
    available: true,
  },
  {
    name: "Shingles (Shingrix)",
    description: "Two-dose series for adults 50+",
    available: true,
  },
  {
    name: "RSV",
    description: "Protection for adults 60+ and high-risk individuals",
    available: true,
  },
  {
    name: "Pneumonia",
    description: "Protects against pneumococcal disease",
    available: true,
  },
  {
    name: "Tdap",
    description: "Tetanus, diphtheria, and pertussis booster",
    available: true,
  },
  {
    name: "COVID-19",
    description: "Latest recommended boosters",
    available: true,
  },
];

const steps = [
  {
    title: "Check Availability",
    description:
      "Call ahead or walk in to confirm vaccine availability. Most vaccines are in stock.",
  },
  {
    title: "Bring ID & Insurance",
    description:
      "Bring your photo ID and insurance card. Most vaccines are covered with no out-of-pocket cost.",
  },
  {
    title: "Quick Pharmacist Screening",
    description:
      "Our pharmacist reviews your health history to ensure the vaccine is right for you.",
  },
  {
    title: "Get Vaccinated",
    description:
      "Quick, professional administration plus aftercare instructions and documentation.",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Community Protection",
    description:
      "Help protect those around you, especially vulnerable family members.",
  },
  {
    icon: Clock,
    title: "Convenient Access",
    description: "Walk-ins welcome. No need to schedule a separate doctor visit.",
  },
  {
    icon: Stethoscope,
    title: "Professional Care",
    description:
      "Administered by licensed, trained pharmacists in a clean environment.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Effective",
    description: "CDC-recommended vaccines from trusted manufacturers.",
  },
  {
    icon: Heart,
    title: "Family-Friendly",
    description: "Vaccinate the whole family in one convenient visit.",
  },
  {
    icon: CheckCircle,
    title: "Record Keeping",
    description:
      "We maintain records and can provide documentation for work or travel.",
  },
];

const faqs = [
  {
    question: "Do I need an appointment?",
    answer:
      "Walk-ins are welcome for most vaccines! For shingles (Shingrix) and some specialty vaccines, we recommend calling ahead to ensure availability.",
  },
  {
    question: "What ages do you vaccinate?",
    answer:
      "We vaccinate adults and children based on vaccine type and state regulations. Most routine vaccines are available for ages 12+. Contact us for specific age requirements.",
  },
  {
    question: "Is my vaccine covered by insurance?",
    answer:
      "Most vaccines are covered by insurance with no copay under preventive care benefits. We'll verify your coverage before administration.",
  },
  {
    question: "What if I don't have insurance?",
    answer:
      "We offer competitive cash prices for uninsured patients. Some vaccines may also be available through state programs at reduced cost.",
  },
  {
    question: "Can I get multiple vaccines at once?",
    answer:
      "Yes, in most cases multiple vaccines can be administered during the same visit. Our pharmacist will review your needs and make recommendations.",
  },
  {
    question: "Do you provide vaccination records?",
    answer:
      "Absolutely. We provide immediate documentation and can print records for school, work, or travel requirements. Records are also submitted to the state immunization registry.",
  },
];

function VaccineGrid() {
  return (
    <Section variant="default" size="default">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Vaccines We Offer</h2>
        <p className="mt-4 text-muted-foreground">
          Walk-in availability for most vaccines. Call for specialty vaccine
          scheduling.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {vaccines.map((vaccine, index) => (
          <motion.div
            key={vaccine.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Syringe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{vaccine.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {vaccine.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default function PatientImmunizations() {
  return (
    <PatientPageTemplate
      title="Immunizations"
      description="Stay protected with trusted immunizations administered by licensed pharmacists. Walk-ins welcome for most vaccines."
      badge="Preventive Care"
      steps={steps}
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Ready to Get Vaccinated?"
      ctaDescription="Walk in anytime or call to confirm vaccine availability."
      ctaPrimaryLabel="Call to Schedule"
      ctaPrimaryHref="tel:+18012953439"
      ctaSecondaryLabel="Get Directions"
      ctaSecondaryHref="/contact"
      beforeSteps={<VaccineGrid />}
    />
  );
}
