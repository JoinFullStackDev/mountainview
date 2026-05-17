import type { MetadataRoute } from "next";

/**
 * Canonical site URL. Drives the sitemap, robots.txt, OG `metadataBase`,
 * and any future SEO helpers. Override per environment with
 * `NEXT_PUBLIC_SITE_URL` (no trailing slash).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtviewpharmacy.com";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

export interface StaticRoute {
  /** Path relative to the site root, with leading slash (use "/" for home). */
  path: string;
  changeFrequency: ChangeFrequency;
  /** 0.0 - 1.0 */
  priority: number;
}

/**
 * Single source of truth for every public, indexable static page on the
 * site. Add a new entry here when you ship a new page so it shows up in
 * `/sitemap.xml` automatically. Dynamic routes (blog posts) are appended
 * separately in `src/app/sitemap.ts`.
 */
export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },

  // Top-level hubs
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/patients", changeFrequency: "weekly", priority: 0.9 },
  { path: "/providers", changeFrequency: "weekly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.9 },

  // Service detail pages
  { path: "/services/compounding", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/services/comprehensive-medication-review",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/flu-shots-immunizations",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/medication-synchronization",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/monthly-pill-packaging",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/pharmaceutical-grade-vitamins-supplements",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/services/workers-compensation",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  // Patient detail pages
  { path: "/patients/delivery", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/patients/immunizations",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/patients/med-sync", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/patients/pill-packaging",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/patients/transfer-prescriptions",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  // Provider detail pages
  { path: "/providers/compounding", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/providers/how-to-prescribe",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/providers/quality-compliance",
    changeFrequency: "monthly",
    priority: 0.8,
  },

  // Marketing / info
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/medical-kits", changeFrequency: "monthly", priority: 0.7 },

  // Legal
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

/** Joins `SITE_URL` with a path, guaranteeing exactly one slash between them. */
export function absoluteUrl(path: string): string {
  const base = SITE_URL.replace(/\/$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
}
