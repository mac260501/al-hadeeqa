import { useState, useEffect, useRef } from "react";
import "./App.css";

// ── LOGO IMAGE ──
const LogoImg = ({ size = 44 }) => (
  <img src="/logo.jpeg" alt="Al Hadeeqa" style={{ height: size, width: "auto", display: "block", objectFit: "contain" }} />
);

// ── WHATSAPP SVG ──
const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0022 12z" />
  </svg>
);

const IgIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.9A3.85 3.85 0 003.9 7.75v8.5a3.85 3.85 0 003.85 3.85h8.5a3.85 3.85 0 003.85-3.85v-8.5a3.85 3.85 0 00-3.85-3.85h-8.5zm8.95 1.45a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.9a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2z" />
  </svg>
);

// ── SERVICES DATA ──
const SERVICES = [
  {
    id: "construction",
    title: "Construction & Remodeling",
    subtitle: "Complete build solutions",
    desc: "Full-scope residential and commercial construction. From villa extensions to complete fit-outs, we deliver precision builds that stand for decades.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    tags: ["Villa Construction", "Extensions", "Fit-Out", "Remodeling"]
  },
  {
    id: "pergolas",
    title: "Luxury Pergolas",
    subtitle: "Crafted for the exceptional",
    desc: "Bespoke pergolas engineered for UAE's elite. Powder-coated aluminum, louvred roofing, integrated lighting — spaces that become destinations.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    tags: ["Louvred Roof", "Custom Design", "Lighting", "DM Approved"],
    highlight: true
  },
  {
    id: "carports",
    title: "Supercar Carports",
    subtitle: "Protection worthy of the machine",
    desc: "Your Lamborghini, Ferrari, or Rolls deserves more than a parking spot. Our architectural carports are precision-engineered shelters for exceptional vehicles.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    tags: ["Supercar Ready", "UV-Resistant", "Custom Steel", "10-Year Warranty"],
    highlight: true
  },
  {
    id: "glassrooms",
    title: "Glass Rooms & Partitions",
    subtitle: "Transparency, perfected",
    desc: "Architectural glass installations — office partitions, enclosed patios, frameless balustrades, and bespoke glassrooms that blend indoor and outdoor living.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    tags: ["Frameless Glass", "Partitions", "Balustrades", "Enclosures"]
  },
  {
    id: "dewatering",
    title: "Dewatering & Shoring",
    subtitle: "Ground control from day one",
    desc: "Professional dewatering systems and shoring solutions for deep excavations. We manage groundwater and stabilize excavations safely — critical for UAE's coastal and sandy substrates.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    tags: ["Wellpoint Systems", "Sheet Piling", "Groundwater Control", "Deep Excavation"]
  },
  {
    id: "excavation",
    title: "Excavation",
    subtitle: "Precision earthworks",
    desc: "Controlled excavation for foundations, basements, utilities, and civil works. Our experienced operators handle complex sites with precision and safety protocols.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    tags: ["Basement Dig", "Foundation Work", "Utility Trenching", "Site Prep"]
  },
  {
    id: "demolition",
    title: "Demolition",
    subtitle: "Cleared. Clean. Ready.",
    desc: "Safe, licensed demolition for residential and commercial structures. Full debris removal and site clearance — leaving your plot ready for what comes next.",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    tags: ["Licensed", "Debris Removal", "Structural Demo", "Site Clearance"]
  },
  {
    id: "waterproofing",
    title: "Roof Waterproofing",
    subtitle: "Sealed against the elements",
    desc: "Comprehensive waterproofing systems for flat roofs, terraces, and wet areas. UAE-rated membranes and coatings that handle extreme heat and rare but punishing rainfall.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    tags: ["Membrane Systems", "Terrace Waterproofing", "Heat-Resistant", "10-Year Warranty"]
  },
  {
    id: "maintenance",
    title: "Maintenance",
    subtitle: "Ongoing care, on schedule",
    desc: "Planned and reactive maintenance for residential and commercial properties. Painting, repairs, fixture replacement, and everything in between — handled by one trusted team.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    tags: ["Annual Contracts", "Painting", "Repairs", "Handyman Services"]
  },
];

// ── STATS ──
const STATS = [
  { val: "35+", label: "Years in UAE" },
  { val: "500+", label: "Projects Completed" },
  { val: "10yr", label: "Warranty on Select Works" },
];

// ── USE INTERSECTION OBSERVER ──
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── CONTACT FORM MODAL ──
function ContactModal({ service, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [msg, setMsg] = useState("");

  const submit = () => {
    const text = encodeURIComponent(
      `Hi Al Hadeeqa Contracting,\n\nI'd like to enquire about: *${service || "your services"}*\n\n*Name:* ${name || "Not provided"}\n*Phone:* ${phone || "Not provided"}\n*Area in Dubai:* ${area || "Not specified"}${msg ? "\n\n*Message:* " + msg : ""}\n\nPlease get in touch. Thank you.`
    );
    window.open(`https://wa.me/971544419854?text=${text}`, "_blank");
    onClose();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={e => e.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        <div style={styles.modalEyebrow}>Free Consultation</div>
        <h3 style={styles.modalTitle}>Let's talk about your project</h3>
        {service && <div style={styles.modalService}>{service}</div>}
        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
          <input style={styles.input} placeholder="WhatsApp (+971...)" value={phone} onChange={e=>setPhone(e.target.value)} />
        </div>
        <select style={{...styles.input, width:"100%", marginBottom:14}} value={area} onChange={e=>setArea(e.target.value)}>
          <option value="">Select Dubai area</option>
          <option>Dubai Marina</option>
          <option>Jumeirah</option>
          <option>Business Bay</option>
          <option>Dubai Hills</option>
          <option>Other Dubai Area</option>
        </select>
        <textarea style={{...styles.input, width:"100%", height:90, resize:"vertical", marginBottom:20}} placeholder="Brief description of your project (optional)" value={msg} onChange={e=>setMsg(e.target.value)} />
        <button style={styles.waBtn} onClick={submit}>
          <WaIcon /> Send via WhatsApp
        </button>
        <p style={styles.formNote}>We respond within 2 hours. No spam, ever.</p>
      </div>
    </div>
  );
}

// ── NAV ──
function Nav({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = ["Services", "About", "Projects", "Contact"];

  return (
    <nav style={{ ...styles.nav, boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.04)" }} className="main-nav">
      <div style={styles.navBrand}>
        <LogoImg size={42} />
        <div>
          <div style={styles.navName}>Al Hadeeqa Contracting</div>
        </div>
      </div>

      {/* Desktop links */}
      <div style={styles.navLinks} className="nav-links">
        {navLinks.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={styles.navLink}>{l}</a>
        ))}
      </div>

      <button style={styles.navCta} className="nav-cta-desktop" onClick={onContact}>Free Consultation</button>

      {/* Hamburger */}
      <button style={styles.hamburger} className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span style={{...styles.hamburgerLine, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none"}} />
        <span style={{...styles.hamburgerLine, opacity: menuOpen ? 0 : 1}} />
        <span style={{...styles.hamburgerLine, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"}} />
      </button>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={styles.mobileLink} onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <button style={{...styles.navCta, width:"100%", marginTop:8}} onClick={() => { setMenuOpen(false); onContact(); }}>
            Free Consultation
          </button>
        </div>
      )}
    </nav>
  );
}

// ── HERO ──
function Hero({ onContact }) {
  return (
    <section style={styles.hero} id="home" className="hero-section">
      {/* BG image from Unsplash — luxury villa */}
      <div style={{
        ...styles.heroBg,
        backgroundImage: `url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80')`
      }} />
      <div style={styles.heroOverlay} />

      <div style={styles.heroContent} className="hero-content">
        <div style={styles.eyebrow} className="hero-eyebrow">
          <span style={styles.eyebrowLine} /> Al Hadeeqa Contracting
        </div>
        <div style={styles.alertBadge} className="hero-alert">
          <span style={styles.alertDot} />
          <span style={styles.alertText}>35 Years Building UAE's Finest Homes</span>
        </div>
        <h1 style={styles.heroH1} className="hero-h1">
          Building Trust.<br />
          <em style={styles.heroEm}>Crafting Excellence.</em>
        </h1>
        <p style={styles.heroSub} className="hero-sub">
          From luxury pergolas and supercar carports to dewatering, excavation, and full construction — one Dubai team, decades of proof.
        </p>
        <div style={styles.heroCtas}>
          <button style={styles.btnPrimary} onClick={onContact}>
            <WaIcon /> Get a Free Quote
          </button>
          <a href="#services" style={styles.btnSecondary}>Explore Our Services →</a>
        </div>
      </div>

      <div style={styles.heroStats} className="hero-stats">
        {STATS.map(s => (
          <div key={s.label} style={styles.heroStatItem} className="hero-stat-item">
            <div style={styles.heroStatVal}>{s.val}</div>
            <div style={styles.heroStatLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── SERVICE CARD ──
function ServiceCard({ service, onContact, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={`service-${service.id}`}
      ref={ref}
      style={{
        ...styles.serviceCard,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        ...(hovered ? styles.serviceCardHover : {})
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.serviceImgWrap}>
        <img
          src={service.image}
          alt={service.title}
          style={{
            ...styles.serviceImg,
            transform: hovered ? "scale(1.05)" : "scale(1)"
          }}
        />
        <div style={styles.serviceImgOverlay} />
      </div>
      <div style={styles.serviceBody}>
        <div style={styles.serviceSubtitle}>{service.subtitle}</div>
        <h3 style={styles.serviceTitle}>{service.title}</h3>
        <p style={styles.serviceDesc}>{service.desc}</p>
        <div style={styles.serviceTags}>
          {service.tags.map(t => (
            <span key={t} style={styles.serviceTag}>{t}</span>
          ))}
        </div>
        <button
          style={styles.serviceBtn}
          onClick={() => onContact(service.title)}
        >
          Enquire Now →
        </button>
      </div>
    </div>
  );
}

// ── SERVICES OVERVIEW / QUICK NAV ──
function ServicesOverview() {
  const scrollToService = (id) => {
    const el = document.getElementById(`service-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="services-nav" style={styles.servicesNavSection} className="services-nav-section">
      <div style={styles.servicesNavInner}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={styles.sectionEyebrow}>Everything We Do</div>
          <div style={styles.greenRule} />
          <h2 style={{ ...styles.sectionH2, fontSize: "clamp(26px, 3vw, 40px)" }}>
            Our Services at a Glance
          </h2>
          <p style={{ ...styles.sectionSub, marginTop: 12 }}>
            Select any service to jump straight to the full details.
          </p>
        </div>

        <div style={styles.servicesNavGrid} className="services-nav-grid">
          {SERVICES.map((s, index) => (
            <button
              key={s.id}
              className="services-nav-tile"
              style={styles.servicesNavTile}
              onClick={() => scrollToService(s.id)}
            >
              <span style={styles.servicesNavIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className="services-nav-tile-name" style={styles.servicesNavName}>{s.title}</span>
              <span className="services-nav-tile-sub" style={styles.servicesNavSub}>{s.subtitle}</span>
            </button>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href="#services" style={styles.servicesNavCta}>View Full Details ↓</a>
        </div>
      </div>
    </section>
  );
}

// ── SERVICES SECTION ──
function Services({ onContact }) {
  const [ref, inView] = useInView();
  return (
    <section id="services" style={styles.section} className="section-main">
      <div ref={ref} style={{
        ...styles.sectionHeader,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease"
      }}>
        <a href="#services-nav" style={styles.backToOverview}>← Back to Overview</a>
        <div style={styles.sectionEyebrow}>What We Build</div>
        <div style={styles.greenRule} />
        <h2 style={styles.sectionH2}>Our Services</h2>
        <p style={styles.sectionSub}>
          From groundwork to the finishing detail — we handle every phase with the same licensed team, the same standards.
        </p>
      </div>
      <div style={styles.servicesGrid} className="services-grid">
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.id} service={s} onContact={onContact} index={i} />
        ))}
      </div>

      {/* Bunker note */}
      <div style={styles.bunkerNote}>
        <div>
          <strong>SafeHaven Underground Bunkers</strong> — Al Hadeeqa also builds discreet underground bunkers for UAE villas through our SafeHaven division.{" "}
          <a href="/bunker" style={styles.bunkerLink}>Learn more →</a>
        </div>
      </div>
    </section>
  );
}

// ── LUXURY CARPORT/PERGOLA SPOTLIGHT ──
function LuxurySpotlight({ onContact }) {
  const [ref, inView] = useInView();
  return (
    <section style={styles.spotlightSection} className="spotlight-section">
      <div style={styles.spotlightBg} />
      <div ref={ref} style={styles.spotlightInner} className="spotlight-inner">
        <div style={{
          ...styles.spotlightText,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease"
        }}>
          <div style={styles.sectionEyebrow}>Exclusive to Al Hadeeqa</div>
          <div style={{...styles.greenRule, margin:"12px 0 20px"}} />
          <h2 style={{...styles.sectionH2, color:"#fff", textAlign:"left"}}>
            Your Supercar<br />
            <em style={{color:"#5aad6e", fontStyle:"italic"}}>Deserves Better</em>
          </h2>
          <p style={{...styles.sectionSub, color:"rgba(255,255,255,0.72)", textAlign:"left", maxWidth:440}}>
            We design and build architectural carports and luxury pergolas specifically for clients with exceptional vehicles. Powder-coated steel, polycarbonate or louvred aluminium roofing, custom footprints — engineered to protect what matters most.
          </p>
          <div style={styles.spotlightFeatures}>
            {["DM Approved & Licensed", "10-Year Structural Warranty", "UV & Heat-Resistant Materials", "Custom Sizing — 1 to 6+ Cars", "Integrated Drainage & Lighting"].map(f => (
              <div key={f} style={styles.spotlightFeature}>
                <span style={styles.checkmark}>✓</span> {f}
              </div>
            ))}
          </div>
          <div style={styles.spotlightPricing}>
            <div style={styles.pricingRow}>
              <span>1 Car</span><span>AED 5,000</span>
            </div>
            <div style={styles.pricingRow}>
              <span>2 Cars</span><span>AED 10,000</span>
            </div>
            <div style={styles.pricingRow}>
              <span>3 Cars</span><span>AED 15,000</span>
            </div>
            <div style={styles.pricingRow}>
              <span>4+ Cars</span><span>Custom Quote</span>
            </div>
          </div>
          <button style={styles.btnPrimary} onClick={() => onContact("Luxury Carport / Pergola")}>
            <WaIcon /> Get a Custom Quote
          </button>
        </div>
        <div style={{
          ...styles.spotlightImages,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(30px)",
          transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s"
        }}>
          <img
            src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80"
            alt="Supercar carport"
            style={styles.spotlightImg1}
          />
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
            alt="Luxury pergola"
            style={styles.spotlightImg2}
          />
        </div>
      </div>
    </section>
  );
}

// ── ABOUT SECTION ──
function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" style={styles.section} className="section-main">
      <div ref={ref} className="about-inner" style={{
        ...styles.aboutInner,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease"
      }}>
        <div style={styles.aboutText}>
          <div style={styles.sectionEyebrow}>Who We Are</div>
          <div style={{...styles.greenRule, margin:"12px 0 24px", marginLeft:0}} />
          <h2 style={{...styles.sectionH2, textAlign:"left"}}>
            An Established Name.<br />
            <em style={{color:"var(--green)", fontStyle:"italic"}}>Not a pop-up service.</em>
          </h2>
          <p style={styles.aboutDesc}>
            Al Hadeeqa Contracting, Dewatering, Aluminum & Glass LLC has been building across the UAE for 35 years. We are a fully licensed contractor serving Dubai with a team that has seen and solved every site condition the city can throw at a project.
          </p>
          <p style={styles.aboutDesc}>
            We don't subcontract your project to strangers. Our in-house crew handles everything: groundwork, structure, glass, aluminum, finishes. One point of contact. One accountable team.
          </p>
          <div style={styles.aboutStats} className="about-stats">
            {STATS.map(s => (
              <div key={s.label} style={styles.aboutStat} className="about-stat">
                <div style={styles.aboutStatVal}>{s.val}</div>
                <div style={styles.aboutStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.aboutImages} className="about-images">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
            alt="Construction site Dubai"
            style={styles.aboutImg}
          />
          <img
            src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&q=80"
            alt="Al Hadeeqa team at work"
            style={styles.aboutImg}
          />
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS / GALLERY ──
const PROJECT_IMGS = [
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80", label: "Luxury Pergola — Dubai Villa" },
  { src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", label: "Glass Partition — Office Fit-Out" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80", label: "Excavation & Dewatering" },
  { src: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80", label: "Supercar Carport — Jumeirah" },
  { src: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", label: "Roof Waterproofing" },
  { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80", label: "Foundation Work" },
];

function Projects() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{...styles.section, background:"#f4f8f5"}} className="section-main">
      <div ref={ref} style={{
        ...styles.sectionHeader,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease"
      }}>
        <div style={styles.sectionEyebrow}>Recent Work</div>
        <div style={styles.greenRule} />
        <h2 style={styles.sectionH2}>Projects</h2>
      </div>
      <div style={styles.projectsGrid} className="projects-grid">
        {PROJECT_IMGS.map((p, i) => (
          <ProjectThumb key={i} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectThumb({ project, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      style={{
        ...styles.projectThumb,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.09}s, transform 0.5s ease ${index * 0.09}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.src}
        alt={project.label}
        style={{
          ...styles.projectImg,
          transform: hovered ? "scale(1.07)" : "scale(1)"
        }}
      />
      <div style={{...styles.projectOverlay, opacity: hovered ? 1 : 0}}>
        <span style={styles.projectLabel}>{project.label}</span>
      </div>
    </div>
  );
}

// ── CONTACT SECTION ──
function Contact({ onContact }) {
  const [ref, inView] = useInView();
  return (
    <section id="contact" style={styles.contactSection}>
      <div style={styles.contactBg} />
      <div ref={ref} className="contact-inner" style={{
        ...styles.contactInner,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease, transform 0.7s ease"
      }}>
        <div style={styles.contactText}>
          <div style={{...styles.sectionEyebrow, color:"rgba(255,255,255,0.6)"}}>Reach Out</div>
          <div style={{...styles.greenRule, margin:"12px 0 24px", marginLeft:0}} />
          <h2 style={{...styles.sectionH2, color:"#fff", textAlign:"left"}}>
            Ready to start?<br />
            <em style={{color:"#5aad6e", fontStyle:"italic"}}>We're one call away.</em>
          </h2>
          <div style={styles.contactDetails}>
            <a href="https://wa.me/971544419854" target="_blank" rel="noreferrer" style={styles.contactItem}>
              <span style={styles.contactItemLabel}>WhatsApp</span>
              <span>+971 54 441 9854</span>
            </a>
            <a href="tel:+971504824621" style={styles.contactItem}>
              <span style={styles.contactItemLabel}>Phone</span>
              <span>+971 50 482 4621</span>
            </a>
            <a href="mailto:alhadeeqallc@gmail.com" style={styles.contactItem}>
              <span style={styles.contactItemLabel}>Email</span>
              <span>alhadeeqallc@gmail.com</span>
            </a>
            <div style={styles.contactItem}>
              <span style={styles.contactItemLabel}>Office</span>
              <span>Downtown Dubai, UAE · Always Open</span>
            </div>
          </div>
        </div>
        <div style={styles.contactFormCard}>
          <h3 style={styles.contactFormTitle}>Request a Free Assessment</h3>
          <p style={styles.contactFormSub}>We'll respond via WhatsApp within 2 hours.</p>
          <ContactFormInline />
        </div>
      </div>
    </section>
  );
}

function ContactFormInline() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");

  const submit = () => {
    const text = encodeURIComponent(
      `Hi Al Hadeeqa Contracting,\n\nI'm interested in a *free assessment*.\n\n*Name:* ${name || "Not provided"}\n*Phone:* ${phone || "Not provided"}\n*Area in Dubai:* ${area || "Not specified"}\n*Service:* ${service || "General enquiry"}${msg ? "\n\n*Message:* " + msg : ""}\n\nPlease get in touch.`
    );
    window.open(`https://wa.me/971544419854?text=${text}`, "_blank");
  };

  return (
    <div>
      <div style={styles.formGrid}>
        <input style={styles.input} placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
        <input style={styles.input} placeholder="WhatsApp (+971...)" value={phone} onChange={e=>setPhone(e.target.value)} />
      </div>
      <select style={{...styles.input, width:"100%", marginBottom:14}} value={area} onChange={e=>setArea(e.target.value)}>
        <option value="">Select Dubai area</option>
        <option>Dubai Marina</option>
        <option>Jumeirah</option>
        <option>Business Bay</option>
        <option>Dubai Hills</option>
        <option>Other Dubai Area</option>
      </select>
      <select style={{...styles.input, width:"100%", marginBottom:14}} value={service} onChange={e=>setService(e.target.value)}>
        <option value="">Select Service</option>
        <option>Luxury Pergola</option>
        <option>Supercar Carport</option>
        <option>Construction / Remodeling</option>
        <option>Dewatering & Shoring</option>
        <option>Excavation</option>
        <option>Demolition</option>
        <option>Roof Waterproofing</option>
        <option>Glass Rooms & Partitions</option>
        <option>Maintenance</option>
        <option>Underground Bunker</option>
        <option>Other</option>
      </select>
      <textarea style={{...styles.input, width:"100%", height:80, resize:"vertical", marginBottom:18}} placeholder="Project details (optional)" value={msg} onChange={e=>setMsg(e.target.value)} />
      <button style={styles.waBtn} onClick={submit}>
        <WaIcon /> Send via WhatsApp
      </button>
      <p style={{...styles.formNote, marginTop:10}}>No spam, ever. Direct to our licensed contractor.</p>
    </div>
  );
}

// ── FOOTER ──
function Footer() {
  return (
    <footer style={styles.footer} className="footer-pad">
      <div style={styles.footerInner} className="footer-inner">
        <div style={styles.footerBrand}>
          <LogoImg size={40} />
          <div>
            <div style={styles.footerName}>Al Hadeeqa Contracting</div>
            <div style={styles.footerSub}>Dewatering · Aluminum & Glass LLC</div>
            <div style={styles.footerSub}>Building Trust, Crafting Excellence</div>
          </div>
        </div>
        <div style={styles.footerLinks}>
          <div style={styles.footerLinkGroup}>
            <div style={styles.footerLinkHead}>Services</div>
            {["Construction", "Luxury Pergolas", "Supercar Carports", "Dewatering & Shoring", "Excavation", "Demolition", "Waterproofing", "Maintenance"].map(l => (
              <a key={l} href="#services" style={styles.footerLink}>{l}</a>
            ))}
          </div>
          <div style={styles.footerLinkGroup}>
            <div style={styles.footerLinkHead}>Contact</div>
            <a href="https://wa.me/971544419854" target="_blank" rel="noreferrer" style={styles.footerLink}>+971 54 441 9854</a>
            <a href="tel:+971504824621" style={styles.footerLink}>+971 50 482 4621</a>
            <a href="mailto:alhadeeqallc@gmail.com" style={styles.footerLink}>alhadeeqallc@gmail.com</a>
            <div style={{...styles.footerLink, cursor:"default"}}>Downtown Dubai, UAE 23435</div>
            <div style={styles.footerSocialRow}>
              <a
                href="https://www.facebook.com/p/Al-Hadeeqa-Contracting-100088397351845/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="footer-social-btn"
                style={styles.footerSocialBtn}
              >
                <FbIcon />
              </a>
              <a
                href="https://www.instagram.com/alhadeeqallc/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="footer-social-btn"
                style={styles.footerSocialBtn}
              >
                <IgIcon />
              </a>
              <a
                href="https://wa.me/971544419854"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="footer-social-btn footer-social-btn-wa"
                style={{...styles.footerSocialBtn, ...styles.footerSocialBtnWa}}
              >
                <WaIcon />
              </a>
            </div>
          </div>
          <div style={styles.footerLinkGroup}>
            <div style={styles.footerLinkHead}>Also</div>
            <a href="/bunker" style={styles.footerLink}>SafeHaven Bunkers</a>
            <a href="https://thejanfurniture.com" target="_blank" rel="noreferrer" style={styles.footerLink}>Jan Furnishings (sister co.)</a>
          </div>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <span>Dubai Licensed Contractor · Serving Dubai Only</span>
        <span>© 2026 Al Hadeeqa Contracting. All rights reserved.</span>
      </div>
    </footer>
  );
}

// ── FLOATING WHATSAPP ──
function FloatingWa() {
  return (
    <a
      href="https://wa.me/971544419854?text=Hi%20Al%20Hadeeqa%2C%20I%27d%20like%20a%20free%20consultation."
      target="_blank"
      rel="noreferrer"
      className="wa-float-btn"
      style={styles.waFloat}
      aria-label="WhatsApp Us"
    >
      <WaIcon />
      <span className="wa-float-text" style={styles.waFloatText}>WhatsApp Us</span>
    </a>
  );
}

// ── APP ──
export default function App() {
  const [modal, setModal] = useState(null); // null or service string

  const openContact = (service = "") => setModal(service || "General Enquiry");
  const closeContact = () => setModal(null);

  return (
    <div style={styles.root}>
      <Nav onContact={() => openContact()} />
      <Hero onContact={openContact} />
      <ServicesOverview />
      <Services onContact={openContact} />
      <LuxurySpotlight onContact={openContact} />
      <About />
      <Projects />
      <Contact onContact={openContact} />
      <Footer />
      <FloatingWa />
      {modal && <ContactModal service={modal} onClose={closeContact} />}
    </div>
  );
}

// ══════════════════════════════════════
// STYLES
// ══════════════════════════════════════
const GREEN = "#1a4a26";
const GREEN_L = "#1d5229";
const GREEN_DIM = "rgba(26,74,38,0.10)";
const GREEN_BORDER = "rgba(26,74,38,0.18)";

const styles = {
  root: { fontFamily: "'DM Sans', sans-serif", color: "#141f16", overflowX: "hidden" },

  // NAV
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
    padding: "0 48px", minHeight: 68,
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
    background: "#fff",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    transition: "box-shadow 0.3s"
  },
  navBrand: { display: "flex", alignItems: "center", gap: 13, flex: 1 },
  navName: { fontSize: 14, letterSpacing: "0.06em", textTransform: "uppercase", color: "#141f16", fontWeight: 600, lineHeight: 1.4 },
  navSub: { fontSize: 11, color: "#6b876f", letterSpacing: "0.04em", marginTop: 2 },
  navLinks: {
    display: "flex", gap: 32, alignItems: "center",
    "@media (max-width: 768px)": { display: "none" }
  },
  navLink: { fontSize: 16, color: "#3d5c42", textDecoration: "none", letterSpacing: "0.04em", fontWeight: 500, transition: "color 0.2s" },
  navCta: {
    background: GREEN, color: "#fff", border: "none", cursor: "pointer",
    padding: "12px 24px", fontSize: 14, letterSpacing: "0.1em",
    textTransform: "uppercase", fontWeight: 700,
    transition: "background 0.2s", whiteSpace: "nowrap", flexShrink: 0,
    display: "flex", alignItems: "center", gap: 8
  },
  hamburger: {
    display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer",
    "@media (max-width: 768px)": { display: "flex" }
  },
  hamburgerLine: { width: 24, height: 2, background: "#141f16", transition: "transform 0.3s, opacity 0.3s", display: "block" },
  mobileMenu: {
    position: "absolute", top: 68, left: 0, right: 0,
    background: "#fff", borderBottom: `2px solid ${GREEN}`,
    padding: "16px 24px 24px",
    display: "flex", flexDirection: "column", gap: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
  },
  mobileLink: { fontSize: 16, color: "#141f16", textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${GREEN_BORDER}` },

  // HERO
  hero: { minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 68 },
  heroBg: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center 40%", backgroundRepeat: "no-repeat" },
  heroOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(105deg, rgba(244,248,245,0.22) 0%, rgba(244,248,245,0.06) 50%, transparent 100%)"
  },
  heroContent: {
    position: "relative", zIndex: 2,
    padding: "52px 52px 52px 56px", maxWidth: 640,
    margin: "64px 0 0 48px",
    background: "rgba(255,255,255,0.96)",
    borderLeft: `4px solid ${GREEN}`,
    boxShadow: "0 8px 48px rgba(0,0,0,0.14)"
  },
  eyebrow: { display: "inline-flex", alignItems: "center", gap: 12, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: GREEN, marginBottom: 24, marginRight: 22 },
  eyebrowLine: { display: "inline-block", width: 28, height: 1, background: GREEN },
  alertBadge: {
    display: "inline-flex", alignItems: "center", gap: 10,
    background: GREEN_DIM, border: `1px solid ${GREEN_BORDER}`,
    padding: "8px 16px", marginBottom: 28
  },
  alertDot: { width: 7, height: 7, borderRadius: "50%", background: GREEN, animation: "pulse 2s infinite" },
  alertText: { fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3d5c42", fontWeight: 500 },
  heroH1: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 5.5vw, 80px)", fontWeight: 700, lineHeight: 1.06, color: "#141f16", marginBottom: 20 },
  heroEm: { fontStyle: "italic", color: GREEN, display: "block" },
  heroSub: { fontSize: 18, color: "#6b876f", maxWidth: 480, marginBottom: 44, lineHeight: 1.8, fontWeight: 300 },
  heroCtas: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" },
  heroStats: {
    position: "absolute", right: 60, top: "50%", transform: "translateY(-50%)",
    display: "flex", flexDirection: "column", zIndex: 3,
    background: "rgba(255,255,255,0.96)",
    borderTop: `4px solid ${GREEN}`,
    boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
    padding: "28px 32px", gap: 0
  },
  heroStatItem: { textAlign: "center", padding: "16px 0", borderBottom: `1px solid ${GREEN_BORDER}` },
  heroStatVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: GREEN, lineHeight: 1 },
  heroStatLabel: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b876f", marginTop: 6 },

  // BUTTONS
  btnPrimary: {
    background: GREEN, color: "#fff", border: "none", cursor: "pointer",
    padding: "15px 32px", fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase",
    fontWeight: 700, transition: "background 0.2s",
    display: "inline-flex", alignItems: "center", gap: 10
  },
  btnSecondary: {
    color: "#6b876f", fontSize: 14, letterSpacing: "0.08em",
    textDecoration: "none", borderBottom: `1px solid rgba(26,74,38,0.3)`,
    paddingBottom: 2, transition: "color 0.2s"
  },
  waBtn: {
    background: "#25d366", color: "#fff", border: "none", cursor: "pointer",
    padding: "15px 32px", fontFamily: "'DM Sans', sans-serif",
    fontSize: 14, fontWeight: 700, width: "100%",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
    transition: "background 0.2s"
  },

  // SECTION
  section: { padding: "100px 64px", maxWidth: 1400, margin: "0 auto" },
  sectionHeader: { textAlign: "center", marginBottom: 60 },
  sectionEyebrow: { fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: GREEN, fontWeight: 600 },
  greenRule: { width: 36, height: 2, background: GREEN, margin: "12px auto 18px" },
  sectionH2: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, lineHeight: 1.12, textAlign: "center" },
  sectionSub: { fontSize: 17, color: "#6b876f", maxWidth: 520, margin: "16px auto 0", lineHeight: 1.8, fontWeight: 300, textAlign: "center" },

  // SERVICES OVERVIEW / QUICK NAV
  servicesNavSection: {
    background: "#f4f8f5",
    borderTop: `3px solid ${GREEN}`,
    borderBottom: `1px solid ${GREEN_BORDER}`,
    padding: "64px 64px",
  },
  servicesNavInner: { maxWidth: 1280, margin: "0 auto" },
  servicesNavGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 14,
  },
  servicesNavTile: {
    display: "flex", flexDirection: "column", alignItems: "flex-start",
    textAlign: "left", padding: "20px 18px",
    minHeight: 124,
    background: "#fff", border: `1px solid ${GREEN_BORDER}`,
    borderLeft: `3px solid ${GREEN}`,
    cursor: "pointer", transition: "background 0.2s, border-color 0.2s, transform 0.2s",
    gap: 8, fontFamily: "'DM Sans', sans-serif",
  },
  servicesNavIndex: { fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b876f", fontWeight: 700 },
  servicesNavName: { fontSize: 18, fontWeight: 600, color: "#141f16", lineHeight: 1.25 },
  servicesNavSub: { fontSize: 12, color: "#6b876f", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.4 },
  servicesNavCta: {
    display: "inline-block", color: GREEN, fontSize: 14, fontWeight: 700,
    letterSpacing: "0.08em", textDecoration: "none",
    borderBottom: `2px solid ${GREEN}`, paddingBottom: 3,
  },
  backToOverview: {
    display: "inline-block", color: "#6b876f", fontSize: 13,
    textDecoration: "none", letterSpacing: "0.06em",
    marginBottom: 20, transition: "color 0.2s",
    borderBottom: `1px solid rgba(107,135,111,0.3)`, paddingBottom: 2,
  },

  // SERVICES GRID
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 },
  serviceCard: {
    background: "#fff", border: `1px solid ${GREEN_BORDER}`,
    overflow: "hidden", transition: "box-shadow 0.3s, transform 0.3s",
    display: "flex", flexDirection: "column"
  },
  serviceCardHighlight: { border: `2px solid ${GREEN}` },
  serviceCardHover: { boxShadow: "0 16px 48px rgba(26,74,38,0.14)", transform: "translateY(-4px)" },
  highlightBadge: {
    background: GREEN, color: "#fff",
    fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
    padding: "6px 14px", alignSelf: "flex-start", margin: "12px 0 0 12px"
  },
  serviceImgWrap: { height: 200, overflow: "hidden", position: "relative", flexShrink: 0 },
  serviceImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" },
  serviceImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,74,38,0.15), transparent)" },
  serviceBody: { padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" },
  serviceSubtitle: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, marginBottom: 8, fontWeight: 600 },
  serviceTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#141f16", marginBottom: 12, lineHeight: 1.2 },
  serviceDesc: { fontSize: 15, color: "#6b876f", lineHeight: 1.75, fontWeight: 300, flex: 1 },
  serviceTags: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16, marginBottom: 20 },
  serviceTag: { background: GREEN_DIM, color: "#3d5c42", fontSize: 11, letterSpacing: "0.08em", padding: "5px 11px", fontWeight: 500 },
  serviceBtn: {
    background: "none", border: `1px solid ${GREEN}`, color: GREEN,
    padding: "11px 22px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
    fontWeight: 700, cursor: "pointer", transition: "background 0.2s, color 0.2s", alignSelf: "flex-start"
  },

  // BUNKER NOTE
  bunkerNote: {
    marginTop: 48, padding: "20px 28px",
    background: "#f4f8f5", border: `1px solid ${GREEN_BORDER}`, borderLeft: `4px solid ${GREEN}`,
    display: "block",
    fontSize: 15, color: "#3d5c42", lineHeight: 1.7
  },
  bunkerLink: { color: GREEN, fontWeight: 700, textDecoration: "none" },

  // LUXURY SPOTLIGHT
  spotlightSection: { background: "#111", position: "relative", padding: "100px 64px", overflow: "hidden" },
  spotlightBg: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at 70% 50%, rgba(26,74,38,0.25) 0%, transparent 70%)",
    pointerEvents: "none"
  },
  spotlightInner: { maxWidth: 1280, margin: "0 auto", display: "flex", gap: 80, alignItems: "center" },
  spotlightText: { flex: 1, minWidth: 0 },
  spotlightFeatures: { display: "flex", flexDirection: "column", gap: 12, margin: "28px 0" },
  spotlightFeature: { fontSize: 15, color: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", gap: 10 },
  checkmark: { color: "#5aad6e", fontWeight: 700, fontSize: 16, flexShrink: 0 },
  spotlightPricing: { borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "20px 0", marginBottom: 32 },
  pricingRow: { display: "flex", justifyContent: "space-between", padding: "9px 0", fontSize: 15, color: "rgba(255,255,255,0.72)", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  spotlightImages: { flex: 1, minWidth: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  spotlightImg1: { width: "100%", aspectRatio: "4/3", objectFit: "cover", gridColumn: "1 / -1" },
  spotlightImg2: { width: "100%", aspectRatio: "4/3", objectFit: "cover", gridColumn: "1 / -1" },

  // ABOUT
  aboutInner: { display: "flex", gap: 80, alignItems: "center", maxWidth: 1280, margin: "0 auto" },
  aboutText: { flex: 1 },
  aboutDesc: { fontSize: 17, color: "#6b876f", lineHeight: 1.8, fontWeight: 300, marginBottom: 18 },
  aboutStats: { display: "grid", gridTemplateColumns: "repeat(2, minmax(180px, 1fr))", gap: 18, marginTop: 40, maxWidth: 560 },
  aboutStat: { textAlign: "center", padding: "24px 18px", background: "#f4f8f5", borderTop: `3px solid ${GREEN}`, width: "100%", boxSizing: "border-box" },
  aboutStatVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: GREEN, lineHeight: 1 },
  aboutStatLabel: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b876f", marginTop: 6 },
  aboutImages: { flex: 1, display: "grid", gridTemplateColumns: "1fr", gap: 16 },
  aboutImg: { width: "100%", aspectRatio: "4/3", objectFit: "cover" },

  // PROJECTS
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 1280, margin: "0 auto" },
  projectThumb: { position: "relative", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" },
  projectImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" },
  projectOverlay: { position: "absolute", inset: 0, background: "rgba(26,74,38,0.7)", display: "flex", alignItems: "flex-end", padding: 16, transition: "opacity 0.3s" },
  projectLabel: { color: "#fff", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em" },

  // CONTACT
  contactSection: { background: "#0f1f12", position: "relative", overflow: "hidden" },
  contactBg: {
    position: "absolute", inset: 0,
    background: "radial-gradient(ellipse at 30% 50%, rgba(26,74,38,0.3) 0%, transparent 70%)",
    pointerEvents: "none"
  },
  contactInner: { maxWidth: 1280, margin: "0 auto", padding: "100px 64px", display: "flex", gap: 80, alignItems: "flex-start" },
  contactText: { flex: 1 },
  contactDetails: { display: "flex", flexDirection: "column", gap: 16, marginTop: 32 },
  contactItem: { display: "flex", alignItems: "baseline", gap: 12, color: "rgba(255,255,255,0.8)", fontSize: 17, textDecoration: "none", lineHeight: 1.5 },
  contactItemLabel: { minWidth: 84, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.56)", fontWeight: 700, flexShrink: 0 },
  contactFormCard: { flex: 1, background: "#fff", padding: "40px", maxWidth: 480 },
  contactFormTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: "#141f16", marginBottom: 8 },
  contactFormSub: { fontSize: 15, color: "#6b876f", marginBottom: 24 },

  // FORM
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 },
  input: {
    width: "100%", padding: "13px 16px",
    border: `1px solid ${GREEN_BORDER}`, background: "#f4f8f5",
    fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#141f16",
    outline: "none", display: "block"
  },
  formNote: { fontSize: 13, color: "#6b876f", textAlign: "center" },

  // MODAL
  modalOverlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "center", padding: 20
  },
  modalBox: { background: "#fff", padding: "40px 36px", maxWidth: 480, width: "100%", position: "relative" },
  modalClose: { position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6b876f" },
  modalEyebrow: { fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN, marginBottom: 8 },
  modalTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, marginBottom: 8 },
  modalService: { fontSize: 14, color: "#6b876f", marginBottom: 20, padding: "8px 14px", background: GREEN_DIM, display: "inline-block" },

  // FOOTER
  footer: { background: "#0a160b", padding: "60px 64px 0" },
  footerInner: { maxWidth: 1280, margin: "0 auto", display: "flex", gap: 64, paddingBottom: 48, borderBottom: "1px solid rgba(255,255,255,0.08)" },
  footerBrand: { display: "flex", gap: 14, alignItems: "flex-start", flex: 1, minWidth: 200 },
  footerName: { color: "#fff", fontSize: 15, fontWeight: 600, letterSpacing: "0.04em" },
  footerSub: { color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 4 },
  footerLinks: { display: "flex", gap: 48, flex: 2, flexWrap: "wrap" },
  footerLinkGroup: { display: "flex", flexDirection: "column", gap: 8, minWidth: 130 },
  footerLinkHead: { color: "#fff", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 },
  footerLink: { color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none", transition: "color 0.2s", lineHeight: 1.6 },
  footerSocialRow: { display: "flex", gap: 10, marginTop: 8 },
  footerSocialBtn: {
    width: 46, height: 46, display: "inline-flex", alignItems: "center", justifyContent: "center",
    border: "1px solid rgba(209,176,117,0.45)", color: "rgba(255,255,255,0.78)",
    textDecoration: "none", transition: "border-color 0.2s, color 0.2s, background 0.2s"
  },
  footerSocialBtnWa: { borderColor: "#23df71", color: "#23df71" },
  footerBottom: { maxWidth: 1280, margin: "0 auto", padding: "20px 0", display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.3)" },

  // WHATSAPP FLOAT
  waFloat: {
    position: "fixed", bottom: 16, right: 16, zIndex: 150,
    minHeight: 56, width: 188, maxWidth: "calc(100vw - 20px)",
    borderRadius: 0,
    background: "#25d366", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: 10,
    padding: "0 14px",
    boxShadow: "0 8px 22px rgba(37,211,102,0.28)",
    textDecoration: "none"
  },
  waFloatText: {
    fontSize: 13, fontWeight: 700, letterSpacing: "0.02em",
    lineHeight: 1, fontFamily: "'DM Sans', sans-serif"
  },
};
