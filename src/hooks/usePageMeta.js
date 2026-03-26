import { useEffect } from "react";

function setMetaTag(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function removePageSchemas() {
  document.querySelectorAll('script[data-page-schema="true"]').forEach((el) => el.remove());
}

function injectSchemas(schemas) {
  schemas.forEach((schema) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-schema", "true");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}

/**
 * usePageMeta — sets per-page meta tags and JSON-LD schemas.
 * Cleans up schemas on unmount so they don't bleed between pages.
 */
export function usePageMeta({ title, description, canonical, ogImage, schemas = [] }) {
  useEffect(() => {
    if (title) document.title = title;

    setMetaTag("description", description);
    setLinkTag("canonical", canonical);

    // Open Graph
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:url", canonical, "property");
    setMetaTag("og:type", "website", "property");
    if (ogImage) setMetaTag("og:image", ogImage, "property");

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);

    // Inject page-specific JSON-LD schemas
    removePageSchemas();
    injectSchemas(schemas);

    return () => {
      removePageSchemas();
    };
  }, [title, description, canonical]); // eslint-disable-line
}
