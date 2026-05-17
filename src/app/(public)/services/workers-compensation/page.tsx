import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import WorkersCompClient from "./workers-comp-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/workers-compensation",
  title: "Workers' Compensation Pharmacy Services",
  description:
    "Mountain View Pharmacy helps workers' compensation patients manage prescriptions, insurance billing, provider coordination, packaging, delivery, and medication adjustments.",
  keywords: [
    "workers comp pharmacy",
    "workers compensation prescriptions",
    "medication management workers comp",
    "Bountiful pharmacy",
  ],
});

export default function WorkersCompensationPage() {
  return <WorkersCompClient />;
}
