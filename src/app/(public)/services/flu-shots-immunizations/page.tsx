"use client";

import { motion } from "framer-motion";
import {
  Syringe,
  Shield,
  Users,
  Clock,
  Heart,
  Baby,
  Activity,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Section } from "@/components/shared/Section";

const vaccines = [
  {
    icon: Syringe,
    name: "Flu Shots",
    description: "Annual influenza vaccination for all ages.",
  },
  {
    icon: Shield,
    name: "High-Dose Flu Shots",
    description: "Enhanced protection for adults 65 and older.",
  },
  {
    icon: Activity,
    name: "Shingles",
    description: "Protection against shingles (herpes zoster).",
  },
  {
    icon: Heart,
    name: "RSV",
    description: "Respiratory syncytial virus vaccine for at-risk adults.",
  },
  {
    icon: Shield,
    name: "Pneumonia",
    description: "Pneumococcal vaccines for respiratory protection.",
  },
  {
    icon: Baby,
    name: "TDAP",
    description: "Tetanus, diphtheria, and pertussis protection.",
  },
];

const helpItems = [
  {
    icon: Users,
    title: "Protect Your Community",
    description:
      "Vaccination helps prevent the spread of infectious diseases to those around you.",
  },
  {
    icon: Shield,
    title: "Stay Healthy",
    description:
      "Reduce your risk of illness and complications from preventable diseases.",
  },
  {
    icon: Clock,
    title: "Convenient Access",
    description:
      "No appointment needed for most vaccines—walk in during pharmacy hours.",
  },
];

const steps = [
  {
    title: "Walk In or Schedule",
    description:
      "Stop by during pharmacy hours or call ahead to schedule a specific time.",
  },
  {
    title: "Brief Consultation",
    description:
      "Our pharmacist reviews your health history and answers any questions.",
  },
  {
    title: "Quick Administration",
    description:
      "Vaccinations are administered by our licensed pharmacists in just minutes.",
  },
  {
    title: "Documentation",
    description:
      "We provide documentation for your records and can send to your physician.",
  },
];

const benefits = [
  {
    icon: Clock,
    title: "No Appointment Needed",
    description: "Most vaccines available as walk-ins.",
  },
  {
    icon: Syringe,
    title: "Licensed Pharmacists",
    description: "Administered by trained professionals.",
  },
  {
    icon: Shield,
    title: "Insurance Accepted",
    description: "Most insurance plans cover vaccinations.",
  },
  {
    icon: Heart,
    title: "Comfortable Setting",
    description: "Private area for your vaccination.",
  },
  {
    icon: Users,
    title: "Family-Friendly",
    description: "Vaccines available for all ages.",
  },
  {
    icon: Activity,
    title: "Records Management",
    description: "We track and remind you when boosters are due.",
  },
];

const faqs = [
  {
    question: "Do I need an appointment?",
    answer:
      "Most vaccines are available on a walk-in basis during pharmacy hours. For multiple vaccines or large groups, we recommend calling ahead.",
  },
  {
    question: "What should I bring?",
    answer:
      "Please bring your insurance card and photo ID. If you have a vaccination record or know your immunization history, that's helpful too.",
  },
  {
    question: "Is there a cost?",
    answer:
      "Most vaccines are covered by insurance with no out-of-pocket cost. We can verify your coverage before administration.",
  },
  {
    question: "How old do you have to be to get vaccinated here?",
    answer:
      "Age requirements vary by vaccine. Flu shots are typically available for ages 3 and up. Our pharmacists can advise on age requirements for specific vaccines.",
  },
  {
    question: "What are the side effects?",
    answer:
      "Common side effects are mild and include soreness at the injection site, fatigue, and mild fever. Our pharmacist will discuss potential side effects before administration.",
  },
  {
    question: "Can I get multiple vaccines at once?",
    answer:
      "Yes, in most cases multiple vaccines can be given at the same visit. Our pharmacist will review your needs and make recommendations.",
  },
];

export default function Immunizations() {
  return (
    <ServicePageTemplate
      title="Vaccinations Made Easy"
      description="Protect yourself and your loved ones with trusted immunization services—seasonal and routine."
      badge="Immunizations"
      helpItems={helpItems}
      helpSectionTitle="Why Get Vaccinated"
      steps={steps}
      stepsSectionTitle="What to Expect"
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Stay Protected"
      ctaDescription="Walk in for your vaccination or call to schedule a time that works for you."
      images={[{ src: "/images/pharmacists-team.jpg", alt: "Pharmacy team" }]}
      imagesSectionTitle="Meet Our Vaccination Team"
      imagesSectionDescription="Our licensed pharmacists are trained in vaccine administration and make the process quick, comfortable, and convenient."
      additionalSections={
        <Section variant="alt" size="default">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Vaccines We Offer</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay protected with our comprehensive vaccination services.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {vaccines.map((vaccine, index) => (
              <motion.div
                key={vaccine.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <vaccine.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{vaccine.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {vaccine.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>
      }
    />
  );
}
