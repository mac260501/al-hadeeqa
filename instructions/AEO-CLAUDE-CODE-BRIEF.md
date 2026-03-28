# Al Hadeeqa Contracting — AEO Implementation Brief for Claude Code

## ⚠️ CRITICAL INSTRUCTION: DO NOT REDESIGN THE SITE

**This is an additive implementation.** The existing website at `alhadeeqacontracting.com` has a design, layout, and component structure that must be preserved. Do not:

- Replace existing React components with new designs
- Change the visual layout, colour scheme, typography, or spacing
- Remove or restructure existing content sections
- Create new page templates that don't match the existing aesthetic
- Override existing CSS or Tailwind classes with new styling

**Instead, you must:**

- Add new content, pages, and features that match the existing site's design language
- Inject structured data (JSON-LD) into existing pages via `<script>` tags
- Add meta tags via `react-helmet-async` without changing page layouts
- Create new route pages that follow the same component patterns already in the codebase
- Add content blocks (FAQs, trust signals, answer paragraphs) that integrate visually with what's already there

**Before making any changes, read the existing codebase to understand:**
1. The component library and reusable components already in use
2. The styling approach (CSS modules, styled-components, Tailwind, inline — whatever is there)
3. The routing setup (React Router configuration)
4. The existing page structure and section ordering
5. Any shared layout components (header, footer, navigation)

---

## Project Context

- **Site:** https://alhadeeqacontracting.com
- **Tech stack:** React (CRA), deployed on Netlify via GitHub auto-deploy
- **Routing:** React Router, with `netlify.toml` + `public/_redirects` for SPA fallback
- **Current pages:** Homepage, About, Services (with sub-sections), Bunker landing page, The Vault page, Contact
- **Brand:** Dark green (#1a4a26), Cormorant Garamond (display), DM Sans (body), gold (#C9A96E) accent
- **CTAs route through WhatsApp:** wa.me/971544419854

---

## What This Brief Covers

This brief consolidates findings from two independent audits (ChatGPT and our internal AEO plan) into a single implementation checklist. It is organised into phases. Each task has explicit instructions.

The audits agree on these top priorities:
1. **Pre-rendering is non-negotiable** — AI crawlers can't reliably read client-rendered React SPAs
2. **Structured data (JSON-LD) must be added to every page** — Organisation, Service, FAQ, Product, Breadcrumb schemas
3. **Answer-first content structure** — every page needs a 30-60 word extractable answer paragraph at the top
4. **Visible FAQ sections with schema markup** — the single highest-impact AEO asset
5. **Explicit AI crawler permissions** in robots.txt
6. **Trust signals must be structured and evidence-backed**, not just badge icons
7. **Dedicated deep service pages** — one page per service, not everything compressed into the homepage
8. **Internal linking between services, FAQs, blog posts, and case studies**

---

## Phase 1: Technical Foundation (Do First)

These changes are prerequisites. Nothing else works until these are done.

### 1.1 Install Pre-rendering

The React SPA currently renders client-side. AI crawlers (Perplexity, ChatGPT's browsing tool) and some Google crawl paths may not execute JavaScript. Pre-rendering generates static HTML at build time.

**Steps:**
```bash
npm install react-snap
```

Add to `package.json`:
```json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "source": "build",
    "inlineCss": true,
    "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"]
  }
}
```

**Test:** After `npm run build`, check that `build/index.html` and all route HTML files contain full rendered content, not just `<div id="root"></div>`.

**If `react-snap` doesn't work cleanly with the existing setup**, use Netlify's prerender plugin instead:
```toml
# Add to netlify.toml
[[plugins]]
  package = "@netlify/plugin-prerender"
```

### 1.2 Install react-helmet-async

This enables per-page `<title>`, `<meta>`, and JSON-LD injection without changing page layouts.

```bash
npm install react-helmet-async
```

Wrap the app root in `<HelmetProvider>`:
```jsx
// In App.js or index.js — find the existing root render and wrap it
import { HelmetProvider } from 'react-helmet-async';

// Wrap existing <App /> or <Router> with:
<HelmetProvider>
  {/* existing app content */}
</HelmetProvider>
```

**Do not restructure the app.** Just wrap the outermost component.

### 1.3 Create robots.txt

Create `public/robots.txt` (or replace existing if present):

```
User-agent: *
Allow: /
Sitemap: https://alhadeeqacontracting.com/sitemap.xml

# Explicitly allow AI crawler bots for AEO visibility
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Meta-ExternalAgent
Allow: /
```

### 1.4 Create sitemap.xml

Create `public/sitemap.xml`. Include every existing page plus the new pages this brief will create. Update `<lastmod>` dates to today's date.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://alhadeeqacontracting.com/</loc><lastmod>2026-03-27</lastmod><priority>1.0</priority></url>
  <url><loc>https://alhadeeqacontracting.com/about</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services</loc><lastmod>2026-03-27</lastmod><priority>0.9</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/pergolas</loc><lastmod>2026-03-27</lastmod><priority>0.9</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/carports</loc><lastmod>2026-03-27</lastmod><priority>0.9</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/dewatering</loc><lastmod>2026-03-27</lastmod><priority>0.9</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/excavation</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/demolition</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/waterproofing</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/boundary-walls</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/steel-structures</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/swimming-pools</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/landscaping</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/services/general-contracting</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/bunkers</loc><lastmod>2026-03-27</lastmod><priority>0.9</priority></url>
  <url><loc>https://alhadeeqacontracting.com/bunkers/emergency-pod</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/bunkers/compact-shelter</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/bunkers/shelter</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/the-vault</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/projects</loc><lastmod>2026-03-27</lastmod><priority>0.7</priority></url>
  <url><loc>https://alhadeeqacontracting.com/faq</loc><lastmod>2026-03-27</lastmod><priority>0.8</priority></url>
  <url><loc>https://alhadeeqacontracting.com/contact</loc><lastmod>2026-03-27</lastmod><priority>0.7</priority></url>
</urlset>
```

**Important:** If routes differ from what's listed here, adjust the sitemap to match actual routes. Check the React Router config to see what routes currently exist.

### 1.5 Create llms.txt

Create `public/llms.txt`:

```
# Al Hadeeqa Contracting Co. L.L.C
> Dubai-based construction company established in 2009, specialising in luxury pergolas, carports, dewatering, excavation, demolition, waterproofing, underground shelters, boundary walls, steel structures, swimming pools, landscaping, and general contracting. ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007 certified. ASCB(E) accredited. 50+ crew. 500+ projects completed. 35+ years of founder experience in UAE construction. Serving Dubai only.

## Core Services
- [Luxury Pergolas](https://alhadeeqacontracting.com/services/pergolas): Custom steel, aluminium, timber, and motorised louvre pergolas for villas, gardens, rooftops, and hospitality spaces in Dubai.
- [Luxury Carports](https://alhadeeqacontracting.com/services/carports): Steel and aluminium carports for residential and commercial properties in Dubai.
- [Dewatering](https://alhadeeqacontracting.com/services/dewatering): Construction dewatering including wellpoint, deepwell, and sump pumping across Dubai.
- [Excavation](https://alhadeeqacontracting.com/services/excavation): Residential and commercial excavation, shoring, and earthworks in Dubai.
- [Demolition](https://alhadeeqacontracting.com/services/demolition): Controlled demolition for villas, buildings, and structures in Dubai.
- [Waterproofing](https://alhadeeqacontracting.com/services/waterproofing): Membrane, crystalline, and bituminous waterproofing for roofs, basements, wet areas, and pools.
- [Boundary Walls](https://alhadeeqacontracting.com/services/boundary-walls): Block, precast, and decorative boundary walls and fencing in Dubai.
- [Steel Structures](https://alhadeeqacontracting.com/services/steel-structures): Steel fabrication and erection for warehouses, shades, and mezzanines.
- [Swimming Pools](https://alhadeeqacontracting.com/services/swimming-pools): Residential and commercial swimming pool construction in Dubai.
- [Landscaping](https://alhadeeqacontracting.com/services/landscaping): Hardscaping, softscaping, irrigation, and outdoor living spaces.
- [General Contracting](https://alhadeeqacontracting.com/services/general-contracting): Villa renovation, building construction, fitout, and maintenance.

## Underground Shelters
- [All Tiers](https://alhadeeqacontracting.com/bunkers): Three tiers from AED 100,000 to AED 500,000+.
- [Emergency Pod](https://alhadeeqacontracting.com/bunkers/emergency-pod): Precast, 7-8 sqm, 2-4 people, AED 100,000. Installed in 1-2 days.
- [Compact Shelter](https://alhadeeqacontracting.com/bunkers/compact-shelter): Precast, 15-20 sqm, 6-8 people, AED 200,000. HEPA filtration included.
- [Shelter](https://alhadeeqacontracting.com/bunkers/shelter): Poured-in-place, 28 sqm, 8-15 people, from AED 500,000. Blast door, full bathroom.
- Custom sizes available at AED 15,200/sqm.

## The Vault — Underground Luxury Living
- [The Vault](https://alhadeeqacontracting.com/the-vault): From AED 5,000,000. Car ramp, underground garage, cinema, gym, lounge, bedrooms. Bunker-grade structure with luxury finishes.

## Company Information
- Founded: 2009 by Engr. Muhammad Ashraf Jan
- Office: Office 404, PTC Building, Al Qusais Industrial First, Dubai, UAE
- P.O. Box: 234305
- Tel: +971 4 263 2371
- Mobile: +971 544419854 / +971 504824621
- Email: alhadeeqallc@gmail.com
- Website: https://alhadeeqacontracting.com
- Certifications: ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007, ASCB(E) Accredited

## FAQ
- [All FAQs](https://alhadeeqacontracting.com/faq)
```

### 1.6 Add Canonical URLs to All Pages

In every page component, add via Helmet:
```jsx
<Helmet>
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/pergolas" />
</Helmet>
```

Use the exact URL for each page. No trailing slashes unless the router uses them.

---

## Phase 2: Structured Data (JSON-LD)

Add these as `<script type="application/ld+json">` tags in the `<head>` of each page via `react-helmet-async`. Do not add them as visible content.

### 2.1 Organisation Schema — Homepage

```jsx
// Add to the homepage component via <Helmet>
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HomeAndConstructionBusiness"],
  "@id": "https://alhadeeqacontracting.com/#organization",
  "name": "Al Hadeeqa Contracting Co. L.L.C",
  "legalName": "Al Hadeeqa Contracting Co. L.L.C",
  "alternateName": ["Al Hadeeqa Contracting", "Al Hadeeqa Construction"],
  "url": "https://alhadeeqacontracting.com",
  "logo": "https://alhadeeqacontracting.com/logo.png",
  "image": "https://alhadeeqacontracting.com/og-image.jpg",
  "description": "Dubai-based construction company specialising in luxury pergolas, carports, dewatering, excavation, demolition, waterproofing, underground shelters, boundary walls, steel structures, swimming pools, landscaping, and general contracting. Established 2009, ISO certified, 50+ crew, 500+ projects completed.",
  "foundingDate": "2009",
  "founder": {
    "@type": "Person",
    "name": "Engr. Muhammad Ashraf Jan",
    "jobTitle": "Founder & Managing Director"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Office 404, PTC Building, Al Qusais Industrial First",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "postalCode": "234305",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "25.2760",
    "longitude": "55.3862"
  },
  "telephone": "+97142632371",
  "email": "alhadeeqallc@gmail.com",
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 50 },
  "areaServed": [
    { "@type": "City", "name": "Dubai" },
    { "@type": "Country", "name": "United Arab Emirates" }
  ],
  "hasCredential": [
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "ISO 9001:2015 (Quality Management)" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "ISO 14001:2015 (Environmental Management)" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "OHSAS 18001:2007 (Health & Safety)" },
    { "@type": "EducationalOccupationalCredential", "credentialCategory": "ASCB(E) Accredited" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Construction Services",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Luxury Pergolas" },
      { "@type": "OfferCatalog", "name": "Luxury Carports" },
      { "@type": "OfferCatalog", "name": "Dewatering" },
      { "@type": "OfferCatalog", "name": "Excavation" },
      { "@type": "OfferCatalog", "name": "Demolition" },
      { "@type": "OfferCatalog", "name": "Waterproofing" },
      { "@type": "OfferCatalog", "name": "Underground Shelters" },
      { "@type": "OfferCatalog", "name": "Boundary Walls" },
      { "@type": "OfferCatalog", "name": "Steel Structures" },
      { "@type": "OfferCatalog", "name": "Swimming Pools" },
      { "@type": "OfferCatalog", "name": "Landscaping" },
      { "@type": "OfferCatalog", "name": "General Contracting" }
    ]
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+971544419854",
      "contactType": "sales",
      "availableLanguage": ["English", "Arabic", "Urdu"]
    },
    {
      "@type": "ContactPoint",
      "telephone": "+971504824621",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic", "Urdu"]
    }
  ],
  "sameAs": []
};
```

**Note:** Update the `logo` and `image` URLs to match actual asset paths on the site. Update `sameAs` with any social media profile URLs that exist. Update `geo` coordinates to the actual office location (search Google Maps for "Al Hadeeqa Contracting" to get exact lat/lng).

### 2.2 WebSite Schema — Homepage

Add alongside the Organisation schema:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Al Hadeeqa Contracting",
  "url": "https://alhadeeqacontracting.com",
  "publisher": { "@id": "https://alhadeeqacontracting.com/#organization" }
}
```

### 2.3 Service Schema — One Per Service Page

For each service page, add a Service schema. Here's a reusable helper pattern:

```jsx
// Create a utility: src/utils/schemas.js
export const createServiceSchema = ({ name, serviceType, description, url }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceType,
  "name": name,
  "description": description,
  "url": url,
  "provider": {
    "@type": "HomeAndConstructionBusiness",
    "@id": "https://alhadeeqacontracting.com/#organization"
  },
  "areaServed": { "@type": "City", "name": "Dubai" }
});

export const createBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const createProductSchema = ({ name, description, price, currency, url, properties }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "brand": { "@type": "Brand", "name": "Al Hadeeqa Contracting" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": currency || "AED",
    "price": price,
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": url
  },
  "additionalProperty": properties || []
});
```

Then in each service page component:
```jsx
import { Helmet } from 'react-helmet-async';
import { createServiceSchema, createBreadcrumbSchema, createFAQSchema } from '../utils/schemas';

const PergolaPage = () => {
  const serviceSchema = createServiceSchema({
    name: "Custom Pergola Design & Construction in Dubai",
    serviceType: "Pergola Construction",
    description: "Al Hadeeqa Contracting designs and builds custom pergolas across Dubai — steel, aluminium, timber, and motorised louvre systems. 15+ years experience, ISO certified, 50+ crew. Free site assessment.",
    url: "https://alhadeeqacontracting.com/services/pergolas"
  });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://alhadeeqacontracting.com" },
    { name: "Services", url: "https://alhadeeqacontracting.com/services" },
    { name: "Pergolas", url: "https://alhadeeqacontracting.com/services/pergolas" }
  ]);

  const faqSchema = createFAQSchema([
    {
      question: "How much does a pergola cost in Dubai?",
      answer: "A custom pergola in Dubai typically costs between AED 15,000 and AED 80,000 depending on size, material (steel, aluminium, or timber), and whether it includes motorised louvres or fixed panels. Al Hadeeqa Contracting provides free site assessments and quotes."
    },
    {
      question: "How long does it take to build a pergola in Dubai?",
      answer: "Most residential pergola projects take 2–4 weeks from design approval to handover. Larger commercial structures may take 4–6 weeks. Al Hadeeqa handles design, approvals, fabrication, and installation as a turnkey service."
    },
    // ... more FAQs
  ]);

  return (
    <>
      <Helmet>
        <title>Custom Pergola Construction in Dubai | Al Hadeeqa Contracting</title>
        <meta name="description" content="Al Hadeeqa builds custom pergolas in Dubai — steel, aluminium, timber & motorised louvres. ISO certified, 50+ crew, 500+ projects. Free site assessment." />
        <link rel="canonical" href="https://alhadeeqacontracting.com/services/pergolas" />
        <meta property="og:title" content="Custom Pergola Construction in Dubai | Al Hadeeqa Contracting" />
        <meta property="og:description" content="Al Hadeeqa builds custom pergolas in Dubai — steel, aluminium, timber & motorised louvres. ISO certified, 50+ crew, 500+ projects. Free site assessment." />
        <meta property="og:url" content="https://alhadeeqacontracting.com/services/pergolas" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      {/* Existing page content — DO NOT CHANGE */}
    </>
  );
};
```

### 2.4 Service Pages to Add Schema To

Apply the Service + Breadcrumb + FAQ schema pattern to every one of these pages. If a page doesn't exist yet, create it following the existing page component pattern:

| Page Route | Service Type | Title Pattern |
|---|---|---|
| `/services/pergolas` | Pergola Construction | Custom Pergola Construction in Dubai |
| `/services/carports` | Carport Construction | Custom Carport Construction in Dubai |
| `/services/dewatering` | Construction Dewatering | Dewatering Services in Dubai |
| `/services/excavation` | Excavation Services | Excavation & Earthworks in Dubai |
| `/services/demolition` | Demolition Services | Controlled Demolition in Dubai |
| `/services/waterproofing` | Waterproofing Services | Waterproofing Contractor in Dubai |
| `/services/boundary-walls` | Boundary Wall Construction | Boundary Walls & Fencing in Dubai |
| `/services/steel-structures` | Steel Structure Fabrication | Steel Structures & Fabrication in Dubai |
| `/services/swimming-pools` | Swimming Pool Construction | Swimming Pool Construction in Dubai |
| `/services/landscaping` | Landscaping & Hardscaping | Landscaping & Hardscaping in Dubai |
| `/services/general-contracting` | General Contracting | General Contracting & Villa Renovation in Dubai |

### 2.5 Product Schema — Bunker Tiers

Apply Product schema to each bunker tier page:

**Emergency Pod (`/bunkers/emergency-pod`):**
```json
{
  "name": "Emergency Pod — Precast Underground Shelter",
  "description": "A precast reinforced concrete underground shelter for 2–4 people. 7–8 sqm internal area, manufactured at Al Hadeeqa's Ajman yard in 5–7 days, installed in 1–2 days. Includes steel hatch, manual ventilation, water storage, and chemical toilet.",
  "price": "100000",
  "properties": [
    { "@type": "PropertyValue", "name": "Internal Area", "value": "7–8 sqm" },
    { "@type": "PropertyValue", "name": "Capacity", "value": "2–4 people" },
    { "@type": "PropertyValue", "name": "Construction Type", "value": "Precast reinforced concrete" },
    { "@type": "PropertyValue", "name": "Wall Thickness", "value": "220mm" },
    { "@type": "PropertyValue", "name": "Depth", "value": "2.5–3.0m below grade" },
    { "@type": "PropertyValue", "name": "Installation Time", "value": "1–2 days" },
    { "@type": "PropertyValue", "name": "Manufacturing Time", "value": "5–7 days" },
    { "@type": "PropertyValue", "name": "Autonomy", "value": "12–24 hours" }
  ]
}
```

**Compact Shelter (`/bunkers/compact-shelter`):**
```json
{
  "name": "Compact Shelter — Precast Underground Shelter",
  "description": "A precast underground shelter for 6–8 people. 15–20 sqm, HEPA filtration, 24-hour battery power, hardwired intercom, 200L water tank. Two interlocking halves manufactured at Al Hadeeqa's Ajman yard, installed in 2–3 days.",
  "price": "200000",
  "properties": [
    { "@type": "PropertyValue", "name": "Internal Area", "value": "15–20 sqm" },
    { "@type": "PropertyValue", "name": "Capacity", "value": "6–8 people" },
    { "@type": "PropertyValue", "name": "Construction Type", "value": "Precast reinforced concrete (2 halves)" },
    { "@type": "PropertyValue", "name": "Wall Thickness", "value": "250mm" },
    { "@type": "PropertyValue", "name": "Depth", "value": "3.0–3.5m below grade" },
    { "@type": "PropertyValue", "name": "Installation Time", "value": "2–3 days" },
    { "@type": "PropertyValue", "name": "Manufacturing Time", "value": "10–14 days" },
    { "@type": "PropertyValue", "name": "Autonomy", "value": "1–3 days" }
  ]
}
```

**Shelter (`/bunkers/shelter`):**
```json
{
  "name": "Shelter — Poured-in-Place Underground Shelter",
  "description": "A poured-in-place reinforced concrete underground shelter for 8–15 people. 28 sqm (7m × 4m), certified blast door, HEPA filtration, full bathroom, 500L water tank, 48-hour battery system. Built on-site in 4–6 weeks. Custom sizes at AED 15,200/sqm.",
  "price": "500000",
  "properties": [
    { "@type": "PropertyValue", "name": "Internal Area", "value": "28 sqm (7m × 4m)" },
    { "@type": "PropertyValue", "name": "Capacity", "value": "8–15 people" },
    { "@type": "PropertyValue", "name": "Construction Type", "value": "Poured-in-place reinforced concrete" },
    { "@type": "PropertyValue", "name": "Wall Thickness", "value": "300–400mm" },
    { "@type": "PropertyValue", "name": "Depth", "value": "3.0–4.0m below grade" },
    { "@type": "PropertyValue", "name": "Construction Time", "value": "4–6 weeks" },
    { "@type": "PropertyValue", "name": "Autonomy", "value": "1–3 days" },
    { "@type": "PropertyValue", "name": "Custom Pricing", "value": "AED 15,200 per sqm" }
  ]
}
```

---

## Phase 3: Content Additions (Add To Existing Pages)

These are content blocks to add to existing pages. Match the existing visual style. Use the same components, fonts, colours, and spacing that already exist on the page.

### 3.1 Homepage — Add Answer Paragraph

At or near the top of the homepage (below the hero section), add a visible text block:

> Al Hadeeqa Contracting is a Dubai-based construction company specialising in luxury pergolas, carports, dewatering, excavation, demolition, waterproofing, underground shelters, boundary walls, steel structures, swimming pools, landscaping, and general contracting. Established in 2009 by Engr. Muhammad Ashraf Jan, we are ISO 9001, ISO 14001, and OHSAS 18001 certified with 50+ crew members and 500+ completed projects. We serve Dubai only.

This paragraph exists specifically to give AI engines an extractable entity description. Keep it visible — it's not hidden text.

### 3.2 Homepage — Trust Signals Block

The existing homepage already shows trust badges ("35+ Years in UAE", "500+ Projects Completed", "10yr Warranty", "Dubai Licensed Contractor"). These are strong. **Do not remove or redesign them.**

**Add:** Ensure each trust claim links to a supporting page:
- "35+ Years in UAE" → links to `/about`
- "500+ Projects Completed" → links to `/projects`
- "10yr Warranty" → links to a warranty section on `/about` or a new `/warranty` page (if one doesn't exist, add a section to the About page)
- "Dubai Licensed Contractor" → links to a certifications section on `/about`

### 3.3 All Service Pages — Add Answer-First Opening Paragraph

For every service page, add a **visible** 40-80 word opening paragraph immediately after the H1. This is the text AI engines will extract and cite.

**Pattern:**
> Al Hadeeqa Contracting [does X] in Dubai for [types of clients/properties]. [Specific methods/materials]. [Proof signal — years, projects, certifications]. [CTA — free site assessment / free quote].

**Pergola page example:**
> Al Hadeeqa Contracting designs and installs custom luxury pergolas in Dubai for villas, gardens, rooftops, and hospitality spaces. We build with steel, aluminium, and timber, and offer motorised louvre systems for full weather control. With 15+ years of experience, ISO certification, and a 50+ person crew, we handle design, municipality approvals, fabrication, and installation as a turnkey service. Free site assessments are available across Dubai.

**Dewatering page example:**
> Al Hadeeqa Contracting provides construction dewatering services across Dubai for residential, commercial, and infrastructure projects. We use wellpoint, deepwell, and sump pumping methods depending on site conditions, water table depth, and project requirements. With 15+ years of experience in excavation and groundwater management, our team handles dewatering for basements, swimming pools, underground shelters, and utility trenches.

**Write equivalent opening paragraphs for every service page listed in Section 2.4.**

### 3.4 All Service Pages — Add Visible FAQ Section

Add a FAQ section at the bottom of every service page, above the CTA. Each page should have 5-8 FAQs visible on the page.

**Rules:**
- Use `<h2>` or `<h3>` headings that match the question exactly as a user would ask it
- Keep answers to 30-80 words
- Make them self-contained (the answer should make sense without reading the question)
- Include "Al Hadeeqa" or "Al Hadeeqa Contracting" in at least 2 of the answers
- Include specific numbers (prices, timelines, dimensions) where known

**The FAQ data should also be passed into the `createFAQSchema()` function for JSON-LD markup.**

**Important:** The FAQ schema must only include questions that are **visibly displayed** on the page. Do not add hidden FAQ schema.

### 3.5 Service Page FAQs — Content to Add

Below are the FAQ questions to add to each service page. Write answers following the rules above. If you don't have specific pricing or technical data, write the answer in terms of "depends on X, Y, Z — contact Al Hadeeqa for a free quote."

**Pergolas:**
1. How much does a pergola cost in Dubai?
2. How long does it take to build a pergola in Dubai?
3. Do I need a permit for a pergola in Dubai?
4. What materials are best for pergolas in Dubai's climate?
5. Can a pergola be built on a rooftop?
6. What is a motorised louvre pergola?
7. Can a pergola be attached to an existing villa wall?

**Carports:**
1. How much does a carport cost in Dubai?
2. What materials are best for carports in Dubai?
3. Do I need approval to build a carport in Dubai?
4. How long does it take to build a carport?
5. What is the difference between a carport and a garage?

**Dewatering:**
1. What is dewatering in construction?
2. When is dewatering required on a construction site?
3. What dewatering methods are used in Dubai?
4. How long does a dewatering project take?
5. Does Al Hadeeqa provide dewatering for residential projects?

**Excavation:**
1. What excavation services does Al Hadeeqa provide?
2. How deep can you excavate in Dubai?
3. Do you provide shoring for excavation?
4. What is the difference between shoring and open-cut excavation?
5. How long does a residential excavation take in Dubai?

**Waterproofing:**
1. What types of waterproofing does Al Hadeeqa provide?
2. How long does waterproofing last?
3. What areas need waterproofing in a Dubai villa?
4. What is the difference between membrane and crystalline waterproofing?
5. Does Al Hadeeqa waterproof swimming pools?

**Demolition:**
1. What types of demolition does Al Hadeeqa handle?
2. Do you need a permit for demolition in Dubai?
3. How long does a villa demolition take?
4. Does Al Hadeeqa handle waste removal after demolition?
5. What is controlled demolition?

**Underground Shelters:**
1. How much does an underground bunker cost in Dubai?
2. Can you build an underground shelter in Dubai?
3. How deep is a residential underground shelter?
4. How long does it take to build an underground shelter?
5. What is the difference between a precast and poured-in-place shelter?
6. What is HEPA filtration in a shelter?
7. How many people can an underground shelter hold?
8. Can a shelter be added to an existing villa?
9. What is the cheapest underground shelter in Dubai?
10. How long can you survive in an underground shelter?

### 3.6 About Page — Entity Definition Content

The About page must function as the **entity definition page** for AI engines. If it doesn't already contain the following, add these blocks:

1. **Full legal name:** Al Hadeeqa Contracting Co. L.L.C
2. **Also known as:** Al Hadeeqa Contracting, Al Hadeeqa Construction
3. **Founded:** 2009
4. **Founder:** Engr. Muhammad Ashraf Jan — "working in the UAE construction market since the 1990s"
5. **Previous company:** M/s. Tarbela General Contracting L.L.C
6. **Location:** Full address
7. **Contact details:** Phone, mobile, email, WhatsApp
8. **Team size:** 50+ crew members
9. **Certifications:** ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007, ASCB(E) Accredited
10. **Service areas:** Dubai (primary), UAE
11. **Services list:** Full list of all services
12. **Project count:** 500+ completed
13. **Warranty:** 10-year warranty details (scope this to what's actually covered)

### 3.7 Homepage & Service Pages — Meta Tags

Update `<title>` and `<meta name="description">` for every page:

**Title formula:** `[Primary Service] in Dubai | Al Hadeeqa Contracting`
**Description formula (max 155 chars):** Start with what + where, include a number, end with CTA.

| Page | Title | Description |
|---|---|---|
| Homepage | `Al Hadeeqa Contracting — Construction, Pergolas, Carports & Underground Shelters in Dubai` | `Dubai contractor specialising in luxury pergolas, carports, dewatering, excavation, waterproofing & underground shelters. ISO certified, 500+ projects. Free quote.` |
| Pergolas | `Custom Pergola Construction in Dubai \| Al Hadeeqa Contracting` | `Custom luxury pergolas for Dubai villas, gardens & rooftops — steel, aluminium, timber & motorised louvres. ISO certified, 15+ years. Free site assessment.` |
| Carports | `Custom Carport Construction in Dubai \| Al Hadeeqa Contracting` | `Steel & aluminium carports for villas and commercial properties in Dubai. Design, fabrication & installation by Al Hadeeqa. Free quote.` |
| Dewatering | `Dewatering Services in Dubai \| Al Hadeeqa Contracting` | `Construction dewatering in Dubai — wellpoint, deepwell & sump pumping. 15+ years experience, ISO certified. Residential & commercial.` |
| Bunkers | `Underground Shelter Construction in Dubai \| Al Hadeeqa Contracting` | `Underground shelters from AED 100,000 in Dubai. Precast & poured-in-place, 2–15 people. 3 tiers available. Free site assessment.` |
| The Vault | `The Vault — Underground Luxury Living \| Al Hadeeqa Contracting` | `Underground luxury residence in Dubai from AED 5M. Car ramp, cinema, gym, lounge. Bunker-grade structure, luxury finishes. By consultation.` |

**Apply the same pattern to all remaining service pages.**

---

## Phase 4: New Pages to Create

These pages don't exist yet (or may be incomplete). Create them using the **existing site's component patterns and design language**.

### 4.1 Master FAQ Page (`/faq`)

Create a page that aggregates all service FAQs into one scrollable, categorised page.

**Structure:**
- H1: "Frequently Asked Questions — Al Hadeeqa Contracting"
- Opening paragraph: "Answers to common questions about Al Hadeeqa Contracting's services, including pergolas, carports, dewatering, excavation, underground shelters, and more."
- Category sections (H2): Company, Pergolas, Carports, Dewatering, Excavation, Waterproofing, Demolition, Underground Shelters, The Vault
- Each category contains its FAQ pairs (H3 question, paragraph answer)
- Jump links at the top for each category
- FAQPage schema covering all visible FAQs
- Breadcrumb schema: Home → FAQ

### 4.2 Individual Bunker Tier Pages

If these don't already exist as separate route pages, create them:

- `/bunkers/emergency-pod`
- `/bunkers/compact-shelter`
- `/bunkers/shelter`

Each page should contain:
1. H1 with product name and price
2. Answer paragraph (30-60 words describing the product)
3. Specs table (dimensions, capacity, depth, wall thickness, autonomy)
4. "What's Included" checklist
5. "What's Not Included" / cost savers
6. "Optional Upgrades"
7. Installation scope & timeline
8. FAQ section (5-8 questions specific to that tier)
9. CTA (WhatsApp for free site assessment)
10. Product schema + FAQ schema + Breadcrumb schema

**Use the content from the existing product tier documents in the project files for specs and descriptions.**

### 4.3 Service Pages That May Not Exist Yet

Check the router config. If any of these routes don't exist, create them as new page components following the existing site's patterns:

- `/services/excavation`
- `/services/demolition`
- `/services/waterproofing`
- `/services/boundary-walls`
- `/services/steel-structures`
- `/services/swimming-pools`
- `/services/landscaping`
- `/services/general-contracting`

Each new service page must have:
1. H1 matching the title tag
2. Answer-first paragraph (40-80 words)
3. "What We Do" section
4. Process section (Consultation → Design → Build → Handover)
5. FAQ section (5-8 questions)
6. Trust block (15+ years, ISO certified, 50+ crew, 500+ projects)
7. CTA (WhatsApp)
8. Service + FAQ + Breadcrumb schema

---

## Phase 5: Image & Media Optimisation

### 5.1 Image Filenames

Rename all project/service images to descriptive filenames:
- `luxury-aluminium-pergola-dubai-villa.jpg` (not `IMG_4521.jpg`)
- `excavation-dewatering-dubai-site.jpg`
- `underground-shelter-precast-installation.jpg`

### 5.2 Alt Text

Add descriptive alt text to every image on the site:
- "Custom aluminium pergola installed at a Dubai villa garden by Al Hadeeqa Contracting"
- "Excavation pit with wellpoint dewatering setup at a Dubai residential construction site"
- "Precast underground shelter being lowered into excavation pit by crane at an Ajman site"

### 5.3 Open Graph Images

Every page should have an `og:image` meta tag. If page-specific images don't exist, use the site's main logo/hero image.

---

## Phase 6: Internal Linking

### 6.1 Footer Enhancement

In the site footer, ensure there's a visible HTML link list containing:
- All service page links (by name)
- Bunker page link
- The Vault link
- FAQ link
- Contact link
- About link

This gives crawlers a clean site-wide link structure from every page.

### 6.2 Service Page Cross-links

On every service page, add a "Related Services" section near the bottom that links to 2-4 other service pages. Use descriptive anchor text:

Example on the Dewatering page:
- "Excavation & Earthworks" → `/services/excavation`
- "Waterproofing" → `/services/waterproofing`
- "Underground Shelters" → `/bunkers`

### 6.3 Bunker Page → Service Page Links

On the bunker landing page, add links back to relevant construction services:
- "Dewatering" (required for many bunker builds)
- "Waterproofing" (applied to all shelters)
- "Excavation" (required for all poured-in-place builds)

---

## Phase 7: Validation & Testing

After all changes are implemented:

### 7.1 Schema Validation

Test every page's JSON-LD using:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

**Every page must pass with zero errors.**

### 7.2 Pre-render Verification

After running `npm run build`:
1. Open `build/index.html` — it should contain full rendered HTML, not just an empty `<div id="root">`
2. Open `build/services/pergolas/index.html` (or whatever react-snap generates) — it should contain the full page content
3. Check that JSON-LD `<script>` tags appear in the generated HTML

### 7.3 Robots & Sitemap Verification

1. Visit `https://alhadeeqacontracting.com/robots.txt` — should serve the new file
2. Visit `https://alhadeeqacontracting.com/sitemap.xml` — should serve the new file
3. Visit `https://alhadeeqacontracting.com/llms.txt` — should serve the new file

### 7.4 Crawlability Check

Use `curl` or a browser to verify key pages return full HTML content:
```bash
curl -s https://alhadeeqacontracting.com/ | head -100
curl -s https://alhadeeqacontracting.com/services/pergolas | head -100
```

The output should contain actual text content, not just JavaScript bundles.

---

## Summary: What NOT to Do

1. **Do not redesign any existing pages.** Add to them.
2. **Do not use hidden text, invisible keywords, or off-screen content.** Everything must be visible.
3. **Do not add FAQ schema for questions that aren't visible on the page.**
4. **Do not add schema claims that aren't supported by visible on-page content.**
5. **Do not create thin location pages** (e.g. dozens of "pergola in [neighbourhood]" pages with no real content).
6. **Do not write generic brochure copy.** Every paragraph should answer a real buyer question with specific facts.
7. **Do not change the colour scheme, typography, layout, or design system.**
8. **Do not remove any existing content or components.**

---

## Summary: Priority Order

If you can only do a few things, do them in this exact order:

1. **Pre-rendering** (nothing else works without this)
2. **robots.txt + sitemap.xml + llms.txt** (let crawlers find the content)
3. **Organisation JSON-LD on homepage** (establish entity identity)
4. **Service + FAQ + Breadcrumb JSON-LD on every existing service page** (machine readability)
5. **Answer-first paragraphs on every service page** (give AI engines something to extract)
6. **Visible FAQ sections on every service page** (highest-impact AEO content)
7. **Meta titles + descriptions on every page** (control what appears in search)
8. **Product schema on bunker pages** (own the bunker query space)
9. **Create missing service pages** (one page per service intent)
10. **Internal linking + footer links** (crawlable site structure)

---

*Prepared for Claude Code implementation — Al Hadeeqa Contracting Co. L.L.C — March 2026*
