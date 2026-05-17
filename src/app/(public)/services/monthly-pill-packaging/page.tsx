import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import PillPackagingClient from "./pill-packaging-client";

export const metadata: Metadata = buildMetadata({
  path: "/services/monthly-pill-packaging",
  title: "Monthly Pill Packaging in Bountiful, UT",
  description:
    "Simplify medication management with monthly pill packaging from Mountain View Pharmacy. Organize prescriptions by date and time with pickup or delivery options.",
  keywords: [
    "monthly pill packaging",
    "medication packaging Bountiful",
    "pill packs Utah",
    "medication management",
  ],
});

export default function MonthlyPillPackagingPage() {
  return <PillPackagingClient />;
}
