import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Mountain View Pharmacy",
    template: "%s | Mountain View Pharmacy",
  },
  description:
    "Your trusted community pharmacy in Bountiful, Utah. Custom compounding, free delivery, pill packaging, immunizations, and personalized care.",
  metadataBase: new URL("https://mountainviewpharmacy.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mountain View Pharmacy",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
