# Claude Code Brief: Bunker Page Redesign

## Context

Al Hadeeqa Contracting (`alhadeeqacontracting.com`) is a UAE construction company. Their `/bunker` page currently shows a single product ("one bunker, built right") with no tiers and no pricing. We need to redesign it to showcase **three product tiers** at different price points, plus a teaser for a premium "The Vault" product.

The site is a React app (Create React App) deployed via Netlify + GitHub. The bunker page is currently at `/bunker`.

**Important:** There is also a standalone `bunker.html` file served via Netlify `_redirects` — make sure that file is preserved and the redirect rules are not broken.

---

## What Needs to Change

### 1. Remove "SafeHaven" branding
The old branding was "SafeHaven by Al Hadeeqa Contracting." Remove all SafeHaven references. The bunker products are now just under **Al Hadeeqa Contracting** directly.

### 2. Remove "One bunker, built right" messaging
Replace with tiered product offering. We now have three tiers plus a premium upsell.

### 3. Add the three product tiers
Display these as cards or a comparison section:

#### Tier 1: Emergency Pod
- **Type:** Precast drop-in
- **Size:** 7–8 sqm
- **Capacity:** 2–4 people
- **Price:** AED 100,000
- **Key specs:** 220mm RC walls, top hatch entry, manual ventilation, no power system, chemical toilet, 40L water, walkie-talkies
- **Tagline:** "A panic room buried in your garden"
- **Install time:** 1–2 days (after 5–7 day manufacturing)

#### Tier 2: Compact Shelter
- **Type:** Precast drop-in
- **Size:** 15–20 sqm
- **Capacity:** 6–8 people
- **Price:** AED 200,000
- **Key specs:** 250mm RC walls, top hatch, HEPA filtration, 24hr battery, 200L water tank, intercom, fold-down bunks, CO2 detector
- **Tagline:** "Real protection your family can shelter in"
- **Install time:** 2–3 days (after 10–14 day manufacturing)

#### Tier 3: Shelter
- **Type:** Poured-in-place (custom built on-site)
- **Size:** 28 sqm (7m × 4m) — custom sizes at AED 15,200/sqm
- **Capacity:** 8–15 people
- **Price:** From AED 500,000
- **Key specs:** 300–400mm RC walls, certified blast door + airtight door, HEPA + backup ventilation, 48hr battery, 500L water, full bathroom, kitchenette, hardwired intercom, emergency escape hatch
- **Tagline:** "Custom-built. Full protection. Properly engineered."
- **Install time:** 4–6 weeks on-site

### 4. Add comparison table
Below the tier cards, include a clean comparison table with these rows:
- Type (Precast / Poured)
- Internal Area
- Capacity
- Depth
- Wall Thickness
- Autonomy
- Entry
- Ventilation
- Power
- Bathroom
- Water Storage
- Blast Door (Yes/No)
- Intercom (Yes/No)
- Manufacturing Time
- Install Time
- Price

### 5. Add "The Vault" teaser section
At the bottom, before the lead form, add a premium upsell banner:
- Heading: "Looking for underground luxury?"
- Subheading: "The Vault — private underground living spaces with car ramps, cinemas, gyms, and lounges. Built to bunker-grade specifications."
- CTA: "Explore The Vault →" (link to `/vault` or `#` for now as placeholder)
- Style: darker/more premium feel than the rest of the page. Gold accent color (#C9A54E).

### 6. Add the video
A 5-second looping video of a real bunker walkthrough needs to be included. The video file is `bunker-walkthrough.mp4` (place in `/public/assets/videos/` or wherever assets live).

**Important:** The video is 848×444 resolution — too low for a full-screen background. Instead use it as:
- A contained video element within a section (e.g., in the "What We Build" or credibility section)
- Displayed in a 16:9 container with rounded corners and a subtle border
- Autoplay, muted, looping, no controls
- Add a subtle overlay text like "REAL BUILD — AL HADEEQA CONTRACTING" in a small label
- Works well placed near the comparison table or between the tier cards and the "How It Works" section

### 7. Update the lead form
The current form asks for name, WhatsApp, and Dubai area. Update it to also include:
- **Which tier are you interested in?** (dropdown: Emergency Pod / Compact Shelter / Shelter / Not sure — help me choose / The Vault)
- Keep the WhatsApp submission flow

### 8. Update "How It Works" section
Change from 3 steps to 4 steps:
1. **Free Site Assessment** — We visit within 48 hours. Review plot, assess feasibility.
2. **Custom Design** — Engineer produces drawings tailored to your property.
3. **Construction** — Our licensed team builds it. Precast: days. Poured: 4–6 weeks.
4. **Handover** — Tested, inspected, handed over with full documentation.

### 9. Update stats
- "20+ Years in UAE" → keep
- "50+ Projects Done" → keep (or update if Jan has a new number)
- "48h First Response" → keep
- Add: "3 Product Tiers" or "From AED 100K"

### 10. Update footer
- Remove "SafeHaven by Al Hadeeqa Contracting"
- Just "Al Hadeeqa Contracting Co. L.L.C"
- Keep the WhatsApp number and sister company link

---

## Design Direction

### Current aesthetic to keep:
- Dark background (#0a0a0a or similar)
- Clean, modern, minimal
- Good use of whitespace

### Changes to make:
- **Add gold accent color** (#C9A54E) for tier pricing badges and The Vault section
- **Tier cards:** Three cards side by side on desktop, stacked on mobile. Each card shows: tier name, price (large), key specs (compact list), and a "Get Quote" CTA button
- **Highlight the middle tier** (Compact Shelter) as "Most Popular" or "Best Value" — this is the one most clients will buy
- **Comparison table:** Clean, bordered table with alternating row shading. On mobile, make it horizontally scrollable
- **The Vault teaser:** Full-width banner with darker background, gold accents, subtle concrete texture. Premium feel. This should visually signal "this is different / elevated"

### Typography:
- Keep whatever font system the site currently uses
- Tier names should be prominent (larger weight)
- Prices should be the most eye-catching element on each card

### Colors reference:
- Background: #0a0a0a to #111
- Text: #e0e0e0 (body), #ffffff (headings)
- Gold accent: #C9A54E
- Green (Al Hadeeqa brand): #2E6B3A
- Tier card backgrounds: slightly lighter than page (#161616 or #1a1a1a)
- CTA buttons: green (#2E6B3A) or gold (#C9A54E)

---

## Important Notes

1. **Do NOT break the existing `bunker.html` redirect.** Check `_redirects` or `netlify.toml` to ensure the standalone HTML file still works at its current path.

2. **Video file** needs to be added to the repo. Copy `bunker-walkthrough.mp4` to the appropriate assets directory.

3. **Mobile-first.** Most UAE traffic is mobile (WhatsApp-driven). Ensure:
   - Tier cards stack vertically on mobile
   - Comparison table scrolls horizontally on mobile
   - Video element is responsive
   - CTA buttons are large and thumb-friendly
   - Lead form is easy to fill on mobile

4. **WhatsApp pre-filled messages.** The CTA should open WhatsApp with a pre-filled message that includes which tier the client is interested in. Example: `https://wa.me/971544419854?text=Hi%20Al%20Hadeeqa%2C%20I%27m%20interested%20in%20the%20Compact%20Shelter.%20Can%20I%20get%20a%20free%20assessment%3F`

5. **SEO:** Update the page title to "Underground Bunker Solutions UAE | From AED 100,000 | Al Hadeeqa Contracting" and meta description to include tier pricing.

6. **No "bunker" in visible headings if possible.** Use "Underground Protection" or "Underground Safe Room" in client-facing copy. "Bunker" is fine in SEO/meta tags and URL slug.

---

## Page Structure (top to bottom)

```
1. Nav bar (logo + CTA button)
2. Hero section
   - "Underground Protection for Your Family"
   - Subtitle about 3 tiers / every budget
   - CTA: "See Our Solutions ↓"
   - Stats bar (20+ years, 50+ projects, from AED 100K)
3. Tier cards section (3 cards side by side)
   - Emergency Pod | Compact Shelter (highlighted) | Shelter
   - Each with price, key specs, CTA
4. Video section
   - Looping bunker walkthrough video in contained element
   - Caption: "Real build by Al Hadeeqa Contracting"
5. Comparison table
   - Full spec comparison across all 3 tiers
6. How It Works (4 steps)
7. Credibility section
   - 20+ years, licensed, ISO certified
   - Real construction photos if available
8. The Vault teaser banner
   - "Looking for underground luxury?"
   - Gold/dark premium styling
9. Lead form
   - Name, WhatsApp, area, tier interest dropdown
   - WhatsApp submission
10. Footer
```

---

## Files to reference
- Bunker tier PDF (product specs): already in project files at `/mnt/project/Al_Hadeeqa_Bunker_Product_Tiers1.pdf`
- Video file: `WhatsApp_Video_2026-03-22_at_12_51_42.mp4` → rename to `bunker-walkthrough.mp4`
