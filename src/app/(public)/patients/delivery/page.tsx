import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import DeliveryClient from "./delivery-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients/delivery",
  title: "Free Prescription Delivery in Bountiful, UT",
  description:
    "Get prescriptions delivered to your door at no extra cost. Mountain View Pharmacy offers fast, secure home delivery throughout the Bountiful, Utah service area.",
  keywords: [
    "free prescription delivery Bountiful",
    "pharmacy delivery Utah",
    "home medication delivery",
    "Mountain View Pharmacy delivery",
  ],
});

export default function DeliveryPage() {
  return <DeliveryClient />;
}
