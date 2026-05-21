import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Section } from "@/components/shared/Section";
import { HipaaNoticeContent } from "@/components/privacy/HipaaNoticeContent";
import { buildMetadata } from "@/lib/seo/site";

export const metadata: Metadata = buildMetadata({
  path: "/privacy",
  title: "HIPAA Notice of Privacy Practices | Mountain View Pharmacy",
  titleAbsolute: true,
  description:
    "Review Mountain View Pharmacy's HIPAA Notice of Privacy Practices, including how protected health information may be used, disclosed, and accessed.",
  keywords: [
    "HIPAA notice pharmacy",
    "privacy practices pharmacy",
    "protected health information",
    "Mountain View Pharmacy HIPAA",
  ],
});

export default function Privacy() {
  return (
    <>
      <PageHero
        title="HIPAA Notice of Privacy Practices"
        description="How medical information about you may be used and disclosed and how you can get access to this information."
        breadcrumbs={[{ name: "Privacy & HIPAA" }]}
        variant="minimal"
      />

      <Section variant="default" size="default">
        <HipaaNoticeContent />
      </Section>
    </>
  );
}
