"use client";

import { motion } from "framer-motion";
import {
  FileCheck,
  Users,
  Package,
  Truck,
  Settings,
  Phone,
  Calendar,
  Shield,
  ClipboardCheck,
} from "lucide-react";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { Section } from "@/components/shared/Section";

const approachItems = [
  {
    icon: FileCheck,
    title: "Direct Billing to Insurance",
    description:
      "We bill your workers' compensation insurance directly—no upfront costs for you.",
  },
  {
    icon: Users,
    title: "Coordination with Providers",
    description:
      "We work directly with your treating physician and claims adjuster to ensure smooth care.",
  },
  {
    icon: ClipboardCheck,
    title: "Detailed Medication Management",
    description:
      "Track your medications, dosages, and refills with our comprehensive management system.",
  },
];

const supportServices = [
  {
    icon: Package,
    title: "Custom Medication Packaging",
    description: "Organize multiple medications for easy adherence.",
  },
  {
    icon: Truck,
    title: "Delivery Services",
    description: "Free local delivery to your home or workplace.",
  },
  {
    icon: Settings,
    title: "Medication Adjustments",
    description: "Quick response when your provider changes your treatment.",
  },
];

const infoNeeded = [
  {
    icon: Calendar,
    title: "Date of Birth",
    description: "Your date of birth for identification.",
  },
  {
    icon: Calendar,
    title: "Date of Injury",
    description: "The date your workplace injury occurred.",
  },
  {
    icon: Shield,
    title: "Insurance Provider Details",
    description: "Your workers' comp insurance information and claim number.",
  },
];

const steps = [
  {
    title: "Contact Us",
    description:
      "Call or visit with your workers' compensation claim information.",
  },
  {
    title: "We Verify Coverage",
    description:
      "We contact your insurance to verify benefits and get authorization.",
  },
  {
    title: "Fill Your Prescriptions",
    description:
      "Your medications are filled and ready—with no out-of-pocket cost to you.",
  },
  {
    title: "Ongoing Support",
    description:
      "We coordinate refills, changes, and communicate with your care team.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "No Upfront Costs",
    description: "We bill workers' comp directly.",
  },
  {
    icon: Phone,
    title: "Claims Assistance",
    description: "We help navigate the process.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Delivered to home or work.",
  },
  {
    icon: Users,
    title: "Care Coordination",
    description: "We communicate with your providers.",
  },
  {
    icon: ClipboardCheck,
    title: "Documentation",
    description: "Detailed records for your claim.",
  },
  {
    icon: Settings,
    title: "Quick Adjustments",
    description: "Fast response to treatment changes.",
  },
];

const faqs = [
  {
    question: "Do I have to pay anything upfront?",
    answer:
      "No. We bill your workers' compensation insurance directly. There's no out-of-pocket cost for authorized medications.",
  },
  {
    question: "What information do you need to get started?",
    answer:
      "We need your date of birth, date of injury, workers' compensation insurance information, and claim number if available.",
  },
  {
    question: "How do you coordinate with my doctor?",
    answer:
      "We work directly with your treating physician to obtain prescriptions, clarify orders, and communicate about your medication needs.",
  },
  {
    question: "Can you deliver my medications?",
    answer:
      "Yes! We offer free local delivery to your home or workplace to make things easier during your recovery.",
  },
  {
    question: "What if my treatment plan changes?",
    answer:
      "We respond quickly to treatment changes. Just have your provider send us the new prescription and we'll have it ready promptly.",
  },
  {
    question: "Do you handle prior authorizations?",
    answer:
      "Yes, we manage prior authorizations and work with your insurance to resolve any coverage issues.",
  },
];

export default function WorkersComp() {
  return (
    <ServicePageTemplate
      title="Workers' Comp Medication, Made Simple"
      description="We handle the medication side with direct billing support, provider coordination, and reliable access while you focus on recovery."
      badge="Workers' Compensation"
      helpItems={approachItems}
      helpSectionTitle="How We Help"
      steps={steps}
      stepsSectionTitle="Getting Started"
      benefits={benefits}
      faqs={faqs}
      ctaTitle="Injured at Work? We Can Help."
      ctaDescription="Contact us with your claim information and we'll take care of the rest."
      images={[
        { src: "/images/pharmacy-interior-1.jpg", alt: "Pharmacy interior" },
      ]}
      imagesSectionTitle="Your Local Workers' Comp Pharmacy"
      imagesSectionDescription="Conveniently located and staffed by pharmacists who understand the workers' compensation process. We're here to make your recovery easier."
      additionalSections={
        <>
          {/* Support Services */}
          <Section variant="alt" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Support Services</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Additional services to support your recovery.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {supportServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-center"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Info Needed */}
          <Section variant="default" size="default">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">
                What We Need to Get Started
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Have this information ready when you contact us.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {infoNeeded.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        </>
      }
    />
  );
}
