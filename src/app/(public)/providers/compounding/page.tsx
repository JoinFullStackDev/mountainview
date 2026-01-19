"use client";

import { ProviderPageTemplate } from "@/components/providers/ProviderPageTemplate";
import { Section } from "@/components/shared/Section";
import { motion } from "framer-motion";
import {
  Pill,
  Heart,
  Baby,
  Scissors,
  Brain,
  Dog,
  Sparkles,
  Scale,
  Stethoscope,
  Droplets,
  Leaf,
  Activity,
  FlaskConical,
} from "lucide-react";

const specialties = [
  {
    icon: Pill,
    title: "Allergy/Intolerance",
    description: "Gluten, dyes, preservatives, vegan options",
  },
  {
    icon: Stethoscope,
    title: "Gastroenterology",
    description: "Acid reflux, esophagitis, hemorrhoids",
  },
  {
    icon: Activity,
    title: "Podiatry",
    description: "Anti-inflammatory, fungus, neuropathic, pain, plantar fasciitis",
  },
  {
    icon: Scissors,
    title: "Dental",
    description: "Canker sores, dry mouth, magic mouthwash, numbing agents, TMJ",
  },
  {
    icon: Brain,
    title: "Pain Management",
    description:
      "Anti-inflammatory, constipation, muscle relaxant, neuropathic, oral/topical",
  },
  {
    icon: Dog,
    title: "Veterinary",
    description: "Antibiotics, flavored solutions, mood, pain, general health",
  },
  {
    icon: Heart,
    title: "Women's Health",
    description: "Hormones, libido cream, menopausal support, nipple ointment",
  },
  {
    icon: Sparkles,
    title: "Erectile Dysfunction",
    description: "Capsules, suppositories, troches; combination options",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description:
      "Route adjustments, diaper rash, flavored meds, lansoprazole/omeprazole, magic mouthwash, tetracaine lollipops",
  },
  {
    icon: Scale,
    title: "Hormone Replacement",
    description: "Bio-identical hormones; capsules/suppositories/troches",
  },
  {
    icon: Droplets,
    title: "Dermatology",
    description:
      "Acne, dermatitis, eczema, fungus, hair loss, psoriasis, rosacea, scars, vitiligo, warts, wrinkles",
  },
  {
    icon: Leaf,
    title: "Weight Loss Support",
    description: "Appetite/craving support, mood/thyroid support options",
  },
  {
    icon: FlaskConical,
    title: "Thyroid",
    description: "Natural or synthetic thyroid options",
  },
];

const dosageForms = [
  "Creams",
  "Emulsions",
  "Ointments",
  "Gels",
  "Pastes",
  "Capsules",
  "Rapid Dissolve Tablets",
  "Solutions",
  "Suspensions",
  "Syrups",
  "Elixirs",
  "Lozenges/Troches",
  "Lollipops",
  "Sprays",
  "Rinses",
  "Suppositories",
];

const clinicalReasons = [
  {
    title: "Removing allergens or excipients",
    description:
      "Formulate without dyes, gluten, lactose, or other problematic ingredients.",
  },
  {
    title: "Changing dosage form or route",
    description:
      "Improve adherence with alternative delivery methods when standard forms are problematic.",
  },
  {
    title: "Non-standard strengths or titration",
    description:
      "Customize dosing for patient-specific needs not available commercially.",
  },
  {
    title: "Patient-specific combinations",
    description:
      "Combine compatible medications when appropriate for simplified regimens.",
  },
];

const collaborationSteps = [
  {
    title: "Provider identifies patient-specific need",
    description:
      "Determine when a commercially available product does not meet the patient's clinical requirements.",
  },
  {
    title: "Provider writes Rx with clinical rationale if needed",
    description:
      "Include any relevant information about why a compounded formulation is appropriate.",
  },
  {
    title: "Pharmacy confirms formulation details",
    description:
      "We review the prescription and reach out if clarification is needed on formulation or patient context.",
  },
  {
    title: "Compound preparation + dispensing",
    description:
      "Our team prepares the medication and coordinates with the patient for pickup or delivery.",
  },
  {
    title: "Ongoing adjustments as clinically appropriate",
    description:
      "We collaborate with you on refills and any dosing or formulation modifications.",
  },
];

const faqs = [
  {
    question: "What details should be included on a compounded prescription?",
    answer:
      "Include patient name and DOB, medication name(s), strength, dosage form, route, directions, quantity, refills, and any excipient restrictions (e.g., dye-free, gluten-free). Add clinical rationale when the formulation differs from commercially available options.",
  },
  {
    question: "Can you remove dyes, gluten, or other excipients?",
    answer:
      "Yes. We can formulate without common allergens and excipients including dyes, gluten, lactose, and preservatives. Please specify any restrictions on the prescription.",
  },
  {
    question: "What dosage forms do you offer most commonly?",
    answer:
      "We commonly prepare creams, gels, capsules, troches, solutions, suspensions, and suppositories. We can also compound rapid dissolve tablets, lollipops, sprays, and other specialty forms.",
  },
  {
    question: "What is the typical turnaround time?",
    answer:
      "Turnaround time varies based on formulation complexity and ingredient availability. Contact us for specific timing—we prioritize urgent clinical needs when possible.",
  },
  {
    question: "How do you handle patient counseling and follow-up?",
    answer:
      "Our pharmacists provide medication counseling at dispensing and are available for follow-up questions. We coordinate with your office on any clinical concerns or adjustments.",
  },
];

export default function ProviderCompounding() {
  return (
    <ProviderPageTemplate
      title="Compounding Services"
      description="Customized formulations and dosage forms designed around individual patients—built for clarity, consistency, and collaboration."
      helpItems={specialties}
      helpSectionTitle="What We Can Help With"
      helpColumns={4}
      steps={collaborationSteps}
      stepsSectionTitle="How to Collaborate"
      faqs={faqs}
      beforeSteps={
        <>
          {/* Dosage Forms */}
          <Section variant="alt" size="default">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Common Dosage Forms</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We can prepare medications in a variety of forms to meet patient
                needs and preferences.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {dosageForms.map((form, index) => (
                <motion.span
                  key={form}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="inline-flex items-center px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {form}
                </motion.span>
              ))}
            </div>
          </Section>

          {/* When Compounding Is Clinically Helpful */}
          <Section variant="default" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                When Compounding Is Clinically Helpful
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Compounding addresses specific clinical scenarios where
                commercially available products don&apos;t meet patient needs.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {clinicalReasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>
        </>
      }
      ctaTitle="Ready to prescribe?"
      ctaDescription="Our pharmacists are available to discuss formulation options and patient-specific needs."
    />
  );
}
