import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import MedReviewClient from "./med-review-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/comprehensive-medication-review",
  title: "Medication Reviews in Bountiful, UT",
  description:
    "Schedule a comprehensive medication review with Mountain View Pharmacy to check interactions, improve effectiveness, and optimize your treatment plan.",
  keywords: [
    "medication review Bountiful",
    "pharmacist consultation",
    "medication therapy management",
    "prescription review",
  ],
});

export default function ComprehensiveMedicationReviewPage() {
  return <MedReviewClient />;
}
