"use client";

import { ProviderPageTemplate } from "@/components/providers/ProviderPageTemplate";
import { Section } from "@/components/shared/Section";
import { motion } from "framer-motion";
import {
  Shield,
  FileCheck,
  FlaskConical,
  Users,
  CheckCircle,
  BookOpen,
  Building,
  Package,
  Handshake,
  MessageSquare,
  ClipboardCheck,
  HeartHandshake,
} from "lucide-react";

const standards = [
  {
    icon: Shield,
    title: "503A Compounding",
    description: "Patient-specific prescriptions",
  },
  {
    icon: FileCheck,
    title: "USP <795> Compliant",
    description: "Non-sterile compounding standards",
  },
  {
    icon: FlaskConical,
    title: "USP <797> Aligned",
    description: "Sterile compounding practices",
  },
  {
    icon: BookOpen,
    title: "USP <800> Practices",
    description: "Hazardous drug handling",
  },
];

const sourcingPractices = [
  {
    icon: Package,
    title: "Quality-Verified Suppliers",
    description:
      "We source ingredients from reputable, verified suppliers with appropriate documentation.",
  },
  {
    icon: ClipboardCheck,
    title: "Documentation & Batch Records",
    description:
      "Comprehensive records maintained for every compound, supporting traceability and consistency.",
  },
  {
    icon: Users,
    title: "Staff Training & SOPs",
    description:
      "Our compounding team follows established standard operating procedures with ongoing training.",
  },
  {
    icon: Building,
    title: "Facility & Equipment",
    description:
      "Appropriate compounding environment with calibrated equipment and controlled conditions.",
  },
];

const providerExpectations = [
  {
    icon: Handshake,
    title: "Transparency and Collaboration",
    description: "Open communication about formulation options and limitations.",
  },
  {
    icon: MessageSquare,
    title: "Clear Communication",
    description:
      "Prompt responses to questions and proactive updates on prescriptions.",
  },
  {
    icon: CheckCircle,
    title: "Consistency and Documentation",
    description:
      "Reliable processes and thorough record-keeping for every compound.",
  },
  {
    icon: HeartHandshake,
    title: "Patient Counseling",
    description:
      "Our pharmacists provide medication counseling and coordinate with your office as needed.",
  },
];

const faqs = [
  {
    question: "Are compounded medications FDA-approved?",
    answer:
      "Compounded medications are not FDA-approved in the same way as manufactured drugs. They are prepared in response to individual patient prescriptions by licensed pharmacies following recognized compounding standards. The FDA provides regulatory oversight of compounding pharmacies.",
  },
  {
    question: "What standards guide your compounding practice?",
    answer:
      "We align our practices with USP <795> (non-sterile compounding), USP <797> (sterile compounding), and USP <800> (hazardous drug handling) as applicable. These chapters provide recognized standards for quality compounding.",
  },
  {
    question: "How do you approach documentation and traceability?",
    answer:
      "We maintain batch records for all compounds, including ingredient lot numbers, beyond-use dating, and final verification. This supports traceability and quality assurance for every preparation.",
  },
  {
    question: "How do you handle adverse event reporting?",
    answer:
      "Contact our pharmacy directly with any concerns. We have processes for documenting and addressing adverse events, and we coordinate with providers as appropriate.",
  },
  {
    question: "How do you ensure patient-specific accuracy?",
    answer:
      "Each prescription receives pharmacist review, appropriate formulation, and final verification before dispensing. Our processes are designed to ensure the right medication reaches the right patient.",
  },
];

export default function QualityCompliance() {
  return (
    <ProviderPageTemplate
      title="Quality & Compliance"
      description="Patient-specific compounding guided by recognized standards, careful sourcing, and documented processes."
      benefits={providerExpectations}
      benefitsSectionTitle="What Providers Can Expect"
      faqs={faqs}
      beforeSteps={
        <>
          {/* 503A Overview */}
          <Section variant="default" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Compounding Standards</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Our pharmacy follows recognized compounding standards to ensure
                quality and safety in every preparation.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {standards.map((standard, index) => (
                <motion.div
                  key={standard.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <standard.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{standard.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {standard.description}
                  </p>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 max-w-3xl mx-auto"
            >
              <div className="bg-muted/50 border border-border rounded-xl p-6">
                <p className="text-muted-foreground text-center">
                  Compounding is performed in response to valid, patient-specific
                  prescriptions in accordance with 503A regulations. Our practices
                  are aligned with recognized USP compounding chapters.
                </p>
              </div>
            </motion.div>
          </Section>

          {/* Ingredient Sourcing */}
          <Section variant="alt" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Ingredient Sourcing & Safety Culture
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We prioritize compliant, verified sourcing and maintain thorough
                documentation practices.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {sourcingPractices.map((practice, index) => (
                <motion.div
                  key={practice.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 flex gap-4"
                >
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <practice.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {practice.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {practice.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                For specific questions about ingredient sourcing or documentation,
                please contact our pharmacy directly.
              </p>
            </motion.div>
          </Section>

          {/* What Compounding Is / Isn't */}
          <Section variant="default" size="default">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Understanding Compounding
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground">
                      Compounded prescriptions are{" "}
                      <strong>patient-specific</strong> and not the same as
                      mass-manufactured products.
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-foreground">
                      This page is <strong>educational</strong>—providers use
                      clinical judgment regarding patient care decisions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
        </>
      }
      ctaTitle="Want to learn more?"
      ctaDescription="Our pharmacists are available to discuss our quality practices and answer your questions."
    />
  );
}
