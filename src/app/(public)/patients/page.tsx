import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import PatientsClient from "./patients-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients",
  title: "Patient Services in Bountiful, UT",
  description:
    "Explore Mountain View Pharmacy's patient services: prescription transfers and free home delivery.",
  keywords: [
    "patient services Bountiful",
    "pharmacy patient resources Utah",
    "prescription transfer",
    "free prescription delivery",
    "Mountain View Pharmacy",
  ],
});

export default function PatientsPage() {
  return <PatientsClient />;
}
