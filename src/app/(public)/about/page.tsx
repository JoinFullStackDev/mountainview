import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import AboutClient from "./about-client";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About Mountain View Pharmacy | Serving Bountiful Since 1961",
  titleAbsolute: true,
  description:
    "Learn about Mountain View Pharmacy's history, local team, personalized care approach, pharmacy services, compounding, delivery, supplements, and community commitment.",
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
