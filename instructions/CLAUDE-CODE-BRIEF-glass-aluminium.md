# DO NOT REDESIGN THE SITE

This is an additive implementation. Do not change existing pages, layouts, colours, typography, or component patterns. Read the existing codebase before making any changes.

---

# Claude Code Brief: Glass & Aluminium Service Page

## What to build

A new service page at `/services/glass-aluminium` (file: `src/pages/services/GlassAluminium.jsx` or wherever the existing service pages live — check the codebase first).

This page advertises Al Hadeeqa's glass and aluminium partnership services: shower enclosures, mirrors, staircases, doors, windows, partitions, pergolas/carports.

## Tech stack

- React CRA on Netlify (alhadeeqacontracting.com)
- Check existing service pages (e.g. `/services/construction`, `/services/carports`, `/services/glassrooms`) for the exact component patterns, imports, shared layouts, and routing setup
- Follow the same patterns exactly — same hero component, same service card components, same CTA patterns

## Route setup

1. Add route for `/services/glass-aluminium` in the router (check `App.js` or wherever routes are defined)
2. Add this page to the services navigation/listing on `/services` page — it should appear as service #11 (or replace/expand the existing "Glass Rooms & Partitions" #09 entry if appropriate)
3. Add to the main nav if glass-aluminium warrants a top-level link (check with existing nav structure)

## Page structure

Follow the EXACT same structure as existing service pages (e.g. `/services/glassrooms`). The pattern is:

### 1. Hero section
- Back link: `← Back to Services`
- Label: `Al Hadeeqa Contracting`
- Title: `Glass & Aluminium Solutions` (with "Solutions" in italic/gold, matching the site's heading pattern)
- Description: "Custom glass and aluminium installations for homes and businesses across Dubai. Shower enclosures, mirrors, staircases, doors, windows, partitions, pergolas, and carports — supplied and installed by our in-house team."
- Tags: `Shower Enclosures`, `Mirrors`, `Staircases`, `Doors`, `Windows`, `Partitions`, `Pergolas & Carports`
- CTA buttons: `Request Quote` + `Talk to Our Team ↓` (link to #contact)
- Hero image: Use `/assets/images/glass-aluminium-hero.jpg` (needs to be added — use the partition image uploaded at `/mnt/user-data/uploads/0b35034e68b0f939e5fc11ddc1b8d56c.jpg` or a suitable glass image)

### 2. Overview section
- Heading: "How we approach glass & aluminium."
- Body text: "Al Hadeeqa delivers glass and aluminium installations to a construction standard — not a shopfitting standard. Through our specialist fabrication partnership, we supply and install seven categories of glass and aluminium work: shower enclosures, mirrors, staircases and balustrades, doors and entryways, windows and facades, office partitions, and outdoor structures including pergolas and carports. Every installation is surveyed, fabricated to exact measurements, and installed by our in-house team."
- Second paragraph: "We use tempered safety glass, laminated glass, and double-glazed units, specifying the correct grade for each application. All aluminium frames are powder-coated to any colour and engineered for the UAE climate."

### 3. Scope snapshot
Same "Scope Snapshot" card pattern as other service pages. Content:
- Service name: "Glass & Aluminium Solutions"
- Note: "Al Hadeeqa delivers this service through its specialist glass and aluminium fabrication partner. All installations are project-managed and installed by Al Hadeeqa's own licensed team."

### 4. "What This Service Covers" list
Use the same bullet list pattern as other service pages:
- Frameless and decorative shower enclosures (clear, frosted, tinted, etched glass)
- Custom mirrors — statement, LED-backlit, decorative wall panels, bevelled designs
- Glass staircases and balustrades — frameless spigot, U-channel, stainless steel post systems
- Aluminium and glass doors — hinged, sliding, folding, pivot, arched
- Aluminium windows — casement, sliding, top-hung, arched, curtain-wall facades
- Office and commercial glass partitions — frameless and framed systems
- Aluminium pergolas — fixed, louvered, motorized designs
- Carports — single, double, multi-bay in aluminium and steel
- Mashrabiya panels in laser-cut aluminium

### 5. "Best Suited For" list
- Villa owners wanting shower, mirror, staircase, or door upgrades
- New villa builds requiring full glass and aluminium fit-out
- Office and commercial tenants needing partition systems
- Properties wanting outdoor structures (pergolas, carports, mashrabiya)
- Developers requiring facade, window, and balustrade packages

### 6. Service breakdown section
Use the same "Service Breakdown" card pattern as `/services/glassrooms`. Create 7 sub-sections:

**a) Shower Enclosures**
- Heading: "Shower Enclosures"
- Subheading: "Frameless, semi-frameless, and decorative glass"
- Description: "Custom-made shower enclosures in clear, frosted, tinted, and decoratively etched glass. Fully frameless, semi-frameless, and framed options — toughened safety glass with premium hardware in chrome, brushed steel, matte black, or gold."
- Bullets: Frameless glass enclosures / Frosted and etched glass options / Premium hardware (chrome, matte black, gold) / Custom sizing to any bathroom
- Best for: "Bathroom renovations, new builds, and luxury villa bathrooms."

**b) Mirrors & Decorative Glass**
- Heading: "Mirrors & Decorative Glass"
- Subheading: "Bespoke mirrors for every space"
- Description: "Statement mirrors, LED-backlit vanity mirrors, decorative wall panels, and antique-finish bevelled designs. Cut to any shape — for entrances, dressing rooms, dining rooms, gyms, and bathrooms."
- Bullets: Oversized statement mirrors / LED-backlit vanity mirrors / Decorative wall panels / Bevelled and antique-finish designs
- Best for: "Entrances, dressing rooms, dining rooms, and luxury bathrooms."

**c) Staircases & Balustrades**
- Heading: "Glass Staircases & Balustrades"
- Subheading: "Frameless glass railings, indoor and outdoor"
- Description: "Toughened laminated glass balustrades for staircases, balconies, mezzanines, and pool surrounds. Frameless spigot, U-channel, and stainless steel post systems — engineered to UAE standards."
- Bullets: Frameless spigot systems / U-channel base mount / Stainless steel post systems / Pool fencing and balcony applications
- Best for: "Staircases, balconies, pool surrounds, and roof terraces."

**d) Doors & Entryways**
- Heading: "Doors & Entryways"
- Subheading: "Aluminium and glass doors for homes and offices"
- Description: "Hinged, sliding, folding, and pivot doors in aluminium and glass. Single and double leaf entry doors, internal partitions, French doors, and arched designs — frosted, etched, or clear glass in any frame finish."
- Bullets: Hinged, sliding, folding, pivot / Single and double leaf / Arched and French door designs / Frosted, etched, and clear glass
- Best for: "Villa entrances, internal doors, and office entryways."

**e) Windows & Facades**
- Heading: "Windows & Facades"
- Subheading: "Aluminium windows and curtain wall systems"
- Description: "Casement, sliding, top-hung, and arched aluminium windows with single or double glazing. Tinted, reflective, low-E, and laminated glass options. Full curtain-wall facades engineered for the UAE climate."
- Bullets: Casement, sliding, top-hung windows / Double glazing and low-E glass / Tinted and reflective options / Curtain-wall facade systems
- Best for: "New builds, window replacements, and commercial facades."

**f) Office & Interior Partitions**
- Heading: "Office & Interior Partitions"
- Subheading: "Glass partitions for modern workspaces"
- Description: "Floor-to-ceiling glass partitions in single and double glazed configurations. Frosted, clear, and decorative film options. Modular systems for offices, clinics, showrooms, and retail."
- Bullets: Frameless 12–15mm tempered glass / Framed aluminium systems / Acoustic and fire-rated options / Full-height installation
- Best for: "Offices, clinics, showrooms, and commercial fit-outs."

**g) Pergolas, Carports & Outdoor Structures**
- Heading: "Pergolas, Carports & Outdoor Structures"
- Subheading: "Premium outdoor aluminium structures"
- Description: "Aluminium pergolas in fixed, louvered, and motorized designs. Carports in single, double, and multi-bay configurations. Mashrabiya panels in laser-cut aluminium for facades and privacy walls. All powder-coated to any colour and engineered for UAE conditions."
- Bullets: Fixed, louvered, motorized pergolas / Single and multi-bay carports / Mashrabiya privacy panels / Powder-coated to any colour
- Best for: "Villa gardens, patios, driveways, and outdoor entertaining areas."

### 7. "Why Al Hadeeqa" section
Use the same numbered reasons pattern as existing service pages:

01. **Glass specified for the application** — Outdoor enclosures, pool balustrades, and office partitions all require different glass specifications. We specify the correct grade for every application.
02. **Construction-grade installation** — Every installation is surveyed, fabricated to exact measurements, and detailed at every edge and joint.
03. **In-house project management** — All work is managed and installed by Al Hadeeqa's licensed team. No subcontracting.
04. **UAE climate engineering** — All aluminium is powder-coated and all glass is specified for Dubai's heat, UV, and wind loads.

### 8. CTA / Contact section
Same pattern as other service pages:
- "Need Pricing?" heading
- "Send us the project location, property type, and a quick summary of the scope. We will respond on WhatsApp with the next step."
- WhatsApp button → wa.me/971544419854

## SEO requirements

### Title tag
`Glass & Aluminium Solutions Dubai — Showers, Mirrors, Doors, Windows | Al Hadeeqa Contracting`

### Meta description
`Custom glass and aluminium installations in Dubai. Shower enclosures, mirrors, staircases, doors, windows, partitions, pergolas, and carports. Free site assessment. Al Hadeeqa Contracting.`

### JSON-LD structured data
Add Service schema in `<head>`:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Glass & Aluminium Solutions Dubai",
  "description": "Custom glass and aluminium installations for homes and businesses in Dubai. Shower enclosures, mirrors, staircases, doors, windows, partitions, pergolas, and carports.",
  "provider": {"@id": "https://alhadeeqacontracting.com/#organization"},
  "areaServed": [{"@type": "City", "name": "Dubai"}],
  "serviceType": "Glass & Aluminium Installation"
}
```

### Breadcrumb schema
Home → Services → Glass & Aluminium Solutions

### Open Graph tags
```html
<meta property="og:title" content="Glass & Aluminium Solutions Dubai | Al Hadeeqa Contracting" />
<meta property="og:description" content="Custom glass and aluminium installations in Dubai. Shower enclosures, mirrors, staircases, doors, windows, partitions, pergolas, and carports." />
<meta property="og:url" content="https://alhadeeqacontracting.com/services/glass-aluminium" />
```

## Images needed

Place in `/public/assets/images/` (or wherever existing service images live):
- `glass-aluminium-hero.jpg` — Main hero image (use a clean glass partition or shower enclosure shot)
- `glass-shower.jpg` — Shower enclosure for the service card
- `glass-mirror.jpg` — Mirror installation
- `glass-staircase.jpg` — Glass balustrade
- `glass-door.jpg` — Aluminium/glass door
- `glass-window.jpg` — Aluminium window
- `glass-partition.jpg` — Office partition (use the image from `/mnt/user-data/uploads/0b35034e68b0f939e5fc11ddc1b8d56c.jpg`)
- `glass-pergola.jpg` — Pergola installation

NOTE: For now, placeholder images are fine. Mohammad will provide final images separately.

## Updates to existing pages

### 1. Services index page (`/services`)
Add "Glass & Aluminium Solutions" as a new service card in the services grid. Use the same card pattern as the other 10 services.
- Number: 11 (or renumber as appropriate)
- Title: "Glass & Aluminium Solutions"
- Subtitle: "Seven categories, one team"
- Tags: `Showers`, `Mirrors`, `Doors`, `Windows`, `Pergolas`
- Link: `/services/glass-aluminium`

Consider whether to keep the existing "Glass Rooms & Partitions" (#09) as a separate entry or merge it into this new page. Recommendation: keep #09 as-is for now but add a note/link from it to the new comprehensive page.

### 2. Homepage
In the "Our Services" section on the homepage, consider adding a card for Glass & Aluminium (or update the existing glass rooms card to reference the broader offering).

### 3. Sitemap
Add `<url><loc>https://alhadeeqacontracting.com/services/glass-aluminium</loc></url>` to the sitemap.

### 4. Navigation
No nav changes needed — the page is accessible via Services → Glass & Aluminium. If the nav already has a "Glass" or "Glass Rooms" link, update it to point to the new page.

## WhatsApp tracking

The WhatsApp CTA button should fire the existing `whatsapp_click` event in GA4 (check how other service pages handle this — it should already be wired up in the shared CTA component).

## Conversion events

Use the same conversion tracking pattern as other service pages. The "Get a Quote" and "Request Quote" buttons should fire `whatsapp_click` events.

---

**GA4 Property:** G-HCC52FX6VK
**Google Ads:** AW-658897837
**WhatsApp:** wa.me/971544419854

---

*Prepared for Al Hadeeqa Contracting — alhadeeqacontracting.com*
*April 2026*
*To be implemented via Claude Code on the React CRA codebase*
