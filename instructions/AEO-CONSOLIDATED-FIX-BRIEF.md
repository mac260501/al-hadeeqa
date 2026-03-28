# Al Hadeeqa Contracting — Consolidated AEO Fix Brief

**Source:** Findings from 3 independent AI audits (Claude crawl, ChatGPT, Gemini) performed March 28, 2026  
**Target:** Claude Code implementation  
**Site:** https://alhadeeqacontracting.com (React CRA, Netlify)

---

## ⚠️ DO NOT REDESIGN ANYTHING

Preserve all existing design, layout, components, colours, typography, and styling. This brief is purely about fixing technical issues, adding structured data, and inserting content blocks that match the existing visual language.

---

## What's Already Working (DO NOT TOUCH)

All three audits confirmed these are correctly implemented:

- Pre-rendering is active (body has rendered HTML content) ✓
- robots.txt allows all AI bots ✓
- sitemap.xml has 21 URLs ✓
- llms.txt is detailed and well-structured ✓
- Organisation + WebSite JSON-LD on homepage ✓
- Open Graph + Twitter Card meta on homepage ✓
- Unique titles on all service pages (pergolas, carports, dewatering, etc.) ✓
- Correct canonicals on all service pages ✓
- Service + FAQ + Breadcrumb JSON-LD on service pages ✓
- FAQPage schema on the FAQ page ✓
- Product + FAQ + Breadcrumb JSON-LD on The Vault ✓
- Breadcrumb schema on all inner pages ✓

---

## Part 1: Critical Fixes (From Claude Crawl Audit)

These are verified broken via `curl` against the live site. Fix these first.

### 1.1 Emergency Pod — Missing Helmet (`/bunkers/emergency-pod`)

**Problem:** The page currently returns the homepage's default title, description, and canonical. No Product schema. No FAQ schema. Helmet is not wired up on this component.

**Fix:** Find the Emergency Pod page component and add:

```jsx
<Helmet>
  <title>Emergency Pod — Precast Underground Shelter | AED 100,000 | Al Hadeeqa Contracting</title>
  <meta name="description" content="Precast underground shelter for 2–4 people. 7–8 sqm, AED 100,000. Manufactured in 5–7 days, installed in 1–2 days by crane. 220mm reinforced concrete walls. Al Hadeeqa Contracting, Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers/emergency-pod" />
  <meta property="og:title" content="Emergency Pod — Precast Underground Shelter | AED 100,000" />
  <meta property="og:description" content="Precast underground shelter for 2–4 people. 7–8 sqm, AED 100,000. Installed in 1–2 days. Al Hadeeqa Contracting, Dubai." />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers/emergency-pod" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Emergency Pod — Precast Underground Shelter",
    "description": "Precast reinforced concrete underground shelter for 2–4 people. 7–8 sqm internal area. Manufactured at Al Hadeeqa's Ajman facility in 5–7 days, installed on-site in 1–2 days by crane. 220mm C40 reinforced concrete walls, steel top-entry hatch, manual ventilation, 40L water storage, chemical toilet.",
    "brand": { "@type": "Brand", "name": "Al Hadeeqa Contracting" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": "100000",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://alhadeeqacontracting.com/bunkers/emergency-pod"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Internal Area", "value": "7–8 sqm" },
      { "@type": "PropertyValue", "name": "Capacity", "value": "2–4 people" },
      { "@type": "PropertyValue", "name": "Construction Type", "value": "Precast reinforced concrete" },
      { "@type": "PropertyValue", "name": "Wall Thickness", "value": "220mm C40" },
      { "@type": "PropertyValue", "name": "Depth", "value": "2.5–3.0m below grade" },
      { "@type": "PropertyValue", "name": "Installation Time", "value": "1–2 days" },
      { "@type": "PropertyValue", "name": "Manufacturing Time", "value": "5–7 days" },
      { "@type": "PropertyValue", "name": "Autonomy", "value": "12–24 hours" },
      { "@type": "PropertyValue", "name": "Weight", "value": "8–10 tonnes" }
    ]
  })}</script>
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhadeeqacontracting.com" },
      { "@type": "ListItem", "position": 2, "name": "Underground Shelters", "item": "https://alhadeeqacontracting.com/bunkers" },
      { "@type": "ListItem", "position": 3, "name": "Emergency Pod", "item": "https://alhadeeqacontracting.com/bunkers/emergency-pod" }
    ]
  })}</script>
</Helmet>
```

### 1.2 Compact Shelter — Missing Helmet (`/bunkers/compact-shelter`)

**Same problem as Emergency Pod.** Add:

```jsx
<Helmet>
  <title>Compact Shelter — Precast Underground Shelter | AED 200,000 | Al Hadeeqa Contracting</title>
  <meta name="description" content="Precast underground shelter for 6–8 people. 15–20 sqm, AED 200,000. HEPA filtration, 24hr battery, intercom, 200L water tank. Installed in 2–3 days. Al Hadeeqa Contracting, Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers/compact-shelter" />
  <meta property="og:title" content="Compact Shelter — Precast Underground Shelter | AED 200,000" />
  <meta property="og:description" content="Precast underground shelter for 6–8 people. 15–20 sqm, AED 200,000. HEPA filtration included. Al Hadeeqa Contracting, Dubai." />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers/compact-shelter" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Compact Shelter — Precast Underground Shelter",
    "description": "Precast reinforced concrete underground shelter for 6–8 people. 15–20 sqm. Two interlocking halves manufactured at Al Hadeeqa's Ajman facility. HEPA filtration, 24-hour battery, intercom, 200L water tank, fold-down bunks for 4–6. Installed in 2–3 days.",
    "brand": { "@type": "Brand", "name": "Al Hadeeqa Contracting" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": "200000",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://alhadeeqacontracting.com/bunkers/compact-shelter"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Internal Area", "value": "15–20 sqm" },
      { "@type": "PropertyValue", "name": "Capacity", "value": "6–8 people" },
      { "@type": "PropertyValue", "name": "Construction Type", "value": "Precast reinforced concrete (2 interlocking halves)" },
      { "@type": "PropertyValue", "name": "Wall Thickness", "value": "250mm C40" },
      { "@type": "PropertyValue", "name": "Depth", "value": "3.0–3.5m below grade" },
      { "@type": "PropertyValue", "name": "Installation Time", "value": "2–3 days" },
      { "@type": "PropertyValue", "name": "Manufacturing Time", "value": "10–14 days" },
      { "@type": "PropertyValue", "name": "Autonomy", "value": "1–3 days" },
      { "@type": "PropertyValue", "name": "Weight", "value": "18–22 tonnes" }
    ]
  })}</script>
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhadeeqacontracting.com" },
      { "@type": "ListItem", "position": 2, "name": "Underground Shelters", "item": "https://alhadeeqacontracting.com/bunkers" },
      { "@type": "ListItem", "position": 3, "name": "Compact Shelter", "item": "https://alhadeeqacontracting.com/bunkers/compact-shelter" }
    ]
  })}</script>
</Helmet>
```

### 1.3 Shelter — Missing Helmet (`/bunkers/shelter`)

**Same problem.** Add:

```jsx
<Helmet>
  <title>Shelter — Poured-in-Place Underground Shelter | From AED 500,000 | Al Hadeeqa Contracting</title>
  <meta name="description" content="Poured-in-place underground shelter for 8–15 people. 28 sqm (7m×4m), from AED 500,000. Blast door, HEPA filtration, full bathroom, 500L water, 48hr battery. Custom sizes at AED 15,200/sqm. Dubai." />
  <link rel="canonical" href="https://alhadeeqacontracting.com/bunkers/shelter" />
  <meta property="og:title" content="Shelter — Poured-in-Place Underground Shelter | From AED 500,000" />
  <meta property="og:description" content="Poured-in-place underground shelter for 8–15 people. 28 sqm, from AED 500,000. Blast door, full bathroom. Custom sizes at AED 15,200/sqm. Dubai." />
  <meta property="og:url" content="https://alhadeeqacontracting.com/bunkers/shelter" />
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Shelter — Poured-in-Place Underground Shelter",
    "description": "Poured-in-place reinforced concrete underground shelter for 8–15 people. 28 sqm standard (7m × 4m), custom sizes at AED 15,200/sqm. Certified blast door, airtight secondary door, HEPA filtration, full bathroom with shower, 500L water storage, 48-hour battery system, kitchenette. Built on-site in 4–6 weeks.",
    "brand": { "@type": "Brand", "name": "Al Hadeeqa Contracting" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": "500000",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "url": "https://alhadeeqacontracting.com/bunkers/shelter"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Internal Area", "value": "28 sqm (7m × 4m)" },
      { "@type": "PropertyValue", "name": "Capacity", "value": "8–15 people" },
      { "@type": "PropertyValue", "name": "Construction Type", "value": "Poured-in-place reinforced concrete" },
      { "@type": "PropertyValue", "name": "Wall Thickness", "value": "300–400mm C40" },
      { "@type": "PropertyValue", "name": "Depth", "value": "3.0–4.0m below grade" },
      { "@type": "PropertyValue", "name": "Construction Time", "value": "4–6 weeks" },
      { "@type": "PropertyValue", "name": "Autonomy", "value": "1–3 days" },
      { "@type": "PropertyValue", "name": "Custom Pricing", "value": "AED 15,200 per sqm" },
      { "@type": "PropertyValue", "name": "Blast Door", "value": "Yes — certified" }
    ]
  })}</script>
  <script type="application/ld+json">{JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alhadeeqacontracting.com" },
      { "@type": "ListItem", "position": 2, "name": "Underground Shelters", "item": "https://alhadeeqacontracting.com/bunkers" },
      { "@type": "ListItem", "position": 3, "name": "Shelter", "item": "https://alhadeeqacontracting.com/bunkers/shelter" }
    ]
  })}</script>
</Helmet>
```

### 1.4 Bunkers Overview — Canonical Typo (`/bunkers`)

Find the Helmet block in the bunkers overview component. The canonical currently says:
```
href="https://alhadeeqacontracting.com/bunker"
```
Change it to:
```
href="https://alhadeeqacontracting.com/bunkers"
```
Also fix og:url if it has the same typo.

### 1.5 The Vault — Canonical Typo (`/the-vault`)

Find the Helmet block in The Vault component. The canonical currently says:
```
href="https://alhadeeqacontracting.com/vault"
```
Change it to:
```
href="https://alhadeeqacontracting.com/the-vault"
```
Also fix og:url if it has the same typo.

---

## Part 2: Entity Consistency Fix (From ChatGPT Audit)

### 2.1 Standardise the Experience / Timeline Wording

**Problem (flagged by ChatGPT):** The site currently shows both "Established in 2009" and "35+ Years in UAE." These are both true but can appear contradictory to an AI system. A model may flag the discrepancy and lower confidence in the entity.

**Fix:** Use one standardised sentence everywhere it appears — homepage, about page, footer, schema description, llms.txt:

> "Al Hadeeqa Contracting was established in 2009. Our founder and team bring over 35 years of UAE construction experience."

Search the codebase for every instance of "35+ Years" or "35 years" and ensure it appears alongside the 2009 founding date with this clarifying framing. Do not remove either claim — just make sure they're always presented together so the relationship is clear.

### 2.2 Standardise the Company Name

Use one exact version everywhere:
- **Full legal name (schema, contracts, about page):** Al Hadeeqa Contracting Co. L.L.C
- **Brand name (titles, navigation, general copy):** Al Hadeeqa Contracting
- **Do not use:** "Al Hadeeqa Construction" in visible copy (keep it only in `alternateName` in schema)

### 2.3 Standardise the Contact Block

Use one canonical version in the footer, contact page, about page, and schema:
- **Office:** Office 404, PTC Building, Al Qusais Industrial First, Dubai, UAE
- **Tel:** +971 4 263 2371
- **Mobile:** +971 54 441 9854
- **Email:** alhadeeqallc@gmail.com
- **WhatsApp:** +971 54 441 9854

Check that these match exactly across all pages. Inconsistencies in NAP (Name, Address, Phone) hurt entity recognition.

---

## Part 3: Header Discovery Link (From Gemini Audit)

### 3.1 Add `llms-txt` Link Tag

Gemini flagged that the `<head>` should contain a discovery link pointing AI agents to llms.txt. Add this to `public/index.html` inside `<head>`:

```html
<link rel="llms-txt" href="https://alhadeeqacontracting.com/llms.txt">
```

This is a single line addition. It helps AI crawlers discover the llms.txt file without relying on robots.txt alone.

---

## Part 4: Schema Enhancement (From Gemini + ChatGPT Audits)

### 4.1 Add `openingHoursSpecification` to Organisation Schema

Gemini flagged that the Organisation schema should include business hours. Find the Organisation JSON-LD in `public/index.html` (the static one in the `<head>`) and add this property:

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "08:00",
    "closes": "18:00"
  }
]
```

### 4.2 Add `GeneralContractor` as Additional Type

Gemini suggested using `GeneralContractor` as the schema type. Since the site already uses `HomeAndConstructionBusiness`, add `GeneralContractor` as an `additionalType` rather than replacing the existing type. Find the Organisation JSON-LD and add:

```json
"additionalType": "https://schema.org/GeneralContractor"
```

This gives AI engines two ways to classify the business.

### 4.3 Add DED License Number to Schema

Both ChatGPT and Gemini flagged that verifiable credentials strengthen trust. If the DED license number is known (Gemini suggested 626511 — confirm this is correct), add it to the `hasCredential` array in the Organisation schema:

```json
{ "@type": "EducationalOccupationalCredential", "credentialCategory": "Dubai Economy (DED) License" }
```

Only add this if the license number is accurate. Do not invent credentials.

---

## Part 5: Content Quality Improvements (From ChatGPT Audit)

These are content additions to existing pages. Match the existing design language.

### 5.1 Shelter Pages — Tone and Trust (ChatGPT Priority)

ChatGPT specifically flagged that underground shelter pages need "exceptional trust treatment" because the topic is unusual and high-stakes. AI systems will be cautious about recommending them unless the content is technically grounded and sober.

**On each bunker tier page, ensure the copy includes:**
- Clear engineering language (reinforced concrete, C40 grade, blast-rated)
- Safety and compliance framing (UAE-licensed structural engineer signs off all designs)
- Who it's for and who it's not for
- Scope boundaries (what's included vs excluded)
- No fear-based or sensational language
- No use of the word "bunker" in client-facing copy — use "shelter" or tier names

**Check existing copy on these pages and adjust tone if needed.** The goal is to read like an engineering specification, not a doomsday prepper brochure.

### 5.2 Warranty Details

ChatGPT flagged that "10yr Warranty on Select Works" is a strong claim but needs specificity to be citation-grade. Add a visible paragraph (on the About page or a dedicated section) that clarifies:
- Which work types are covered
- What conditions apply
- Whether it's material-dependent
- Key exclusions

This doesn't need its own page — a section on the About page is fine.

---

## Part 6: Internal Linking Improvements (All 3 Audits)

All three audits flagged that internal linking between services, projects, and FAQ content should be tighter.

### 6.1 Service Page Cross-Links

On every service page, ensure there's a "Related Services" section near the bottom linking to 2–4 other relevant services with descriptive anchor text:

**Pergolas page:** link to Carports, Glass Rooms, Landscaping
**Carports page:** link to Pergolas, Steel Structures, Construction
**Dewatering page:** link to Excavation, Shoring, Waterproofing
**Excavation page:** link to Shoring, Dewatering, Demolition
**Bunkers page:** link to Dewatering, Waterproofing, Excavation
**The Vault page:** link to Bunkers overview (upstream), Construction

If a "Related Services" section already exists on these pages, verify the links work and the anchor text is descriptive (not "Learn More" or "Click Here").

### 6.2 Footer Service Links

Ensure the site footer contains a visible HTML list linking to every service page, bunkers, The Vault, FAQ, About, and Contact. This gives every page on the site a crawlable path to every other important page.

---

## Verification

After deploying, run these checks:

```bash
# Part 1 — Tier page fixes
echo "=== EMERGENCY POD ===" && curl -s -L https://alhadeeqacontracting.com/bunkers/emergency-pod/ | grep -oP '<title>[^<]*</title>' && curl -s -L https://alhadeeqacontracting.com/bunkers/emergency-pod/ | grep -oP 'canonical" href="[^"]*"' && curl -s -L https://alhadeeqacontracting.com/bunkers/emergency-pod/ | grep -c '"@type":"Product"'

echo "=== COMPACT SHELTER ===" && curl -s -L https://alhadeeqacontracting.com/bunkers/compact-shelter/ | grep -oP '<title>[^<]*</title>' && curl -s -L https://alhadeeqacontracting.com/bunkers/compact-shelter/ | grep -oP 'canonical" href="[^"]*"' && curl -s -L https://alhadeeqacontracting.com/bunkers/compact-shelter/ | grep -c '"@type":"Product"'

echo "=== SHELTER ===" && curl -s -L https://alhadeeqacontracting.com/bunkers/shelter/ | grep -oP '<title>[^<]*</title>' && curl -s -L https://alhadeeqacontracting.com/bunkers/shelter/ | grep -oP 'canonical" href="[^"]*"' && curl -s -L https://alhadeeqacontracting.com/bunkers/shelter/ | grep -c '"@type":"Product"'

# Part 1 — Canonical typo fixes
echo "=== BUNKERS CANONICAL ===" && curl -s -L https://alhadeeqacontracting.com/bunkers/ | grep -oP 'canonical" href="[^"]*"'
# Expected: href="https://alhadeeqacontracting.com/bunkers"

echo "=== VAULT CANONICAL ===" && curl -s -L https://alhadeeqacontracting.com/the-vault/ | grep -oP 'canonical" href="[^"]*"'
# Expected: href="https://alhadeeqacontracting.com/the-vault"

# Part 3 — llms-txt link tag
echo "=== LLMS-TXT LINK ===" && curl -s https://alhadeeqacontracting.com/ | grep -c 'rel="llms-txt"'
# Expected: 1

# Part 4 — Opening hours in schema
echo "=== OPENING HOURS ===" && curl -s https://alhadeeqacontracting.com/ | grep -c 'openingHoursSpecification'
# Expected: 1
```

**Expected results for tier pages:**
- Each shows a unique title (not the homepage title)
- Each canonical points to its own URL (not `/`)
- Each has 1 Product schema match

**All checks must pass before this is considered done.**

---

*Consolidated AEO fix brief — Al Hadeeqa Contracting — March 28, 2026*
*Sources: Claude crawl audit, ChatGPT final audit, Gemini audit*
