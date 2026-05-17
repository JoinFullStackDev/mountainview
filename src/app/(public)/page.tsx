import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import HomeClient from "./home-client";

export const metadata: Metadata = buildMetadata({
  path: "/",
  title: "Mountain View Pharmacy | Local Pharmacy in Bountiful, UT",
  titleAbsolute: true,
  description:
    "Mountain View Pharmacy provides personalized pharmacy care, prescription services, compounding, delivery, immunizations, and wellness support in Bountiful, Utah.",
  keywords: [
    "Bountiful pharmacy",
    "local pharmacy Bountiful UT",
    "Mountain View Pharmacy",
    "prescription delivery Utah",
    "pharmacy services",
  ],
});

export default function HomePage() {
  return <HomeClient />;
}
