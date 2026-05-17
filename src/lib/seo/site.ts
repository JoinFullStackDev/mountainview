import type { Metadata, MetadataRoute } from "next";

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

export interface BuildMetadataOptions {
  /** Path relative to the site root, with leading slash (use "/" for home). */
  path: string;
  /**
   * Page title. Pass the short form (e.g. "Custom Compounding Pharmacy"); the
   * root layout's title template will append " | Mountain View Pharmacy" for
   * you. Pass an absolute string by setting `titleAbsolute` if you need to
   * bypass the template (e.g. the home page).
   */
  title: string;
  /** Set true to bypass the root layout's "%s | Mountain View Pharmacy" template. */
  titleAbsolute?: boolean;
  description: string;
  keywords?: string[];
  /**
   * Optional OG image override. Defaults to the site-wide OG image inherited
   * from the root layout.
   */
  ogImage?: string;
  /** Set true to emit `robots: { index: false, follow: false }`. */
  noIndex?: boolean;
}

/**
 * Builds a consistent `Metadata` object for a static public page. Always sets
 * a canonical URL (via `absoluteUrl`) and OpenGraph url/title/description so
 * social link previews stay in sync with the page metadata.
 */
export function buildMetadata({
  path,
  title,
  titleAbsolute,
  description,
  keywords,
  ogImage,
  noIndex,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const resolvedTitle = titleAbsolute ? { absolute: title } : title;

  return {
    title: resolvedTitle,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      title,
      description,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
