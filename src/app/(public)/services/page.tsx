import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import ServicesClient from "./services-client";

export const metadata: Metadata = buildMetadata({
  path: "/services",
  title: "Pharmacy Services in Bountiful, UT",
  description:
    "Explore Mountain View Pharmacy's healthcare services, including sterile and non-sterile compounding, pharmaceutical-grade supplements, and easy prescription transfers.",
  keywords: [
    "pharmacy services Bountiful",
    "compounding pharmacy Utah",
    "sterile compounding",
    "non-sterile compounding",
    "supplements",
  ],
});

export default function ServicesPage() {
  return <ServicesClient />;
}
