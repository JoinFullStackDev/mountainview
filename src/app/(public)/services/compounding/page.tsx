"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Brain,
  Baby,
  Smile,
  Bone,
  Dog,
  Sparkles,
  Scale,
  Leaf,
  Activity,
  Pill,
  TestTube,
  Droplet,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Section } from "@/components/shared/Section";

const specialtyAreas = [
  {
    icon: Heart,
    title: "Allergy & Intolerance",
    description:
      "Formulations without common allergens or problematic inactive ingredients.",
  },
  {
    icon: Activity,
    title: "Gastroenterology",
    description: "Medications for digestive health and GI conditions.",
  },
  {
    icon: Bone,
    title: "Podiatry",
    description: "Topical treatments for foot conditions and pain.",
  },
  {
    icon: Smile,
    title: "Dental",
    description: "Oral rinses, gels, and specialized dental medications.",
  },
  {
    icon: Sparkles,
    title: "Pain Management",
    description: "Customized topical and oral pain relief formulations.",
  },
  {
    icon: Dog,
    title: "Veterinary",
    description: "Pet-friendly flavors and dosage forms for animals.",
  },
  {
    icon: Heart,
    title: "Women's Health",
    description: "Hormone therapies and specialized treatments.",
  },
  {
    icon: Activity,
    title: "ED Treatment",
    description: "Customized erectile dysfunction medications.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Child-friendly flavors and appropriate dosages.",
  },
  {
    icon: Brain,
    title: "HRT",
    description: "Bio-identical hormone replacement therapy.",
  },
  {
    icon: Sparkles,
    title: "Dermatology",
    description: "Custom creams, ointments, and topical solutions.",
  },
  {
    icon: Scale,
    title: "Weight Loss",
    description: "Personalized weight management medications.",
  },
  {
    icon: Leaf,
    title: "Thyroid",
    description: "Customized thyroid hormone formulations.",
  },
];

const dosageForms = [
  "Creams",
  "Emulsions",
  "Lollipops",
  "Ointments",
  "Rapid Dissolve Tablets",
  "Solutions",
  "Suppositories",
  "Syrups",
  "Capsules",
  "Elixirs",
  "Gels",
  "Lozenges/Troches",
  "Pastes",
  "Rinses",
  "Sprays",
  "Suspensions",
];

const helpItems = [
  {
    icon: TestTube,
    title: "Allergen-Free Options",
    description:
      "When commercial medications contain ingredients you're sensitive or allergic to.",
  },
  {
    icon: Pill,
    title: "Custom Dosages",
    description:
      "When you need a strength not commercially available or a specific dose adjustment.",
  },
  {
    icon: Droplet,
    title: "Alternative Forms",
    description:
      "When you have difficulty swallowing pills or need a different delivery method.",
  },
];

const steps = [
  {
    title: "Consult with Your Provider",
    description:
      "Your healthcare provider writes a prescription for a compounded medication tailored to your needs.",
  },
  {
    title: "Pharmacist Review",
    description:
      "Our compounding pharmacist reviews the prescription and contacts you to discuss any questions.",
  },
  {
    title: "Custom Formulation",
    description:
      "We prepare your medication using pharmaceutical-grade ingredients in our specialized lab.",
  },
  {
    title: "Quality Check & Pickup",
    description:
      "Every compound is verified for accuracy and quality before you pick up or we deliver.",
  },
];

const benefits = [
  {
    title: "Personalized Medicine",
    description: "Medications made specifically for your unique needs.",
  },
  {
    title: "Allergen-Free Options",
    description:
      "Avoid dyes, gluten, lactose, and other problematic ingredients.",
  },
  {
    title: "Child-Friendly Flavors",
    description: "Make medications easier for children to take.",
  },
  {
    title: "Pet Medications",
    description: "Flavored formulations pets will actually accept.",
  },
  {
    title: "Discontinued Medications",
    description: "Access medications no longer commercially available.",
  },
  {
    title: "Specialized Delivery",
    description:
      "Topical, transdermal, and other alternative delivery methods.",
  },
];

const faqs = [
  {
    question: "What is compounding?",
    answer:
      "Compounding is the practice of creating personalized medications by combining individual ingredients in the exact strength and dosage form required for a patient's specific needs.",
  },
  {
    question: "Do I need a prescription for compounded medications?",
    answer:
      "Yes, compounded medications require a prescription from a licensed healthcare provider such as a physician, dentist, or veterinarian.",
  },
  {
    question: "How long does it take to prepare a compounded medication?",
    answer:
      "Most compounded medications are ready within 24-48 hours. Complex formulations may take longer. We'll let you know the timeline when you submit your prescription.",
  },
  {
    question: "Is compounding covered by insurance?",
    answer:
      "Coverage varies by insurance plan. We can help you understand your benefits and submit claims. Many patients find compounding cost-effective even when paying out of pocket.",
  },
  {
    question: "Can you compound medications for pets?",
    answer:
      "Yes! We specialize in veterinary compounding with pet-friendly flavors like chicken, beef, tuna, and more to make medicating your pet easier.",
  },
  {
    question: "Are compounded medications safe?",
    answer:
      "Absolutely. Our compounding pharmacy follows strict USP guidelines and uses only pharmaceutical-grade ingredients. Every formulation is checked for accuracy and quality.",
  },
];

export default function Compounding() {
  return (
    <ServicePageTemplate
      title="Personalized Compounding for Real-Life Needs"
      description="From sensitivities and dosage adjustments to specialized delivery forms, we work with you and your provider to create the right formulation."
      badge="Compounding"
      helpItems={helpItems}
      helpSectionTitle="Common Reasons People Choose Compounding"
      steps={steps}
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Need a Custom Medication?"
      ctaDescription="Our compounding specialists are ready to help create the right formulation for you."
      images={[
        { src: "/images/compounding-beaker.webp", alt: "Compounding beaker" },
        { src: "/images/lab-work.jpg", alt: "Lab work in progress" },
        {
          src: "/images/compounding-scale.webp",
          alt: "Precision compounding scale",
        },
      ]}
      imagesSectionTitle="Inside Our Compounding Lab"
      imagesSectionDescription="Every formulation is prepared with precision using pharmaceutical-grade ingredients and state-of-the-art equipment."
      additionalSections={
        <>
          {/* Specialty Areas */}
          <Section variant="alt" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Areas We Can Help</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our compounding expertise spans a wide range of medical
                specialties.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {specialtyAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <area.icon className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{area.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Dosage Forms */}
          <Section variant="default" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Available Dosage Forms</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                We can create your medication in the form that works best for
                you.
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
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium text-sm"
                >
                  {form}
                </motion.span>
              ))}
            </div>
          </Section>
        </>
      }
    />
  );
}
