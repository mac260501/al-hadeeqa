import { Helmet } from "react-helmet-async";

/**
 * usePageMeta — returns a <Helmet> element with per-page meta tags and JSON-LD schemas.
 * Render the returned element at the top of your page component's JSX.
 *
 * react-helmet-async captures these tags during react-snap pre-rendering,
 * so crawlers see the correct title, description, canonical, and schemas
 * for every individual page — not just the homepage defaults.
 */
export function usePageMeta({ title, description, canonical, ogImage, schemas = [] }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}

      {/* JSON-LD schemas */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
