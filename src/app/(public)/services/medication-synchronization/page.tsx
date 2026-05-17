import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import MedSyncClient from "./med-sync-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/medication-synchronization",
  title: "Medication Synchronization in Bountiful, UT",
  description:
    "Sync your prescription refills to one convenient monthly pickup date with Mountain View Pharmacy's medication synchronization service.",
  keywords: [
    "medication synchronization",
    "refill synchronization",
    "prescription sync Bountiful",
    "pharmacy refill management",
  ],
});

export default function MedicationSynchronizationPage() {
  return <MedSyncClient />;
}
