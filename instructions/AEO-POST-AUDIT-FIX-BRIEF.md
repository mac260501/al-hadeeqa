# Al Hadeeqa Contracting — AEO Fix Brief (Post-Audit)

## ⚠️ CRITICAL: DO NOT REDESIGN ANYTHING

The existing site design, layout, components, colours, typography, and styling must be preserved exactly as they are. This brief is about fixing invisible technical problems — not changing what users see.

**Do not:**
- Replace or restructure existing React components
- Change the visual layout, colours, fonts, or spacing
- Remove or reorder existing page sections
- Create new page templates that don't match the existing aesthetic

**Do:**
- Fix the build pipeline so pre-rendered HTML is output
- Wire up react-helmet-async so each page gets its own meta tags
- Add JSON-LD schema blocks to page components
- Add visible FAQ sections to pages that don't have them (matching existing design language)

---

## What the Audit Found

An external crawl of the live site on March 28, 2026 revealed that the AEO implementation from the previous brief partially worked but has three blockers that make everything else invisible to AI crawlers:

### Blocker 1: Pre-rendering is not working
Every page on the site returns `<body><div id="root"></div></body>` — an empty div with no content. AI crawlers (ChatGPT, Perplexity, ClaudeBot, Googlebot) see zero text when they fetch any page. The JSON-LD in the `<head>` is visible, but there is no body content to extract, cite, or index.

### Blocker 2: Every page has identical `<title>`, `<meta description>`, and `<canonical>`
The pergolas page, bunkers page, FAQ page, vault page, and every other inner page all serve the exact same `<head>` tags as the homepage:
- Same title: "Al Hadeeqa Contracting — Construction, Pergolas, Carports & Underground Shelters in Dubai"
- Same description: "Al Hadeeqa Contracting: Dubai construction company since 2009..."
- Same canonical: `https://alhadeeqacontracting.com/`

This means Google and AI engines think every page is a duplicate of the homepage. The canonical pointing to `/` on every page tells search engines "ignore this page, the homepage is the real one."

### Blocker 3: No per-page JSON-LD schemas
Every page only has the two homepage-level JSON-LD blocks (Organisation + WebSite). None of the page-specific schemas were added:
- No Service schema on service pages
- No Product schema on bunker tier pages
- No FAQPage schema on any page
- No BreadcrumbList schema on any inner page

### What Passed
These items are correctly implemented and should NOT be touched:
- `robots.txt` — correct, all AI bots allowed ✓
- `sitemap.xml` — 21 URLs, correct format ✓
- `llms.txt` — detailed and well-structured ✓
- Organisation JSON-LD in index.html `<head>` ✓
- WebSite JSON-LD in index.html `<head>` ✓
- Open Graph + Twitter Card meta on homepage ✓

---

## Fix 1: Pre-rendering (THE #1 PRIORITY)

The site is a React CRA app deployed on Netlify. The build currently outputs a single `index.html` with an empty `<div id="root">` and a JavaScript bundle that renders everything client-side. Crawlers that don't execute JavaScript see nothing.

### What needs to happen
After `npm run build`, every route in the app must have a corresponding HTML file in the `build/` directory that contains the fully rendered page content — not just the empty shell.

### Approach A: react-snap (preferred)

```bash
npm install --save-dev react-snap
```

In `package.json`, add:
```json
{
  "scripts": {
    "postbuild": "react-snap"
  },
  "reactSnap": {
    "source": "build",
    "inlineCss": true,
    "puppeteerArgs": ["--no-sandbox", "--disable-setuid-sandbox"],
    "skipThirdPartyRequests": true
  }
}
```

In `src/index.js` (or wherever ReactDOM.render is called), change:
```jsx
// BEFORE:
ReactDOM.render(<App />, document.getElementById('root'));

// AFTER:
const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
```

This tells React to hydrate (attach event listeners to existing HTML) when pre-rendered content exists, instead of re-rendering from scratch.

**After making this change, run `npm run build` and verify:**
1. Open `build/index.html` — it should contain visible text content inside `<div id="root">`, not an empty div
2. Check that `build/services/pergolas/index.html` exists and contains rendered content
3. Check that `build/bunkers/index.html` exists and contains rendered content
4. Check that `build/faq/index.html` exists and contains rendered content

If `react-snap` fails or produces errors, check:
- Are there any routes that rely on browser APIs (window, localStorage) at the module level? Wrap them in `typeof window !== 'undefined'` checks
- Are there lazy-loaded components? react-snap needs to be able to render them
- Are there redirect loops? Check the React Router config and `_redirects` file

### Approach B: If react-snap doesn't work, use Netlify prerendering

Add to `netlify.toml`:
```toml
[[plugins]]
  package = "@netlify/plugin-prerender"
```

This uses a headless browser at deploy time to pre-render pages. It's less predictable than react-snap but requires fewer code changes.

### Approach C: If neither works, add static HTML fallback content

As a last resort, add meaningful content to the `<noscript>` tag in `public/index.html` so crawlers that don't execute JS still get something:

```html
<noscript>
  <h1>Al Hadeeqa Contracting Co. L.L.C</h1>
  <p>Dubai-based construction company specialising in luxury pergolas, carports, dewatering, excavation, demolition, waterproofing, underground shelters, boundary walls, steel structures, swimming pools, landscaping, and general contracting. Established 2009. ISO 9001:2015, ISO 14001:2015, OHSAS 18001:2007 certified. 50+ crew. 500+ projects completed.</p>
  <h2>Services</h2>
  <ul>
    <li><a href="/services/pergolas">Custom Pergola Construction</a> — Steel, aluminium, timber, motorised louvre. From AED 15,000.</li>
    <li><a href="/services/carports">Premium Carport Construction</a> — Custom carports for villas and commercial properties.</li>
    <li><a href="/services/dewatering">Dewatering Services</a> — Wellpoint, deepwell, sump pumping for construction sites.</li>
    <li><a href="/services/excavation">Excavation & Earthworks</a> — Residential and commercial excavation with shoring.</li>
    <li><a href="/services/demolition">Controlled Demolition</a> — Licensed demolition and site clearance.</li>
    <li><a href="/services/waterproofing">Waterproofing</a> — Membrane, crystalline, and bituminous systems. 10-year warranty.</li>
    <li><a href="/bunkers">Underground Shelters</a> — From AED 100,000. Precast and poured-in-place options.</li>
    <li><a href="/the-vault">The Vault</a> — Underground luxury residence from AED 5,000,000.</li>
  </ul>
  <h2>Underground Shelter Pricing</h2>
  <ul>
    <li>Emergency Pod: AED 100,000 — Precast, 7-8 sqm, 2-4 people, installed in 1-2 days</li>
    <li>Compact Shelter: AED 200,000 — Precast, 15-20 sqm, 6-8 people, HEPA filtration</li>
    <li>Shelter: From AED 500,000 — Poured-in-place, 28 sqm, 8-15 people, blast door</li>
    <li>Custom sizes: AED 15,200 per sqm</li>
  </ul>
  <h2>Contact</h2>
  <p>Office 404, PTC Building, Al Qusais Industrial First, Dubai, UAE</p>
  <p>Tel: +971 4 263 2371 | Mobile: +971 54 441 9854 | Email: alhadeeqallc@gmail.com</p>
  <p>WhatsApp: <a href="https://wa.me/971544419854">+971 54 441 9854</a></p>
</noscript>
```

This is not a replacement for proper pre-rendering — it's a safety net. Pursue Approach A first.

### Verification after fixing pre-rendering

Run this from a terminal to confirm the fix worked on the live site:
```bash
curl -s https://alhadeeqacontracting.com/ | grep -c '<div id="root">'
# Should return 1

curl -s https://alhadeeqacontracting.com/ | grep -c 'Al Hadeeqa Contracting'
# Should return MORE than just the title tag count (5+ occurrences means body content exists)

curl -s https://alhadeeqacontracting.com/services/pergolas | grep -o '<title>[^<]*</title>'
# Should show a DIFFERENT title than the homepage

curl -s https://alhadeeqacontracting.com/bunkers | grep -oP 'canonical" href="[^"]*"'
# Should show href="/bunkers" or the full bunkers URL, NOT href="/"
```

---

## Fix 2: Per-Page Meta Tags via react-helmet-async

### Step 1: Install and wire up react-helmet-async

```bash
npm install react-helmet-async
```

In the app's root entry point (likely `src/index.js` or `src/App.js`), wrap the entire app in `<HelmetProvider>`:

```jsx
import { HelmetProvider } from 'react-helmet-async';

// Find the existing root component and wrap it:
<HelmetProvider>
  <App />  {/* or <BrowserRouter><App /></BrowserRouter> — whatever already exists */}
</HelmetProvider>
```

**Do not restructure the component tree.** Just add the wrapper.

### Step 2: Add Helmet to every page component

In every page/route component, add a `<Helmet>` block at the top of the return JSX. This overrides the static tags in `public/index.html` at runtime.

**The key insight:** react-helmet-async works by replacing `<head>` tags at runtime in the browser. But for crawlers, these overrides only appear if pre-rendering is working (Fix 1). That's why Fix 1 must be done first — without it, Helmet changes are invisible to crawlers.

Below is the complete list of per-page meta overrides. Add a `<Helmet>` block to each page component with these exact values:

#### Homepage (`/`)
The homepage already has correct meta in `index.html`. Add Helmet anyway so it's consistent:
```jsx
<Helmet>
  <title>Al Hadeeqa Contracting — Construction, Pergolas, Carports & Underground Shelters in Dubai</title>
  <meta name="description" content="Al Hadeeqa Contracting: Dubai construction company since 2009. Pergolas from AED 15,000, carports, dewatering, underground shelters from AED 100,000, and The Vault luxury underground residence. ISO 9001 & 14001 certified. 50+ crew. Free site assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/" />
  <meta property="og:title" content="Al Hadeeqa Contracting — Construction, Pergolas, Carports & Underground Shelters in Dubai" />
  <meta property="og:description" content="Dubai construction company since 2009. Pergolas, carports, dewatering, underground shelters from AED 100,000. ISO certified. Free site assessment." />
  <meta property="og:url" content="https://alhadeeqacontracting.com/" />
</Helmet>
```

#### Pergolas (`/services/pergolas`)
```jsx
<Helmet>
  <title>Custom Pergola Construction in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Custom luxury pergolas for Dubai villas, gardens & rooftops — steel, aluminium, timber & motorised louvres. From AED 15,000. ISO certified, 50+ crew. Free site assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/pergolas" />
  <meta property="og:title" content="Custom Pergola Construction in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:description" content="Custom luxury pergolas for Dubai villas — steel, aluminium, timber & motorised louvres. From AED 15,000. Free site assessment." />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/pergolas" />
</Helmet>
```

#### Carports (`/services/carports`)
```jsx
<Helmet>
  <title>Premium Carport Construction in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Custom steel & aluminium carports for villas and commercial properties in Dubai. Design, fabrication & installation. ISO certified. Free site assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/carports" />
  <meta property="og:title" content="Premium Carport Construction in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/carports" />
</Helmet>
```

#### Dewatering (`/services/dewatering`)
```jsx
<Helmet>
  <title>Dewatering Services in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Professional construction dewatering in Dubai — wellpoint, deepwell & sump pumping. Residential & commercial. ISO certified, 15+ years experience. Free assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/dewatering" />
  <meta property="og:title" content="Dewatering Services in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/dewatering" />
</Helmet>
```

#### Construction & Remodeling (`/services/construction`)
```jsx
<Helmet>
  <title>Construction & Remodeling in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Full-scope residential and commercial construction, villa extensions, fit-outs and remodeling in Dubai. ISO certified, 50+ crew. Free consultation." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/construction" />
  <meta property="og:title" content="Construction & Remodeling in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/construction" />
</Helmet>
```

#### Shoring (`/services/shoring`)
```jsx
<Helmet>
  <title>Shoring & Excavation Support in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Excavation shoring and support systems for deep basements and constrained sites in Dubai. Sheet piling, soldier pile, and bracing. Free site assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/shoring" />
  <meta property="og:title" content="Shoring & Excavation Support in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/shoring" />
</Helmet>
```

#### Excavation (`/services/excavation`)
```jsx
<Helmet>
  <title>Excavation & Earthworks in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Controlled excavation and earthworks for foundations, basements and utility trenching in Dubai. ISO certified contractor with 50+ crew. Free assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/excavation" />
  <meta property="og:title" content="Excavation & Earthworks in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/excavation" />
</Helmet>
```

#### Demolition (`/services/demolition`)
```jsx
<Helmet>
  <title>Controlled Demolition in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Licensed demolition and site clearance for residential and commercial properties in Dubai. Safe, controlled methods. ISO certified. Free site assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/demolition" />
  <meta property="og:title" content="Controlled Demolition in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/demolition" />
</Helmet>
```

#### Glass Rooms (`/services/glassrooms`)
```jsx
<Helmet>
  <title>Glass Rooms & Partitions in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Architectural glass installations, partitions, balustrades and enclosures in Dubai. Custom design and installation. ISO certified contractor." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/glassrooms" />
  <meta property="og:title" content="Glass Rooms & Partitions in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/glassrooms" />
</Helmet>
```

#### Waterproofing (`/services/waterproofing`)
```jsx
<Helmet>
  <title>Roof Waterproofing in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Membrane and coating waterproofing for flat roofs, terraces, basements and wet areas in Dubai. 10-year warranty. ISO certified. Free assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/waterproofing" />
  <meta property="og:title" content="Roof Waterproofing in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/waterproofing" />
</Helmet>
```

#### Maintenance (`/services/maintenance`)
```jsx
<Helmet>
  <title>Property Maintenance Services in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Planned and reactive property maintenance for villas and commercial properties in Dubai. Painting, plumbing, electrical, civil works. ISO certified." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services/maintenance" />
  <meta property="og:title" content="Property Maintenance in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services/maintenance" />
</Helmet>
```

#### Bunkers Overview (`/bunkers`)
```jsx
<Helmet>
  <title>Underground Shelter Construction in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Underground shelters from AED 100,000 in Dubai. Precast & poured-in-place options for 2–15 people. 3 tiers: Emergency Pod, Compact Shelter, Shelter. Free site assessment." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers" />
  <meta property="og:title" content="Underground Shelter Construction in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:description" content="Underground shelters from AED 100,000. Precast & poured-in-place. 3 tiers for 2–15 people. Free site assessment." />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers" />
</Helmet>
```

#### Emergency Pod (`/bunkers/emergency-pod`)
```jsx
<Helmet>
  <title>Emergency Pod — Precast Underground Shelter AED 100,000 | Al Hadeeqa</title>
  <meta name="description" content="Precast underground shelter for 2–4 people. 7–8 sqm, AED 100,000. Manufactured in 5–7 days, installed in 1–2 days. 220mm reinforced concrete. Al Hadeeqa Contracting, Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers/emergency-pod" />
  <meta property="og:title" content="Emergency Pod — Precast Underground Shelter | AED 100,000" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers/emergency-pod" />
</Helmet>
```

#### Compact Shelter (`/bunkers/compact-shelter`)
```jsx
<Helmet>
  <title>Compact Shelter — Precast Underground Shelter AED 200,000 | Al Hadeeqa</title>
  <meta name="description" content="Precast underground shelter for 6–8 people. 15–20 sqm, AED 200,000. HEPA filtration, battery power, intercom. Installed in 2–3 days. Al Hadeeqa Contracting, Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers/compact-shelter" />
  <meta property="og:title" content="Compact Shelter — Precast Underground Shelter | AED 200,000" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers/compact-shelter" />
</Helmet>
```

#### Shelter (`/bunkers/shelter`)
```jsx
<Helmet>
  <title>Shelter — Poured-in-Place Underground Shelter From AED 500,000 | Al Hadeeqa</title>
  <meta name="description" content="Poured-in-place underground shelter for 8–15 people. 28 sqm, from AED 500,000. Blast door, HEPA, full bathroom, 48hr battery. Custom sizes at AED 15,200/sqm. Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers/shelter" />
  <meta property="og:title" content="Shelter — Poured-in-Place Underground Shelter | From AED 500,000" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers/shelter" />
</Helmet>
```

#### The Vault (`/the-vault`)
```jsx
<Helmet>
  <title>The Vault — Underground Luxury Living in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Underground luxury residence from AED 5,000,000. 300–500+ sqm. Car ramp, garage, cinema, gym, lounge, bedrooms. Bunker-grade structure with luxury finishes. Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/the-vault" />
  <meta property="og:title" content="The Vault — Underground Luxury Living | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/the-vault" />
</Helmet>
```

#### FAQ (`/faq`)
```jsx
<Helmet>
  <title>FAQ — Al Hadeeqa Contracting | Pergolas, Bunkers, Dewatering & More</title>
  <meta name="description" content="Answers to common questions about Al Hadeeqa Contracting's services — pergolas, carports, dewatering, underground shelters, waterproofing, pricing, timelines, and permits in Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/faq" />
  <meta property="og:title" content="FAQ — Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/faq" />
</Helmet>
```

#### About (`/about`)
```jsx
<Helmet>
  <title>About Al Hadeeqa Contracting — Dubai Contractor Since 2009</title>
  <meta name="description" content="Al Hadeeqa Contracting Co. L.L.C — Dubai construction company founded 2009 by Engr. Muhammad Ashraf Jan. ISO 9001, 14001 certified. 50+ crew. 500+ projects. ASCB(E) accredited." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/about" />
  <meta property="og:title" content="About Al Hadeeqa Contracting — Dubai Contractor Since 2009" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/about" />
</Helmet>
```

#### Projects (`/projects`)
```jsx
<Helmet>
  <title>Projects — Al Hadeeqa Contracting | Pergolas, Carports & Construction in Dubai</title>
  <meta name="description" content="View Al Hadeeqa Contracting's completed projects across Dubai — luxury pergolas, carports, dewatering, underground shelters, and general construction." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/projects" />
  <meta property="og:title" content="Projects — Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/projects" />
</Helmet>
```

#### Contact (`/contact`)
```jsx
<Helmet>
  <title>Contact Al Hadeeqa Contracting — Free Site Assessment in Dubai</title>
  <meta name="description" content="Contact Al Hadeeqa Contracting for a free site assessment in Dubai. WhatsApp: +971 54 441 9854. Office: Al Qusais Industrial, Dubai. Pergolas, carports, underground shelters." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/contact" />
  <meta property="og:title" content="Contact Al Hadeeqa Contracting — Free Site Assessment" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/contact" />
</Helmet>
```

#### Services Overview (`/services`)
```jsx
<Helmet>
  <title>Construction Services in Dubai | Al Hadeeqa Contracting</title>
  <meta name="description" content="Al Hadeeqa Contracting's full range of Dubai construction services — pergolas, carports, dewatering, excavation, demolition, waterproofing, underground shelters, and more." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/services" />
  <meta property="og:title" content="Construction Services in Dubai | Al Hadeeqa Contracting" />
  <meta property="og:url" content="https://alhadeeqacontracting.com/services" />
</Helmet>
```

---

## Fix 3: Per-Page JSON-LD Schemas

Create a utility file at `src/utils/schemas.js` (or wherever makes sense in the existing codebase) with reusable schema builders:

```jsx
// src/utils/schemas.js

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

export const createProductSchema = ({ name, description, price, url, properties }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": name,
  "description": description,
  "brand": { "@type": "Brand", "name": "Al Hadeeqa Contracting" },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "AED",
    "price": String(price),
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "url": url
  },
  "additionalProperty": (properties || []).map(p => ({
    "@type": "PropertyValue",
    "name": p.name,
    "value": p.value
  }))
});
```

Then in each page component, import the relevant builders and add them via Helmet:

```jsx
import { Helmet } from 'react-helmet-async';
import { createServiceSchema, createBreadcrumbSchema, createFAQSchema } from '../utils/schemas';

// Inside the component:
const serviceSchema = createServiceSchema({ /* ... */ });
const breadcrumbSchema = createBreadcrumbSchema([ /* ... */ ]);
const faqSchema = createFAQSchema([ /* ... */ ]);

// In the JSX return, inside the existing <Helmet> block:
<Helmet>
  {/* ... title, meta, canonical from Fix 2 ... */}
  <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
  <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
  <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
</Helmet>
```

### Schemas to add per page

**Every service page** gets: Service + Breadcrumb + FAQ (if the page has visible FAQ content)

**Every bunker tier page** gets: Product + Breadcrumb + FAQ

**The FAQ page** gets: FAQPage + Breadcrumb

**The Vault** gets: Product + Breadcrumb + FAQ

**About, Contact, Projects** get: Breadcrumb only

### Breadcrumb patterns

```
Homepage: (no breadcrumb needed)
/about: Home → About
/services: Home → Services
/services/pergolas: Home → Services → Pergolas
/services/carports: Home → Services → Carports
/services/dewatering: Home → Services → Dewatering
(same pattern for all services)
/bunkers: Home → Underground Shelters
/bunkers/emergency-pod: Home → Underground Shelters → Emergency Pod
/bunkers/compact-shelter: Home → Underground Shelters → Compact Shelter
/bunkers/shelter: Home → Underground Shelters → Shelter
/the-vault: Home → The Vault
/faq: Home → FAQ
/projects: Home → Projects
/contact: Home → Contact
```

### FAQ schema — only for visible FAQs

**Important rule:** Only add FAQPage schema for questions that are visibly displayed as text on the page. If a page doesn't have a visible FAQ section, don't add FAQ schema to it. If a page does have visible FAQs, the schema must match exactly what's shown on-page.

### Product schema for bunker tiers

**Emergency Pod:**
```js
createProductSchema({
  name: "Emergency Pod — Precast Underground Shelter",
  description: "Precast reinforced concrete underground shelter for 2–4 people. 7–8 sqm internal area. Manufactured at Al Hadeeqa's Ajman yard in 5–7 days, installed on-site in 1–2 days by crane. 220mm walls, 2.5–3m depth.",
  price: 100000,
  url: "https://alhadeeqacontracting.com/bunkers/emergency-pod",
  properties: [
    { name: "Internal Area", value: "7–8 sqm" },
    { name: "Capacity", value: "2–4 people" },
    { name: "Construction", value: "Precast reinforced concrete" },
    { name: "Wall Thickness", value: "220mm" },
    { name: "Depth", value: "2.5–3.0m below grade" },
    { name: "Install Time", value: "1–2 days" },
    { name: "Manufacturing", value: "5–7 days" },
    { name: "Autonomy", value: "12–24 hours" }
  ]
})
```

**Compact Shelter:**
```js
createProductSchema({
  name: "Compact Shelter — Precast Underground Shelter",
  description: "Precast underground shelter for 6–8 people. 15–20 sqm. HEPA filtration, 24-hour battery, intercom, 200L water tank. Two interlocking halves, installed in 2–3 days.",
  price: 200000,
  url: "https://alhadeeqacontracting.com/bunkers/compact-shelter",
  properties: [
    { name: "Internal Area", value: "15–20 sqm" },
    { name: "Capacity", value: "6–8 people" },
    { name: "Construction", value: "Precast reinforced concrete (2 halves)" },
    { name: "Wall Thickness", value: "250mm" },
    { name: "Depth", value: "3.0–3.5m below grade" },
    { name: "Install Time", value: "2–3 days" },
    { name: "Manufacturing", value: "10–14 days" },
    { name: "Autonomy", value: "1–3 days" }
  ]
})
```

**Shelter (Poured-in-Place):**
```js
createProductSchema({
  name: "Shelter — Poured-in-Place Underground Shelter",
  description: "Poured-in-place reinforced concrete underground shelter for 8–15 people. 28 sqm (7m×4m). Certified blast door, HEPA filtration, full bathroom, 500L water, 48hr battery. Built on-site in 4–6 weeks. Custom sizes at AED 15,200/sqm.",
  price: 500000,
  url: "https://alhadeeqacontracting.com/bunkers/shelter",
  properties: [
    { name: "Internal Area", value: "28 sqm (7m × 4m)" },
    { name: "Capacity", value: "8–15 people" },
    { name: "Construction", value: "Poured-in-place reinforced concrete" },
    { name: "Wall Thickness", value: "300–400mm" },
    { name: "Depth", value: "3.0–4.0m below grade" },
    { name: "Construction Time", value: "4–6 weeks" },
    { name: "Autonomy", value: "1–3 days" },
    { name: "Custom Price", value: "AED 15,200 per sqm" }
  ]
})
```

**The Vault:**
```js
createProductSchema({
  name: "The Vault — Underground Luxury Residence",
  description: "Underground luxury residence in Dubai from AED 5,000,000. 300–500+ sqm. Car ramp descent, underground garage, cinema, gym, lounge bar, bedrooms, full kitchen. Bunker-grade 500mm reinforced concrete structure concealed behind luxury finishes.",
  price: 5000000,
  url: "https://alhadeeqacontracting.com/the-vault",
  properties: [
    { name: "Size Range", value: "300–500+ sqm" },
    { name: "Construction", value: "Poured-in-place, 500mm reinforced concrete" },
    { name: "Entry", value: "Car ramp descent" },
    { name: "Zones", value: "Garage, cinema, gym, lounge, bedrooms, kitchen, utility" },
    { name: "Protection", value: "Bunker-grade structure, concealed" }
  ]
})
```

---

## Execution Order

1. **Fix 1 first** — get pre-rendering working. Deploy and verify with curl that body content appears.
2. **Fix 2 next** — add Helmet to every page component with unique titles, descriptions, canonicals. Deploy and verify each page has distinct `<title>` tags.
3. **Fix 3 last** — add per-page JSON-LD schemas. Deploy and verify with Google Rich Results Test.

Do not attempt Fix 2 or Fix 3 without Fix 1 being confirmed working. Without pre-rendering, Helmet overrides and JSON-LD injected via Helmet are invisible to crawlers.

---

## Post-Fix Verification Checklist

After all three fixes are deployed, run these checks:

```bash
# 1. Body content exists (not empty div)
curl -s https://alhadeeqacontracting.com/ | grep -c 'Al Hadeeqa'
# Expect: 5+ (entity name appears in body text, not just head)

# 2. Pergolas page has unique title
curl -s https://alhadeeqacontracting.com/services/pergolas | grep -o '<title>[^<]*</title>'
# Expect: "Custom Pergola Construction in Dubai | Al Hadeeqa Contracting"

# 3. Bunkers page has correct canonical
curl -s https://alhadeeqacontracting.com/bunkers | grep -oP 'canonical" href="[^"]*"'
# Expect: href="https://alhadeeqacontracting.com/bunkers"

# 4. Emergency Pod has Product schema
curl -s https://alhadeeqacontracting.com/bunkers/emergency-pod | grep -c '"@type": "Product"'
# Expect: 1

# 5. FAQ page has FAQPage schema
curl -s https://alhadeeqacontracting.com/faq | grep -c '"@type": "FAQPage"'
# Expect: 1

# 6. Service pages have Service schema
curl -s https://alhadeeqacontracting.com/services/pergolas | grep -c '"@type": "Service"'
# Expect: 1

# 7. Inner pages have BreadcrumbList
curl -s https://alhadeeqacontracting.com/services/pergolas | grep -c '"@type": "BreadcrumbList"'
# Expect: 1

# 8. Total JSON-LD blocks on a service page (Org + WebSite + Service + Breadcrumb + FAQ = 5)
curl -s https://alhadeeqacontracting.com/services/pergolas | grep -c 'application/ld+json'
# Expect: 5 (or 4 if no FAQ on that page)
```

If any check fails, debug before moving on.

---

*Post-audit fix brief — Al Hadeeqa Contracting — March 28, 2026*
