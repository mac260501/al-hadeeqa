# Claude Code Brief: The Vault — Luxury Underground Living Page

## Context

Al Hadeeqa Contracting (`alhadeeqacontracting.com`) has a bunker division at `/bunker` that sells underground shelters from AED 100K to AED 1.9M. Above all of those tiers sits **The Vault** — a completely separate premium product. It is NOT a bunker. It is a private underground luxury lifestyle space that happens to be built to bunker-grade specifications.

The Vault page needs to live at `/vault` and feel like a completely different brand from the rest of the Al Hadeeqa site. Think luxury real estate marketing, not construction company. The current bunker page links to it via "The Vault" column in the tier comparison table.

**This page is for villa owners with AED 15M+ properties.** The audience is UHNWI (ultra-high-net-worth individuals), car collectors, men who want a private retreat. The price starts from AED 5,000,000+.

---

## Design Direction — CRITICAL

This page must look and feel NOTHING like the rest of the Al Hadeeqa site. It should feel like:
- A luxury car brand landing page (Bentley, Rolls-Royce configurator)
- A private members club website
- A high-end architecture studio portfolio

### Color Palette
- **Primary background:** #0A0A0A (near-black)
- **Secondary background:** #111111, #161616 (for section variations)
- **Gold accent:** #C9A54E (primary accent — used for headings, borders, CTAs, hover states)
- **Secondary gold:** #A8893A (darker gold for subtle elements)
- **Text - primary:** #E8E4DC (warm off-white, NOT pure white)
- **Text - secondary:** #8A8478 (warm gray)
- **Text - highlight:** #FFFFFF (pure white, used sparingly for emphasis)
- **Concrete accent:** #3A3A38 (for background textures/dividers — reference to exposed concrete)

### Typography Direction
- Use a serif font for headings — something like Playfair Display, Cormorant Garamond, or similar (load from Google Fonts)
- Use a clean sans-serif for body — Inter, DM Sans, or similar
- Headings should be large, elegant, with generous letter-spacing
- Body text should be light weight, generous line-height

### Visual Style
- Lots of negative space
- Subtle animations on scroll (fade-in, parallax-like effects)
- Gold horizontal rules as section dividers
- NO busy layouts — each section should breathe
- Imagery areas should use placeholder containers with subtle borders (we'll add real renders later)
- The overall feeling should be: quiet confidence, exclusivity, aspiration

### What This Page Should NOT Look Like
- No green Al Hadeeqa branding (this is a sub-brand)
- No construction-site aesthetic
- No bullet-point spec sheets
- No comparison tables
- No "Starting from AED X" pricing in the hero — price is revealed lower on the page
- No stock photos of construction workers or concrete
- Nothing that says "bunker" above the fold

---

## Page Structure

### 1. Navigation (Minimal)
- Floating nav bar, transparent background that transitions to #0A0A0A on scroll
- Left: "THE VAULT" wordmark in gold (#C9A54E), elegant serif font, letter-spaced
- Right: "Enquire" button (outlined gold border, gold text, fills on hover)
- Small "by Al Hadeeqa Contracting" text in warm gray beneath the wordmark or to the right
- No hamburger menu — this is a single-page experience

### 2. Hero Section (Full Viewport)
- Full-screen section, minimum 100vh
- Large centered heading: **"Your Private Underground World"**
  - Serif font, gold color, large (clamp between 48-80px)
  - Subtle letter-spacing
- Subheading below: **"A luxury living space beneath your villa — with the protection of a bunker built into every wall."**
  - Sans-serif, warm off-white, lighter weight
- Single CTA below: "Begin Your Consultation →" (gold outlined button)
- Below the CTA, a subtle scroll indicator (thin gold line animating downward, or a small arrow)
- Background: solid #0A0A0A (no image — let the text breathe)
- Optional: very subtle concrete texture overlay at low opacity (~3-5%)

### 3. The Concept Section
- Section heading: **"Not a Bunker. An Underground Sanctuary."**
- Two paragraphs of copy:
  
  **Paragraph 1:** "You drive down a private ramp into your underground garage, step out of your car into a space that opens into a lounge, a bar, a cinema, a gym — your own world, invisible from above. The exposed concrete and warm timber create an atmosphere that feels both raw and refined."
  
  **Paragraph 2:** "And behind the design, every wall is 500mm reinforced concrete. The air filtration runs silently. There is a blast-rated door hidden behind a panel. Water storage, power autonomy, satellite communications — all invisible. If the world above ever changes, this space quietly becomes a fully autonomous shelter for your family. Same space. Same comfort. Different context."

- Layout: centered text, max-width 700px, generous padding
- A thin gold horizontal rule above and below the section

### 4. The Experience Zones (Visual Sections)
This is the heart of the page. Each zone gets its own full-width section with a large placeholder image area and description. Alternating layout (image left/text right, then reversed).

**Zone 1: The Arrival**
- Heading: "The Arrival"
- Copy: "A gently sloping car ramp descends from your property into the underground level. As you descend, the ceiling lowers, the lighting shifts to warm amber, and the outside world disappears. You arrive in your private garage — your cars displayed like sculptures behind glass."
- Key details (displayed elegantly, not as bullets): Car ramp (straight or spiral) • 4–8 vehicle bays • Feature lighting • Hydraulic surface door • Turntable option
- Image placeholder: wide landscape format, labeled "GARAGE RENDER"

**Zone 2: The Gallery**
- Heading: "The Gallery"
- Copy: "A transitional corridor of exposed concrete and dark timber. Art niches, living green walls, and dramatic spot lighting create anticipation before the main space reveals itself."
- Key details: Board-formed concrete • Dark walnut cladding • Adjustable track lighting • Optional living wall
- Image placeholder: wide landscape, labeled "GALLERY RENDER"

**Zone 3: The Main Hall**
- Heading: "The Hall"
- Copy: "The heart of The Vault. A double-height open space configured for the way you actually want to live — a sunken lounge for conversation, a full-service bar, a pool table under statement lighting, and a media wall for cinema-scale viewing."
- Key details: Sunken conversation pit • Full-service bar • Tournament pool table • 85–100" screen • Surround sound
- Image placeholder: wide landscape, labeled "LOUNGE RENDER"

**Zone 4: The Cinema**
- Heading: "The Cinema"
- Copy: "A dedicated, acoustically isolated screening room. Tiered seating for 8–12 in reclining leather chairs. 120-inch 4K laser projection. Dolby Atmos. This is not a TV room."
- Key details: 120"+ screen • Dolby Atmos • Tiered recliner seating • Acoustic isolation
- Image placeholder: wide landscape, labeled "CINEMA RENDER"

**Zone 5: The Gym**
- Heading: "The Gym"
- Copy: "A fully equipped private gym adjacent to the main hall. The industrial concrete aesthetic works perfectly here. Optional cold plunge, infrared sauna, and steam room."
- Key details: Full equipment suite • Rubber flooring • Cold plunge option • Sauna option
- Image placeholder: wide landscape, labeled "GYM RENDER"

**Zone 6: The Private Suite**
- Heading: "The Suite"
- Copy: "One or two private bedroom suites for extended stays. The same material language continues — concrete, timber, stone — but softer here with textiles, bedding, and warmer lighting."
- Key details: Master en-suite • Walk-in closet • Premium fixtures • Climate controlled
- Image placeholder: wide landscape, labeled "SUITE RENDER"

### 5. The Specifications (Minimal, Elegant)
- Section heading: **"Built to Endure"**
- Subheading: "Every Vault is constructed to bunker-grade specifications — concealed within the luxury."
- Display key specs in an elegant grid (2 columns on desktop, 1 on mobile). NOT a comparison table — think paired label/value with generous spacing:

  - **Size:** 300–500+ sqm
  - **Depth:** 5–6m below grade
  - **Structure:** 500mm reinforced concrete, C50
  - **Air:** Redundant HEPA + carbon, positive pressure
  - **Power:** 14+ day autonomy, diesel generator
  - **Water:** 2,000L+ multi-stage filtration
  - **Comms:** Full satellite, CCTV, mobile repeater
  - **Security:** Concealed blast door, biometric access
  - **Autonomy:** 14+ days fully sealed
  - **Timeline:** 8–12 months

- Style: gold labels, white values, thin gold dividers between rows

### 6. The Price Section
- Section heading: **"An Investment in Permanence"**
- Single line: **"Starting from AED 5,000,000"** — large, gold, serif font
- Below: "Every Vault is custom-designed to your villa's site plan. Price is determined by size, specification, and site conditions. A consultation is the first step."
- CTA: "Request Your Private Consultation →"

### 7. The Process
- Section heading: **"How It Begins"**
- Four steps, displayed as a horizontal timeline or elegant numbered list:
  1. **Private Consultation** — We visit your property. Understand your vision. Assess feasibility.
  2. **Concept Design** — Architect produces plans tailored to your site. AI-rendered visuals of your specific Vault.
  3. **Engineering & Approval** — Structural drawings, MEP design, municipality approvals.
  4. **Construction** — Our team builds it over 8–12 months. Discreet. Professional. Tested at handover.

### 8. The Connection to Al Hadeeqa
- Small section, understated:
- "The Vault is created by Al Hadeeqa Contracting — a UAE-licensed contractor with 20+ years of experience and ISO 9001, 14001, and OHSAS 18001 certifications."
- Link: "View our bunker range →" (links to /bunker)
- This is the ONLY place on the page that references bunkers or the main Al Hadeeqa brand prominently.

### 9. Enquiry Section (Full Width)
- Background: slightly lighter (#161616)
- Heading: **"Begin the Conversation"**
- Subheading: "Share your details and we will arrange a private consultation at your property."
- Form fields:
  - Name
  - WhatsApp Number
  - Email
  - Location / Emirate (dropdown: Dubai, Abu Dhabi, Sharjah, Other)
  - Brief description of your property (textarea, optional)
- Submit button: "Request Consultation" (solid gold button, dark text)
- Alternative: "Or contact us directly" with WhatsApp link: `https://wa.me/971544419854?text=I%27m%20interested%20in%20The%20Vault%20%E2%80%94%20underground%20luxury%20living.%20Can%20we%20arrange%20a%20consultation%3F`

### 10. Footer (Minimal)
- "THE VAULT" wordmark in gold
- "by Al Hadeeqa Contracting Co. L.L.C"
- Contact: +971 54 441 9854
- "Dubai, U.A.E"
- © 2026
- NO links to Jan Furnishings or other sister brands — this page exists in its own world

---

## Intro Animation — Vault Door Opening

When the page first loads, play a **vault door opening animation** before revealing the hero. This should be built with pure CSS/SVG — no video files, no heavy JS animation libraries. Total duration: ~2.5–3 seconds.

### Animation Sequence

1. **Initial state (0–0.5s):** Screen is solid #0A0A0A black. In the exact center, a thin gold (#C9A54E) circular vault lock icon — a circle with a handle/spoke design, drawn with SVG strokes. The circle should have a subtle gold glow (box-shadow or filter). "THE VAULT" wordmark in gold, letter-spaced, appears below the lock icon.

2. **Lock rotation (0.5–1.2s):** The vault lock icon rotates 90 degrees clockwise with a smooth ease-out. The gold glow intensifies slightly during rotation.

3. **Door crack (1.2–1.5s):** A thin horizontal gold line (1px) appears across the full width of the screen at the vertical center — representing the seam between the two vault door halves. The vault lock icon fades out.

4. **Doors open (1.5–2.5s):** The screen splits into two halves along the gold line. The top half slides upward and the bottom half slides downward (OR: left half slides left, right half slides right — choose whichever looks better). Use CSS `transform: translateY()` or `translateX()` with a smooth cubic-bezier easing. The hero section is visible behind the departing panels.

5. **Hero reveal (2.5–3.0s):** The hero content fades in with a subtle upward motion (`transform: translateY(20px)` → `translateY(0)` + `opacity: 0` → `opacity: 1`). The animation overlay panels are removed from the DOM or set to `display: none` / `pointer-events: none`.

### Implementation Notes

- **Play once per session only.** Use `sessionStorage.setItem('vault_intro_played', 'true')` after the animation completes. On subsequent page loads within the same session, skip the animation entirely and show the page immediately.
- **Respect reduced motion.** Check `window.matchMedia('(prefers-reduced-motion: reduce)')` — if true, skip the animation.
- **The animation overlay sits above everything** as a fixed-position full-screen element with `z-index: 9999`. It gets removed/hidden after completion.
- **Keep the vault lock icon simple.** A circle with a cross or spoke pattern inside, drawn with SVG `<circle>` and `<line>` elements. NOT a photorealistic vault wheel — think minimal, geometric, elegant. The gold stroke should be thin (1-2px).
- **No sound.** Autoplay audio is bad UX and blocked by browsers anyway.
- **Mobile:** Same animation, same timing. The vault lock icon should be sized relative to viewport (maybe 15-20vw diameter, max 150px).
- **Performance:** Everything is CSS transforms and opacity changes — GPU-accelerated, no layout thrashing, no jank.

### Fallback
If for any reason the animation fails or JS is disabled, the page should still be fully visible and usable. The animation is progressive enhancement, not a gate.

---

## Technical Notes

### Routing
- This page lives at `/vault` in the React app
- It should NOT share the same nav/footer components as the rest of the site — it has its own completely independent layout

### Fonts (Google Fonts)
- Load: Cormorant Garamond (for headings — 400, 500, 600 weights)
- Load: DM Sans (for body — 300, 400, 500 weights)
- Apply site-wide within the Vault page component only

### Animations (Subtle)
- Fade-in on scroll for each section (use Intersection Observer)
- Gold horizontal rules can animate width on scroll-in (from 0 to full width)
- Hero text can have a subtle fade-in with slight upward motion on load
- Keep animations tasteful — this is luxury, not a tech startup

### Image Placeholders
- For now, use elegant placeholder containers:
  - Background: #1A1A1A
  - Border: 1px solid #2A2724 (very subtle warm border)
  - Centered text label in warm gray: "GARAGE RENDER" etc.
  - Aspect ratio: 16:9
  - These will be replaced with Gemini renders or architect visuals later

### Responsive
- Desktop: generous whitespace, two-column layouts for zones
- Tablet: reduce side padding, stack where needed
- Mobile: fully stacked, smaller headings, but maintain the luxury feel
  - CTA buttons full-width on mobile
  - Specs grid goes to single column
  - Zone sections stack image above text

### SEO
- Page title: "The Vault — Underground Luxury Living | Al Hadeeqa Contracting"
- Meta description: "A private underground living space beneath your villa. Car ramp entry, cinema, gym, lounge, bar — built to bunker-grade specifications. Starting from AED 5,000,000. Dubai, UAE."
- Use proper heading hierarchy (h1 for hero, h2 for section headings)

### Performance
- No heavy background videos or autoplaying media
- Keep the page lightweight — the luxury feeling comes from typography, spacing, and color, not from heavy assets
- Lazy-load any images when they're eventually added

---

## Copy Reference

Here are the exact heading/subheading combinations for each section:

| Section | Heading | Subheading |
|---------|---------|------------|
| Hero | Your Private Underground World | A luxury living space beneath your villa — with the protection of a bunker built into every wall. |
| Concept | Not a Bunker. An Underground Sanctuary. | (body paragraphs, no subheading) |
| Zone 1 | The Arrival | (body paragraph) |
| Zone 2 | The Gallery | (body paragraph) |
| Zone 3 | The Hall | (body paragraph) |
| Zone 4 | The Cinema | (body paragraph) |
| Zone 5 | The Gym | (body paragraph) |
| Zone 6 | The Suite | (body paragraph) |
| Specs | Built to Endure | Every Vault is constructed to bunker-grade specifications — concealed within the luxury. |
| Price | An Investment in Permanence | (pricing line + CTA) |
| Process | How It Begins | (four steps) |
| Al Hadeeqa | (small text only) | |
| Enquiry | Begin the Conversation | Share your details and we will arrange a private consultation at your property. |

---

## What NOT to Do

1. **Do NOT reuse the site's existing nav, footer, or layout components** — The Vault is visually independent
2. **Do NOT use the green Al Hadeeqa brand color** anywhere on this page
3. **Do NOT use the word "bunker"** in any heading or above the fold — only in the specs section and the Al Hadeeqa connection section, and only in the phrase "bunker-grade specifications"
4. **Do NOT show a comparison table** — this is not a product to compare, it's an experience to aspire to
5. **Do NOT use stock photos** — better to have elegant empty placeholders than generic images
6. **Do NOT add busy hover effects, parallax scrolling, or animated backgrounds** — restraint is luxury
7. **Do NOT link to the Jan Group brands** from this page
