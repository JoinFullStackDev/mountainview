import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/site";
import ContactClient from "./contact-client";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact Mountain View Pharmacy in Bountiful, UT",
  description:
    "Contact Mountain View Pharmacy for prescription questions, pharmacist consultations, transfers, services, and support at 230 S Main Street in Bountiful, Utah.",
  keywords: [
    "contact Mountain View Pharmacy",
    "Bountiful pharmacy phone",
    "pharmacy near me",
    "pharmacist consultation Bountiful",
  ],
});

export default function ContactPage() {
  return <ContactClient />;
}
