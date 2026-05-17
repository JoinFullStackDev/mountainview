import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import MedSyncClient from "./med-sync-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients/med-sync",
  title: "Medication Sync for Easy Refills",
  description:
    "Align all of your maintenance prescriptions to a single monthly pickup or delivery date with Mountain View Pharmacy's medication synchronization program.",
  keywords: [
    "medication sync Bountiful",
    "refill synchronization Utah",
    "medication management",
    "Mountain View Pharmacy",
  ],
});

export default function MedSyncPage() {
  return <MedSyncClient />;
}
