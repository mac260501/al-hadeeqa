import { useState } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { faqSchema, breadcrumbSchema, organizationSchema } from "../data/schemas";
import { ALL_FAQS, ALL_FAQS_FLAT } from "../data/faqs";

const BASE = "https://alhadeeqacontracting.com";

const S = {
  page: { background: "#0a0f0b", color: "#e8ede9", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" },
  hero: {
    background: "linear-gradient(160deg, #0d1a10 0%, #0a0f0b 100%)",
    padding: "160px 24px 56px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  heroInner: { maxWidth: 820, margin: "0 auto" },
  eyebrow: { fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 14 },
  h1: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.15,
    marginBottom: 16,
  },
  lead: { fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 660 },

  jumpNav: {
    padding: "18px 24px",
    background: "#0d1a10",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  jumpNavLabel: { fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, marginRight: 4 },
  jumpLink: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    padding: "5px 12px",
    border: "1px solid rgba(255,255,255,0.1)",
    letterSpacing: "0.02em",
  },

  content: { maxWidth: 820, margin: "0 auto", padding: "56px 24px" },

  categoryBlock: { marginBottom: 56 },
  categoryAnchor: { display: "block", visibility: "hidden", height: 0, marginTop: -80, paddingTop: 80 },
  categoryLabel: {
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    fontWeight: 600,
    marginBottom: 10,
  },
  categoryTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(20px, 3vw, 28px)",
    fontWeight: 700,
    color: "#fff",
    marginBottom: 24,
    paddingBottom: 12,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  faqItem: { borderBottom: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" },
  faqQuestion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "18px 0",
    cursor: "pointer",
    gap: 16,
  },
  faqQ: { fontSize: 15, fontWeight: 600, color: "#fff", lineHeight: 1.5, flex: 1 },
  faqToggle: { fontSize: 18, color: "#5aad6e", fontWeight: 300, flexShrink: 0, lineHeight: 1, marginTop: 2 },
  faqA: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.85,
    paddingBottom: 18,
  },

  ctaBlock: {
    background: "#0d1a10",
    border: "1px solid rgba(90,173,110,0.15)",
    padding: "32px",
    marginTop: 48,
    textAlign: "center",
  },
  ctaTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 10 },
  ctaText: { fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 20 },
  ctaBtn: {
    background: "#25d366",
    color: "#fff",
    border: "none",
    padding: "13px 28px",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.06em",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  },
};

function categoryAnchorId(category) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={S.faqItem}>
      <div style={S.faqQuestion} onClick={() => setOpen((v) => !v)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}>
        <div style={S.faqQ}>{faq.q}</div>
        <div style={S.faqToggle}>{open ? "−" : "+"}</div>
      </div>
      {open && <div style={S.faqA}>{faq.a}</div>}
    </div>
  );
}

export default function FAQPage() {
  const meta = usePageMeta({
    title: "Frequently Asked Questions | Al Hadeeqa Contracting — Dubai Construction, Bunkers & The Vault",
    description:
      "Complete FAQ for Al Hadeeqa Contracting covering pergolas, carports, dewatering, underground bunkers, and The Vault. Pricing, timelines, permits, and specifications answered. Updated March 2026.",
    canonical: `${BASE}/faq`,
    schemas: [
      faqSchema(ALL_FAQS_FLAT),
      organizationSchema,
      breadcrumbSchema([
        { name: "Home", url: BASE },
        { name: "FAQ", url: `${BASE}/faq` },
      ]),
    ],
  });

  return (
    <div style={S.page}>
      {meta}
      {/* Hero */}
      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.eyebrow}>All Services · Last Updated March 2026</div>
          <h1 style={S.h1}>Frequently Asked Questions</h1>
          <p style={S.lead}>
            Everything you need to know about Al Hadeeqa Contracting's services, pricing, timelines, permits, and
            underground shelter specifications. Written by Al Hadeeqa Contracting — 15+ years of construction experience
            in Dubai.
          </p>
        </div>
      </section>

      {/* Jump nav */}
      <nav style={S.jumpNav} aria-label="FAQ categories">
        <span style={S.jumpNavLabel}>Jump to:</span>
        {ALL_FAQS.map((cat) => (
          <a key={cat.category} href={`#${categoryAnchorId(cat.category)}`} style={S.jumpLink}>
            {cat.category}
          </a>
        ))}
      </nav>

      {/* FAQ content */}
      <div style={S.content}>
        {ALL_FAQS.map((cat) => (
          <div key={cat.category} style={S.categoryBlock}>
            <span id={categoryAnchorId(cat.category)} style={S.categoryAnchor} aria-hidden="true" />
            <div style={S.categoryLabel}>FAQ — {cat.category}</div>
            <h2 style={S.categoryTitle}>{cat.category}</h2>
            {cat.items.map((faq) => (
              <FAQItem key={faq.q} faq={faq} />
            ))}
          </div>
        ))}

        {/* CTA block */}
        <div style={S.ctaBlock}>
          <div style={S.ctaTitle}>Still have questions?</div>
          <div style={S.ctaText}>
            Al Hadeeqa Contracting's team is available via WhatsApp seven days a week. Free site assessments available
            across Dubai and the UAE.
          </div>
          <a
            href={`https://wa.me/971544419854?text=${encodeURIComponent("Hi Al Hadeeqa, I have a question about your services.")}`}
            target="_blank"
            rel="noreferrer"
            style={S.ctaBtn}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
