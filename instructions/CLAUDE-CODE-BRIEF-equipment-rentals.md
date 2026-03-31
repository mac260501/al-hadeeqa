# Claude Code Brief — Equipment Rentals Section

## ⚠️ DO NOT REDESIGN THE EXISTING SITE. BUILD ON THE EXISTING CODEBASE ONLY.

This brief adds an Equipment Rentals page at `/rentals` and a preview carousel on the home page. Follow the existing React CRA patterns, component styles, colour palette, and layout conventions already in the codebase. Do not install new UI libraries or refactor existing components.

---

## Scope

1. **New page:** `/rentals` — Equipment Rentals landing page
2. **Home page addition:** Equipment preview carousel in a new section
3. **Navigation update:** Add "Rentals" to the main nav and footer
4. **Services page update:** Add Equipment Rentals as service #11 in the services list
5. **Contact form update:** Add "Equipment Rental" to the service dropdown on all contact forms

---

## 1. Equipment Rentals Page (`/rentals`)

### Route & Meta

- Path: `/rentals`
- Title: `Equipment Rentals Dubai | Al Hadeeqa Contracting — Excavators, Pumps, Cranes`
- Meta description: `Rent construction equipment in Dubai. Excavators, dewatering pumps, concrete pumps, cranes and more from Al Hadeeqa Contracting. Competitive daily, weekly and monthly rates. Delivery available across Dubai.`

### Page Layout

Follow the same structure as existing service pages (hero → content → CTA → contact form). Specific sections:

#### A. Hero Section

- Headline: `Construction Equipment Rentals`
- Subheadline: `Excavators, pumps, cranes and specialist plant — available daily, weekly, or monthly across Dubai.`
- Two CTAs: "Get a Rental Quote" (scrolls to contact form) + "View Equipment ↓" (scrolls to equipment grid)
- Stats bar (same style as other pages): `XX+ Machines Available` · `Daily / Weekly / Monthly` · `Delivery Across Dubai`
- **Note:** Stats are placeholders — Jan to confirm machine count

#### B. Equipment Categories Grid

Display equipment in category cards. Use a grid layout (3 columns desktop, 2 tablet, 1 mobile). Each card:

- Category icon or placeholder image (use a generic construction equipment placeholder for now — a simple SVG icon per category is fine)
- Category name
- Short description (1 line)
- "Enquire" CTA button (scrolls to contact form with category pre-selected)

**Placeholder categories (Jan to confirm full list and add/remove):**

| Category | Placeholder Description |
|----------|------------------------|
| Excavators | Mini, midi and full-size excavators for earthworks and demolition |
| Dewatering Pumps | Wellpoint and submersible pump systems for groundwater control |
| Concrete Pumps | Line pumps and boom pumps for pours of all sizes |
| Cranes | Mobile cranes for lifting, placement and structural work |
| Compactors | Plate compactors and rollers for soil and base compaction |
| Generators | Diesel generators for site power — 20kVA to 500kVA |
| Dump Trucks | Tipper trucks for spoil removal and material delivery |
| Scaffolding | Tube and coupler scaffolding systems, erected and dismantled |

#### C. How It Works (4 steps, same pattern as bunkers page)

1. **Tell us what you need** — Call or WhatsApp with your equipment requirements and project dates
2. **We confirm availability** — Same-day confirmation on equipment and delivery schedule
3. **Delivered to your site** — Equipment transported, set up, and ready to operate
4. **Flexible returns** — Extend, swap, or return. We handle collection.

#### D. Why Rent From Al Hadeeqa (trust signals section)

Use the same card/grid style as other service pages. Points:

- **Licensed & Insured** — All equipment maintained and insured. Al Hadeeqa is a Dubai-licensed contractor.
- **Delivery & Pickup Included** — Equipment delivered to your site and collected when you're done. Dubai-wide.
- **Daily, Weekly, Monthly Rates** — Flexible rental periods. Long-term discounts available.
- **Operator Available** — Need an operator? We supply trained operators with select equipment.
- **35+ Years in Dubai Construction** — We know what works on UAE sites. Get the right machine for your scope.

#### E. Rates Section

**For now, show a placeholder section:**

- Section headline: `Rental Rates`
- Body text: `Competitive daily, weekly and monthly rates. Contact us for a custom quote based on your project duration and requirements.`
- CTA: "Get Your Rate Card" → scrolls to contact form
- **TODO for later:** When Jan provides rates, convert this into a table or accordion with per-category pricing. Keep the structure expandable.

#### F. Cross-Sell Banner

Same style as the bunker upsell banner on other pages:

- Text: `Need the full package? Al Hadeeqa handles excavation, dewatering, shoring and construction — with our own fleet on site.`
- CTA: "View All Services →" → `/services`

#### G. FAQ Section (with FAQ schema markup)

**Placeholder FAQs:**

1. **What equipment do you have available?**
   We offer excavators, dewatering pumps, concrete pumps, cranes, compactors, generators, dump trucks, and scaffolding. Contact us for the full current inventory.

2. **What are your rental rates?**
   Rates depend on equipment type and rental duration. We offer daily, weekly, and monthly pricing with discounts for longer periods. WhatsApp us for a quote.

3. **Do you deliver equipment to site?**
   Yes. All equipment is delivered to your project site and collected when you're finished. Delivery is available across Dubai.

4. **Can I rent equipment with an operator?**
   Yes. Trained operators are available with select equipment. Let us know your requirements when you enquire.

5. **What is the minimum rental period?**
   Most equipment is available from a single day. Some specialist items have a minimum weekly rental. We'll confirm when you enquire.

6. **Do you serve areas outside Dubai?**
   Our primary service area is Dubai. For projects in Sharjah, Ajman, or Abu Dhabi, contact us to discuss availability.

#### H. Contact Form

Use the existing contact/lead form component. Add "Equipment Rental" as a service option in the dropdown. Pre-select it when user arrives from this page. Include a free-text field or note: "Tell us what equipment you need and your project dates."

---

## 2. Home Page — Equipment Carousel Section

Add a new section on the home page, positioned **after the Services section and before the Underground Protection section**.

### Design

- Section label: `Equipment Rentals`
- Headline: `Construction equipment. Ready when you are.`
- Short description: `Excavators, pumps, cranes and specialist plant available for daily, weekly, or monthly hire across Dubai.`
- CTA: "View Equipment & Rates →" → `/rentals`

### Carousel

- Horizontal scrolling carousel (auto-scroll optional, manual swipe/arrow navigation required)
- Show equipment category cards — same data as the category grid on the rentals page
- Each card: category name + one-line description + placeholder image/icon
- On click: navigate to `/rentals` (anchor to that category if IDs are set up, otherwise just to the page)
- Style: match the existing project carousel on the home page (card dimensions, border radius, shadow, spacing)
- Mobile: horizontal scroll with snap points, same as existing carousels on the site

**Implementation note:** Extract the equipment categories into a shared data file (e.g., `src/data/equipmentCategories.js`) so both the home page carousel and the rentals page grid read from the same source. This makes it easy to update once Jan provides the full list.

---

## 3. Navigation Updates

### Main Nav (header)

Add "Rentals" link to the main navigation. Position it after "Services" and before "About":

```
Home | Services | Rentals | About | Projects | Bunkers | The Vault | Contact
```

### Footer

Add "Equipment Rentals" to the Services column in the footer, after "Maintenance":

```
Services:
  ...existing services...
  Maintenance
  Equipment Rentals    ← new
```

### Mobile Nav

Add "Rentals" in the same position as desktop.

---

## 4. Services Page Update

Add Equipment Rentals as service #11 on `/services`:

- Position: After Maintenance (#10), before the underground bunker upsell banner
- Card style: Same as all other service cards
- Image: Use a placeholder (construction equipment photo or icon)
- Label: `Equipment available across Dubai`
- Title: `Equipment Rentals`
- Description: `Excavators, dewatering pumps, concrete pumps, cranes, compactors and more. Daily, weekly, or monthly hire with delivery to your site.`
- Tags: `Excavators` · `Pumps` · `Cranes` · `Generators` · `Delivery`
- CTA: `Learn More →` → `/rentals`

Also update the "Services at a Glance" quick-nav at the top to include `11 Equipment Rentals`.

---

## 5. SEO & Schema

### On the `/rentals` page:

- Add `FAQPage` schema (JSON-LD) using the FAQ content above
- Add `LocalBusiness` → `hasOfferCatalog` → `Service` schema for equipment rental
- Canonical: `https://alhadeeqacontracting.com/rentals`
- Open Graph tags: title, description, image (use a placeholder or the Al Hadeeqa logo)

### On the home page:

- No schema changes needed for the carousel

### Structured data template (for rentals page):

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Construction Equipment Rentals Dubai",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Al Hadeeqa Contracting Co. L.L.C",
    "url": "https://alhadeeqacontracting.com",
    "telephone": "+971544419854",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dubai",
      "addressCountry": "AE"
    }
  },
  "areaServed": {
    "@type": "City",
    "name": "Dubai"
  },
  "description": "Construction equipment rentals in Dubai. Excavators, dewatering pumps, concrete pumps, cranes and more. Daily, weekly and monthly rates.",
  "url": "https://alhadeeqacontracting.com/rentals"
}
```

---

## 6. react-snap Pre-rendering

After implementation, ensure `/rentals` is added to the react-snap configuration so it gets pre-rendered. Check the existing react-snap config (likely in `package.json` under `reactSnap`) and add the new route.

---

## 7. Placeholder Image Strategy

For now, use simple SVG icons or generic construction equipment images. Structure the image references so they're easy to swap out later when Jan provides real photos. Suggested approach:

- Create `/public/assets/images/rentals/` directory
- Use filenames that match categories: `excavator.jpg`, `dewatering-pump.jpg`, `crane.jpg`, etc.
- For now, place a single generic placeholder image and reference it across all categories OR use inline SVG icons that match the site's icon style

---

## 8. Shared Equipment Data File

Create `src/data/equipmentCategories.js`:

```javascript
const equipmentCategories = [
  {
    id: 'excavators',
    name: 'Excavators',
    description: 'Mini, midi and full-size excavators for earthworks and demolition',
    image: '/assets/images/rentals/excavator.jpg',
    // rates to be added later by Jan
    rates: null,
  },
  {
    id: 'dewatering-pumps',
    name: 'Dewatering Pumps',
    description: 'Wellpoint and submersible pump systems for groundwater control',
    image: '/assets/images/rentals/dewatering-pump.jpg',
    rates: null,
  },
  {
    id: 'concrete-pumps',
    name: 'Concrete Pumps',
    description: 'Line pumps and boom pumps for pours of all sizes',
    image: '/assets/images/rentals/concrete-pump.jpg',
    rates: null,
  },
  {
    id: 'cranes',
    name: 'Cranes',
    description: 'Mobile cranes for lifting, placement and structural work',
    image: '/assets/images/rentals/crane.jpg',
    rates: null,
  },
  {
    id: 'compactors',
    name: 'Compactors',
    description: 'Plate compactors and rollers for soil and base compaction',
    image: '/assets/images/rentals/compactor.jpg',
    rates: null,
  },
  {
    id: 'generators',
    name: 'Generators',
    description: 'Diesel generators for site power — 20kVA to 500kVA',
    image: '/assets/images/rentals/generator.jpg',
    rates: null,
  },
  {
    id: 'dump-trucks',
    name: 'Dump Trucks',
    description: 'Tipper trucks for spoil removal and material delivery',
    image: '/assets/images/rentals/dump-truck.jpg',
    rates: null,
  },
  {
    id: 'scaffolding',
    name: 'Scaffolding',
    description: 'Tube and coupler scaffolding systems, erected and dismantled',
    image: '/assets/images/rentals/scaffolding.jpg',
    rates: null,
  },
];

export default equipmentCategories;
```

---

## Verification Commands

After deployment, verify with:

```bash
# Check rentals page is live and pre-rendered
curl -sL https://alhadeeqacontracting.com/rentals/ | head -50

# Check meta tags
curl -sL https://alhadeeqacontracting.com/rentals/ | grep -i '<meta'

# Check FAQ schema
curl -sL https://alhadeeqacontracting.com/rentals/ | grep -i 'FAQPage'

# Check nav updated
curl -sL https://alhadeeqacontracting.com/ | grep -i 'rentals'

# Check services page includes Equipment Rentals
curl -sL https://alhadeeqacontracting.com/services/ | grep -i 'equipment'

# Check home page carousel section exists
curl -sL https://alhadeeqacontracting.com/ | grep -i 'equipment'

# Check react-snap pre-rendered the new route
curl -sL https://alhadeeqacontracting.com/rentals/ | grep '<div id="root">' 
# Should show pre-rendered content inside root, not empty div
```

---

## What's Needed From Jan (Before Final Polish)

- [ ] Full equipment list with exact categories — confirm, add, or remove from the placeholder list above
- [ ] Rates per category (daily / weekly / monthly) — or confirm "enquiry only" pricing
- [ ] Real photos of equipment (even yard/site photos are fine)
- [ ] Confirm machine count for the stats bar ("XX+ Machines Available")
- [ ] Confirm whether operators are available for all categories or just select ones
- [ ] Confirm service area — Dubai only, or also Sharjah/Ajman?

---

## Summary of Files to Create/Modify

| Action | File | What |
|--------|------|------|
| CREATE | `src/data/equipmentCategories.js` | Shared equipment data |
| CREATE | `src/pages/Rentals.js` (or similar) | Equipment Rentals page component |
| CREATE | `src/pages/Rentals.css` (or similar) | Page-specific styles |
| MODIFY | `src/App.js` (or router config) | Add `/rentals` route |
| MODIFY | Home page component | Add equipment carousel section |
| MODIFY | Nav component | Add "Rentals" link |
| MODIFY | Footer component | Add "Equipment Rentals" to services list |
| MODIFY | Services page component | Add Equipment Rentals as #11 |
| MODIFY | Contact form component | Add "Equipment Rental" to service dropdown |
| MODIFY | `package.json` | Add `/rentals` to react-snap routes |
| CREATE | `public/assets/images/rentals/` | Placeholder images directory |
