/**
 * 301 redirect map from old WordPress URLs to the new Next.js routes.
 *
 * SEO-critical: when this site replaces the WordPress install, every URL
 * that Google has indexed under the old site needs to either still work
 * or 301 here to its new home. Otherwise we lose the link equity and
 * search rank for those pages.
 *
 * How to populate:
 *   1. Pull the full URL list from WordPress (`/wp-sitemap.xml` or
 *      `/sitemap_index.xml` if Yoast/Rank Math is installed).
 *   2. For each old path that doesn't match a new path 1:1, add a row
 *      below. Trailing-slash variants are handled by Next.js for you, so
 *      `source: "/about-us"` will catch `/about-us/` too.
 *   3. Use `permanent: true` (308 in modern browsers, 301 for crawlers)
 *      so search engines transfer ranking signals to the new URL.
 *   4. For wildcards / dynamic legacy URLs, use Next.js path matching:
 *      `{ source: "/category/:slug", destination: "/blog", permanent: true }`.
 *
 * Examples (uncomment / adapt once the WP URL list is in hand):
 *
 *   { source: "/about-us", destination: "/about", permanent: true },
 *   { source: "/contact-us", destination: "/contact", permanent: true },
 *   { source: "/our-services", destination: "/services", permanent: true },
 *   { source: "/our-services/compounding", destination: "/services/compounding", permanent: true },
 *   { source: "/category/:slug", destination: "/blog", permanent: true },
 *   { source: "/2024/:year/:month/:slug", destination: "/blog/:slug", permanent: true },
 */

export interface WpRedirect {
  source: string;
  destination: string;
  permanent: true;
}

export const wpRedirects: WpRedirect[] = [
  // Marketing / info pages renamed on the new site.
  { source: "/about-mtv", destination: "/about", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
  {
    source: "/notice-of-privacy-rights-hipaa",
    destination: "/privacy",
    permanent: true,
  },

  // Service / patient pages reorganized under cleaner URLs.
  {
    source: "/transfer-prescriptions",
    destination: "/patients/transfer-prescriptions",
    permanent: true,
  },

  // Legacy sections that no longer exist on the new site.
  // The provider referral network was removed at the client's request;
  // /resources was a hub linking to services. Both point at /services so the
  // crawler still lands on something useful.
  { source: "/our-providers", destination: "/services", permanent: true },
  { source: "/resources", destination: "/services", permanent: true },
  {
    source: "/why-we-can-compound",
    destination: "/services/compounding",
    permanent: true,
  },

  // Retired service pages redirect to the services hub.
  {
    source: "/services/monthly-pill-packaging",
    destination: "/services",
    permanent: true,
  },
  {
    source: "/services/medication-synchronization",
    destination: "/services",
    permanent: true,
  },
  {
    source: "/services/flu-shots-immunizations",
    destination: "/services",
    permanent: true,
  },
  {
    source: "/services/comprehensive-medication-review",
    destination: "/services",
    permanent: true,
  },
  {
    source: "/services/workers-compensation",
    destination: "/services",
    permanent: true,
  },

  // Retired patient pages redirect to the patients hub.
  {
    source: "/patients/pill-packaging",
    destination: "/patients",
    permanent: true,
  },
  {
    source: "/patients/immunizations",
    destination: "/patients",
    permanent: true,
  },
  {
    source: "/patients/med-sync",
    destination: "/patients",
    permanent: true,
  },

  // Medical kits page removed; redirect to services.
  { source: "/medical-kits", destination: "/services", permanent: true },

  // Legacy WordPress blog posts (root-level slugs) now live under /blog/.
  {
    source: "/continuing-the-wellness-journey-with-glp-1-support",
    destination: "/blog/continuing-the-wellness-journey-with-glp-1-support",
    permanent: true,
  },
  {
    source:
      "/unlock-your-peak-performance-with-personalized-medication-compounding",
    destination:
      "/blog/unlock-your-peak-performance-with-personalized-medication-compounding",
    permanent: true,
  },
  {
    source: "/welcome-to-mountain-view-pharmacy-your-trusted-local-pharmacy",
    destination:
      "/blog/welcome-to-mountain-view-pharmacy-your-trusted-local-pharmacy",
    permanent: true,
  },
];
