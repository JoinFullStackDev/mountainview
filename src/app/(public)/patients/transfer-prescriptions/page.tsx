import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import TransferPrescriptionsClient from "./transfer-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients/transfer-prescriptions",
  title: "Transfer Prescriptions to Mountain View Pharmacy",
  description:
    "Easily transfer your prescriptions to Mountain View Pharmacy in Bountiful, Utah for personalized care, convenient refills, and pharmacist support.",
  keywords: [
    "transfer prescriptions Bountiful",
    "prescription transfer Utah",
    "switch pharmacy",
    "Mountain View Pharmacy transfer",
  ],
});

export default function TransferPrescriptionsPage() {
  return <TransferPrescriptionsClient />;
}
