"use client";

import { ProviderPageTemplate } from "@/components/providers/ProviderPageTemplate";
import { RationaleCallout } from "@/components/providers/RationaleCallout";
import { Section } from "@/components/shared/Section";
import { motion } from "framer-motion";
import { Check, Phone, FileText, Users, AlertCircle } from "lucide-react";

const checklistItems = [
  "Patient full name + date of birth",
  "Medication name(s) + strength + dosage form + route",
  "Directions for use + quantity + refills",
  "Any excipient restrictions (e.g., dye-free, gluten-free)",
  "Clinical rationale when needed (see template below)",
];

const submissionMethods = [
  {
    icon: FileText,
    title: "Fax",
    description: "Send prescriptions directly to our pharmacy.",
    contact: "801-299-1696",
    href: "tel:801-299-1696",
  },
  {
    icon: Phone,
    title: "Call",
    description: "For questions or complex compounds.",
    contact: "801-295-3439",
    href: "tel:801-295-3439",
  },
  {
    icon: Users,
    title: "Patient Coordination",
    description: "Send via patient request or coordinate with patient directly.",
    contact: "We handle the rest",
    href: null,
  },
];

const prescribingSteps = [
  {
    title: "Identify patient-specific need",
    description:
      "Determine when a commercially available product does not meet the patient's clinical requirements.",
  },
  {
    title: "Specify formulation + dosage form",
    description:
      "Include medication name, strength, and preferred dosage form on the prescription.",
  },
  {
    title: "Add rationale if needed",
    description:
      "When the formulation differs significantly from commercial options, include clinical rationale.",
  },
  {
    title: "Submit Rx",
    description:
      "Fax, call, or have the patient bring the prescription to our pharmacy.",
  },
  {
    title: "Pharmacy confirms details if required",
    description:
      "We'll reach out if we need clarification on formulation specifics or patient context.",
  },
];

const faqs = [
  {
    question: "What if I'm unsure about the dosage form?",
    answer:
      "Our pharmacists are available to discuss formulation options. Call us at 801-295-3439 and we can help determine the best dosage form for your patient's needs and the medication being prescribed.",
  },
  {
    question: "Can you compound for allergies or intolerances?",
    answer:
      "Yes. We can formulate without common allergens and excipients including dyes, gluten, lactose, and preservatives. Simply note the restrictions on the prescription.",
  },
  {
    question: "Do you compound biologics?",
    answer:
      "No. Some medication categories are restricted from compounding due to stability, sterility, or regulatory requirements. Contact us for questions about specific medications.",
  },
  {
    question: "What should I do if the drug is in shortage?",
    answer:
      "Contact our pharmacy—options vary depending on the specific medication, availability of ingredients, and clinical appropriateness of compounding an alternative.",
  },
];

export default function HowToPrescribe() {
  return (
    <ProviderPageTemplate
      title="How to Prescribe"
      description="Clear prescriptions reduce delays. Here's what to include so we can prepare patient-specific compounds efficiently."
      steps={prescribingSteps}
      stepsSectionTitle="Steps to Prescribe"
      faqs={faqs}
      beforeSteps={
        <>
          {/* Quick Checklist */}
          <Section variant="default" size="default">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Prescription Checklist</h2>
                <p className="text-muted-foreground text-lg">
                  Include these elements on every compounded prescription.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-8">
                <ul className="space-y-4">
                  {checklistItems.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Clinical Rationale Template */}
          <Section variant="alt" size="default">
            <div className="max-w-3xl mx-auto">
              <RationaleCallout
                template="This formulation is medically necessary because [e.g., patient requires non-standard strength, needs allergen removal, requires a different dosage form/route, etc.]."
                note="Use your clinical judgment and documentation practices. This page is informational."
              />
            </div>
          </Section>

          {/* Essentially Copy Awareness */}
          <Section variant="default" size="default">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-muted/50 border border-border rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Understanding Compounding Requirements
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Compounded medications are patient-specific and prepared in
                      response to valid prescriptions. When a commercially
                      available equivalent exists, documentation of clinical
                      difference may be appropriate.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      This information is educational. Providers should use their
                      clinical judgment regarding documentation requirements.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>

          {/* Submission Methods */}
          <Section variant="alt" size="default">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">How to Submit</h2>
              <p className="text-muted-foreground text-lg">
                Choose the method that works best for your practice.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {submissionMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <method.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {method.description}
                  </p>
                  {method.href ? (
                    <a
                      href={method.href}
                      className="text-primary font-medium hover:underline"
                    >
                      {method.contact}
                    </a>
                  ) : (
                    <span className="text-primary font-medium">
                      {method.contact}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </Section>
        </>
      }
      ctaTitle="Have questions?"
      ctaDescription="Our pharmacists are here to help with formulation questions and prescription requirements."
    />
  );
}
