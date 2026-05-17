import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import ImmunizationsClient from "./immunizations-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients/immunizations",
  title: "Walk-In Immunizations in Bountiful, UT",
  description:
    "Get flu, COVID-19, shingles, pneumonia, RSV, and Tdap vaccines from licensed pharmacists at Mountain View Pharmacy. Walk-ins welcome \u2014 most insurance accepted.",
  keywords: [
    "walk-in immunizations Bountiful",
    "pharmacy vaccines Utah",
    "flu shot Bountiful",
    "COVID-19 vaccine pharmacy",
    "shingles vaccine",
  ],
});

export default function ImmunizationsPage() {
  return <ImmunizationsClient />;
}
