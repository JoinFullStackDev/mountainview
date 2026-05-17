import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import MedicalKitsClient from "./medical-kits-client";

export const metadata: Metadata = buildMetadata({
  path: "/medical-kits",
  title: "Medical Kits in Utah | Travel & Emergency Medication Kits",
  titleAbsolute: true,
  description:
    "Prepare for travel, emergencies, and everyday health needs with customizable medical kits from Mountain View Pharmacy in Bountiful, Utah.",
  keywords: [
    "medical kits Utah",
    "travel medication kit",
    "emergency medication kit",
    "missionary medical kit",
    "pharmacy medical kits",
  ],
});

export default function MedicalKitsPage() {
  return <MedicalKitsClient />;
}
