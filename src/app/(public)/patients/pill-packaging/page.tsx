import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import PillPackagingClient from "./pill-packaging-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients/pill-packaging",
  title: "Pill Packaging Service in Bountiful, UT",
  description:
    "Take the guesswork out of daily medications with Mountain View Pharmacy's pill packaging. Doses are pre-sorted by date and time for easy adherence.",
  keywords: [
    "pill packaging Bountiful",
    "medication packaging Utah",
    "blister packs",
    "adherence packaging",
    "Mountain View Pharmacy",
  ],
});

export default function PillPackagingPage() {
  return <PillPackagingClient />;
}
