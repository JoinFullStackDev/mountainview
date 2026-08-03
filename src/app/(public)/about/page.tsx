import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import AboutClient from "./about-client";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About Mountain View Pharmacy | Serving Bountiful Since 1961",
  titleAbsolute: true,
  description:
    "Learn about Mountain View Pharmacy's history since 1961, our evolution into a leader in pharmaceutical compounding, and our commitment to personal care and patient advocacy across the Intermountain West.",
  keywords: [
    "about Mountain View Pharmacy",
    "Bountiful pharmacy since 1961",
    "local pharmacy team",
    "community pharmacy Utah",
  ],
});

export default function AboutPage() {
  return <AboutClient />;
}
