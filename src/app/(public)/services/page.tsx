import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import ServicesClient from "./services-client";

export const metadata: Metadata = buildMetadata({
  path: "/services",
  title: "Pharmacy Services in Bountiful, UT",
  description:
    "Explore Mountain View Pharmacy's healthcare services, including compounding, pill packaging, medication synchronization, immunizations, medication reviews, supplements, and workers' compensation support.",
  keywords: [
    "pharmacy services Bountiful",
    "compounding pharmacy Utah",
    "medication synchronization",
    "pill packaging",
    "immunizations",
  ],
});

export default function ServicesPage() {
  return <ServicesClient />;
}
