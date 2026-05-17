import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import ImmunizationsClient from "./immunizations-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/flu-shots-immunizations",
  title: "Flu Shots & Immunizations in Bountiful, UT",
  description:
    "Protect your health with flu shots, shingles, RSV, pneumonia, and TDAP vaccinations from Mountain View Pharmacy in Bountiful, Utah.",
  keywords: [
    "flu shots Bountiful",
    "immunizations Utah",
    "pharmacy vaccines",
    "RSV vaccine",
    "shingles vaccine",
  ],
});

export default function FluShotsImmunizationsPage() {
  return <ImmunizationsClient />;
}
