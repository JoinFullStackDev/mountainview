import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import CompoundingClient from "./compounding-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/compounding",
  title: "Custom Compounding Pharmacy in Bountiful, UT",
  description:
    "Get personalized compounded medications from Mountain View Pharmacy, including custom dosage forms, allergy-friendly formulations, hormone support, dermatology, pediatric, pain, and veterinary compounding.",
  keywords: [
    "compounding pharmacy Bountiful",
    "custom medications Utah",
    "personalized medicine",
    "hormone compounding",
    "veterinary compounding",
  ],
});

export default function CompoundingPage() {
  return <CompoundingClient />;
}
