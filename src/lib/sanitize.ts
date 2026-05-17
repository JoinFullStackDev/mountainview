import sanitizeHtmlLib from "sanitize-html";

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Allows safe HTML elements commonly used in blog content.
 */
export function sanitizeHtml(html: string): string {
  return sanitizeHtmlLib(html, {
    allowedTags: [
      // Headings
      "h1", "h2", "h3", "h4", "h5", "h6",
      // Text structure
      "p", "br", "hr", "div", "span",
      // Lists
      "ul", "ol", "li",
      // Formatting
      "strong", "em", "b", "i", "u", "s", "strike", "del", "ins",
      // Quotes and code
      "blockquote", "pre", "code",
      // Links and media
      "a", "img",
      // Tables
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      // Figures
      "figure", "figcaption",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "class"],
      "*": ["class", "id"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    // Transform links to add security attributes
    transformTags: {
      a: (tagName, attribs) => {
        return {
          tagName,
          attribs: {
            ...attribs,
            target: "_blank",
            rel: "noopener noreferrer",
          },
        };
      },
    },
    // Don't allow data: URLs in images to prevent potential attacks
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
  });
}
