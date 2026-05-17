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
  // Add WordPress -> Next.js redirects here.
];
