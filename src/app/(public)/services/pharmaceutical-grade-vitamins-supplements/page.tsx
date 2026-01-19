"use client";

import { motion } from "framer-motion";
import {
  Leaf,
  Moon,
  Heart,
  Pill,
  Fish,
  Apple,
  ShieldCheck,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Section } from "@/components/shared/Section";

const categories = [
  {
    icon: Moon,
    title: "Sleep Support",
    description:
      "Natural sleep aids and melatonin formulations for better rest.",
  },
  {
    icon: Heart,
    title: "Men's & Women's Multivitamins",
    description:
      "Comprehensive daily nutrition tailored by gender and life stage.",
  },
  {
    icon: Apple,
    title: "Probiotics & Prebiotics",
    description: "Support digestive health and immune function.",
  },
  {
    icon: Fish,
    title: "Fish Oils",
    description:
      "High-quality omega-3 fatty acids for heart and brain health.",
  },
  {
    icon: Sparkles,
    title: "Digestive Enzymes",
    description: "Support healthy digestion and nutrient absorption.",
  },
];

const suppliers = [
  { name: "DOSE", description: "Premium pharmaceutical-grade formulations." },
  {
    name: "Orthomolecular",
    description: "Science-based nutritional supplements.",
  },
  { name: "Focus Pharmacology", description: "Targeted health solutions." },
];

const helpItems = [
  {
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "Pharmaceutical-grade supplements with verified purity and potency.",
  },
  {
    icon: Users,
    title: "Pharmacist Guidance",
    description:
      "Get personalized recommendations based on your health goals.",
  },
  {
    icon: Pill,
    title: "Drug Interaction Checks",
    description:
      "We ensure supplements are safe with your current medications.",
  },
];

const steps = [
  {
    title: "Browse Our Selection",
    description:
      "Explore our curated selection of pharmaceutical-grade supplements.",
  },
  {
    title: "Consult with a Pharmacist",
    description:
      "Not sure what you need? Our pharmacists provide personalized recommendations.",
  },
  {
    title: "Get What Works for You",
    description:
      "Take home supplements that align with your health goals and are safe with your medications.",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Pharmaceutical Grade",
    description: "Higher purity and potency standards.",
  },
  {
    icon: CheckCircle,
    title: "Third-Party Tested",
    description: "Verified for quality and safety.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description: "Pharmacist recommendations.",
  },
  {
    icon: Pill,
    title: "Interaction Screening",
    description: "Safe with your medications.",
  },
  {
    icon: Leaf,
    title: "Curated Selection",
    description: "Only brands we trust.",
  },
  {
    icon: Heart,
    title: "Health Focused",
    description: "Targeted solutions for real needs.",
  },
];

const faqs = [
  {
    question: 'What makes supplements "pharmaceutical grade"?',
    answer:
      "Pharmaceutical-grade supplements meet higher purity standards (typically 99%+ pure) and undergo rigorous testing. They're made with higher quality ingredients and manufacturing processes than typical retail supplements.",
  },
  {
    question: "Why buy supplements from a pharmacy?",
    answer:
      "Our pharmacists can check for interactions with your medications, recommend appropriate products for your health goals, and ensure you're getting quality products that contain what they claim.",
  },
  {
    question: "Can supplements interact with my medications?",
    answer:
      "Yes, some supplements can interact with prescription medications. That's why we offer drug interaction checks before you purchase. This is especially important for blood thinners, heart medications, and others.",
  },
  {
    question: "Do you offer consultations?",
    answer:
      "Absolutely! Our pharmacists are happy to discuss your health goals and recommend supplements that may help. Just ask at the counter or call ahead to schedule time.",
  },
  {
    question: "Are these supplements covered by insurance?",
    answer:
      "Most supplements are not covered by insurance. However, some HSA/FSA accounts may cover certain supplements. We can provide receipts for reimbursement purposes.",
  },
  {
    question: "Can you order specific products?",
    answer:
      "Yes! If there's a specific pharmaceutical-grade product you're looking for that we don't carry, we can often special order it for you.",
  },
];

export default function Supplements() {
  return (
    <ServicePageTemplate
      title="Supplements You Can Trust"
      description="A pharmacist-curated selection focused on quality, purity, and efficacy—with guidance to match your goals."
      badge="Supplements"
      helpItems={helpItems}
      helpSectionTitle="Why Choose Our Supplements"
      steps={steps}
      stepsSectionTitle="How It Works"
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Find the Right Supplements"
      ctaDescription="Talk to our pharmacists about your health goals and get personalized recommendations."
      images={[
        { src: "/images/pharmacy-shelves.jpg", alt: "Pharmacy supplement shelves" },
      ]}
      imagesSectionTitle="Curated for Quality"
      imagesSectionDescription="Our supplement selection is carefully chosen by pharmacists who prioritize purity, potency, and proven results."
      additionalSections={
        <>
          {/* Categories */}
          <Section variant="alt" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">What We Carry</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Curated categories to support your wellness journey.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Quality Standards */}
          <Section variant="default" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Quality Standards</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We partner with trusted suppliers who meet our rigorous
                standards.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {suppliers.map((supplier, index) => (
                <motion.div
                  key={supplier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <h3 className="font-bold text-xl text-primary mb-2">
                    {supplier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {supplier.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>
        </>
      }
    />
  );
}
