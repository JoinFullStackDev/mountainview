"use client";

import { useEffect } from "react";
import { Briefcase, Plus } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { FAQ } from "@/components/shared/FAQ";
import { FeatureList } from "@/components/shared/FeatureList";

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

export default function MedicalKitsClient() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
          <iframe
            src="https://api.leadconnectorhq.com/widget/form/cZ5oknEs3MXoMiadkwxV"
            style={{ width: "100%", minHeight: "561px", border: "none", borderRadius: "8px" }}
            id="inline-cZ5oknEs3MXoMiadkwxV"
            data-layout="{'id':'INLINE'}"
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="MedKit"
            data-height="561"
            data-layout-iframe-id="inline-cZ5oknEs3MXoMiadkwxV"
            data-form-id="cZ5oknEs3MXoMiadkwxV"
            title="MedKit"
          />
        </div>
      </Section>
    </>
  );
}
