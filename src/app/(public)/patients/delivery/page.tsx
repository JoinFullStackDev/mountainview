import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import DeliveryClient from "./delivery-client";

export const metadata: Metadata = buildMetadata({
  path: "/patients/delivery",
  title: "Free Prescription Delivery",
  description:
    "Get prescriptions delivered to your door at no extra cost. Mountain View Pharmacy offers fast, secure delivery to all licensed states via UPS, FedEx, and PigeonShip.",
  keywords: [
    "free prescription delivery",
    "pharmacy delivery nationwide",
    "home medication delivery",
    "Mountain View Pharmacy delivery",
  ],
});

export default function DeliveryPage() {
  return <DeliveryClient />;
}
