"use client";

import { useState } from "react";
import { Briefcase, CheckCircle, Plus } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { FAQ } from "@/components/shared/FAQ";
import { FeatureList } from "@/components/shared/FeatureList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const kitContents = [
  "Emergency medications and supplies",
  "Wound care materials and dressings",
  "First aid essentials",
  "Prescription medications (as prescribed)",
  "Detailed medication instructions",
  "Temperature-sensitive packaging when needed",
];

const addOns = [
  "Additional first aid supplies",
  "Travel-sized medications",
  "Custom medication packaging",
  "Sharps disposal container",
  "Emergency contact cards",
];

const whoItsFor = [
  {
    title: "Travelers",
    description: "Stay prepared while traveling domestically or internationally",
  },
  {
    title: "Remote Workers",
    description: "Essential supplies for those in isolated work locations",
  },
  {
    title: "Families",
    description: "Keep your household prepared for emergencies",
  },
  {
    title: "Businesses",
    description: "Workplace medical kits tailored to your needs",
  },
];

const faqItems = [
  {
    question: "What's included in a standard medical kit?",
    answer:
      "Our standard medical kits include essential first aid supplies, emergency medications, wound care materials, and detailed instructions. Contents can be customized based on your specific needs and any prescribed medications.",
  },
  {
    question: "Can the kit be customized for specific conditions?",
    answer:
      "Absolutely! We work with you and your healthcare provider to include medications and supplies specific to your health conditions, travel destinations, or workplace requirements.",
  },
  {
    question: "How often should the kit be refilled?",
    answer:
      "We recommend reviewing your kit annually or after any use. We offer convenient refill services and will notify you when items are approaching expiration.",
  },
  {
    question: "Are prescription medications included?",
    answer:
      "Yes, with a valid prescription from your healthcare provider, we can include prescription medications in your medical kit. Our pharmacists will ensure proper packaging and storage instructions.",
  },
];

export default function MedicalKits() {
  const [formState, setFormState] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newErrors: Record<string, string> = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const needs = formData.get("needs") as string;

    if (!name || name.trim().length < 2) {
      newErrors.name = "Please enter your name";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!needs || needs.trim().length < 10) {
      newErrors.needs = "Please describe your needs (at least 10 characters)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setFormState("success");
  };

  return (
    <>
      <PageHero
        title="Medical Kits"
        description="Customized medical kits prepared by pharmacists to keep you prepared for emergencies, travel, and everyday needs."
        breadcrumbs={[{ name: "Medical Kits" }]}
        badge="Custom Solutions"
      />

      {/* What It Is */}
      <Section variant="default" size="default">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold">Be Prepared for Anything</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our pharmacist-prepared medical kits provide you with essential
              medications and supplies, customized to your health needs and
              lifestyle. Whether you&apos;re traveling, working remotely, or
              simply want to be prepared at home, we&apos;ll create a kit that
              gives you peace of mind.
            </p>
            <p className="mt-4 text-muted-foreground">
              Each kit is assembled by our trained pharmacists who ensure proper
              medication storage, clear labeling, and comprehensive instructions
              for use.
            </p>
          </div>
          <div className="card-base p-8 text-center">
            <div className="h-20 w-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Briefcase className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Custom Medical Kits</h3>
            <p className="mt-3 text-muted-foreground">
              Tailored to your health needs, lifestyle, and destination.
            </p>
          </div>
        </div>
      </Section>

      {/* What's Included */}
      <Section variant="alt" size="default">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">What&apos;s Included</h2>
            <FeatureList
              features={kitContents.map((item) => ({ title: item }))}
              columns={1}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Add-Ons</h2>
            <ul className="space-y-3">
              {addOns.map((addon) => (
                <li key={addon} className="flex items-center gap-3">
                  <Plus className="h-4 w-4 text-primary" />
                  <span>{addon}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Who It's For */}
      <Section variant="default" size="default">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Who It&apos;s For</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our medical kits serve a variety of needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whoItsFor.map((item) => (
            <div key={item.title} className="card-base text-center p-6">
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section variant="alt" size="default">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <FAQ items={faqItems} />
        </div>
      </Section>

      {/* Inquiry Form */}
      <Section variant="default" size="default">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Request a Medical Kit</h2>
            <p className="mt-4 text-muted-foreground">
              Tell us about your needs and we&apos;ll help you create the
              perfect kit.
            </p>
          </div>

          {formState === "success" ? (
            <div className="card-base p-8 text-center">
              <div className="h-16 w-16 mx-auto rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold">Inquiry Submitted!</h3>
              <p className="mt-2 text-muted-foreground">
                Thank you for your interest. Our team will contact you within
                1-2 business days to discuss your medical kit needs.
              </p>
              <Button
                onClick={() => setFormState("idle")}
                variant="outline"
                className="mt-6"
              >
                Submit Another Inquiry
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card-base p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="801-555-1234"
                />
              </div>

              <div>
                <Label htmlFor="kitType">Kit Type</Label>
                <Input
                  id="kitType"
                  name="kitType"
                  type="text"
                  placeholder="e.g., Travel, Home Emergency, Workplace"
                />
              </div>

              <div>
                <Label htmlFor="needs">Describe Your Needs *</Label>
                <Textarea
                  id="needs"
                  name="needs"
                  placeholder="Tell us about your health conditions, travel plans, or specific requirements..."
                  rows={4}
                  className={errors.needs ? "border-destructive" : ""}
                />
                {errors.needs && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.needs}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
