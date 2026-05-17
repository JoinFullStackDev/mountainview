import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import SupplementsClient from "./supplements-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/pharmaceutical-grade-vitamins-supplements",
  title: "Pharmaceutical Grade Vitamins & Supplements",
  description:
    "Shop trusted pharmaceutical-grade vitamins and supplements with pharmacist guidance from Mountain View Pharmacy in Bountiful, Utah.",
  keywords: [
    "pharmaceutical grade supplements",
    "vitamins Bountiful",
    "pharmacy supplements",
    "probiotics",
    "fish oil",
    "sleep support",
  ],
});

export default function PharmaceuticalGradeVitaminsSupplementsPage() {
  return <SupplementsClient />;
}
