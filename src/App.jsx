import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_TEL_URL,
  CONTACT_WHATSAPP_URL,
  buildWhatsAppUrl,
} from "./constants/contact";
import {
  SERVICES,
  SERVICE_SELECT_OPTIONS,
  getServiceAnchorId,
  getServiceById,
  getServiceHref,
} from "./constants/services";
import { usePageMeta } from "./hooks/usePageMeta";
import {
  organizationSchema,
  websiteSchema,
  breadcrumbSchema,
  pergolaServiceSchema,
  carportServiceSchema,
  dewateringServiceSchema,
  constructionServiceSchema,
  shoringServiceSchema,
  excavationServiceSchema,
  demolitionServiceSchema,
  glassroomsServiceSchema,
  waterproofingServiceSchema,
  maintenanceServiceSchema,
  emergencyPodSchema,
  compactShelterSchema,
  shelterSchema,
  vaultProductSchema,
  faqSchema,
  serviceSchema,
  articleSchema,
} from "./data/schemas";
import {
  pergolaFAQs,
  carportFAQs,
  dewateringFAQs,
  generalFAQs,
  shoringFAQs,
  excavationFAQs,
  demolitionFAQs,
  glassroomFAQs,
  waterproofingFAQs,
  maintenanceFAQs,
  constructionFAQs,
  bunkerFAQs,
} from "./data/faqs";
import FAQPage from "./pages/FAQPage";
import equipmentCategories from "./data/equipmentCategories";

const LogoImg = ({ size = 44 }) => (
  <img
    src="/logo.jpeg"
    alt="Al Hadeeqa"
    style={{ height: size, width: "auto", display: "block", objectFit: "contain" }}
  />
);

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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

const STATS = [
  { val: "35+", label: "Years in UAE", href: "/about" },
  { val: "500+", label: "Projects Completed", href: "/projects" },
  { val: "10yr", label: "Warranty on Select Works", href: "/about" },
];

const JAN_BRANDS = [
  {
    id: "construction",
    name: "Jan Construction",
    desc: "Premium construction and bespoke contracting for luxury residential and commercial projects.",
    href: "/",
    current: true,
  },
  {
    id: "furnishings",
    name: "Jan Furnishings",
    desc: "Custom curtains, blinds and premium window treatments across Dubai.",
    href: "https://thejanfurniture.com",
    current: false,
  },
  {
    id: "interiors",
    name: "Jan Interiors",
    desc: "Wall panels, wallpaper, painting and curated interior package solutions.",
    href: "https://thejanfurniture.com/interiors/",
    current: false,
  },
];

const BrandIcon = ({ id }) => {
  if (id === "furnishings") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  );
  if (id === "interiors") return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7.5" height="7.5"/>
      <rect x="13.5" y="3" width="7.5" height="7.5"/>
      <rect x="3" y="13.5" width="7.5" height="7.5"/>
      <rect x="13.5" y="13.5" width="7.5" height="7.5"/>
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"/>
      <line x1="12" y1="22" x2="12" y2="15.5"/>
      <line x1="22" y1="8.5" x2="12" y2="15.5"/>
      <line x1="2" y1="8.5" x2="12" y2="15.5"/>
    </svg>
  );
};

function JanGroupBar() {
  return (
    <div className="jan-group-bar" style={styles.janGroupBar}>
      <div style={styles.janGroupBarInner}>
        {JAN_BRANDS.map((brand) =>
          brand.current ? (
            <div key={brand.id} style={styles.janGroupBarCurrent} className="jan-group-bar-current">
              <span style={styles.janGroupBarCurrentDot} />
              <span>{brand.name}</span>
            </div>
          ) : (
            <a
              key={brand.id}
              href={brand.href}
              target="_blank"
              rel="noreferrer"
              style={styles.janGroupBarTab}
              className="jan-group-bar-tab"
            >
              {brand.name}
            </a>
          )
        )}
      </div>
    </div>
  );
}

const PROJECT_IMGS = [
  { src: "/assets/images/projects/proj-28.jpg", label: "Luxury Villa — Dubai" },
  { src: "/assets/images/projects/proj-01.jpg", label: "Luxury Villa — Jumeirah" },
  { src: "/assets/images/projects/proj-02.jpg", label: "Residential Villa — Dubai" },
  { src: "/assets/images/projects/proj-03.jpg", label: "Villa Complex — Sharjah" },
  { src: "/assets/images/projects/proj-17.jpg", label: "Luxury Residential — Dubai Hills" },
  { src: "/assets/images/projects/proj-04.jpg", label: "Grand Villa — Dubai" },
  { src: "/assets/images/projects/proj-18.jpg", label: "Luxury Villa Interior — Dubai" },
  { src: "/assets/images/projects/proj-05.jpg", label: "Townhouse Development — UAE" },
  { src: "/assets/images/projects/proj-06.jpg", label: "Residential Villa — Sharjah" },
  { src: "/assets/images/projects/proj-07.jpg", label: "Commercial Warehouse — Dubai Industrial City" },
  { src: "/assets/images/projects/proj-08.jpg", label: "Villa Construction — Dubai" },
  { src: "/assets/images/projects/proj-09.jpg", label: "Residential Development — UAE" },
  { src: "/assets/images/projects/proj-20.jpg", label: "Commercial Showroom — Ajman" },
  { src: "/assets/images/projects/proj-10.jpg", label: "Industrial Building — Dubai" },
  { src: "/assets/images/projects/proj-21.jpg", label: "Commercial Building — Dubai" },
  { src: "/assets/images/projects/proj-11.jpg", label: "Warehouse Fit-Out — Jebel Ali" },
  { src: "/assets/images/projects/proj-12.jpg", label: "Warehouse Interior — Dubai" },
  { src: "/assets/images/projects/proj-22.jpg", label: "Villa Construction — Dubai" },
  { src: "/assets/images/projects/proj-13.jpg", label: "Residential Project — Dubai" },
  { src: "/assets/images/projects/proj-23.jpg", label: "Villa Build — UAE" },
  { src: "/assets/images/projects/proj-15.jpg", label: "Modern Villa — Dubai" },
  { src: "/assets/images/projects/proj-16.jpg", label: "Luxury Residential — UAE" },
  { src: "/assets/images/projects/proj-24.jpg", label: "Warehouse Build — Dubai" },
  { src: "/assets/images/projects/proj-25.jpg", label: "Commercial Development — Dubai" },
  { src: "/assets/images/projects/proj-26.jpg", label: "Shoring Works — Dubai" },
  { src: "/assets/images/projects/proj-27.jpg", label: "Excavation & Shoring — Dubai" },
];

const PAGE_HERO_IMAGES = {
  services: "/assets/images/services-hero.jpg",
  about: "/assets/images/about-hero.jpg",
  projects: "/assets/images/projects-hero.jpg",
};

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed || "/";
}

function resolveRoute(pathname) {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath === "/") {
    return { type: "home", pathname: normalizedPath };
  }

  if (normalizedPath === "/services") {
    return { type: "services", pathname: normalizedPath };
  }

  if (normalizedPath === "/about") {
    return { type: "about", pathname: normalizedPath };
  }

  if (normalizedPath === "/projects") {
    return { type: "projects", pathname: normalizedPath };
  }

  if (normalizedPath === "/contact") {
    return { type: "contact", pathname: normalizedPath };
  }

  if (normalizedPath === "/bunker" || normalizedPath === "/bunkers") {
    return { type: "bunker", pathname: normalizedPath };
  }

  if (normalizedPath === "/bunkers/emergency-pod") {
    return { type: "bunker-emergency-pod", pathname: normalizedPath };
  }

  if (normalizedPath === "/bunkers/compact-shelter") {
    return { type: "bunker-compact-shelter", pathname: normalizedPath };
  }

  if (normalizedPath === "/bunkers/shelter") {
    return { type: "bunker-shelter", pathname: normalizedPath };
  }

  if (normalizedPath === "/vault" || normalizedPath === "/the-vault") {
    return { type: "vault", pathname: normalizedPath };
  }

  if (normalizedPath === "/faq") {
    return { type: "faq", pathname: normalizedPath };
  }

  if (normalizedPath === "/rentals") {
    return { type: "rentals", pathname: normalizedPath };
  }

  const rentalsCategoryMatch = normalizedPath.match(/^\/rentals\/([^/]+)$/);
  if (rentalsCategoryMatch) {
    const categoryId = decodeURIComponent(rentalsCategoryMatch[1]);
    const category = equipmentCategories.find((c) => c.id === categoryId);
    if (category) {
      return { type: "rentals-category", pathname: normalizedPath, category };
    }
  }

  if (normalizedPath === "/blog/dubai-floods-march-2026-villa-waterproofing-checklist") {
    return { type: "blog-waterproofing-checklist", pathname: normalizedPath };
  }

  const serviceMatch = normalizedPath.match(/^\/services\/([^/]+)$/);
  if (serviceMatch) {
    const serviceId = decodeURIComponent(serviceMatch[1]);
    const service = getServiceById(serviceId);

    if (service) {
      return { type: "service", pathname: normalizedPath, service };
    }
  }

  return { type: "not-found", pathname: normalizedPath };
}

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options }
    );

    if (ref.current) {
      obs.observe(ref.current);
    }

    return () => obs.disconnect();
  }, []);

  return [ref, inView];
}

function useScrollToHash(pathname) {
  useEffect(() => {
    const scrollToTarget = () => {
      const hash = window.location.hash.replace(/^#/, "");

      if (!hash) {
        window.scrollTo(0, 0);
        return;
      }

      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    const timer = window.setTimeout(scrollToTarget, 60);
    return () => window.clearTimeout(timer);
  }, [pathname]);
}

function ContactModal({ service, onClose }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [msg, setMsg] = useState("");

  const submit = () => {
    const text = `Hi Al Hadeeqa Contracting,\n\nI'd like to enquire about: *${service || "your services"}*\n\n*Name:* ${name || "Not provided"}\n*Phone:* ${phone || "Not provided"}\n*Area in Dubai:* ${area || "Not specified"}${msg ? `\n\n*Message:* ${msg}` : ""}\n\nPlease get in touch. Thank you.`;
    window.open(buildWhatsAppUrl(text), "_blank");
    onClose();
  };

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={(event) => event.stopPropagation()}>
        <button style={styles.modalClose} onClick={onClose}>✕</button>
        <div style={styles.modalEyebrow}>Free Consultation</div>
        <h3 style={styles.modalTitle}>Let's talk about your project</h3>
        {service && <div style={styles.modalService}>{service}</div>}
        <div style={styles.formGrid}>
          <input style={styles.input} placeholder="Your Name" value={name} onChange={(event) => setName(event.target.value)} />
          <input style={styles.input} placeholder="WhatsApp (+971...)" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>
        <select style={{ ...styles.input, width: "100%", marginBottom: 14 }} value={area} onChange={(event) => setArea(event.target.value)}>
          <option value="">Select Dubai area</option>
          <option>Dubai Marina</option>
          <option>Jumeirah</option>
          <option>Business Bay</option>
          <option>Dubai Hills</option>
          <option>Other Dubai Area</option>
        </select>
        <textarea
          style={{ ...styles.input, width: "100%", height: 90, resize: "vertical", marginBottom: 20 }}
          placeholder="Brief description of your project (optional)"
          value={msg}
          onChange={(event) => setMsg(event.target.value)}
        />
        <button style={styles.waBtn} onClick={submit}>
          <WaIcon /> Send via WhatsApp
        </button>
        <p style={styles.formNote}>We respond within 2 hours. No spam, ever.</p>
      </div>
    </div>
  );
}

function Nav({ onContact, route }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  let navLinks = [
    { label: "Home", href: "/", active: route.type === "home" },
    { label: "Services", href: "/services" },
    { label: "Rentals", href: "/rentals" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Bunkers", href: "/bunkers" },
    { label: "The Vault", href: "/the-vault", vault: true },
    { label: "Contact", href: "/contact" },
  ];

  const VAULT_LINK = { label: "The Vault", href: "/the-vault", vault: true };

  if (route.type === "services") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "#services-list", active: true },
      { label: "Rentals", href: "/rentals" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "service") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services", active: true },
      { label: "Rentals", href: "/rentals" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "rentals" || route.type === "rentals-category") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Rentals", href: "/rentals", active: true },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "about") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Rentals", href: "/rentals" },
      { label: "About", href: "/about", active: true },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "projects") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Rentals", href: "/rentals" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects", active: true },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "contact") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Rentals", href: "/rentals" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact", active: true },
    ];
  } else if (route.type === "not-found") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Rentals", href: "/rentals" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunkers" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  }

  return (
    <nav
      style={{
        ...styles.nav,
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.10)" : "0 2px 12px rgba(0,0,0,0.04)",
      }}
      className="main-nav"
    >
      <a href="/" style={styles.navBrandLink}>
        <LogoImg size={42} />
        <div>
          <div style={styles.navName}>Al Hadeeqa Contracting</div>
        </div>
      </a>

      <div style={styles.navLinks} className="nav-links">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{ ...styles.navLink, ...(link.active ? styles.navLinkActive : {}), ...(link.vault ? styles.navLinkVault : {}) }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button style={styles.navCta} className="nav-cta-desktop" onClick={onContact}>Free Consultation</button>

      <button style={styles.hamburger} className="hamburger" onClick={() => setMenuOpen((open) => !open)}>
        <span style={{ ...styles.hamburgerLine, transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
        <span style={{ ...styles.hamburgerLine, opacity: menuOpen ? 0 : 1 }} />
        <span style={{ ...styles.hamburgerLine, transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
      </button>

      {menuOpen && (
        <div style={styles.mobileMenu} className="mobile-menu">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} style={{ ...styles.mobileLink, ...(link.vault ? styles.mobileLinkVault : {}) }} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <div style={styles.mobileCta}>
            <button
              style={{ ...styles.navCta, width: "100%" }}
              onClick={() => {
                setMenuOpen(false);
                onContact();
              }}
            >
              Free Consultation
            </button>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              style={styles.mobileWaBtn}
              onClick={() => setMenuOpen(false)}
            >
              <WaIcon /> Chat on WhatsApp
            </a>
          </div>
          <div style={styles.mobileJanGroup}>
            <div style={styles.mobileJanGroupLabel}>Part of the Jan Group</div>
            {JAN_BRANDS.map((brand) =>
              brand.current ? (
                <div key={brand.id} style={styles.mobileJanBrandRow}>
                  <div style={styles.mobileJanBrandIconBox}>
                    <BrandIcon id={brand.id} />
                  </div>
                  <span style={styles.mobileJanBrandName}>{brand.name}</span>
                  <span style={styles.mobileJanBrandTag}>Current</span>
                </div>
              ) : (
                <a
                  key={brand.id}
                  href={brand.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...styles.mobileJanBrandRow, textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <div style={styles.mobileJanBrandIconBox}>
                    <BrandIcon id={brand.id} />
                  </div>
                  <span style={styles.mobileJanBrandName}>{brand.name}</span>
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function Hero({ onContact }) {
  return (
    <section style={styles.hero} id="home" className="hero-section">
      <div
        style={{
          ...styles.heroBg,
          backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80')",
        }}
      />
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
          From luxury pergolas and premium carports to dewatering, shoring, excavation, and full construction - one Dubai team, decades of proof.
        </p>
        <div style={styles.heroCtas}>
          <button style={styles.btnPrimary} onClick={onContact}>
            <WaIcon /> Get a Free Quote
          </button>
          <a href="/services" style={styles.btnSecondary}>View Services →</a>
        </div>
      </div>

      <div style={styles.heroStats} className="hero-stats">
        {STATS.map((stat) => (
          <a key={stat.label} href={stat.href} style={{ ...styles.heroStatItem, textDecoration: "none" }} className="hero-stat-item">
            <div style={styles.heroStatVal}>{stat.val}</div>
            <div style={styles.heroStatLabel}>{stat.label}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ServicePreviewCard({ service, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        ...styles.serviceCard,
        ...(service.highlight ? styles.serviceCardHighlight : {}),
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        ...(hovered ? styles.serviceCardHover : {}),
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
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div style={styles.serviceImgOverlay} />
      </div>
      <div style={styles.serviceBody}>
        {service.highlight && <div style={styles.highlightBadge}>Featured</div>}
        <div style={styles.serviceSubtitle}>{service.subtitle}</div>
        <h3 style={styles.serviceTitle}>{service.title}</h3>
        <p style={styles.serviceDesc}>{service.desc}</p>
        <div style={styles.serviceTags}>
          {service.tags.map((tag) => (
            <span key={tag} style={styles.serviceTag}>{tag}</span>
          ))}
        </div>
        <a href={getServiceHref(service.id)} style={styles.serviceLinkBtn}>Learn More →</a>
      </div>
    </div>
  );
}

function ServiceDetailCard({ service, index }) {
  const [ref, inView] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id={getServiceAnchorId(service.id)}
      ref={ref}
      style={{
        ...styles.serviceCard,
        ...(service.highlight ? styles.serviceCardHighlight : {}),
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`,
        ...(hovered ? styles.serviceCardHover : {}),
        scrollMarginTop: 96,
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
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div style={styles.serviceImgOverlay} />
      </div>
      <div style={styles.serviceBody}>
        {service.highlight && <div style={styles.highlightBadge}>Featured</div>}
        <div style={styles.serviceSubtitle}>{service.subtitle}</div>
        <h3 style={styles.serviceTitle}>{service.title}</h3>
        <p style={styles.serviceDesc}>{service.desc}</p>
        <div style={styles.serviceTags}>
          {service.tags.map((tag) => (
            <span key={tag} style={styles.serviceTag}>{tag}</span>
          ))}
        </div>
        <a href={service.ctaHref || getServiceHref(service.id)} style={styles.serviceLinkBtn}>Learn More →</a>
      </div>
    </div>
  );
}

function HomeServicesPreview() {
  const [ref, inView] = useInView();
  const featuredServices = ["construction", "shoring", "waterproofing", "carports"]
    .map((serviceId) => getServiceById(serviceId))
    .filter(Boolean);

  return (
    <section id="services" style={{ ...styles.section, scrollMarginTop: 96 }} className="section-main">
      <div
        ref={ref}
        style={{
          ...styles.sectionHeader,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={styles.sectionEyebrow}>Our Services</div>
        <div style={styles.greenRule} />
        <h2 style={styles.sectionH2}>From groundwork to finishing detail — we do it all.</h2>
        <p style={styles.sectionSub}>
          Al Hadeeqa covers the full construction spectrum: enabling works, dewatering, shoring, luxury pergolas, carports, glass, waterproofing, and maintenance. One licensed team, one standard of work.
        </p>
      </div>

      <div style={styles.servicesGrid} className="services-grid home-services-grid">
        {featuredServices.map((service, index) => (
          <ServicePreviewCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <div style={styles.homeServicesFooter}>
        <a href="/services" style={styles.servicesNavCta}>Explore all services and landing pages →</a>
      </div>
    </section>
  );
}

function HomeAboutPreview() {
  const [ref, inView] = useInView();

  return (
    <section id="about" style={{ ...styles.section, background: "#f4f8f5", scrollMarginTop: 96 }} className="section-main">
      <div
        ref={ref}
        className="about-inner"
        style={{
          ...styles.aboutInner,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={styles.aboutText}>
          <div style={styles.sectionEyebrow}>About Us</div>
          <div style={{ ...styles.greenRule, margin: "12px 0 24px", marginLeft: 0 }} />
          <h2 style={{ ...styles.sectionH2, textAlign: "left" }}>
            Built on experience.<br />
            <em style={{ color: "var(--green)", fontStyle: "italic" }}>Delivered by one team.</em>
          </h2>
          <p style={styles.aboutDesc}>
            Al Hadeeqa Contracting was established in 2009. Our founder and team bring over 35 years of UAE construction experience — from enabling works and specialist site packages to luxury pergolas, fit-outs, glass, waterproofing, and maintenance.
          </p>
          <p style={styles.aboutDesc}>
            Our in-house crew handles every phase of your project, so nothing gets passed down the chain. One point of contact, one accountable team, from site prep through to final finish.
          </p>
          <div style={styles.pageHeroActions}>
            <a href="/about" style={styles.btnPrimaryLink}>Read About Al Hadeeqa</a>
          </div>
        </div>
        <div style={styles.aboutImages} className="about-images">
          <img
            src="/assets/images/construction-remodeling.jpg"
            alt="Construction site Dubai"
            style={styles.aboutImg}
          />
        </div>
      </div>
    </section>
  );
}

function HomeProjectsPreview() {
  const [ref, inView] = useInView();
  const featuredProjects = PROJECT_IMGS.slice(0, 3);

  return (
    <section id="projects" style={{ ...styles.section, scrollMarginTop: 96 }} className="section-main">
      <div
        ref={ref}
        style={{
          ...styles.sectionHeader,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={styles.sectionEyebrow}>Projects</div>
        <div style={styles.greenRule} />
        <h2 style={styles.sectionH2}>Proof of work across Dubai.</h2>
        <p style={styles.sectionSub}>
          A selection of residential and commercial projects we have delivered — from luxury villa pergolas and premium carports to excavation, dewatering, and full fit-outs.
        </p>
      </div>
      <div style={styles.projectsGrid} className="projects-grid">
        {featuredProjects.map((project, index) => (
          <ProjectThumb key={project.label} project={project} index={index} />
        ))}
      </div>
      <div style={styles.homeServicesFooter}>
        <a href="/projects" style={styles.servicesNavCta}>Browse the full Projects page →</a>
      </div>
    </section>
  );
}

function HomeBunkerPreview() {
  const [ref, inView] = useInView();

  return (
    <section style={styles.homeBunkerSection} className="home-bunker-section">
      <div
        ref={ref}
        className="home-bunker-card"
        style={{
          ...styles.homeBunkerCard,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <img
          src="/assets/images/vault-door.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "45%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.13,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 40%, black 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 40%, black 100%)",
            pointerEvents: "none",
          }}
        />
        <div style={styles.homeBunkerCopy} className="home-bunker-copy">
          <div style={styles.homeBunkerBadge}>Select Clients Only</div>
          <div style={styles.homeBunkerEyebrow}>Underground Protection</div>
          <div style={{ ...styles.greenRule, background: "#7fb38a", margin: "12px 0 20px", marginLeft: 0 }} />
          <h2 style={styles.homeBunkerTitle}>
            A discreet bunker offering for a very specific kind of brief.
          </h2>
          <p style={styles.homeBunkerText}>
            Al Hadeeqa delivers underground safe rooms for select villa clients in the UAE. Three tiers available — from a compact precast pod to a fully custom shelter. Properly engineered, properly built.
          </p>
        </div>
        <div style={styles.homeBunkerActions} className="home-bunker-actions">
          <a href="/bunkers" style={styles.btnPrimaryLink}>Explore Our Solutions</a>
          <div style={styles.homeBunkerNote}>Available by consultation only.</div>
        </div>
      </div>
    </section>
  );
}

const EQUIPMENT_ICONS = {
  excavators: (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="30" width="18" height="10" rx="1"/>
      <circle cx="9" cy="40" r="3"/><circle cx="17" cy="40" r="3"/>
      <path d="M22 35h6l8-12 6 4-6 8h-8"/>
      <path d="M28 23l4-10 8 3-4 10"/>
    </svg>
  ),
  "dewatering-pumps": (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M24 6 C18 16 12 20 12 26a12 12 0 0024 0c0-6-6-10-12-20z"/>
      <path d="M24 30v6M20 33h8"/>
    </svg>
  ),
  "concrete-pumps": (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="28" width="20" height="12" rx="1"/>
      <circle cx="10" cy="40" r="3"/><circle cx="18" cy="40" r="3"/>
      <path d="M24 34h6l10-18"/>
      <path d="M34 16l4-4 4 4M38 12v12"/>
    </svg>
  ),
  cranes: (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="44" x2="12" y2="8"/>
      <line x1="12" y1="8" x2="42" y2="14"/>
      <line x1="12" y1="8" x2="4" y2="16"/>
      <line x1="28" y1="11" x2="28" y2="28"/>
      <rect x="24" y="28" width="8" height="6" rx="1"/>
    </svg>
  ),
  compactors: (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="10" y="18" width="28" height="14" rx="2"/>
      <ellipse cx="24" cy="38" rx="14" ry="5"/>
      <line x1="18" y1="18" x2="18" y2="10"/>
      <line x1="30" y1="18" x2="30" y2="10"/>
      <line x1="18" y1="10" x2="30" y2="10"/>
    </svg>
  ),
  generators: (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="14" width="36" height="22" rx="2"/>
      <path d="M26 20l-6 8h8l-6 8"/>
      <line x1="6" y1="36" x2="4" y2="40"/><line x1="42" y1="36" x2="44" y2="40"/>
    </svg>
  ),
  "dump-trucks": (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 32V20h24l6 12H4z"/>
      <path d="M28 20l6-8h6l4 8"/>
      <path d="M28 20h16v12h-4"/>
      <circle cx="10" cy="38" r="4"/><circle cx="36" cy="38" r="4"/>
    </svg>
  ),
  scaffolding: (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="10" y1="6" x2="10" y2="44"/>
      <line x1="24" y1="6" x2="24" y2="44"/>
      <line x1="38" y1="6" x2="38" y2="44"/>
      <line x1="6" y1="14" x2="42" y2="14"/>
      <line x1="6" y1="24" x2="42" y2="24"/>
      <line x1="6" y1="34" x2="42" y2="34"/>
    </svg>
  ),
};

function HomeEquipmentCarousel() {
  const [ref, inView] = useInView();
  const carouselRef = useRef(null);
  const SCROLL_BY = 238; // card width (220) + gap (18)

  const scroll = (dir) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir * SCROLL_BY, behavior: "smooth" });
    }
  };

  return (
    <section style={{ background: "#f4f8f5", borderTop: "1px solid rgba(26,74,38,0.08)", padding: "80px 0 64px" }}>
      <div
        ref={ref}
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 64px",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
        className="home-equipment-header"
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={styles.sectionEyebrow}>Equipment Rentals</div>
            <div style={{ ...styles.greenRule, margin: "12px 0 16px", marginLeft: 0 }} />
            <h2 style={{ ...styles.sectionH2, textAlign: "left", fontSize: "clamp(28px, 3.5vw, 48px)", margin: 0 }}>
              Construction equipment.<br />
              <em style={{ fontStyle: "italic", color: "#1a4a26" }}>Ready when you are.</em>
            </h2>
            <p style={{ fontSize: 16, color: "#6b876f", lineHeight: 1.8, fontWeight: 300, maxWidth: 520, marginTop: 14, marginBottom: 0 }}>
              Excavators, pumps, cranes and specialist plant available for daily, weekly, or monthly hire across Dubai.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
            {/* Desktop arrows — hidden on mobile via CSS */}
            <div className="carousel-arrows" style={{ display: "flex", gap: 8 }}>
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                style={{ width: 40, height: 40, background: "#fff", border: "1px solid rgba(26,74,38,0.18)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a4a26", transition: "background 0.2s" }}
                className="carousel-arrow-btn"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="10,3 5,8 10,13"/></svg>
              </button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                style={{ width: 40, height: 40, background: "#fff", border: "1px solid rgba(26,74,38,0.18)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a4a26", transition: "background 0.2s" }}
                className="carousel-arrow-btn"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6,3 11,8 6,13"/></svg>
              </button>
            </div>
            <a href="/rentals" style={{ ...styles.servicesNavCta }}>View Equipment &amp; Rates →</a>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="equipment-carousel"
        style={{
          display: "flex",
          overflowX: "auto",
          gap: 18,
          padding: "0 64px 16px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {equipmentCategories.map((cat, index) => (
          <a
            key={cat.id}
            href={`/rentals/${cat.id}`}
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 220,
              maxWidth: 220,
              background: "#fff",
              border: "1px solid rgba(26,74,38,0.14)",
              borderTop: "3px solid #1a4a26",
              textDecoration: "none",
              color: "inherit",
              scrollSnapAlign: "start",
              flexShrink: 0,
              overflow: "hidden",
              transition: "box-shadow 0.25s, transform 0.25s",
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${index * 0.05}s`,
            }}
            className="equipment-carousel-card"
          >
            <div style={{ height: 120, overflow: "hidden", flexShrink: 0 }}>
              <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#141f16", marginBottom: 6, lineHeight: 1.3 }}>{cat.name}</div>
              <div style={{ fontSize: 13, color: "#6b876f", lineHeight: 1.7, fontWeight: 300, flex: 1 }}>{cat.description}</div>
              <div style={{ fontSize: 12, color: "#1a4a26", fontWeight: 700, letterSpacing: "0.08em", marginTop: 12, textTransform: "uppercase" }}>See Fleet →</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ServicesPageHero({ onContact }) {
  return (
    <section style={styles.pageHero} className="services-page-hero">
      <div
        style={{
          ...styles.pageHeroBg,
          backgroundImage: `url('${PAGE_HERO_IMAGES.services}')`,
        }}
      />
      <div style={styles.pageHeroOverlay} />
      <div style={styles.pageHeroInner} className="services-page-hero-inner">
        <div style={styles.pageHeroCopyCard} className="page-hero-copy-card">
          <a href="/" style={styles.backToOverview}>← Back to Home</a>
          <div style={styles.sectionEyebrow}>Dedicated Services</div>
          <div style={{ ...styles.greenRule, marginLeft: 0 }} />
          <h1 style={styles.pageHeroTitle}>
            Ten services. One team. Nothing subcontracted.
          </h1>
          <p style={styles.pageHeroSub}>
            Every scope Al Hadeeqa takes on is delivered by the same in-house crew — from deep enabling works to luxury finishes. Find the service you need and request a quote directly.
          </p>
          <div style={styles.pageHeroActions} className="page-cta-row">
            <button style={styles.btnPrimary} onClick={() => onContact("General Enquiry")}>
              <WaIcon /> Request Consultation
            </button>
            <a href="#services-nav" style={styles.btnSecondary}>Browse Service List ↓</a>
          </div>
        </div>

        <div style={styles.pageHeroMeta} className="services-page-meta">
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>{SERVICES.length}</div>
            <div style={styles.pageHeroMetaLabel}>Service Offerings</div>
            <div style={styles.pageHeroMetaCopy}>From enabling works and groundwork through to luxury finishes and maintenance.</div>
          </div>
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>35+</div>
            <div style={styles.pageHeroMetaLabel}>Years in UAE</div>
            <div style={styles.pageHeroMetaCopy}>Licensed experience across residential, commercial, and specialist site work.</div>
          </div>
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>One Team</div>
            <div style={styles.pageHeroMetaLabel}>Single Point of Accountability</div>
            <div style={styles.pageHeroMetaCopy}>Groundworks, structure, glass, waterproofing, and maintenance under one contractor.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPageHero({ onContact }) {
  return (
    <section style={styles.pageHero} className="services-page-hero">
      <div
        style={{
          ...styles.pageHeroBg,
          backgroundImage: `url('${PAGE_HERO_IMAGES.about}')`,
        }}
      />
      <div style={styles.pageHeroOverlay} />
      <div style={styles.pageHeroInner} className="services-page-hero-inner">
        <div style={styles.pageHeroCopyCard} className="page-hero-copy-card">
          <a href="/" style={styles.backToOverview}>← Back to Home</a>
          <div style={styles.sectionEyebrow}>About Al Hadeeqa</div>
          <div style={{ ...styles.greenRule, marginLeft: 0 }} />
          <h1 style={styles.pageHeroTitle}>
            A licensed contractor with depth, not just range.
          </h1>
          <p style={styles.pageHeroSub}>
            Established in 2009, with a founder and team bringing over 35 years of UAE construction experience — a fully licensed in-house crew, and a track record that spans residential villas, commercial fit-outs, and complex enabling works — all under one contractor.
          </p>
          <div style={styles.pageHeroActions} className="page-cta-row">
            <button style={styles.btnPrimary} onClick={() => onContact("General Enquiry")}>
              <WaIcon /> Speak to Our Team
            </button>
            <a href="#about" style={styles.btnSecondary}>Read Our Story ↓</a>
          </div>
        </div>

        <div style={styles.pageHeroMeta} className="services-page-meta">
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>35+</div>
            <div style={styles.pageHeroMetaLabel}>Years in UAE</div>
            <div style={styles.pageHeroMetaCopy}>Longstanding delivery experience across specialist site works and finishing scopes.</div>
          </div>
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>500+</div>
            <div style={styles.pageHeroMetaLabel}>Completed Projects</div>
            <div style={styles.pageHeroMetaCopy}>A working history that spans villas, commercial spaces, and enabling works.</div>
          </div>
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>One Team</div>
            <div style={styles.pageHeroMetaLabel}>Single Accountability</div>
            <div style={styles.pageHeroMetaCopy}>Groundworks, structure, glass, waterproofing, and maintenance handled under one contractor.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsPageHero({ onContact }) {
  return (
    <section style={styles.pageHero} className="services-page-hero">
      <div
        style={{
          ...styles.pageHeroBg,
          backgroundImage: `url('${PAGE_HERO_IMAGES.projects}')`,
        }}
      />
      <div style={styles.pageHeroOverlay} />
      <div style={styles.pageHeroInner} className="services-page-hero-inner">
        <div style={styles.pageHeroCopyCard} className="page-hero-copy-card">
          <a href="/" style={styles.backToOverview}>← Back to Home</a>
          <div style={styles.sectionEyebrow}>Projects</div>
          <div style={{ ...styles.greenRule, marginLeft: 0 }} />
          <h1 style={styles.pageHeroTitle}>
            A clearer look at the kind of work we deliver.
          </h1>
          <p style={styles.pageHeroSub}>
            Browse completed work across pergolas, carports, excavation, dewatering, glass, waterproofing, and fit-outs — all delivered by one licensed team across Dubai.
          </p>
          <div style={styles.pageHeroActions} className="page-cta-row">
            <button style={styles.btnPrimary} onClick={() => onContact("General Enquiry")}>
              <WaIcon /> Discuss Your Project
            </button>
            <a href="#projects" style={styles.btnSecondary}>View Gallery ↓</a>
          </div>
        </div>

        <div style={styles.pageHeroMeta} className="services-page-meta">
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>Residential</div>
            <div style={styles.pageHeroMetaLabel}>Luxury and Lifestyle Work</div>
            <div style={styles.pageHeroMetaCopy}>Pergolas, carports, waterproofing, glass, and villa upgrade scopes.</div>
          </div>
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>Commercial</div>
            <div style={styles.pageHeroMetaLabel}>Fit-Out and Site Works</div>
            <div style={styles.pageHeroMetaCopy}>Office partitions, excavation support, demolition, and enabling packages.</div>
          </div>
          <div style={styles.pageHeroMetaCard}>
            <div style={styles.pageHeroMetaValue}>Dubai</div>
            <div style={styles.pageHeroMetaLabel}>Local Delivery Focus</div>
            <div style={styles.pageHeroMetaCopy}>Projects structured around Dubai-only delivery with one licensed contractor.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesQuickNav() {
  return (
    <section id="services-nav" style={{ ...styles.servicesNavSection, scrollMarginTop: 96 }} className="services-nav-section">
      <div style={styles.servicesNavInner}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={styles.sectionEyebrow}>Everything We Do</div>
          <div style={styles.greenRule} />
          <h2 style={{ ...styles.sectionH2, fontSize: "clamp(26px, 3vw, 40px)" }}>
            Services at a Glance
          </h2>
          <p style={{ ...styles.sectionSub, marginTop: 12 }}>
            Select any service to jump straight to its section.
          </p>
        </div>

        <div style={styles.servicesNavGrid} className="services-nav-grid">
          {SERVICES.map((service, index) => (
            <a
              key={service.id}
              href={`#${getServiceAnchorId(service.id)}`}
              className="services-nav-tile"
              style={styles.servicesNavTile}
            >
              <span style={styles.servicesNavIndex}>{String(index + 1).padStart(2, "0")}</span>
              <span className="services-nav-tile-name" style={styles.servicesNavName}>{service.title}</span>
              <span className="services-nav-tile-sub" style={styles.servicesNavSub}>{service.subtitle}</span>
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <a href="#services-list" style={styles.servicesNavCta}>View Full Details ↓</a>
        </div>
      </div>
    </section>
  );
}

function ServicesPageSection() {
  const [ref, inView] = useInView();

  return (
    <section id="services-list" style={{ ...styles.section, scrollMarginTop: 96 }} className="section-main">
      <div
        ref={ref}
        style={{
          ...styles.sectionHeader,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <a href="#services-nav" style={styles.backToOverview}>← Back to Overview</a>
        <div style={styles.sectionEyebrow}>What We Build</div>
        <div style={styles.greenRule} />
        <h2 style={styles.sectionH2}>Our Services</h2>
        <p style={styles.sectionSub}>
          From groundwork to finishing detail - we handle every phase with the same licensed team and the same standards.
        </p>
      </div>

      <div style={styles.servicesGrid} className="services-grid">
        {SERVICES.map((service, index) => (
          <ServiceDetailCard key={service.id} service={service} index={index} />
        ))}
      </div>

      <div style={styles.bunkerNote}>
        <div>
          <strong>Underground Protection</strong> — Al Hadeeqa builds underground safe rooms for UAE villas. Three tiers from AED 100,000.{" "}
          <a href="/bunkers" style={styles.bunkerLink}>Learn more →</a>
        </div>
      </div>
    </section>
  );
}

const SERVICE_FAQS = {
  pergolas: pergolaFAQs,
  carports: carportFAQs,
  dewatering: dewateringFAQs,
  construction: constructionFAQs,
  shoring: shoringFAQs,
  excavation: excavationFAQs,
  demolition: demolitionFAQs,
  glassrooms: glassroomFAQs,
  waterproofing: waterproofingFAQs,
  maintenance: maintenanceFAQs,
};

const SERVICE_SCHEMAS = {
  pergolas: pergolaServiceSchema,
  carports: carportServiceSchema,
  dewatering: dewateringServiceSchema,
  construction: constructionServiceSchema,
  shoring: shoringServiceSchema,
  excavation: excavationServiceSchema,
  demolition: demolitionServiceSchema,
  glassrooms: glassroomsServiceSchema,
  waterproofing: waterproofingServiceSchema,
  maintenance: maintenanceServiceSchema,
  construction: constructionServiceSchema,
};

function ServiceFAQItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(20,31,22,0.08)", overflow: "hidden" }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "18px 0", cursor: "pointer", gap: 16 }}
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}
      >
        <div style={{ fontSize: 15, fontWeight: 600, color: "#141f16", lineHeight: 1.5, flex: 1 }}>{faq.q}</div>
        <div style={{ fontSize: 18, color: "#5aad6e", fontWeight: 300, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{open ? "−" : "+"}</div>
      </div>
      {open && <div style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.85, paddingBottom: 18 }}>{faq.a}</div>}
    </div>
  );
}

function ServiceLandingPage({ service, onContact }) {
  const BASE_URL = "https://alhadeeqacontracting.com";
  const serviceUrl = `${BASE_URL}/services/${service.id}`;
  const serviceFAQs = SERVICE_FAQS[service.id] || [];
  const serviceSchemaObj = SERVICE_SCHEMAS[service.id] || serviceSchema({
    serviceType: service.title,
    name: `${service.title} in Dubai | Al Hadeeqa Contracting`,
    description: service.heroDescription,
    serviceUrl,
  });

  const meta = usePageMeta({
    title: service.metaTitle || `${service.title} in Dubai | Al Hadeeqa Contracting — ${service.subtitle}`,
    description: service.metaDescription || `${service.heroDescription} Al Hadeeqa Contracting — established 2009, ISO 9001 certified, 50+ crew, 15+ years experience in Dubai. Free site assessment.`,
    canonical: serviceUrl,
    ogImage: service.image ? `https://alhadeeqacontracting.com${service.image}` : undefined,
    schemas: [
      serviceSchemaObj,
      ...(serviceFAQs.length > 0 ? [faqSchema(serviceFAQs)] : []),
      breadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Services", url: `${BASE_URL}/services` },
        { name: service.title, url: serviceUrl },
      ]),
    ],
  });

  const relatedServices = service.relatedIds
    .map((serviceId) => getServiceById(serviceId))
    .filter(Boolean);

  return (
    <>
      {meta}
      <section style={styles.serviceHero} className="service-detail-hero">
        <div style={styles.serviceHeroInner} className="service-detail-hero-inner">
          <div style={styles.serviceHeroCopy}>
            <a href="/services" style={styles.backToOverview}>← Back to Services</a>
            <div style={styles.sectionEyebrow}>Al Hadeeqa Contracting</div>
            <div style={{ ...styles.greenRule, marginLeft: 0 }} />
            <h1 style={styles.serviceHeroTitle}>{service.title}</h1>
            <div style={styles.serviceHeroSubtitle}>{service.subtitle}</div>
            <p style={styles.serviceHeroSub}>{service.heroDescription}</p>
            <div style={styles.serviceHeroTags}>
              {service.tags.map((tag) => (
                <span key={tag} style={styles.serviceHeroTag}>{tag}</span>
              ))}
            </div>
            <div style={styles.pageHeroActions} className="page-cta-row">
              <button style={styles.btnPrimary} onClick={() => onContact(service.title)}>
                <WaIcon /> Request Quote
              </button>
              <a href="#contact" style={styles.btnSecondary}>Talk to Our Team ↓</a>
            </div>
          </div>

          <div style={styles.serviceHeroMedia}>
            <img src={service.image} alt={service.title} style={styles.serviceHeroImage} />
          </div>
        </div>
      </section>

      {service.urgencyBanner && (
        <div className="urgency-banner" style={{ background: "#1a4a26", color: "#fff", padding: "18px 64px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, flex: 1, minWidth: 200 }}>
            <strong style={{ color: "#5aad6e" }}>⚠ </strong>{service.urgencyBanner.text}
          </p>
          <a
            href={`https://wa.me/971544419854?text=${encodeURIComponent(service.urgencyBanner.waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: "#25d366", color: "#fff", textDecoration: "none", padding: "10px 20px", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            {service.urgencyBanner.cta} →
          </a>
        </div>
      )}

      <section style={styles.section} className="section-main">
        <div style={styles.serviceDetailGrid} className="service-detail-grid">
          <div style={styles.serviceOverviewCard}>
            <div style={styles.sectionEyebrow}>Overview</div>
            <h2 style={styles.serviceSectionTitle}>How we approach {service.title.toLowerCase()}.</h2>
            <div style={styles.serviceParagraphs}>
              {service.summary.map((paragraph) => (
                <p key={paragraph} style={styles.serviceParagraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <aside style={styles.serviceSidebar}>
            <div style={styles.serviceSidebarCard}>
              <div style={styles.serviceSidebarLabel}>Scope Snapshot</div>
              <div style={styles.serviceSidebarTitle}>{service.title}</div>
              <p style={styles.serviceSidebarText}>
                Al Hadeeqa delivers this service with its own licensed, in-house team. No subcontracting — the same crew that quotes is the crew that builds.
              </p>
            </div>
            <div style={styles.serviceSidebarCard}>
              <div style={styles.serviceSidebarLabel}>Need Pricing?</div>
              {service.pricingFrom && (
                <div style={{ fontSize: 22, fontWeight: 700, color: "#1a4a26", marginBottom: 4, fontFamily: "'Cormorant Garamond', serif" }}>
                  From {service.pricingFrom}
                </div>
              )}
              <p style={styles.serviceSidebarText}>
                Send us the project location, property type, and a quick summary of the scope. We will respond on WhatsApp with the next step.
              </p>
              <button style={{ ...styles.serviceBtn, width: "100%", justifyContent: "center" }} onClick={() => onContact(service.title)}>
                Get a Quote →
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section style={{ ...styles.section, paddingTop: 0 }} className="section-main">
        <div style={styles.serviceListsGrid} className="service-detail-lists">
          <div style={styles.serviceListCard}>
            <div style={styles.serviceListEyebrow}>What This Service Covers</div>
            <ul style={styles.serviceList}>
              {service.inclusions.map((item) => (
                <li key={item} style={styles.serviceListItem}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={styles.serviceListCard}>
            <div style={styles.serviceListEyebrow}>Best Suited For</div>
            <ul style={styles.serviceList}>
              {service.idealFor.map((item) => (
                <li key={item} style={styles.serviceListItem}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {service.serviceCards && service.serviceCards.length > 0 && (
        <section style={{ ...styles.section, paddingTop: 0 }} className="section-main">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>Service Breakdown</div>
            <div style={styles.greenRule} />
            <h2 style={styles.sectionH2}>What we waterproof.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {service.serviceCards.map((card) => (
              <div key={card.title} style={{ border: "1px solid rgba(20,31,22,0.12)", padding: "28px 28px 24px", background: "#fff" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 600, marginBottom: 8 }}>{card.eyebrow}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2vw, 26px)", fontWeight: 700, color: "#141f16", lineHeight: 1.2, marginBottom: 14 }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.8, marginBottom: 16 }}>{card.description}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
                  {card.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 13, color: "#3d5c42", lineHeight: 1.7, paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: "#5aad6e" }}>—</span> {b}
                    </li>
                  ))}
                </ul>
                {card.warranty && (
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a4a26", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Warranty: {card.warranty}</div>
                )}
                <p style={{ fontSize: 12, color: "#6b876f", lineHeight: 1.6, borderTop: "1px solid rgba(20,31,22,0.08)", paddingTop: 12, margin: "8px 0 0" }}>
                  <strong style={{ color: "#141f16" }}>Best for:</strong> {card.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {service.trustPoints && service.trustPoints.length > 0 && (
        <section style={{ ...styles.section, paddingTop: 0, background: "#f8faf8" }} className="section-main">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>Why Al Hadeeqa</div>
            <div style={styles.greenRule} />
            <h2 style={styles.sectionH2}>Why choose a construction company for waterproofing?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
            {service.trustPoints.map((point, i) => (
              <div key={point.title} style={{ padding: "24px 24px 20px", borderLeft: "3px solid #5aad6e", background: "#fff" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.18em", color: "#5aad6e", fontWeight: 700, marginBottom: 8 }}>0{i + 1}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#141f16", lineHeight: 1.4, marginBottom: 10 }}>{point.title}</h3>
                <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.8, margin: 0 }}>{point.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {service.processSteps && service.processSteps.length > 0 && (
        <section style={{ ...styles.section, paddingTop: 0 }} className="section-main">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>How It Works</div>
            <div style={styles.greenRule} />
            <h2 style={styles.sectionH2}>From inspection to warranty.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
            {service.processSteps.map((step) => (
              <div key={step.number} style={{ padding: "24px", border: "1px solid rgba(20,31,22,0.1)" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 700, color: "rgba(26,74,38,0.12)", lineHeight: 1, marginBottom: 12 }}>{step.number}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#141f16", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.8, margin: 0 }}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {serviceFAQs.length > 0 && (
        <section style={{ ...styles.section, paddingTop: 0 }} className="section-main">
          <div style={{ maxWidth: 760 }}>
            <div style={styles.sectionEyebrow}>Common Questions</div>
            <div style={{ ...styles.greenRule, marginLeft: 0, margin: "12px 0 24px" }} />
            <h2 style={{ ...styles.sectionH2, textAlign: "left", fontSize: "clamp(24px, 3vw, 36px)", marginBottom: 32 }}>
              Frequently asked about {service.title.toLowerCase()}.
            </h2>
            <div>
              {serviceFAQs.map((faq) => (
                <ServiceFAQItem key={faq.q} faq={faq} />
              ))}
            </div>
          </div>
        </section>
      )}

      {service.relatedArticle && (
        <section style={{ ...styles.section, paddingTop: 0 }} className="section-main">
          <div style={{ maxWidth: 760 }}>
            <div style={styles.sectionEyebrow}>Related Reading</div>
            <div style={{ ...styles.greenRule, marginLeft: 0, margin: "12px 0 24px" }} />
            <a
              href={service.relatedArticle.href}
              style={{ display: "block", textDecoration: "none", border: "1px solid rgba(20,31,22,0.12)", padding: "24px 28px", background: "#f4f8f5" }}
            >
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 8 }}>
                Article · {service.relatedArticle.published}
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 700, color: "#141f16", lineHeight: 1.3, marginBottom: 10 }}>
                {service.relatedArticle.title}
              </h3>
              <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.75, margin: 0 }}>
                {service.relatedArticle.desc}
              </p>
              <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: "#1a4a26" }}>Read the checklist →</div>
            </a>
          </div>
        </section>
      )}

      {relatedServices.length > 0 && (
        <section style={{ ...styles.section, paddingTop: 0 }} className="section-main">
          <div style={styles.sectionHeader}>
            <div style={styles.sectionEyebrow}>Related Services</div>
            <div style={styles.greenRule} />
            <h2 style={styles.sectionH2}>Often paired with {service.title.toLowerCase()}.</h2>
            <p style={styles.sectionSub}>
              Many clients use Al Hadeeqa across more than one scope. Here are the services most commonly combined with this one.
            </p>
          </div>
          <div style={styles.servicesGrid} className="services-grid">
            {relatedServices.map((relatedService, index) => (
              <ServicePreviewCard key={relatedService.id} service={relatedService} index={index} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

const BLOG_WATERPROOFING_FAQS = [
  {
    q: "What should I check first after flooding in my Dubai villa?",
    a: "Start with roof drains — blocked drains are the primary cause of storm flooding on flat roofs. Clear debris, then document ceiling stains, basement walls, and balcony drains with photos. Contact a waterproofing contractor within days, not weeks, to prevent mould and structural degradation.",
  },
  {
    q: "Why do flat roofs fail in Dubai after heavy rain?",
    a: "Flat roofs in Dubai fail from UV degradation of membrane surfaces, thermal expansion cracking at joints and penetrations, blocked drainage causing ponding, and poor detailing around AC units and parapets. A single heavy storm exposes years of gradual deterioration.",
  },
  {
    q: "How do I choose a waterproofing contractor in Dubai?",
    a: "Look for a contractor with a Dubai construction license (not just a maintenance trade licence), written warranty documentation, ISO certification, an in-house crew rather than subcontractors, and verifiable references from similar villa or basement projects.",
  },
];

function BlogWaterproofingChecklist({ onContact }) {
  const BASE_URL = "https://alhadeeqacontracting.com";
  const pageUrl = `${BASE_URL}/blog/dubai-floods-march-2026-villa-waterproofing-checklist`;
  const waUrl = `https://wa.me/971544419854?text=${encodeURIComponent("Hi Al Hadeeqa, I'd like to book a free post-storm inspection for my villa.")}`;

  const meta = usePageMeta({
    title: "Dubai's March 2026 Floods: What Villa Owners Should Inspect Right Now | Al Hadeeqa Contracting",
    description: "After the March 26–28 2026 Dubai floods, villa owners should act fast. Our checklist covers roof drains, ceiling stains, basement walls, and when to call a professional waterproofing contractor.",
    canonical: pageUrl,
    schemas: [
      articleSchema({
        headline: "Dubai's March 2026 Floods: What Villa Owners Should Inspect Right Now",
        description: "After the March 26–28 2026 Dubai floods, villa owners should act fast. Our checklist covers roof drains, ceiling stains, basement walls, and when to call a professional waterproofing contractor.",
        url: pageUrl,
        datePublished: "2026-03-29",
        keywords: "waterproofing Dubai, villa roof leak, flat roof waterproofing, basement waterproofing, Dubai floods 2026, post-storm inspection",
        about: {
          "@type": "Service",
          name: "Waterproofing Services",
          provider: { "@type": "Organization", "@id": "https://alhadeeqacontracting.com/#organization" },
          url: "https://alhadeeqacontracting.com/services/waterproofing",
        },
        mentions: [
          { "@type": "Thing", name: "Bituminous membrane waterproofing" },
          { "@type": "Thing", name: "Crystalline waterproofing" },
          { "@type": "Thing", name: "Polyurethane liquid waterproofing" },
          { "@type": "Thing", name: "Injection grouting" },
          { "@type": "Place", name: "Dubai, UAE" },
        ],
      }),
      faqSchema(BLOG_WATERPROOFING_FAQS),
      breadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Blog", url: `${BASE_URL}/blog` },
        { name: "Dubai Floods March 2026 — Villa Waterproofing Checklist", url: pageUrl },
      ]),
    ],
  });

  const S = {
    page: { fontFamily: "'DM Sans', sans-serif", color: "#141f16" },
    hero: { background: "#132017", padding: "140px 64px 60px", borderBottom: "1px solid rgba(90,173,110,0.2)" },
    heroInner: { maxWidth: 800, margin: "0 auto" },
    eyebrow: { fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 12 },
    h1: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 20 },
    meta: { fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 32 },
    content: { maxWidth: 800, margin: "0 auto", padding: "60px 64px" },
    h2: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#141f16", marginTop: 48, marginBottom: 16, paddingBottom: 10, borderBottom: "2px solid #5aad6e" },
    h3: { fontSize: 17, fontWeight: 700, color: "#141f16", marginTop: 28, marginBottom: 10 },
    p: { fontSize: 16, color: "#3d5c42", lineHeight: 1.9, marginBottom: 20 },
    ul: { paddingLeft: 20, marginBottom: 20 },
    li: { fontSize: 15, color: "#3d5c42", lineHeight: 1.8, marginBottom: 8 },
    callout: { background: "#f0f7f1", borderLeft: "4px solid #5aad6e", padding: "18px 24px", marginBottom: 24 },
    calloutText: { fontSize: 15, color: "#1a4a26", lineHeight: 1.8, margin: 0 },
    ctaBox: { background: "#1a4a26", padding: "40px 48px", textAlign: "center", marginTop: 48 },
    ctaTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#fff", marginBottom: 12 },
    ctaSub: { fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: 24 },
    ctaBtn: { display: "inline-flex", alignItems: "center", gap: 10, background: "#25d366", color: "#fff", textDecoration: "none", padding: "14px 28px", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em" },
    faqSection: { maxWidth: 800, margin: "0 auto", padding: "0 64px 60px" },
  };

  return (
    <div style={S.page}>
      {meta}

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.eyebrow}>Al Hadeeqa Contracting — Waterproofing</div>
          <h1 style={S.h1}>Dubai's March 2026 Floods: What Villa Owners Should Inspect Right Now</h1>
          <p style={S.meta}>Published 29 March 2026 · 7 min read · Dubai, UAE</p>
        </div>
      </section>

      <div style={S.content}>
        <p style={S.p}>
          On 26–28 March 2026, Dubai, Sharjah, and Abu Dhabi experienced some of the heaviest rainfall in recent years. Streets flooded, basements filled, and villa roofs that had held up through years of summer heat were suddenly under the kind of sustained water pressure they were never designed to ignore.
        </p>
        <p style={S.p}>
          If your property took on water — or if you're not sure whether it did — now is the time to act. Water damage compounds quickly: mould establishes within 48–72 hours, and what starts as a damp ceiling can become a structural issue within weeks if left unaddressed.
        </p>
        <p style={S.p}>
          This checklist walks you through what to inspect, what the warning signs mean, and when to call a waterproofing contractor.
        </p>

        <h2 style={S.h2}>What should I check immediately after heavy rain?</h2>

        <h3 style={S.h3}>1. Roof drainage — the most common cause of storm flooding</h3>
        <p style={S.p}>
          Flat roofs in Dubai are designed to drain quickly, but drains block easily with sand, leaves, and debris. Check your roof drains first. If water is pooling on the roof surface, that standing water will find every weakness in the membrane — cracks, failed joints, deteriorated flashings.
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Clear roof drains of any visible debris</li>
          <li style={S.li}>Check that drainpipes are flowing freely at ground level</li>
          <li style={S.li}>Look for ponding water more than 24 hours after rain stops — this indicates drainage failure</li>
        </ul>

        <h3 style={S.h3}>2. Ceiling stains — document before they dry</h3>
        <p style={S.p}>
          Ceiling stains are the most visible sign of a roof leak, but they often appear some distance from the actual leak point because water travels along roof structure before dropping through. Photograph every stain now — the pattern and location will help a contractor diagnose the source accurately.
        </p>
        <div style={S.callout}>
          <p style={S.calloutText}>
            <strong>Important:</strong> A stain that looks dry may be hiding active moisture in the slab above. A damp meter reading will confirm whether the issue is resolved or ongoing.
          </p>
        </div>

        <h3 style={S.h3}>3. Basement walls and floor — salt deposits and dampness</h3>
        <p style={S.p}>
          After heavy rain, groundwater levels rise. If your basement or lower-ground parking area shows white powdery deposits (efflorescence), damp patches on walls, or standing water, the waterproofing system is under hydrostatic pressure it can no longer resist.
        </p>
        <ul style={S.ul}>
          <li style={S.li}>White salt deposits on concrete indicate water has been passing through the wall</li>
          <li style={S.li}>Damp floor without obvious water source may indicate below-slab ingress</li>
          <li style={S.li}>Active seeping through cracks requires immediate attention — pressure will not reduce for days</li>
        </ul>

        <h3 style={S.h3}>4. Balconies, planters, and AC penetrations</h3>
        <p style={S.p}>
          Balcony drains and planter drainage need the same attention as roof drains. Blocked balcony drains flood the tanking and force water under the tile bed. AC unit penetrations through the roof membrane are frequently the entry point for leaks — check the surrounding area on the ceiling below for staining.
        </p>

        <h2 style={S.h2}>Why do flat roofs in Dubai fail after rain?</h2>
        <p style={S.p}>
          Dubai's climate creates a specific and punishing failure mechanism for flat roofs. The combination of extreme UV exposure during summer and sudden heavy rain events in winter means the waterproofing membrane goes through thermal expansion cycles far beyond what temperate climates produce.
        </p>
        <p style={S.p}>
          Most villa roof failures fall into one of four categories:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>UV degradation:</strong> Bituminous membranes without a UV-resistant topcoat become brittle over 5–8 years, developing surface cracks that allow water penetration</li>
          <li style={S.li}><strong>Thermal cracking at joints:</strong> Where two membrane sheets overlap, or where the membrane meets a parapet or AC plinth, thermal movement opens gaps that water exploits</li>
          <li style={S.li}><strong>Drainage failure:</strong> Poor fall design means water pools rather than draining, accelerating membrane deterioration</li>
          <li style={S.li}><strong>Penetration detailing failure:</strong> Pipe sleeves, drain collars, and AC brackets are the most common failure points — they require flexible detailing that re-seals as the structure moves</li>
        </ul>
        <p style={S.p}>
          A single storm reveals years of gradual deterioration. The roof was not "destroyed by the rain" — the rain found the damage that was already there.
        </p>

        <h2 style={S.h2}>When should I call a professional waterproofing contractor?</h2>
        <p style={S.p}>
          Call a professional if you have any of the following:
        </p>
        <ul style={S.ul}>
          <li style={S.li}>Active water ingress anywhere inside the property</li>
          <li style={S.li}>Ceiling staining that was not present before the storm</li>
          <li style={S.li}>Basement or lower-ground level showing new damp or standing water</li>
          <li style={S.li}>Visible membrane damage, blistering, or cracking visible from the roof</li>
          <li style={S.li}>A property over 8 years old that has never had a waterproofing inspection</li>
        </ul>
        <p style={S.p}>
          A proper inspection should include: physical inspection of the membrane surface, flashings, and all penetrations; a review of drainage design and drain condition; moisture readings inside the property; and a written diagnosis with system recommendation.
        </p>
        <div style={S.callout}>
          <p style={S.calloutText}>
            A quote that arrives without a site visit is not a quote — it is a guess. Any contractor quoting remotely from photos is not diagnosing your roof.
          </p>
        </div>

        <h2 style={S.h2}>What waterproofing systems are available and which is right for my situation?</h2>
        <ul style={S.ul}>
          <li style={S.li}><strong>Torch-applied bituminous membrane:</strong> The most proven system for flat roofs in the UAE. Two-layer application handles thermal movement and has a 30-year track record. Best for: complete roof replacement.</li>
          <li style={S.li}><strong>Liquid-applied polyurethane coating:</strong> Seamless application ideal for roofs with many penetrations and complex geometry. Adheres to existing substrate where condition permits. Best for: overcoating sound membranes, complex roofs.</li>
          <li style={S.li}><strong>Crystalline waterproofing:</strong> Applied as a slurry to concrete surfaces; reacts with moisture to form crystals that permanently block pores. Cannot be peeled off or damaged by hydrostatic pressure. Best for: basements, water tanks, below-slab applications.</li>
          <li style={S.li}><strong>Injection grouting:</strong> Used for active leaks in concrete walls and joints. Polyurethane or epoxy resin is injected under pressure, sealing cracks from the inside. Best for: emergency leak sealing, existing basement repairs without excavation.</li>
        </ul>

        <h2 style={S.h2}>How do I choose the right waterproofing contractor in Dubai?</h2>
        <p style={S.p}>
          The waterproofing market in Dubai includes many operators offering quick-fix coatings that will not last through another storm season. Here is what to check:
        </p>
        <ul style={S.ul}>
          <li style={S.li}><strong>Construction license, not just a maintenance trade licence:</strong> Waterproofing that involves membrane replacement, structural repair, or basement work requires a construction contractor licence from Dubai Economy</li>
          <li style={S.li}><strong>Written warranty with named system:</strong> A verbal promise is not a warranty. Ask for the warranty document before signing, and ask which membrane product and manufacturer is being used</li>
          <li style={S.li}><strong>ISO certification:</strong> ISO 9001 (quality management) and ISO 14001 (environmental management) indicate the company operates to documented standards</li>
          <li style={S.li}><strong>In-house crew:</strong> Contractors who subcontract the actual work lose accountability when something fails — ask directly whether the company's own crew will be on site</li>
          <li style={S.li}><strong>Site visit before quoting:</strong> Any contractor quoting from photos or a phone call is guessing at scope and price. A real waterproofing diagnosis requires physical inspection</li>
        </ul>
      </div>

      <div style={S.ctaBox}>
        <h2 style={S.ctaTitle}>Free Post-Storm Inspection</h2>
        <p style={S.ctaSub}>We're offering free roof and basement inspections across Dubai following the March 2026 storms. Our licensed team will assess, diagnose, and quote — no obligation.</p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" style={S.ctaBtn}>
          <WaIcon /> Book Your Free Inspection
        </a>
      </div>

      <div style={S.faqSection}>
        <div style={{ marginTop: 48 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: "#1a4a26", fontWeight: 600 }}>Common Questions</div>
          <div style={{ width: 36, height: 2, background: "#1a4a26", margin: "12px 0 24px" }} />
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#141f16", marginBottom: 32 }}>
            Frequently asked.
          </h2>
          {BLOG_WATERPROOFING_FAQS.map((faq) => (
            <ServiceFAQItem key={faq.q} faq={faq} />
          ))}
        </div>
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(20,31,22,0.1)" }}>
          <p style={{ fontSize: 14, color: "#6b876f" }}>
            See the full waterproofing service page for pricing guidance, system details, and service breakdown:{" "}
            <a href="/services/waterproofing" style={{ color: "#1a4a26", fontWeight: 600 }}>Al Hadeeqa Waterproofing Services →</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <section style={styles.notFoundSection} className="section-main">
      <div style={styles.notFoundCard}>
        <div style={styles.sectionEyebrow}>Page Not Found</div>
        <div style={styles.greenRule} />
        <h1 style={styles.sectionH2}>That page does not exist.</h1>
        <p style={styles.sectionSub}>
          Use the links below to return to the main site or the services index.
        </p>
        <div style={styles.pageHeroActions} className="page-cta-row">
          <a href="/" style={styles.btnPrimaryLink}>Back to Home</a>
          <a href="/services" style={styles.btnSecondary}>Browse Services →</a>
        </div>
      </div>
    </section>
  );
}

function StaticPageRedirect({ to }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <section style={styles.notFoundSection} className="section-main">
      <div style={styles.notFoundCard}>
        <div style={styles.sectionEyebrow}>Redirecting</div>
        <div style={styles.greenRule} />
        <h1 style={styles.sectionH2}>Opening page…</h1>
      </div>
    </section>
  );
}

const BASE_URL_BUNKER = "https://alhadeeqacontracting.com";

const BUNKER_SPECS = {
  "emergency-pod": {
    title: "Emergency Pod",
    price: "AED 100,000",
    metaTitle: "Emergency Pod — Precast Underground Shelter | AED 100,000 | Al Hadeeqa Contracting",
    metaDescription: "Precast underground shelter for 2–4 people. 7–8 sqm, AED 100,000. Manufactured in 5–7 days, installed in 1–2 days by crane. 220mm reinforced concrete walls. Al Hadeeqa Contracting, Dubai.",
    answer: "Al Hadeeqa's Emergency Pod is a precast reinforced concrete underground shelter for 2–4 people, starting from AED 100,000. Manufactured at our Ajman facility in 5–7 days and installed on your Dubai property by crane in 1–2 days. Includes a steel hatch, ventilation, water storage, and a chemical toilet.",
    specs: [
      { label: "Internal Area", value: "7–8 sqm" },
      { label: "Capacity", value: "2–4 people" },
      { label: "Construction", value: "Precast reinforced concrete" },
      { label: "Wall Thickness", value: "220mm" },
      { label: "Depth", value: "2.5–3.0m below grade" },
      { label: "Manufacturing", value: "5–7 days" },
      { label: "Installation", value: "1–2 days" },
      { label: "Autonomy", value: "12–24 hours" },
    ],
    included: ["Steel entry hatch", "Manual ventilation system", "50L water storage tank", "Chemical toilet", "Emergency supply space", "LED lighting"],
    faqs: bunkerFAQs.slice(0, 7),
    schema: emergencyPodSchema,
    url: `${BASE_URL_BUNKER}/bunkers/emergency-pod`,
  },
  "compact-shelter": {
    title: "Compact Shelter",
    price: "AED 200,000",
    metaTitle: "Compact Shelter — Precast Underground Shelter | AED 200,000 | Al Hadeeqa Contracting",
    metaDescription: "Precast underground shelter for 6–8 people. 15–20 sqm, AED 200,000. HEPA filtration, 24hr battery, intercom, 200L water tank. Installed in 2–3 days. Al Hadeeqa Contracting, Dubai.",
    answer: "Al Hadeeqa's Compact Shelter is a precast reinforced concrete underground shelter for 6–8 people, starting from AED 200,000. Two interlocking halves manufactured at our Ajman facility in 7–10 days, installed in 2–3 days. Includes HEPA filtration, 24-hour battery power, hardwired intercom, and a 200L water tank.",
    specs: [
      { label: "Internal Area", value: "15–20 sqm" },
      { label: "Capacity", value: "6–8 people" },
      { label: "Construction", value: "Precast reinforced concrete (2 halves)" },
      { label: "Wall Thickness", value: "250mm" },
      { label: "Depth", value: "3.0–3.5m below grade" },
      { label: "Manufacturing", value: "7–10 days" },
      { label: "Installation", value: "2–3 days" },
      { label: "Autonomy", value: "1–3 days" },
    ],
    included: ["HEPA air filtration system", "24-hour battery power backup", "Hardwired intercom", "200L water tank", "Steel entry hatch", "LED lighting", "Emergency supply space"],
    faqs: bunkerFAQs.slice(0, 8),
    schema: compactShelterSchema,
    url: `${BASE_URL_BUNKER}/bunkers/compact-shelter`,
  },
  shelter: {
    title: "Shelter",
    price: "From AED 500,000",
    metaTitle: "Shelter — Poured-in-Place Underground Shelter | From AED 500,000 | Al Hadeeqa Contracting",
    metaDescription: "Poured-in-place underground shelter for 8–15 people. 25–35 sqm, from AED 500,000. Blast door, HEPA filtration, full bathroom, 500L water, 48hr battery. Custom sizes at AED 15,200/sqm. Dubai.",
    answer: "Al Hadeeqa's Shelter is a poured-in-place reinforced concrete underground shelter for 8–15 people, from AED 500,000. Built on-site in 4–6 weeks. 25–35 sqm of internal space, 300–400mm concrete walls, certified blast door, full bathroom, HEPA filtration, and 48-hour battery system. Custom sizes at AED 15,200/sqm.",
    specs: [
      { label: "Internal Area", value: "25–35 sqm (7m × 4m)" },
      { label: "Capacity", value: "8–15 people" },
      { label: "Construction", value: "Poured-in-place reinforced concrete" },
      { label: "Wall Thickness", value: "300–400mm" },
      { label: "Depth", value: "3.0–4.0m below grade" },
      { label: "Construction Time", value: "4–6 weeks on-site" },
      { label: "Autonomy", value: "1–3 days (extendable)" },
      { label: "Custom Pricing", value: "AED 15,200 per sqm" },
    ],
    included: ["Certified blast door", "HEPA filtration", "Full bathroom", "500L water tank", "48-hour battery system", "LED lighting", "Communication system"],
    faqs: bunkerFAQs,
    schema: shelterSchema,
    url: `${BASE_URL_BUNKER}/bunkers/shelter`,
  },
};

function BunkerTierPage({ tierId }) {
  const tier = BUNKER_SPECS[tierId];
  const BASE_URL = "https://alhadeeqacontracting.com";

  const meta = usePageMeta({
    title: tier.metaTitle || `${tier.title} — Underground Shelter Dubai | Al Hadeeqa Contracting`,
    description: tier.metaDescription || tier.answer.slice(0, 155),
    canonical: tier.url,
    schemas: [
      tier.schema,
      faqSchema(tier.faqs),
      breadcrumbSchema([
        { name: "Home", url: BASE_URL },
        { name: "Underground Shelters", url: `${BASE_URL}/bunkers` },
        { name: tier.title, url: tier.url },
      ]),
    ],
  });

  const S = {
    page: { fontFamily: "'DM Sans', sans-serif", color: "#141f16" },
    hero: { padding: "160px 64px 60px", background: "#0a0f0b", borderBottom: "1px solid rgba(255,255,255,0.06)" },
    heroInner: { maxWidth: 820, margin: "0 auto" },
    eyebrow: { fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 14 },
    h1: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 700, color: "#fff", lineHeight: 1.1, marginBottom: 8 },
    price: { fontSize: 22, color: "#5aad6e", fontWeight: 700, marginBottom: 20 },
    answer: { fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.85, maxWidth: 680, marginBottom: 32 },
    ctaBtn: { display: "inline-flex", alignItems: "center", gap: 10, background: "#25d366", color: "#fff", textDecoration: "none", padding: "14px 28px", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em" },
    content: { maxWidth: 820, margin: "0 auto", padding: "56px 64px" },
    sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#141f16", marginBottom: 24, paddingBottom: 10, borderBottom: "2px solid #5aad6e" },
    specsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(20,31,22,0.08)", marginBottom: 48, border: "1px solid rgba(20,31,22,0.08)" },
    specCell: { background: "#fff", padding: "14px 18px" },
    specLabel: { fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 4 },
    specValue: { fontSize: 15, fontWeight: 600, color: "#141f16" },
    list: { listStyle: "none", padding: 0, margin: "0 0 48px" },
    listItem: { display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(20,31,22,0.06)", fontSize: 15, color: "#3d5c42" },
    check: { color: "#5aad6e", fontWeight: 700, flexShrink: 0 },
    faqItem: { borderBottom: "1px solid rgba(20,31,22,0.08)" },
    faqQ: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "18px 0", cursor: "pointer", gap: 16 },
    faqQText: { fontSize: 15, fontWeight: 600, color: "#141f16", lineHeight: 1.5, flex: 1 },
    faqToggle: { fontSize: 18, color: "#5aad6e", fontWeight: 300, flexShrink: 0, lineHeight: 1 },
    faqA: { fontSize: 14, color: "#6b876f", lineHeight: 1.85, paddingBottom: 18 },
    ctaBlock: { background: "#0a0f0b", padding: "48px", textAlign: "center", marginTop: 48 },
    ctaTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12 },
    ctaText: { fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 24 },
    backLink: { display: "inline-block", fontSize: 13, color: "#5aad6e", textDecoration: "none", marginBottom: 32, letterSpacing: "0.04em" },
  };

  return (
    <div style={S.page}>
      {meta}
      <section style={S.hero}>
        <div style={S.heroInner}>
          <a href="/bunkers" style={{ ...S.eyebrow, display: "inline-block", marginBottom: 20, textDecoration: "none" }}>← Underground Shelters</a>
          <div style={S.eyebrow}>Al Hadeeqa Contracting</div>
          <h1 style={S.h1}>{tier.title}</h1>
          <div style={S.price}>{tier.price}</div>
          <p style={S.answer}>{tier.answer}</p>
          <a
            href={`https://wa.me/971544419854?text=${encodeURIComponent(`Hi Al Hadeeqa, I'm interested in the ${tier.title} underground shelter. Please provide more details.`)}`}
            target="_blank"
            rel="noreferrer"
            style={S.ctaBtn}
          >
            <WaIcon /> Request Free Site Assessment
          </a>
        </div>
      </section>

      <div style={S.content}>
        <h2 style={S.sectionTitle}>Specifications</h2>
        <div style={S.specsGrid}>
          {tier.specs.map((spec) => (
            <div key={spec.label} style={S.specCell}>
              <div style={S.specLabel}>{spec.label}</div>
              <div style={S.specValue}>{spec.value}</div>
            </div>
          ))}
        </div>

        <h2 style={S.sectionTitle}>What's Included</h2>
        <ul style={S.list}>
          {tier.included.map((item) => (
            <li key={item} style={S.listItem}>
              <span style={S.check}>✓</span> {item}
            </li>
          ))}
        </ul>

        <h2 style={S.sectionTitle}>Frequently Asked Questions</h2>
        <div style={{ marginBottom: 48 }}>
          {tier.faqs.map((faq) => (
            <BunkerFAQItem key={faq.q} faq={faq} S={S} />
          ))}
        </div>

        <div style={S.ctaBlock}>
          <div style={S.ctaTitle}>Book a Free Site Assessment</div>
          <div style={S.ctaText}>
            Al Hadeeqa Contracting visits your Dubai property, assesses groundwater conditions, access, and available space, and provides a detailed quotation. No obligation.
          </div>
          <a
            href={`https://wa.me/971544419854?text=${encodeURIComponent(`Hi Al Hadeeqa, I'd like a free site assessment for the ${tier.title} underground shelter.`)}`}
            target="_blank"
            rel="noreferrer"
            style={S.ctaBtn}
          >
            <WaIcon /> WhatsApp Us
          </a>
        </div>

        <div style={{ marginTop: 56 }}>
          <h2 style={S.sectionTitle}>Related Services</h2>
          <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.75, marginBottom: 24 }}>
            Underground shelter installation is coordinated with these enabling works — often scoped together on the same project.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { href: "/services/excavation", label: "Excavation", desc: "Site preparation and basement digs for shelter installation." },
              { href: "/services/dewatering", label: "Dewatering", desc: "Groundwater control to enable safe below-grade construction." },
              { href: "/services/waterproofing", label: "Waterproofing", desc: "Below-slab and perimeter waterproofing systems for underground structures." },
            ].map((link) => (
              <a key={link.href} href={link.href} style={{ textDecoration: "none", display: "block", background: "#f4f8f5", padding: "18px 20px", border: "1px solid rgba(20,31,22,0.08)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#5aad6e", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{link.label} →</div>
                <div style={{ fontSize: 13, color: "#3d5c42", lineHeight: 1.6 }}>{link.desc}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BunkerFAQItem({ faq, S }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={S.faqItem}>
      <div style={S.faqQ} onClick={() => setOpen((v) => !v)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen((v) => !v)}>
        <div style={S.faqQText}>{faq.q}</div>
        <div style={S.faqToggle}>{open ? "−" : "+"}</div>
      </div>
      {open && <div style={S.faqA}>{faq.a}</div>}
    </div>
  );
}

function LuxurySpotlight({ onContact }) {
  const [ref, inView] = useInView();

  return (
    <section style={styles.spotlightSection} className="spotlight-section">
      <div style={styles.spotlightBg} />
      <div ref={ref} style={styles.spotlightInner} className="spotlight-inner">
        <div
          style={{
            ...styles.spotlightText,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div style={styles.sectionEyebrow}>Exclusive to Al Hadeeqa</div>
          <div style={{ ...styles.greenRule, margin: "12px 0 20px" }} />
          <h2 style={{ ...styles.sectionH2, color: "#fff", textAlign: "left" }}>
            Your Premium Vehicle<br />
            <em style={{ color: "#5aad6e", fontStyle: "italic" }}>Deserves Better</em>
          </h2>
          <p style={{ ...styles.sectionSub, color: "rgba(255,255,255,0.72)", textAlign: "left", maxWidth: 440 }}>
            We design and build architectural carports and luxury pergolas specifically for clients with exceptional vehicles. Powder-coated steel, polycarbonate or louvred aluminium roofing, custom footprints - engineered to protect what matters most.
          </p>
          <div style={styles.spotlightFeatures}>
            {[
              "DM Approved & Licensed",
              "10-Year Structural Warranty",
              "UV & Heat-Resistant Materials",
              "Custom Sizing - 1 to 6+ Cars",
              "Integrated Drainage & Lighting",
            ].map((feature) => (
              <div key={feature} style={styles.spotlightFeature}>
                <span style={styles.checkmark}>✓</span> {feature}
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
        <div
          style={{
            ...styles.spotlightImages,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <img
            src="/assets/images/carport-1.jpg"
            alt="Premium carport"
            style={styles.spotlightImg1}
          />
          <img
            src="/assets/images/carport-2.jpg"
            alt="Premium carport"
            style={styles.spotlightImg2}
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();

  return (
    <section id="about" style={{ ...styles.section, scrollMarginTop: 96 }} className="section-main">
      <div
        ref={ref}
        className="about-inner"
        style={{
          ...styles.aboutInner,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={styles.aboutText}>
          <div style={styles.sectionEyebrow}>Who We Are</div>
          <div style={{ ...styles.greenRule, margin: "12px 0 24px", marginLeft: 0 }} />
          <h2 style={{ ...styles.sectionH2, textAlign: "left" }}>
            An Established Name.<br />
            <em style={{ color: "var(--green)", fontStyle: "italic" }}>Delivered by people who stay.</em>
          </h2>
          <p style={styles.aboutDesc}>
            Al Hadeeqa Contracting was established in 2009 by Engr. Muhammad Ashraf Jan. Our founder and team bring over 35 years of UAE construction experience — across residential villas, commercial fit-outs, and specialist enabling works. We are a fully licensed contractor serving Dubai with a team that has seen and solved every site condition the city can throw at a project.
          </p>
          <p style={styles.aboutDesc}>
            We do not subcontract your project to strangers. Our in-house crew handles groundwork, structure, glass, aluminum, finishes, and maintenance. One point of contact. One accountable team.
          </p>
          <p style={styles.aboutDesc}>
            That continuity is why clients come back. Whether the scope is enabling works on a new plot, a luxury carport or pergola, a full interior fit-out, or ongoing maintenance — the same crew, the same standards, and the same accountability applies every time.
          </p>
          <div style={styles.aboutStats} className="about-stats">
            {STATS.map((stat) => (
              <div key={stat.label} style={styles.aboutStat} className="about-stat">
                <div style={styles.aboutStatVal}>{stat.val}</div>
                <div style={styles.aboutStatLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.aboutImages} className="about-images">
          <img
            src="/assets/images/construction-remodeling.jpg"
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

function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects" style={{ ...styles.section, background: "#f4f8f5", scrollMarginTop: 96 }} className="section-main">
      <div
        ref={ref}
        style={{
          ...styles.sectionHeader,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div style={styles.sectionEyebrow}>Recent Work</div>
        <div style={styles.greenRule} />
        <h2 style={styles.sectionH2}>Work Across Dubai.</h2>
        <p style={styles.sectionSub}>
          Residential and commercial projects spanning excavation, shoring, luxury pergolas, premium carports, glass installations, waterproofing, and full construction — all delivered by one licensed team.
        </p>
      </div>
      <div style={styles.projectsGrid} className="projects-grid">
        {PROJECT_IMGS.map((project, index) => (
          <ProjectThumb key={project.label} project={project} index={index} />
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
        transition: `opacity 0.5s ease ${Math.min(index * 0.06, 0.25)}s, transform 0.5s ease ${Math.min(index * 0.06, 0.25)}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={project.src}
        alt={project.label}
        style={{
          ...styles.projectImg,
          transform: hovered ? "scale(1.07)" : "scale(1)",
        }}
      />
      <div style={{ ...styles.projectOverlay, opacity: hovered ? 1 : 0 }}>
        <span style={styles.projectLabel}>{project.label}</span>
      </div>
    </div>
  );
}

function Contact({ pageOffset = false, defaultService = "" }) {
  const [ref, inView] = useInView();

  return (
    <section
      id="contact"
      className={pageOffset ? "page-contact-section" : undefined}
      style={{
        ...styles.contactSection,
        ...(pageOffset ? styles.contactPageSection : {}),
        scrollMarginTop: 96,
      }}
    >
      <div style={styles.contactBg} />
      <div
        ref={ref}
        className="contact-inner"
        style={{
          ...styles.contactInner,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={styles.contactText}>
          <div style={{ ...styles.sectionEyebrow, color: "rgba(255,255,255,0.6)" }}>Reach Out</div>
          <div style={{ ...styles.greenRule, margin: "12px 0 24px", marginLeft: 0 }} />
          <h2 style={{ ...styles.sectionH2, color: "#fff", textAlign: "left" }}>
            Ready to start?<br />
            <em style={{ color: "#5aad6e", fontStyle: "italic" }}>We're one call away.</em>
          </h2>
          <div style={styles.contactDetails}>
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" style={styles.contactItem}>
              <span style={styles.contactItemLabel}>WhatsApp</span>
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </a>
            <a href={CONTACT_TEL_URL} style={styles.contactItem}>
              <span style={styles.contactItemLabel}>Phone</span>
              <span>{CONTACT_PHONE_DISPLAY}</span>
            </a>
            <a href="mailto:alhadeeqallc@gmail.com" style={styles.contactItem}>
              <span style={styles.contactItemLabel}>Email</span>
              <span>alhadeeqallc@gmail.com</span>
            </a>
            <div style={styles.contactItem}>
              <span style={styles.contactItemLabel}>Office</span>
              <span>Office 404, PTC Building, Al Qusais Industrial First, Dubai, UAE</span>
            </div>
          </div>
        </div>
        <div style={styles.contactFormCard}>
          <h3 style={styles.contactFormTitle}>Request a Free Assessment</h3>
          <p style={styles.contactFormSub}>We'll respond via WhatsApp within 2 hours.</p>
          <ContactFormInline defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}

function ContactFormInline({ defaultService = "" }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [service, setService] = useState(defaultService);
  const [msg, setMsg] = useState("");

  const submit = () => {
    const text = `Hi Al Hadeeqa Contracting,\n\nI'm interested in a *free assessment*.\n\n*Name:* ${name || "Not provided"}\n*Phone:* ${phone || "Not provided"}\n*Area in Dubai:* ${area || "Not specified"}\n*Service:* ${service || "General enquiry"}${msg ? `\n\n*Message:* ${msg}` : ""}\n\nPlease get in touch.`;
    window.open(buildWhatsAppUrl(text), "_blank");
  };

  return (
    <div>
      <div style={styles.formGrid}>
        <input style={styles.input} placeholder="Your Name" value={name} onChange={(event) => setName(event.target.value)} />
        <input style={styles.input} placeholder="WhatsApp (+971...)" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </div>
      <select style={{ ...styles.input, width: "100%", marginBottom: 14 }} value={area} onChange={(event) => setArea(event.target.value)}>
        <option value="">Select Dubai area</option>
        <option>Dubai Marina</option>
        <option>Jumeirah</option>
        <option>Business Bay</option>
        <option>Dubai Hills</option>
        <option>Other Dubai Area</option>
      </select>
      <select style={{ ...styles.input, width: "100%", marginBottom: 14 }} value={service} onChange={(event) => setService(event.target.value)}>
        <option value="">Select Service</option>
        {SERVICE_SELECT_OPTIONS.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <textarea
        style={{ ...styles.input, width: "100%", height: 80, resize: "vertical", marginBottom: 18 }}
        placeholder="Project details (optional)"
        value={msg}
        onChange={(event) => setMsg(event.target.value)}
      />
      <button style={styles.waBtn} onClick={submit}>
        <WaIcon /> Send via WhatsApp
      </button>
      <p style={{ ...styles.formNote, marginTop: 10 }}>No spam, ever. Direct to our licensed contractor.</p>
    </div>
  );
}

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
            {SERVICES.map((service) => (
              <a key={service.id} href={service.ctaHref || getServiceHref(service.id)} style={styles.footerLink}>{service.title}</a>
            ))}
          </div>
          <div style={styles.footerLinkGroup}>
            <div style={styles.footerLinkHead}>Contact</div>
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" style={styles.footerLink}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={CONTACT_TEL_URL} style={styles.footerLink}>{CONTACT_PHONE_DISPLAY}</a>
            <a href="mailto:alhadeeqallc@gmail.com" style={styles.footerLink}>alhadeeqallc@gmail.com</a>
            <div style={{ ...styles.footerLink, cursor: "default" }}>Office 404, PTC Building, Al Qusais Industrial First, Dubai, UAE</div>
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
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="footer-social-btn footer-social-btn-wa"
                style={{ ...styles.footerSocialBtn, ...styles.footerSocialBtnWa }}
              >
                <WaIcon />
              </a>
            </div>
          </div>
          <div style={styles.footerLinkGroup}>
            <div style={styles.footerLinkHead}>Company</div>
            <a href="/about" style={styles.footerLink}>About</a>
            <a href="/projects" style={styles.footerLink}>Projects</a>
            <a href="/contact" style={styles.footerLink}>Contact</a>
            <a href="/bunkers" style={styles.footerLink}>Underground Shelters</a>
            <a href="/faq" style={styles.footerLink}>FAQs</a>
            <a href="/the-vault" style={{ ...styles.footerLink, color: "#c9a54e" }}>The Vault ↗</a>
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

function FloatingWa() {
  return (
    <a
      href={buildWhatsAppUrl("Hi Al Hadeeqa, I'd like a free consultation.")}
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

function JanGroupSection() {
  const [ref, inView] = useInView();
  return (
    <section ref={ref} className="jan-group-section" style={styles.janGroupSection}>
      <div style={styles.janGroupSectionInner}>
        <div style={styles.janGroupSectionHeader}>
          <span style={styles.janGroupSectionEyebrow}>Part of the Jan Group</span>
          <span style={styles.janGroupSectionTagline}>Three specialised brands. One standard of excellence.</span>
        </div>
        <div className="jan-brands-grid" style={styles.janBrandsGrid}>
          {JAN_BRANDS.map((brand, i) => (
            <div
              key={brand.id}
              style={{
                ...styles.janBrandCard,
                ...(brand.current ? styles.janBrandCardCurrent : {}),
                opacity: inView ? 1 : 0,
                transform: inView ? "none" : "translateY(16px)",
                transition: `opacity 0.5s ${i * 0.1}s, transform 0.5s ${i * 0.1}s`,
              }}
            >
              {brand.current && (
                <div style={styles.janBrandCurrentBadge}>You are here</div>
              )}
              <div style={styles.janBrandIconBox}>
                <BrandIcon id={brand.id} />
              </div>
              <div style={styles.janBrandName}>{brand.name}</div>
              <p style={styles.janBrandDesc}>{brand.desc}</p>
              {brand.current ? (
                <span style={{ ...styles.janBrandVisit, opacity: 0.3, cursor: "default" }}>Current Site</span>
              ) : (
                <a href={brand.href} target="_blank" rel="noreferrer" style={styles.janBrandVisit}>
                  Visit Site →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ onContact }) {
  const meta = usePageMeta({
    title: "Al Hadeeqa Contracting — Construction, Pergolas, Carports & Underground Shelters in Dubai",
    description:
      "Al Hadeeqa Contracting: Dubai's trusted construction company since 2009. Pergolas, carports, dewatering, excavation, underground shelters from AED 100,000, and The Vault luxury underground residence. ISO 9001 certified. 50+ crew. Free site assessment.",
    canonical: "https://alhadeeqacontracting.com/",
    ogImage: "https://alhadeeqacontracting.com/assets/images/services-hero.jpg",
    schemas: [
      organizationSchema,
      websiteSchema,
      breadcrumbSchema([{ name: "Al Hadeeqa Contracting", url: "https://alhadeeqacontracting.com" }]),
    ],
  });
  return (
    <>
      {meta}
      <Hero onContact={onContact} />
      <section style={{ background: "#f4f8f5", borderBottom: "1px solid rgba(26,74,38,0.08)", padding: "40px 64px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 10 }}>About Al Hadeeqa Contracting</div>
          <p style={{ fontSize: 16, color: "#3d5c42", lineHeight: 1.85, margin: 0 }}>
            Al Hadeeqa Contracting is a Dubai-based construction company specialising in luxury pergolas, carports, dewatering, excavation, demolition, waterproofing, underground shelters, boundary walls, steel structures, swimming pools, landscaping, and general contracting. Established in 2009 by Engr. Muhammad Ashraf Jan, we are ISO 9001, ISO 14001, and OHSAS 18001 certified with 50+ crew members and 500+ completed projects. We serve Dubai only.
          </p>
        </div>
      </section>
      <HomeEquipmentCarousel />
      <HomeBunkerPreview />
      <HomeServicesPreview />
      <HomeAboutPreview />
      <HomeProjectsPreview />
      <Contact />
    </>
  );
}

function ServicesPage({ onContact }) {
  const meta = usePageMeta({
    title: "Construction Services in Dubai | Al Hadeeqa Contracting — Pergolas, Carports, Dewatering & More",
    description:
      "Al Hadeeqa Contracting offers pergola construction, carports, dewatering, excavation, shoring, demolition, glass rooms, waterproofing, and maintenance in Dubai. ISO certified. 15+ years experience. Free site assessment.",
    canonical: "https://alhadeeqacontracting.com/services",
    ogImage: "https://alhadeeqacontracting.com/assets/images/services-hero.jpg",
    schemas: [
      organizationSchema,
      breadcrumbSchema([
        { name: "Home", url: "https://alhadeeqacontracting.com" },
        { name: "Services", url: "https://alhadeeqacontracting.com/services" },
      ]),
    ],
  });
  return (
    <>
      {meta}
      <ServicesPageHero onContact={onContact} />
      <ServicesQuickNav />
      <ServicesPageSection />
      <LuxurySpotlight onContact={onContact} />
      <Contact />
    </>
  );
}

function WarrantySection() {
  return (
    <section style={{ ...styles.section, background: "#f4f8f5" }} className="section-main">
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={styles.sectionEyebrow}>Our Guarantee</div>
        <div style={{ ...styles.greenRule, marginLeft: 0, margin: "12px 0 24px" }} />
        <h2 style={{ ...styles.sectionH2, textAlign: "left", fontSize: "clamp(24px, 3vw, 36px)", marginBottom: 24 }}>
          10-Year Warranty — What It Covers
        </h2>
        <p style={{ ...styles.aboutDesc, marginBottom: 16 }}>
          Al Hadeeqa Contracting offers a 10-year structural warranty on carports, pergolas, and shading structures manufactured and installed by our in-house team. The warranty covers structural failure, weld integrity, and powder-coat delamination attributable to manufacturing or installation defect.
        </p>
        <p style={{ ...styles.aboutDesc, marginBottom: 16 }}>
          Waterproofing systems installed by Al Hadeeqa carry a 10-year material and workmanship warranty, subject to the membrane manufacturer's own product guarantee (typically Sika, Fosroc, or equivalent). This applies to flat roof and terrace waterproofing where the substrate was prepared to our specification.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24, marginBottom: 16 }}>
          <div style={{ background: "#fff", padding: "20px 24px", borderLeft: "3px solid #5aad6e" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#5aad6e", fontWeight: 700, marginBottom: 10 }}>Covered</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Structural frame defects (carports, pergolas)",
                "Weld and connection failures",
                "Powder-coat delamination from defect",
                "Waterproofing membrane failure (substrate conditions met)",
                "Installation defects identified within warranty period",
              ].map((item) => (
                <li key={item} style={{ fontSize: 14, color: "#3d5c42", padding: "6px 0", borderBottom: "1px solid rgba(20,31,22,0.06)", display: "flex", gap: 8 }}>
                  <span style={{ color: "#5aad6e", fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#fff", padding: "20px 24px", borderLeft: "3px solid rgba(20,31,22,0.2)" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(20,31,22,0.4)", fontWeight: 700, marginBottom: 10 }}>Exclusions</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Damage from external impact or modification",
                "Normal surface wear and UV fading over time",
                "Substrate movement or settlement not caused by our works",
                "Works not installed by Al Hadeeqa's in-house team",
                "Maintenance-dependent items where scheduled care was not followed",
              ].map((item) => (
                <li key={item} style={{ fontSize: 14, color: "#6b876f", padding: "6px 0", borderBottom: "1px solid rgba(20,31,22,0.06)", display: "flex", gap: 8 }}>
                  <span style={{ color: "rgba(20,31,22,0.3)", fontWeight: 700, flexShrink: 0 }}>—</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ fontSize: 13, color: "rgba(20,31,22,0.45)", lineHeight: 1.7, marginTop: 16 }}>
          Warranty terms are confirmed in writing at contract signature. Claims must be submitted within the warranty period with photographic evidence. Al Hadeeqa Contracting will inspect the site within 5 working days of a valid claim and carry out remedial works at no cost where the defect falls within scope.
        </p>
      </div>
    </section>
  );
}

function EquipmentFleetPage({ category }) {
  const meta = usePageMeta({
    title: `${category.name} for Hire Dubai | Al Hadeeqa Contracting Equipment Rentals`,
    description: `Rent ${category.name.toLowerCase()} in Dubai. ${category.description}. Daily, weekly and monthly rates. Delivery to your site. Al Hadeeqa Contracting.`,
    canonical: `https://alhadeeqacontracting.com/rentals/${category.id}`,
    ogImage: `https://alhadeeqacontracting.com${category.image}`,
    schemas: [
      breadcrumbSchema([
        { name: "Home", url: "https://alhadeeqacontracting.com" },
        { name: "Equipment Rentals", url: "https://alhadeeqacontracting.com/rentals" },
        { name: category.name, url: `https://alhadeeqacontracting.com/rentals/${category.id}` },
      ]),
    ],
  });

  const waText = encodeURIComponent(`Hi Al Hadeeqa, I'd like to enquire about renting ${category.name}. Can you send me availability and rates?`);

  return (
    <>
      {meta}

      {/* Hero */}
      <section style={{ padding: "168px 64px 64px", background: "#132017", position: "relative", overflow: "hidden" }} className="rentals-hero">
        {category.image && (
          <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "50%", overflow: "hidden", pointerEvents: "none" }}>
            <img src={category.image} alt="" aria-hidden="true" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.22, display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #132017 0%, transparent 60%)" }} />
          </div>
        )}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(26,74,38,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <a href="/rentals" style={{ ...styles.backToOverview, color: "rgba(255,255,255,0.5)", borderBottomColor: "rgba(255,255,255,0.15)", marginBottom: 24, display: "inline-block" }}>← Back to Equipment Rentals</a>
          <div style={{ color: "#1a4a26", marginBottom: 20 }}>
            <div style={{ color: "#5aad6e" }}>{EQUIPMENT_ICONS[category.id]}</div>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 5.5vw, 72px)", lineHeight: 1.04, fontWeight: 700, color: "#fff", margin: "0 0 16px", maxWidth: 760 }}>
            {category.name}
          </h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, fontWeight: 300, maxWidth: 560, margin: "0 0 36px" }}>
            {category.description}. Available for daily, weekly, or monthly hire across Dubai. Delivery and collection included.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href={`https://wa.me/971544419854?text=${waText}`} target="_blank" rel="noreferrer" style={styles.btnPrimaryLink}>
              <WaIcon /> Enquire on WhatsApp
            </a>
            <span
              style={{ ...styles.btnSecondary, color: "rgba(255,255,255,0.45)", borderBottomColor: "rgba(255,255,255,0.15)", fontSize: 14, letterSpacing: "0.08em", cursor: "default" }}
            >
              Download Rate Card PDF ↓
            </span>
          </div>
        </div>
      </section>

      {/* Fleet Listing */}
      <section style={{ ...styles.section, padding: "80px 64px" }} className="section-main">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 48 }}>
            <div style={styles.sectionEyebrow}>Available Fleet</div>
            <div style={{ ...styles.greenRule, margin: "12px 0 0", marginLeft: 0 }} />
          </div>

          {category.items && category.items.length > 0 ? (
            /* Rates table — shown once Jan provides data */
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr style={{ background: "#1a4a26", color: "#fff" }}>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Equipment</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Specification</th>
                    <th style={{ padding: "14px 18px", textAlign: "right", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Daily</th>
                    <th style={{ padding: "14px 18px", textAlign: "right", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Weekly</th>
                    <th style={{ padding: "14px 18px", textAlign: "right", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Monthly</th>
                    <th style={{ padding: "14px 18px", textAlign: "center", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Enquire</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, i) => (
                    <tr key={item.name} style={{ background: i % 2 === 0 ? "#fff" : "#f4f8f5", borderBottom: "1px solid rgba(26,74,38,0.08)" }}>
                      <td style={{ padding: "14px 18px", fontSize: 15, fontWeight: 600, color: "#141f16" }}>{item.name}</td>
                      <td style={{ padding: "14px 18px", fontSize: 14, color: "#6b876f" }}>{item.spec || "—"}</td>
                      <td style={{ padding: "14px 18px", fontSize: 14, color: "#3d5c42", textAlign: "right" }}>{item.dailyRate ? `AED ${item.dailyRate}` : "—"}</td>
                      <td style={{ padding: "14px 18px", fontSize: 14, color: "#3d5c42", textAlign: "right" }}>{item.weeklyRate ? `AED ${item.weeklyRate}` : "—"}</td>
                      <td style={{ padding: "14px 18px", fontSize: 14, color: "#3d5c42", textAlign: "right" }}>{item.monthlyRate ? `AED ${item.monthlyRate}` : "—"}</td>
                      <td style={{ padding: "14px 18px", textAlign: "center" }}>
                        <a
                          href={`https://wa.me/971544419854?text=${encodeURIComponent(`Hi Al Hadeeqa, I'd like to enquire about renting the ${item.name}. Can you confirm availability and rates?`)}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ ...styles.serviceLinkBtn, padding: "8px 14px", fontSize: 11 }}
                        >
                          Enquire
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Placeholder — shown until Jan provides the fleet list */
            <div style={{ background: "#f4f8f5", border: "1px solid rgba(26,74,38,0.14)", borderLeft: "4px solid #1a4a26", padding: "40px 36px", maxWidth: 680 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#1a4a26", fontWeight: 700, marginBottom: 14 }}>Fleet listing coming soon</div>
              <p style={{ fontSize: 16, color: "#556d5b", lineHeight: 1.8, margin: "0 0 28px", fontWeight: 300 }}>
                We're updating our {category.name.toLowerCase()} inventory list with full specs and rates. In the meantime, WhatsApp us directly — we'll confirm availability and send a quote the same day.
              </p>
              <a href={`https://wa.me/971544419854?text=${waText}`} target="_blank" rel="noreferrer" style={styles.btnPrimaryLink}>
                <WaIcon /> Check Availability on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Rate Card Request */}
      <section className="rentals-rates-section" style={{ background: "#f4f8f5", borderTop: "1px solid rgba(26,74,38,0.08)", padding: "56px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <div style={styles.sectionEyebrow}>Pricing</div>
            <div style={{ ...styles.greenRule, margin: "10px 0 14px", marginLeft: 0 }} />
            <p style={{ fontSize: 16, color: "#556d5b", lineHeight: 1.75, margin: 0, fontWeight: 300, maxWidth: 480 }}>
              Daily, weekly and monthly rates available. Download our full rate card PDF for complete pricing.
            </p>
          </div>
          <button
            style={{ ...styles.btnPrimaryLink, gap: 12, flexShrink: 0, cursor: "default", opacity: 0.72, border: "none" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Rate Card PDF
          </button>
        </div>
      </section>

      {/* Cross-sell */}
      <section style={{ background: "#1a4a26", padding: "40px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, margin: 0, fontWeight: 300, maxWidth: 580 }}>
            Need the full package? Al Hadeeqa handles excavation, dewatering, shoring and construction — with our own fleet on site.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="/rentals" style={{ ...styles.btnPrimaryLink, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>← All Equipment</a>
            <a href="/services" style={{ ...styles.btnPrimaryLink, background: "#fff", color: "#1a4a26" }}>View All Services →</a>
          </div>
        </div>
      </section>

      <Contact defaultService="Equipment Rental" />
    </>
  );
}

const RENTALS_FAQS = [
  { q: "What equipment do you have available?", a: "We offer excavators, dewatering pumps, concrete pumps, cranes, compactors, generators, dump trucks, and scaffolding. Contact us for the full current inventory." },
  { q: "What are your rental rates?", a: "Rates depend on equipment type and rental duration. We offer daily, weekly, and monthly pricing with discounts for longer periods. WhatsApp us for a quote." },
  { q: "Do you deliver equipment to site?", a: "Yes. All equipment is delivered to your project site and collected when you're finished. Delivery is available across Dubai." },
  { q: "Can I rent equipment with an operator?", a: "Yes. Trained operators are available with select equipment. Let us know your requirements when you enquire." },
  { q: "What is the minimum rental period?", a: "Most equipment is available from a single day. Some specialist items have a minimum weekly rental. We'll confirm when you enquire." },
  { q: "Do you serve areas outside Dubai?", a: "Our primary service area is Dubai. For projects in Sharjah, Ajman, or Abu Dhabi, contact us to discuss availability." },
];

function RentalsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const rentalsServiceSchema = {
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
    "areaServed": { "@type": "City", "name": "Dubai" },
    "description": "Construction equipment rentals in Dubai. Excavators, dewatering pumps, concrete pumps, cranes and more. Daily, weekly and monthly rates.",
    "url": "https://alhadeeqacontracting.com/rentals"
  };

  const meta = usePageMeta({
    title: "Equipment Rentals Dubai | Al Hadeeqa Contracting — Excavators, Pumps, Cranes",
    description: "Rent construction equipment in Dubai. Excavators, dewatering pumps, concrete pumps, cranes and more from Al Hadeeqa Contracting. Competitive daily, weekly and monthly rates. Delivery available across Dubai.",
    canonical: "https://alhadeeqacontracting.com/rentals",
    ogImage: "https://alhadeeqacontracting.com/assets/images/rentals/dump-truck.jpg",
    schemas: [
      rentalsServiceSchema,
      faqSchema(RENTALS_FAQS),
      breadcrumbSchema([
        { name: "Home", url: "https://alhadeeqacontracting.com" },
        { name: "Equipment Rentals", url: "https://alhadeeqacontracting.com/rentals" },
      ]),
    ],
  });

  return (
    <>
      {meta}

      {/* A. Hero */}
      <section style={{ padding: "168px 64px 72px", background: "#132017", position: "relative", overflow: "hidden" }} className="rentals-hero">
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(26,74,38,0.35) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div style={{ ...styles.sectionEyebrow, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>Al Hadeeqa Contracting</div>
          <div style={{ width: 36, height: 2, background: "#5aad6e", margin: "0 0 28px" }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(44px, 5.5vw, 80px)", lineHeight: 1.02, fontWeight: 700, color: "#fff", margin: "0 0 20px", maxWidth: 820 }}>
            Construction Equipment Rentals
          </h1>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.72)", lineHeight: 1.75, fontWeight: 300, maxWidth: 600, margin: "0 0 36px" }}>
            Excavators, pumps, cranes and specialist plant — available daily, weekly, or monthly across Dubai.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#contact" style={styles.btnPrimaryLink}>Get a Rental Quote</a>
            <a href="#equipment" style={{ ...styles.btnSecondary, color: "rgba(255,255,255,0.72)", borderBottomColor: "rgba(255,255,255,0.3)", fontSize: 14, letterSpacing: "0.08em" }}>View Equipment ↓</a>
          </div>
          <div style={{ display: "flex", gap: 0, marginTop: 56, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 28, flexWrap: "wrap" }} className="rentals-stats-bar">
            {[
              { val: "XX+", label: "Machines Available" },
              { val: "Daily / Weekly / Monthly", label: "Flexible Hire Periods" },
              { val: "Dubai-Wide", label: "Delivery Included" },
            ].map((stat, i) => (
              <div key={stat.label} style={{ flex: 1, minWidth: 160, padding: "0 28px 0 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", marginRight: i < 2 ? 28 : 0 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{stat.val}</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B. Equipment Categories Grid */}
      <section id="equipment" style={{ ...styles.section, scrollMarginTop: 96 }} className="section-main">
        <div style={styles.sectionHeader}>
          <div style={styles.sectionEyebrow}>Our Fleet</div>
          <div style={styles.greenRule} />
          <h2 style={styles.sectionH2}>Equipment available for hire</h2>
          <p style={styles.sectionSub}>Select any category to enquire. All equipment delivered to your site across Dubai.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, maxWidth: 1280, margin: "0 auto" }} className="rentals-equipment-grid">
          {equipmentCategories.map((cat) => (
            <div key={cat.id} id={cat.id} style={{ background: "#fff", border: "1px solid rgba(26,74,38,0.14)", borderTop: "3px solid #1a4a26", display: "flex", flexDirection: "column", scrollMarginTop: 96, overflow: "hidden" }}>
              <div style={{ height: 180, overflow: "hidden", flexShrink: 0 }}>
                <img src={cat.image} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#141f16", margin: 0, lineHeight: 1.2 }}>{cat.name}</h3>
                <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{cat.description}</p>
                <a
                  href={`/rentals/${cat.id}`}
                  style={{ ...styles.serviceLinkBtn, marginTop: "auto", alignSelf: "flex-start" }}
                >
                  See Our Fleet →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C. How It Works */}
      <section style={{ ...styles.section, background: "#f4f8f5", padding: "80px 64px" }} className="section-main rentals-how-it-works">
        <div style={styles.sectionHeader}>
          <div style={styles.sectionEyebrow}>The Process</div>
          <div style={styles.greenRule} />
          <h2 style={styles.sectionH2}>How it works</h2>
        </div>
        <div className="rentals-how-it-works-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1280, margin: "0 auto" }}>
          {[
            { number: "01", title: "Tell us what you need", body: "Call or WhatsApp with your equipment requirements and project dates." },
            { number: "02", title: "We confirm availability", body: "Same-day confirmation on equipment and delivery schedule." },
            { number: "03", title: "Delivered to your site", body: "Equipment transported, set up, and ready to operate." },
            { number: "04", title: "Flexible returns", body: "Extend, swap, or return. We handle collection." },
          ].map((step) => (
            <div key={step.number} style={{ background: "#fff", borderTop: "3px solid #1a4a26", padding: "28px 24px 24px" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#1a4a26", fontWeight: 700, marginBottom: 14 }}>{step.number}</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#141f16", margin: "0 0 10px", lineHeight: 1.25 }}>{step.title}</h3>
              <p style={{ fontSize: 15, color: "#6b876f", lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* D. Why Rent From Al Hadeeqa */}
      <section style={{ ...styles.section, padding: "80px 64px" }} className="section-main">
        <div style={styles.sectionHeader}>
          <div style={styles.sectionEyebrow}>Why Al Hadeeqa</div>
          <div style={styles.greenRule} />
          <h2 style={styles.sectionH2}>Why rent from us</h2>
        </div>
        <div className="rentals-why-rent-cards" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20, maxWidth: 1280, margin: "0 auto" }}>
          {[
            { title: "Licensed & Insured", body: "All equipment maintained and insured. Al Hadeeqa is a Dubai-licensed contractor." },
            { title: "Delivery & Pickup Included", body: "Equipment delivered to your site and collected when you're done. Dubai-wide." },
            { title: "Daily, Weekly, Monthly Rates", body: "Flexible rental periods. Long-term discounts available." },
            { title: "Operator Available", body: "Need an operator? We supply trained operators with select equipment." },
            { title: "35+ Years in Dubai Construction", body: "We know what works on UAE sites. Get the right machine for your scope." },
          ].map((point) => (
            <div key={point.title} style={{ background: "#fff", border: "1px solid rgba(26,74,38,0.14)", borderLeft: "4px solid #1a4a26", padding: "24px 24px 22px" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#141f16", margin: "0 0 10px" }}>{point.title}</h3>
              <p style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* E. Rates / Brochure Section */}
      <section className="rentals-rates-section" style={{ background: "#f4f8f5", borderTop: "1px solid rgba(26,74,38,0.08)", borderBottom: "1px solid rgba(26,74,38,0.08)", padding: "72px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={styles.sectionEyebrow}>Pricing</div>
            <div style={{ ...styles.greenRule, margin: "12px 0 18px", marginLeft: 0 }} />
            <h2 style={{ ...styles.sectionH2, textAlign: "left", fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 14 }}>
              Rental Rate Card
            </h2>
            <p style={{ fontSize: 17, color: "#6b876f", lineHeight: 1.8, fontWeight: 300, maxWidth: 480, marginBottom: 0 }}>
              Daily, weekly and monthly rates across all equipment categories. Download our full rate card PDF for a complete pricing overview.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, flexShrink: 0 }}>
            <button
              style={{ ...styles.btnPrimaryLink, gap: 12, cursor: "default", opacity: 0.72, border: "none" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Rate Card PDF
            </button>
            <span style={{ fontSize: 13, color: "#6b876f", letterSpacing: "0.04em" }}>PDF available soon</span>
          </div>
        </div>
      </section>

      {/* F. Cross-Sell Banner */}
      <section style={{ background: "#1a4a26", padding: "48px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap" }}>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.88)", lineHeight: 1.7, margin: 0, fontWeight: 300, maxWidth: 680 }}>
            Need the full package? Al Hadeeqa handles excavation, dewatering, shoring and construction — with our own fleet on site.
          </p>
          <a href="/services" style={{ ...styles.btnPrimaryLink, background: "#fff", color: "#1a4a26", flexShrink: 0 }}>View All Services →</a>
        </div>
      </section>

      {/* G. FAQ Section */}
      <section style={{ ...styles.section, padding: "80px 64px" }} className="section-main">
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={styles.sectionEyebrow}>Common Questions</div>
          <div style={{ ...styles.greenRule, margin: "12px 0 32px", marginLeft: 0 }} />
          <h2 style={{ ...styles.sectionH2, textAlign: "left", fontSize: "clamp(28px, 3.5vw, 44px)", marginBottom: 36 }}>
            Equipment rental FAQs
          </h2>
          {RENTALS_FAQS.map((faq, i) => (
            <div key={faq.q} style={{ borderBottom: "1px solid rgba(20,31,22,0.08)", overflow: "hidden" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "18px 0", cursor: "pointer", gap: 16 }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setOpenFaq(openFaq === i ? null : i)}
              >
                <div style={{ fontSize: 15, fontWeight: 600, color: "#141f16", lineHeight: 1.5, flex: 1 }}>{faq.q}</div>
                <div style={{ fontSize: 18, color: "#5aad6e", fontWeight: 300, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>{openFaq === i ? "−" : "+"}</div>
              </div>
              {openFaq === i && <div style={{ fontSize: 14, color: "#6b876f", lineHeight: 1.85, paddingBottom: 18 }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* H. Contact Form */}
      <Contact defaultService="Equipment Rental" />
    </>
  );
}

function AboutPage({ onContact }) {
  const meta = usePageMeta({
    title: "About Al Hadeeqa Contracting | Dubai Construction Company Since 2009 | ISO Certified",
    description:
      "Al Hadeeqa Contracting Co. L.L.C — founded 2009 by Engr. Muhammad Ashraf Jan. Dubai Municipality licensed, ISO 9001:2015 & 14001:2015 certified. 50+ crew, 500+ projects completed across UAE. Pergolas, carports, dewatering, underground shelters.",
    canonical: "https://alhadeeqacontracting.com/about",
    ogImage: "https://alhadeeqacontracting.com/assets/images/about-hero.jpg",
    schemas: [
      organizationSchema,
      breadcrumbSchema([
        { name: "Home", url: "https://alhadeeqacontracting.com" },
        { name: "About", url: "https://alhadeeqacontracting.com/about" },
      ]),
    ],
  });
  return (
    <>
      {meta}
      <AboutPageHero onContact={onContact} />
      <About />
      <WarrantySection />
      <Contact />
    </>
  );
}

function ProjectsPage({ onContact }) {
  const meta = usePageMeta({
    title: "Projects | Al Hadeeqa Contracting — Dubai Construction Portfolio",
    description:
      "Browse Al Hadeeqa Contracting's portfolio of 500+ completed projects across Dubai and the UAE — pergolas, carports, underground shelters, dewatering, and bespoke construction.",
    canonical: "https://alhadeeqacontracting.com/projects",
    ogImage: "https://alhadeeqacontracting.com/assets/images/projects-hero.jpg",
    schemas: [
      organizationSchema,
      breadcrumbSchema([
        { name: "Home", url: "https://alhadeeqacontracting.com" },
        { name: "Projects", url: "https://alhadeeqacontracting.com/projects" },
      ]),
    ],
  });
  return (
    <>
      {meta}
      <ProjectsPageHero onContact={onContact} />
      <Projects />
      <Contact />
    </>
  );
}

function ContactPage() {
  const meta = usePageMeta({
    title: "Contact Al Hadeeqa Contracting | Get a Free Quote in Dubai",
    description:
      "Contact Al Hadeeqa Contracting Co. L.L.C for a free site assessment and quote. Call or WhatsApp +971 54 441 9854. Serving Dubai and all UAE emirates.",
    canonical: "https://alhadeeqacontracting.com/contact",
    ogImage: "https://alhadeeqacontracting.com/assets/images/services-hero.jpg",
    schemas: [
      organizationSchema,
      breadcrumbSchema([
        { name: "Home", url: "https://alhadeeqacontracting.com" },
        { name: "Contact", url: "https://alhadeeqacontracting.com/contact" },
      ]),
    ],
  });
  return (
    <>
      {meta}
      <Contact pageOffset />
    </>
  );
}

export default function App() {
  const route = resolveRoute(window.location.pathname);
  const [modal, setModal] = useState(null);

  useScrollToHash(route.pathname);

  useEffect(() => {
    if (route.type === "services") {
      document.title = "Services | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "service") {
      document.title = route.service.metaTitle || `${route.service.title} | Al Hadeeqa Contracting`;
      return;
    }

    if (route.type === "about") {
      document.title = "About | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "projects") {
      document.title = "Projects | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "contact") {
      document.title = "Contact | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "bunker") {
      document.title = "Underground Shelters Dubai | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "bunker-emergency-pod") {
      document.title = "Emergency Pod — Precast Underground Shelter | AED 100,000 | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "bunker-compact-shelter") {
      document.title = "Compact Shelter — Precast Underground Shelter | AED 200,000 | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "bunker-shelter") {
      document.title = "Shelter — Poured-in-Place Underground Shelter | From AED 500,000 | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "vault") {
      document.title = "The Vault — Underground Luxury Residence | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "rentals") {
      document.title = "Equipment Rentals Dubai | Al Hadeeqa Contracting — Excavators, Pumps, Cranes";
      return;
    }

    if (route.type === "rentals-category") {
      document.title = `${route.category.name} for Hire Dubai | Al Hadeeqa Contracting`;
      return;
    }

    if (route.type === "faq") {
      document.title = "Frequently Asked Questions | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "blog-waterproofing-checklist") {
      document.title = "Dubai's March 2026 Floods: What Villa Owners Should Inspect Right Now | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "not-found") {
      document.title = "Page Not Found | Al Hadeeqa Contracting";
      return;
    }

    document.title = "Al Hadeeqa Contracting — Dubai Construction, Pergolas, Carports & Underground Shelters";
  }, [route.type, route.type === "service" ? route.service.title : ""]);

  const openContact = (service = "") => setModal(service || "General Enquiry");
  const closeContact = () => setModal(null);

  let page = <HomePage onContact={openContact} />;
  if (route.type === "services") {
    page = <ServicesPage onContact={openContact} />;
  } else if (route.type === "service") {
    page = (
      <>
        <ServiceLandingPage service={route.service} onContact={openContact} />
        <Contact />
      </>
    );
  } else if (route.type === "about") {
    page = <AboutPage onContact={openContact} />;
  } else if (route.type === "projects") {
    page = <ProjectsPage onContact={openContact} />;
  } else if (route.type === "contact") {
    page = <ContactPage />;
  } else if (route.type === "bunker") {
    page = <StaticPageRedirect to="/bunker.html" />;
  } else if (route.type === "bunker-emergency-pod") {
    page = <BunkerTierPage tierId="emergency-pod" />;
  } else if (route.type === "bunker-compact-shelter") {
    page = <BunkerTierPage tierId="compact-shelter" />;
  } else if (route.type === "bunker-shelter") {
    page = <BunkerTierPage tierId="shelter" />;
  } else if (route.type === "vault") {
    page = <StaticPageRedirect to="/vault.html" />;
  } else if (route.type === "rentals") {
    page = <RentalsPage />;
  } else if (route.type === "rentals-category") {
    page = <EquipmentFleetPage category={route.category} />;
  } else if (route.type === "faq") {
    page = <FAQPage />;
  } else if (route.type === "blog-waterproofing-checklist") {
    page = <BlogWaterproofingChecklist onContact={openContact} />;
  } else if (route.type === "not-found") {
    page = <NotFoundPage />;
  }

  return (
    <div style={styles.root}>
      <JanGroupBar />
      <Nav onContact={() => openContact()} route={route} />
      {page}
      <JanGroupSection />
      <Footer />
      <FloatingWa />
      {modal && <ContactModal service={modal} onClose={closeContact} />}
    </div>
  );
}

const GREEN = "#1a4a26";
const GREEN_DIM = "rgba(26,74,38,0.10)";
const GREEN_BORDER = "rgba(26,74,38,0.18)";

/* ─────────────────────────────────────────
   BUNKER PAGE
───────────────────────────────────────── */
const BUNKER_WA = "971544419854";
const bunkerWaUrl = (tier) =>
  `https://wa.me/${BUNKER_WA}?text=${encodeURIComponent(`Hi Al Hadeeqa Contracting,\n\nI'm interested in the ${tier}. Can I get a free assessment?`)}`;

const TIERS = [
  { name: "Pod",       type: "Precast", price: "AED 100K",   size: "7–8 sqm",      cap: "2–4 people",   depth: "2.5–3m", auto: "12–24 hrs",  walls: "220mm RC",   entry: "Top hatch",  featured: false, vault: false },
  { name: "Compact",   type: "Precast", price: "AED 200K",   size: "15–20 sqm",    cap: "6–8 people",   depth: "3–3.5m", auto: "1–3 days",   walls: "250mm RC",   entry: "Top hatch",  featured: false, vault: false },
  { name: "Shelter",   type: "Poured",  price: "AED 500K",   size: "25–35 sqm",    cap: "8–15 people",  depth: "3–4m",   auto: "1–3 days",   walls: "300–400mm",  entry: "Ladder",     featured: false, vault: false },
  { name: "Safe Room", type: "Poured",  price: "AED 950K",   size: "50–80 sqm",    cap: "10–20 people", depth: "4–5m",   auto: "3–7 days",   walls: "400mm",      entry: "Staircase",  featured: true,  vault: false },
  { name: "Fortified", type: "Poured",  price: "AED 1.9M",   size: "100–150 sqm",  cap: "15–25 people", depth: "5–6m",   auto: "7–14 days",  walls: "400–500mm",  entry: "Wide stair", featured: false, vault: false },
  { name: "The Vault", type: "Poured",  price: "AED 5M+",    size: "300–500+ sqm", cap: "15–30 people", depth: "5–6m",   auto: "14+ days",   walls: "500mm",      entry: "Car ramp",   featured: false, vault: true  },
];

function BunkerReveal({ children, style, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.08 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(18px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function BunkerPage({ onContact }) {
  return (
    <>
      {/* ── HERO ── */}
      <section style={bStyles.hero} className="bunker-hero">
        {/* Background image */}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundImage: "url('/assets/images/bunker-full.png')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        {/* Subtle light overlay */}
        <div style={{
          display: "block",
          position: "absolute",
          top: 0, right: 0, bottom: 0, left: 0,
          background: "linear-gradient(105deg, rgba(244,248,245,0.30) 0%, rgba(244,248,245,0.10) 50%, rgba(244,248,245,0.0) 100%)",
        }} />
        {/* 4px green left edge line */}
        <div style={bStyles.heroGreenLine} />
        {/* Content box */}
        <div style={bStyles.heroContentBox} className="bunker-hero-content">
          {/* Eyebrow with horizontal line before it */}
          <div style={bStyles.heroEyebrow}>
            <span style={{ display: "inline-block", width: 28, height: 1, background: GREEN, flexShrink: 0 }} />
            SafeHaven by Al Hadeeqa Contracting
          </div>
          <h1 style={bStyles.heroH1}>
            A Private Underground Space.
            <em style={{ fontStyle: "italic", color: GREEN, display: "block" }}>Built to the Highest Standard.</em>
          </h1>
          <p style={bStyles.heroSub}>
            Al Hadeeqa designs and builds discreet underground safe rooms for UAE villa owners — purpose-engineered, properly built, and installed by a licensed contractor with 20+ years in the UAE.
          </p>
          <div style={bStyles.heroCtas}>
            {/* Primary CTA — WhatsApp icon + scrolls to #quote */}
            <button
              style={bStyles.btnPrimary}
              onClick={() => document.getElementById("quote") ? document.getElementById("quote").scrollIntoView({ behavior: "smooth" }) : onContact()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Request Free Assessment
            </button>
            {/* Secondary text link — scrolls to what-we-build */}
            <a
              href="#what-we-build"
              style={bStyles.btnSecondary}
              onClick={(e) => { e.preventDefault(); document.getElementById("what-we-build") && document.getElementById("what-we-build").scrollIntoView({ behavior: "smooth" }); }}
            >
              See what we build ↓
            </a>
          </div>
        </div>
        {/* Right stats panel */}
        <div style={bStyles.heroStats} className="bunker-hero-stats">
          {[
            { val: "20+", label: "Years in UAE" },
            { val: "50+", label: "Projects Done" },
            { val: "48h", label: "First Response" },
          ].map((s, i) => (
            <div key={s.label}>
              <div style={bStyles.heroStatItem}>
                <div style={bStyles.heroStatVal}>{s.val}</div>
                <div style={bStyles.heroStatLabel}>{s.label}</div>
              </div>
              {i < 2 && <div style={bStyles.heroStatDivider} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── INFO STRIP ── */}
      <div style={bStyles.infoStrip} className="bunker-info-strip">
        <div style={bStyles.infoStripInner}>
          <span style={bStyles.infoItem}>
            <span style={bStyles.infoDot} />
            <strong>Assessments available within 48 hours</strong> — Currently accepting new projects
          </span>
          <span style={bStyles.infoSep} />
          <span style={bStyles.infoItem}><strong>Serving Dubai Only</strong></span>
          <span style={bStyles.infoSep} />
          <span style={bStyles.infoItem}>Free consultation · No obligation</span>
        </div>
      </div>

      {/* ── SITUATION ── */}
      <section style={bStyles.situation} className="bunker-situation">
        <div style={bStyles.sitImg} className="bunker-sit-img">
          <img src="/assets/images/vault-door.jpg" alt="Safe room vault door" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(10%) brightness(0.80)" }} />
          <div style={bStyles.sitLabel}>The Build</div>
        </div>
        <div style={bStyles.sitImg} className="bunker-sit-img bunker-sit-img-2">
          <img src="/assets/images/construction-remodeling.jpg" alt="Construction in progress" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block", filter: "grayscale(10%) brightness(0.80)" }} />
          <div style={bStyles.sitLabel}>The Craft</div>
        </div>
        <BunkerReveal style={bStyles.sitText} className="bunker-sit-text">
          <div style={styles.sectionEyebrow}>Why Clients Choose SafeHaven</div>
          <div style={{ width: 44, height: 2, background: GREEN, margin: "12px 0 20px" }} />
          <blockquote style={bStyles.sitQuote}>
            "Complete privacy. Complete peace of mind. Built properly."
          </blockquote>
          <p style={bStyles.sitP}>
            Discerning homeowners across Dubai are investing in private underground spaces for one simple reason: the option is there when you need it, and <strong style={{ color: GREEN }}>invisible when you don't.</strong>
          </p>
          <p style={bStyles.sitP}>
            Every SafeHaven shelter is custom-engineered to your villa's specific layout — discreet, permanent, and built by a team with 20+ years in UAE construction.
          </p>
        </BunkerReveal>
      </section>

      {/* ── VIDEO ── (placed right after situation, before what we build) */}
      <section style={bStyles.videoSection} className="bunker-video-section">
        <video autoPlay muted loop playsInline style={bStyles.videoBg}>
          <source src="/assets/videos/bunker-walkthrough.mp4" type="video/mp4" />
        </video>
        <div style={bStyles.videoOverlay} />
        <div style={bStyles.videoContent} className="video-content-inner">
          <BunkerReveal>
            <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "rgba(255,255,255,0.3)" }} />
              See the Work
            </div>
            <div style={bStyles.videoH2}>
              An underground<br />
              safe room,{" "}
              <em style={{ fontStyle: "italic", color: "#a8c8a0" }}>up close.</em>
            </div>
          </BunkerReveal>
        </div>
        <div style={bStyles.videoCaption}>Al Hadeeqa Contracting — Underground Shelter</div>
      </section>

      {/* ── WHAT WE BUILD ── */}
      <section id="what-we-build" style={bStyles.whatWeBuild} className="bunker-section">
        <BunkerReveal style={bStyles.whatHeader}>
          <div style={styles.sectionEyebrow}>What We Build</div>
          <div style={{ width: 44, height: 2, background: GREEN, margin: "12px 0 20px" }} />
          <div style={bStyles.leftH2}>One brief.<br /><em style={{ fontStyle: "italic", color: GREEN }}>Built right.</em></div>
          <p style={bStyles.leftSub}>
            We build underground shelters purpose-designed for UAE properties. No corners cut. No upsell. Engineered on-site, built by our licensed team.
          </p>
        </BunkerReveal>
        <div className="bunker-what-layout" style={bStyles.whatLayout}>
          <div style={bStyles.whatImgWrap} className="bunker-what-img">
            <img src="/assets/images/bunker-rendering.png" alt="Underground shelter rendering" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(10%) brightness(0.80)", transition: "filter 0.5s" }} />
            <div style={bStyles.whatImgOverlay} />
            <div style={bStyles.whatImgCaption}>
              <div style={bStyles.whatImgTitle}>The Underground Shelter</div>
              <p style={{ fontSize: 13, color: "#aec8b4", lineHeight: 1.6, margin: 0 }}>Purpose-built below your villa. Your neighbors will think you're renovating a pool.</p>
            </div>
          </div>
          <BunkerReveal style={bStyles.whatFeatures} className="bunker-what-features">
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN, marginBottom: 24, fontWeight: 700 }}>
              What's Included — Every Build
            </div>
            <ul style={{ listStyle: "none", margin: "0 0 32px", padding: 0 }}>
              {[
                "Full underground reinforced concrete structure",
                "Blast-proof hatch entry with redundant locking",
                "Independent air filtration & ventilation",
                "72-hour power backup system",
                "Water storage & emergency supply integration",
                "Communication & monitoring setup",
                "Discreet backyard integration — no visible trace",
                "UAE climate-rated materials throughout",
              ].map((f) => (
                <li key={f} style={bStyles.whatFeatureItem}>
                  <span style={{ color: GREEN, fontWeight: 700, flexShrink: 0 }}>—</span>
                  {f}
                </li>
              ))}
            </ul>
            <p style={bStyles.whatNote}>
              Every project is custom-quoted after a free site assessment. We don't publish prices because every villa and plot is different. The assessment is free. The quote is fixed. No surprises.
            </p>
          </BunkerReveal>
        </div>
      </section>

      {/* ── CREDIBILITY MOSAIC ── */}
      <section style={{ ...bStyles.section, background: "#f4f8f5" }} className="bunker-section">
        <div style={bStyles.inner}>
          <div className="bunker-cred-grid" style={bStyles.credGrid}>
            <BunkerReveal>
              <div style={styles.sectionEyebrow}>An Established Name</div>
              <div style={{ width: 44, height: 2, background: GREEN, margin: "12px 0 20px" }} />
              <div style={{ ...bStyles.leftH2, marginBottom: 16 }}>
                Not a pop-up service.<br />
                <em style={{ fontStyle: "italic", color: GREEN }}>A 20-year contractor.</em>
              </div>
              <p style={{ ...bStyles.leftSub, marginBottom: 36 }}>
                Al Hadeeqa Contracting has built hundreds of residential projects across the UAE. SafeHaven is our dedicated bunker division — backed by the same licensed team, proven materials, and accountability.
              </p>
              <div style={bStyles.mosaicStats}>
                {[
                  { val: "20+", label: "Years in UAE" },
                  { val: "50+", label: "Projects Done" },
                  { val: "1",   label: "City Served"  },
                ].map((s) => (
                  <div key={s.label} style={bStyles.mosaicStat}>
                    <div style={bStyles.mosaicStatVal}>{s.val}</div>
                    <div style={bStyles.mosaicStatLabel}>{s.label}</div>
                  </div>
                ))}
              </div>
            </BunkerReveal>
            <BunkerReveal className="bunker-mosaic-photos" style={bStyles.mosaicPhotos}>
              {[
                { src: "/assets/images/excavation.jpg",              alt: "Excavation work",   label: "The Excavation" },
                { src: "/assets/images/bunker-top-down.png",          alt: "Top-down view",     label: "Top-Down View" },
                { src: "/assets/images/pexels-burst-544966.jpg",      alt: "Precision work",    label: "Precision Work" },
                { src: "/assets/images/pexels-mikael-blomkvist-8961557.jpg", alt: "Our team",   label: "Our Team" },
              ].map((img, i) => (
                <div key={img.label} style={{ ...bStyles.mosaicPhoto, ...(i === 1 ? { marginTop: -32, marginBottom: 32 } : i === 2 ? { marginTop: 32, marginBottom: -32 } : {}) }} className="bunker-mosaic-photo">
                  <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(10%) brightness(0.80)", transition: "filter 0.4s, transform 0.4s" }} />
                  <div style={bStyles.mosaicPhotoLabel}>{img.label}</div>
                </div>
              ))}
            </BunkerReveal>
          </div>
        </div>
      </section>

      {/* ── TIERS ── */}
      <section id="bunker-tiers" style={{ ...bStyles.section, paddingBottom: 0 }} className="bunker-section">
        <div style={bStyles.inner}>
          <BunkerReveal><div style={styles.sectionEyebrow}>Our Range</div></BunkerReveal>
          <BunkerReveal>
            <div style={bStyles.leftH2}>Six tiers of <em style={{ fontStyle: "italic", color: GREEN }}>underground protection</em></div>
          </BunkerReveal>
          <BunkerReveal>
            <p style={{ ...bStyles.leftSub, marginBottom: 48 }}>
              Precast units manufactured in our Ajman yard, delivered and installed in days. Poured-in-place shelters designed by our engineers and built on your site. All prices starting from.
            </p>
          </BunkerReveal>
        </div>

        {/* Spec comparison grid — CSS Grid ensures every row aligns across all columns */}
        <BunkerReveal>
          <div className="bunker-spec-scroll" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", borderTop: `1px solid ${GREEN_BORDER}`, borderBottom: `1px solid ${GREEN_BORDER}` }}>
            <div style={{ display: "grid", gridTemplateColumns: "110px repeat(6, 1fr)", minWidth: 840 }}>

              {/* ── HEADER ROW ── */}
              <div className="bunker-spec-label-cell" style={{ background: "#fff", borderBottom: `1px solid ${GREEN_BORDER}`, borderRight: `1px solid ${GREEN_BORDER}` }} />
              {TIERS.map((tier, i) => (
                <div key={`h${i}`} style={{
                  padding: "16px 16px 13px",
                  borderBottom: `1px solid ${tier.vault ? "rgba(201,165,78,0.15)" : GREEN_BORDER}`,
                  borderRight: i < 5 ? `1px solid ${tier.vault ? "rgba(201,165,78,0.15)" : GREEN_BORDER}` : "none",
                  borderTop: tier.featured ? `4px solid ${GREEN}` : tier.vault ? "4px solid #C9A54E" : "4px solid transparent",
                  display: "flex", flexDirection: "column", justifyContent: "flex-end",
                  background: tier.vault ? "#04090a" : tier.featured ? "#eef4ef" : "#fff",
                }}>
                  {tier.featured && <div style={bStyles.specBadge}>Most Popular</div>}
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 1.4vw, 22px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 3, color: tier.vault ? "#fff" : "#141f16" }}>{tier.name}</div>
                  <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 700, color: tier.vault ? "rgba(255,255,255,0.38)" : "#6b876f" }}>{tier.type}</div>
                </div>
              ))}

              {/* ── SPEC ROWS — display:contents wrapper is invisible to grid, children slot in as grid items ── */}
              {[
                { label: "Starting From", key: "price", isPrice: true },
                { label: "Size",          key: "size"  },
                { label: "Capacity",      key: "cap"   },
                { label: "Depth",         key: "depth" },
                { label: "Autonomy",      key: "auto"  },
                { label: "Entry",         key: "entry" },
              ].map(({ label, key, isPrice }, ri) => (
                <div key={label} style={{ display: "contents" }}>
                  <div className="bunker-spec-label-cell" style={{
                    ...bStyles.specLabelRow,
                    background: ri % 2 !== 0 ? "#f7faf8" : "#fff",
                    borderRight: `1px solid ${GREEN_BORDER}`,
                  }}>{label}</div>
                  {TIERS.map((tier, ci) => {
                    const odd = ri % 2 !== 0;
                    return (
                      <div key={ci} style={{
                        fontSize: isPrice ? "clamp(15px, 1.3vw, 19px)" : 13,
                        fontFamily: isPrice ? "'Cormorant Garamond', serif" : "inherit",
                        fontWeight: isPrice ? 700 : 400,
                        color: isPrice ? (tier.vault ? "#C9A54E" : GREEN) : (tier.vault ? "rgba(255,255,255,0.72)" : "#3d5c42"),
                        padding: "12px 16px",
                        borderBottom: `1px solid ${tier.vault ? "rgba(201,165,78,0.1)" : GREEN_BORDER}`,
                        borderRight: ci < 5 ? `1px solid ${tier.vault ? "rgba(201,165,78,0.1)" : GREEN_BORDER}` : "none",
                        lineHeight: 1.4,
                        background: tier.vault
                          ? (odd ? "#0b0f0b" : "#04090a")
                          : (odd
                              ? (tier.featured ? "rgba(26,74,38,0.045)" : "rgba(26,74,38,0.02)")
                              : (tier.featured ? "#eef4ef" : "#fff")),
                      }}>{tier.vault && !isPrice ? "Custom" : tier[key]}</div>
                    );
                  })}
                </div>
              ))}

              {/* ── CTA ROW ── */}
              <div className="bunker-spec-label-cell" style={{ background: "#fff", borderRight: `1px solid ${GREEN_BORDER}`, borderTop: `1px solid ${GREEN_BORDER}` }} />
              {TIERS.map((tier, ci) => (
                <div key={`cta${ci}`} style={{
                  padding: "14px 16px",
                  borderRight: ci < 5 ? `1px solid ${tier.vault ? "rgba(201,165,78,0.15)" : GREEN_BORDER}` : "none",
                  borderTop: `1px solid ${tier.vault ? "rgba(201,165,78,0.15)" : GREEN_BORDER}`,
                  background: tier.vault ? "#04090a" : tier.featured ? "#eef4ef" : "#fff",
                }}>
                  <a href={bunkerWaUrl(tier.name)} target="_blank" rel="noreferrer"
                    style={tier.vault ? bStyles.tierCtaVault : bStyles.tierCta}>
                    Enquire →
                  </a>
                </div>
              ))}

            </div>
          </div>
        </BunkerReveal>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: "#f4f8f5", padding: "80px 64px", textAlign: "center" }} className="bunker-process-band">
        <BunkerReveal>
          <div style={styles.sectionEyebrow}>How It Works</div>
          <div style={{ width: 44, height: 2, background: GREEN, margin: "12px auto 20px" }} />
          <div style={{ ...bStyles.leftH2, textAlign: "center", marginBottom: 52 }}>
            Three steps.<br /><em style={{ fontStyle: "italic", color: GREEN }}>That's it.</em>
          </div>
        </BunkerReveal>
        <BunkerReveal>
          <div className="bunker-process-inline" style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 0, maxWidth: 900, margin: "0 auto" }}>
            {[
              { n: "1", title: "Free Assessment", desc: "We visit your villa within 48 hours. Review the plot, assess feasibility, answer every question. Zero cost, zero commitment." },
              { n: "2", title: "Fixed-Price Quote", desc: "Fully itemised proposal — all materials, all labour, firm timeline. Everything in writing before a single shovel moves." },
              { n: "3", title: "We Build It",       desc: "Our licensed team completes the build in 6–10 weeks. Discreet, professional, tested with you at handover. Done." },
            ].flatMap((step, i) => [
              <div key={step.n} className="bunker-process-step" style={{ textAlign: "center", flex: 1, padding: "0 20px" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: GREEN, lineHeight: 1, marginBottom: 16 }}>{step.n}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#141f16", marginBottom: 10 }}>{step.title}</div>
                <p style={{ fontSize: 13, color: "#6b876f", lineHeight: 1.65, maxWidth: 200, margin: "0 auto" }}>{step.desc}</p>
              </div>,
              i < 2 ? <div key={`arr${i}`} className="bunker-process-arrow" style={{ color: "rgba(42,110,58,0.4)", fontSize: 22, paddingTop: 14, flexShrink: 0 }}>→</div> : null,
            ])}
          </div>
        </BunkerReveal>
      </section>

      {/* ── CTA + FORM ── */}
      <div id="quote" style={bStyles.ctaSection} className="bunker-cta-section">
        <div style={bStyles.ctaBg} />
        <div style={bStyles.ctaInner} className="bunker-cta-inner">
          <BunkerReveal>
            <h2 style={bStyles.ctaH2}>
              Built once.<br />Built right.<br />
              <em style={{ fontStyle: "italic", color: "#7ec490", display: "block" }}>Built to last.</em>
            </h2>
            <p style={bStyles.ctaP}>A free assessment costs nothing. A private safe room is one of the most enduring additions you can make to your home.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Free site assessment — no cost, no obligation",
                "Fixed-price quote before work begins",
                "6–10 week build, fully discreet",
                "UAE licensed · 20+ years · Dubai only",
              ].map((item) => (
                <div key={item} style={bStyles.ctaCheck}>
                  <span style={{ color: "#7ec490", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </BunkerReveal>
          <BunkerReveal>
            <CtaForm />
          </BunkerReveal>
        </div>
      </div>
    </>
  );
}

function CtaForm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [community, setCommunity] = useState("");

  function handleSubmit() {
    const name = (first + " " + last).trim() || "Not provided";
    const ph = phone || "Not provided";
    const ar = area || "Not specified";
    const msg = encodeURIComponent(
      `Hi Al Hadeeqa Contracting,\n\nI am interested in a *free underground bunker assessment* for my villa.\n\n*Name:* ${name}\n*Phone:* ${ph}\n*Area in Dubai:* ${ar}${community ? "\n*Community:* " + community : ""}\n\nPlease contact me at your earliest convenience.`
    );
    window.open(`https://wa.me/971544419854?text=${msg}`, "_blank");
  }

  const inputStyle = {
    width: "100%",
    background: "#f4f8f5",
    border: "1px solid rgba(42,110,58,0.2)",
    color: "#141f16",
    padding: "14px 16px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    outline: "none",
    appearance: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={bStyles.ctaForm}>
      <h3 style={bStyles.ctaFormH3}>Request Your Free Assessment</h3>
      <p style={bStyles.ctaFormP}>We'll reach out via WhatsApp within 2 hours.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <input style={inputStyle} type="text" placeholder="First Name" value={first} onChange={(e) => setFirst(e.target.value)} />
        <input style={inputStyle} type="text" placeholder="Last Name" value={last} onChange={(e) => setLast(e.target.value)} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <input style={inputStyle} type="tel" placeholder="WhatsApp Number (+971...)" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div style={{ marginBottom: 14 }}>
        <select style={inputStyle} value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="" disabled>Your Dubai area</option>
          <option>Dubai Marina</option>
          <option>Jumeirah</option>
          <option>Business Bay</option>
          <option>Dubai Hills</option>
        </select>
      </div>
      <div style={{ marginBottom: 14 }}>
        <input style={inputStyle} type="text" placeholder="Community / Area (optional)" value={community} onChange={(e) => setCommunity(e.target.value)} />
      </div>
      <button style={bStyles.ctaSubmit} onClick={handleSubmit}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Send via WhatsApp — Get Free Assessment
      </button>
      <p style={bStyles.ctaNote}>🔒 Goes directly to our licensed contractor. No spam, ever.</p>
    </div>
  );
}

const bStyles = {
  hero: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 104,
    paddingBottom: 80,
  },
  /* 4px green left edge line on hero */
  heroGreenLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    background: `linear-gradient(to bottom, transparent, ${GREEN} 20%, ${GREEN} 80%, transparent)`,
    zIndex: 2,
  },
  /* White content box with border-left green */
  heroContentBox: {
    position: "relative",
    zIndex: 2,
    padding: "52px 52px 52px 56px",
    maxWidth: 680,
    marginTop: 64,
    marginLeft: 48,
    background: "rgba(255,255,255,0.96)",
    border: "1px solid rgba(255,255,255,0.98)",
    borderLeft: `4px solid ${GREEN}`,
    boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
  },
  /* Eyebrow with horizontal line before it (via flexbox) */
  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: GREEN,
    marginBottom: 28,
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
  },
  heroH1: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(44px, 6vw, 86px)",
    fontWeight: 700,
    lineHeight: 1.04,
    color: "#141f16",
    marginBottom: 24,
  },
  heroSub: {
    fontSize: 18,
    color: "#6b876f",
    maxWidth: 500,
    marginBottom: 52,
    lineHeight: 1.8,
  },
  heroCtas: {
    display: "flex",
    gap: 14,
    alignItems: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: GREEN,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "16px 36px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 700,
    transition: "background 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  btnSecondary: {
    color: "#6b876f",
    fontSize: 13,
    letterSpacing: "0.08em",
    textDecoration: "none",
    borderBottom: `1px solid rgba(42,110,58,0.25)`,
    paddingBottom: 2,
    transition: "color 0.2s, border-color 0.2s",
    cursor: "pointer",
  },
  /* Alert badge: blinking red dot */
  alertBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(42,110,58,0.08)",
    border: "1px solid rgba(42,110,58,0.30)",
    padding: "8px 16px",
    marginBottom: 32,
  },
  alertDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#c0392b",
    flexShrink: 0,
    animation: "bunkerBlink 1.8s infinite",
  },
  alertText: {
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#3d5c42",
    fontWeight: 500,
  },
  heroStats: {
    position: "absolute",
    right: 60,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 3,
    background: "rgba(255,255,255,0.96)",
    border: "1px solid rgba(255,255,255,0.98)",
    borderTop: `4px solid ${GREEN}`,
    boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  heroStatItem: {
    textAlign: "center",
  },
  heroStatVal: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 42,
    fontWeight: 700,
    color: GREEN,
    lineHeight: 1,
  },
  heroStatLabel: {
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#6b876f",
    marginTop: 4,
  },
  heroStatDivider: {
    height: 1,
    background: "rgba(42,110,58,0.15)",
    margin: "18px 0",
  },
  section: {
    padding: "100px 64px",
    background: "#fff",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  leftH2: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 700,
    lineHeight: 1.1,
    color: "#141f16",
    marginBottom: 16,
    marginTop: 8,
  },
  leftSub: {
    fontSize: 17,
    color: "#6b876f",
    maxWidth: 560,
    lineHeight: 1.75,
    fontWeight: 300,
    marginBottom: 48,
  },
  tiersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
    background: GREEN_BORDER,
  },
  tierCard: {
    background: "#fff",
    padding: "40px 36px",
    display: "flex",
    flexDirection: "column",
    borderTop: `4px solid transparent`,
  },
  tierCardFeatured: {
    borderTop: `4px solid ${GREEN}`,
    background: "#f4f8f5",
  },
  tierBadge: {
    display: "inline-block",
    fontSize: 10,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 700,
    padding: "5px 12px",
    marginBottom: 20,
    background: GREEN_DIM,
    color: GREEN,
    border: `1px solid ${GREEN_BORDER}`,
    alignSelf: "flex-start",
  },
  tierName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 28,
    fontWeight: 700,
    color: "#141f16",
    marginBottom: 6,
  },
  tierTagline: {
    fontSize: 14,
    color: "#6b876f",
    marginBottom: 28,
    lineHeight: 1.5,
  },
  tierPrice: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 44,
    fontWeight: 700,
    color: GREEN,
    lineHeight: 1,
    marginBottom: 4,
  },
  tierMeta: {
    fontSize: 12,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6b876f",
    marginBottom: 28,
  },
  tierSpecs: {
    listStyle: "none",
    marginBottom: 32,
    flex: 1,
  },
  tierSpecItem: {
    fontSize: 14,
    color: "#3d5c42",
    padding: "8px 0",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
  },
  specLabelRow: {
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: "#9aafa0",
    padding: "13px 14px",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    lineHeight: 1.5,
    background: "#fff",
  },
  specBadge: {
    fontSize: 9,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: GREEN,
    background: GREEN_DIM,
    border: `1px solid ${GREEN_BORDER}`,
    padding: "3px 8px",
    marginBottom: 7,
    alignSelf: "flex-start",
    display: "inline-block",
  },
  tierCta: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "11px 14px",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    textDecoration: "none",
    background: GREEN,
    color: "#fff",
    transition: "background 0.2s",
  },
  tierCtaVault: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "11px 14px",
    fontSize: 11,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    textDecoration: "none",
    border: "1.5px solid #C9A54E",
    color: "#C9A54E",
    transition: "background 0.2s",
  },
  videoSection: {
    position: "relative",
    minHeight: "72vh",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
    background: "#060a07",
  },
  videoBg: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.68,
  },
  videoOverlay: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    /* Left + right edge fade hides compression artefacts; bottom-heavy gradient provides text contrast */
    background: [
      "linear-gradient(to right,  rgba(6,10,7,0.82) 0%, rgba(6,10,7,0.05) 30%, rgba(6,10,7,0.05) 70%, rgba(6,10,7,0.82) 100%)",
      "linear-gradient(to bottom, rgba(6,10,7,0.15) 0%, transparent 25%, rgba(6,10,7,0.92) 100%)",
    ].join(", "),
  },
  videoContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 64px 60px",
    width: "100%",
    boxSizing: "border-box",
  },
  videoH2: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(38px, 5.5vw, 76px)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.05,
    marginTop: 10,
  },
  videoCaption: {
    position: "absolute",
    bottom: 24,
    right: 48,
    zIndex: 3,
    fontSize: 9,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 600,
    color: "rgba(255,255,255,0.28)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 680,
  },
  th: {
    padding: "14px 20px",
    textAlign: "left",
    background: GREEN,
    color: "#fff",
    fontSize: 12,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  td: {
    padding: "13px 20px",
    fontSize: 14,
    color: "#3d5c42",
    borderBottom: `1px solid ${GREEN_BORDER}`,
  },
  tdLabel: {
    padding: "13px 20px",
    fontSize: 13,
    color: "#3d5c42",
    fontWeight: 600,
    borderBottom: `1px solid ${GREEN_BORDER}`,
    background: "rgba(26,74,38,0.03)",
  },
  tdFeatured: {
    background: "rgba(26,74,38,0.05)",
    fontWeight: 500,
  },
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 1,
    background: GREEN_BORDER,
  },
  step: {
    background: "#fff",
    padding: "36px 28px",
  },
  stepNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 52,
    fontWeight: 700,
    color: GREEN_BORDER,
    lineHeight: 1,
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: "#141f16",
    marginBottom: 10,
  },
  stepDesc: {
    fontSize: 14,
    color: "#6b876f",
    lineHeight: 1.7,
  },
  credGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 56,
    alignItems: "start",
  },
  credPhotos: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
  },
  credPhotoFull: {
    aspectRatio: "16 / 9",
    overflow: "hidden",
    border: `1px solid ${GREEN_BORDER}`,
  },
  credPhoto: {
    aspectRatio: "4 / 3",
    overflow: "hidden",
    border: `1px solid ${GREEN_BORDER}`,
  },
  /* ── INFO STRIP ── */
  infoStrip: {
    background: "#eaf1ec",
    borderTop: `1px solid ${GREEN_BORDER}`,
    borderBottom: `1px solid ${GREEN_BORDER}`,
    padding: "13px 48px",
  },
  infoStripInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  infoItem: {
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: "0.04em",
    color: "#3d5c42",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  infoDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: GREEN,
    flexShrink: 0,
    animation: "pulse 2s infinite",
  },
  infoSep: {
    width: 1,
    height: 14,
    background: GREEN_BORDER,
    flexShrink: 0,
  },

  /* ── SITUATION ── */
  situation: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1.2fr",
    minHeight: 500,
    background: "#fff",
  },
  sitImg: {
    position: "relative",
    overflow: "hidden",
  },
  sitLabel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#fff",
    fontWeight: 700,
    background: "rgba(26,74,38,0.92)",
    padding: "10px 16px",
    borderTop: `2px solid ${GREEN}`,
    zIndex: 5,
  },
  sitText: {
    padding: "64px 52px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "#fff",
  },
  sitQuote: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 21,
    fontStyle: "italic",
    color: "#141f16",
    lineHeight: 1.6,
    borderLeft: `3px solid ${GREEN}`,
    paddingLeft: 22,
    marginBottom: 28,
  },
  sitP: {
    fontSize: 15,
    color: "#6b876f",
    lineHeight: 1.85,
    marginBottom: 14,
  },

  /* ── WHAT WE BUILD ── */
  whatWeBuild: {
    padding: "100px 0",
    background: "#f4f8f5",
  },
  whatHeader: {
    maxWidth: 1200,
    margin: "0 auto 56px",
    padding: "0 64px",
  },
  whatLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 3,
    background: GREEN_BORDER,
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 64px",
  },
  whatImgWrap: {
    position: "relative",
    overflow: "hidden",
    minHeight: 480,
  },
  whatImgOverlay: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    background: "linear-gradient(to top, rgba(4,12,6,0.82) 0%, transparent 50%)",
  },
  whatImgCaption: {
    position: "absolute",
    bottom: 28,
    left: 28,
    right: 28,
    zIndex: 2,
  },
  whatImgTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 6,
  },
  whatFeatures: {
    background: "#fff",
    padding: "52px 48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  whatFeatureItem: {
    padding: "14px 0",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    fontSize: 14,
    color: "#3d5c42",
    lineHeight: 1.6,
  },
  whatNote: {
    fontSize: 12,
    color: "#6b876f",
    lineHeight: 1.7,
    borderLeft: `2px solid ${GREEN_BORDER}`,
    paddingLeft: 16,
    margin: 0,
  },

  /* ── CREDIBILITY MOSAIC ── */
  mosaicStats: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
  },
  mosaicStat: {
    background: "#fff",
    border: `1px solid ${GREEN_BORDER}`,
    padding: "20px 28px",
    flex: 1,
    minWidth: 100,
  },
  mosaicStatVal: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 40,
    fontWeight: 700,
    color: GREEN,
    lineHeight: 1,
    marginBottom: 4,
  },
  mosaicStatLabel: {
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#6b876f",
  },
  mosaicPhotos: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr",
    gap: 10,
    height: 480,
  },
  mosaicPhoto: {
    position: "relative",
    overflow: "hidden",
  },
  mosaicPhotoLabel: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: GREEN,
    background: "rgba(255,255,255,0.90)",
    padding: "4px 9px",
  },

  /* ── CTA + FORM ── */
  ctaSection: {
    position: "relative",
    overflow: "hidden",
    padding: "120px 80px",
  },
  ctaBg: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundImage: "url('/assets/images/1774299363277.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "grayscale(20%) brightness(0.25)",
  },
  ctaInner: {
    position: "relative",
    zIndex: 2,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 80,
    alignItems: "center",
    maxWidth: 1100,
    margin: "0 auto",
  },
  ctaH2: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(36px, 5vw, 62px)",
    fontWeight: 700,
    color: "#fff",
    lineHeight: 1.08,
    marginBottom: 20,
  },
  ctaP: {
    fontSize: 16,
    color: "#8aab90",
    lineHeight: 1.85,
    marginBottom: 30,
  },
  ctaCheck: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    fontSize: 14,
    color: "#c8daca",
  },
  ctaForm: {
    background: "rgba(255,255,255,0.96)",
    border: "1px solid rgba(42,110,58,0.2)",
    padding: 44,
    backdropFilter: "blur(20px)",
  },
  ctaFormH3: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 24,
    color: "#141f16",
    marginBottom: 6,
    fontWeight: 700,
  },
  ctaFormP: {
    fontSize: 13,
    color: "#6b876f",
    marginBottom: 28,
  },
  ctaSubmit: {
    width: "100%",
    background: GREEN,
    color: "#fff",
    border: "none",
    padding: 17,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontWeight: 700,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 4,
    boxSizing: "border-box",
  },
  ctaNote: {
    fontSize: 11,
    color: "#6b876f",
    textAlign: "center",
    marginTop: 12,
  },
};

const styles = {
  root: { fontFamily: "'DM Sans', sans-serif", color: "#141f16", overflowX: "hidden" },

  nav: {
    position: "fixed",
    top: 36,
    left: 0,
    right: 0,
    zIndex: 200,
    padding: "0 48px",
    minHeight: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
    background: "#fff",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    transition: "box-shadow 0.3s",
  },
  navBrandLink: {
    display: "flex",
    alignItems: "center",
    gap: 13,
    flex: 1,
    textDecoration: "none",
    color: "inherit",
  },
  navName: {
    fontSize: 14,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#141f16",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  navLinks: { display: "flex", gap: 32, alignItems: "center" },
  navLink: {
    fontSize: 16,
    color: "#3d5c42",
    textDecoration: "none",
    letterSpacing: "0.04em",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  navLinkActive: {
    color: GREEN,
    borderBottom: `2px solid ${GREEN}`,
    paddingBottom: 4,
  },
  navLinkVault: {
    color: "#c9a54e",
    background: "#0a0a0a",
    border: "1px solid rgba(201,165,78,0.5)",
    borderRadius: 2,
    padding: "5px 13px",
    fontSize: 13,
    letterSpacing: "0.08em",
  },
  mobileLinkVault: {
    color: "#c9a54e",
    background: "#0a0a0a",
    border: "1px solid rgba(201,165,78,0.45)",
    padding: "10px 14px",
    margin: "4px 0",
  },
  navCta: {
    background: GREEN,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "12px 24px",
    fontSize: 14,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 700,
    transition: "background 0.2s",
    whiteSpace: "nowrap",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textAlign: "center",
    boxSizing: "border-box",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: 5,
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  hamburgerLine: {
    width: 24,
    height: 2,
    background: "#141f16",
    transition: "transform 0.3s, opacity 0.3s",
    display: "block",
  },
  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "#fff",
    borderBottom: `2px solid ${GREEN}`,
    padding: "16px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  },
  mobileLink: {
    fontSize: 16,
    color: "#141f16",
    textDecoration: "none",
    padding: "10px 0",
    borderBottom: `1px solid ${GREEN_BORDER}`,
  },

  hero: {
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: 104,
  },
  heroBg: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    backgroundRepeat: "no-repeat",
  },
  heroOverlay: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    background: "linear-gradient(105deg, rgba(244,248,245,0.22) 0%, rgba(244,248,245,0.06) 50%, transparent 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    padding: "52px 52px 52px 56px",
    maxWidth: 640,
    margin: "64px 0 0 48px",
    background: "rgba(255,255,255,0.96)",
    borderLeft: `4px solid ${GREEN}`,
    boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: GREEN,
    marginBottom: 24,
    marginRight: 22,
  },
  eyebrowLine: { display: "inline-block", width: 28, height: 1, background: GREEN },
  alertBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: GREEN_DIM,
    border: `1px solid ${GREEN_BORDER}`,
    padding: "8px 16px",
    marginBottom: 28,
  },
  alertDot: { width: 7, height: 7, borderRadius: "50%", background: GREEN, animation: "pulse 2s infinite" },
  alertText: { fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3d5c42", fontWeight: 500 },
  heroH1: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(40px, 5.5vw, 80px)",
    fontWeight: 700,
    lineHeight: 1.06,
    color: "#141f16",
    marginBottom: 20,
  },
  heroEm: { fontStyle: "italic", color: GREEN, display: "block" },
  heroSub: { fontSize: 18, color: "#6b876f", maxWidth: 480, marginBottom: 44, lineHeight: 1.8, fontWeight: 300 },
  heroCtas: { display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" },
  heroStats: {
    position: "absolute",
    right: 60,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    zIndex: 3,
    background: "rgba(255,255,255,0.96)",
    borderTop: `4px solid ${GREEN}`,
    boxShadow: "0 8px 48px rgba(0,0,0,0.14)",
    padding: "28px 32px",
    gap: 0,
  },
  heroStatItem: { textAlign: "center", padding: "16px 0", borderBottom: `1px solid ${GREEN_BORDER}` },
  heroStatVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 700, color: GREEN, lineHeight: 1 },
  heroStatLabel: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6b876f", marginTop: 6 },

  btnPrimary: {
    background: GREEN,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "15px 32px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    transition: "background 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
  },
  btnPrimaryLink: {
    background: GREEN,
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "15px 32px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    transition: "background 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
  },
  btnSecondary: {
    color: "#6b876f",
    fontSize: 14,
    letterSpacing: "0.08em",
    textDecoration: "none",
    borderBottom: "1px solid rgba(26,74,38,0.3)",
    paddingBottom: 2,
    transition: "color 0.2s",
  },
  waBtn: {
    background: "#25d366",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "15px 32px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 700,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    transition: "background 0.2s",
  },

  section: { padding: "100px 64px", maxWidth: 1400, margin: "0 auto" },
  sectionHeader: { textAlign: "center", marginBottom: 60 },
  sectionEyebrow: { fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: GREEN, fontWeight: 600 },
  greenRule: { width: 36, height: 2, background: GREEN, margin: "12px auto 18px" },
  sectionH2: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(36px, 4vw, 56px)",
    fontWeight: 700,
    lineHeight: 1.12,
    textAlign: "center",
  },
  sectionSub: {
    fontSize: 17,
    color: "#6b876f",
    maxWidth: 520,
    margin: "16px auto 0",
    lineHeight: 1.8,
    fontWeight: 300,
    textAlign: "center",
  },

  pageHero: {
    padding: "168px 64px 72px",
    background: "#132017",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    position: "relative",
    overflow: "hidden",
  },
  pageHeroBg: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    transform: "scale(1.02)",
  },
  pageHeroOverlay: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    background: "linear-gradient(108deg, rgba(9,18,11,0.74) 0%, rgba(9,18,11,0.58) 42%, rgba(9,18,11,0.44) 100%)",
  },
  pageHeroInner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.4fr) minmax(300px, 0.9fr)",
    gap: 32,
    alignItems: "end",
    position: "relative",
    zIndex: 1,
  },
  pageHeroCopyCard: {
    background: "rgba(255,255,255,0.95)",
    borderLeft: `4px solid ${GREEN}`,
    boxShadow: "0 12px 48px rgba(8,18,11,0.22)",
    padding: "34px 36px 38px",
    backdropFilter: "blur(4px)",
  },
  pageHeroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(42px, 5vw, 72px)",
    fontWeight: 700,
    lineHeight: 1.06,
    margin: "0 0 18px",
    maxWidth: 720,
  },
  pageHeroSub: {
    fontSize: 18,
    color: "#6b876f",
    lineHeight: 1.8,
    fontWeight: 300,
    maxWidth: 620,
    margin: 0,
  },
  pageHeroActions: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 28,
  },
  pageHeroMeta: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 16,
  },
  pageHeroMetaCard: {
    background: "rgba(255,255,255,0.94)",
    borderLeft: `4px solid ${GREEN}`,
    padding: "22px 22px 20px",
    boxShadow: "0 12px 32px rgba(8,18,11,0.18)",
  },
  pageHeroMetaValue: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 36,
    lineHeight: 1,
    color: GREEN,
    fontWeight: 700,
    marginBottom: 8,
  },
  pageHeroMetaLabel: {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#3d5c42",
    fontWeight: 700,
    marginBottom: 8,
  },
  pageHeroMetaCopy: {
    fontSize: 15,
    color: "#6b876f",
    lineHeight: 1.65,
  },

  serviceHero: {
    padding: "168px 64px 72px",
    background: "#f4f8f5",
    borderBottom: `1px solid ${GREEN_BORDER}`,
  },
  serviceHeroInner: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
    gap: 36,
    alignItems: "center",
  },
  serviceHeroCopy: { minWidth: 0 },
  serviceHeroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(44px, 5.2vw, 76px)",
    lineHeight: 1.02,
    fontWeight: 700,
    margin: "0 0 12px",
  },
  serviceHeroSubtitle: {
    fontSize: 13,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: GREEN,
    fontWeight: 700,
    marginBottom: 16,
  },
  serviceHeroSub: {
    fontSize: 18,
    color: "#6b876f",
    lineHeight: 1.8,
    fontWeight: 300,
    maxWidth: 620,
    margin: 0,
  },
  serviceHeroTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 24,
  },
  serviceHeroTag: {
    background: "#fff",
    border: `1px solid ${GREEN_BORDER}`,
    color: "#3d5c42",
    fontSize: 11,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "8px 12px",
    fontWeight: 600,
  },
  serviceHeroMedia: {
    minWidth: 0,
    position: "relative",
  },
  serviceHeroImage: {
    width: "100%",
    aspectRatio: "4 / 4.2",
    objectFit: "cover",
    boxShadow: "0 14px 48px rgba(20,31,22,0.14)",
  },

  serviceDetailGrid: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.2fr) minmax(280px, 0.75fr)",
    gap: 28,
    alignItems: "start",
  },
  serviceOverviewCard: {
    background: "#fff",
    border: `1px solid ${GREEN_BORDER}`,
    borderLeft: `4px solid ${GREEN}`,
    padding: "32px 32px 30px",
  },
  serviceSectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(32px, 4vw, 48px)",
    lineHeight: 1.08,
    fontWeight: 700,
    margin: "0 0 18px",
  },
  serviceParagraphs: { display: "flex", flexDirection: "column", gap: 18 },
  serviceParagraph: {
    fontSize: 17,
    color: "#556d5b",
    lineHeight: 1.85,
    fontWeight: 300,
    margin: 0,
  },
  serviceSidebar: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },
  serviceSidebarCard: {
    background: "#fff",
    border: `1px solid ${GREEN_BORDER}`,
    padding: "24px 24px 22px",
  },
  serviceSidebarLabel: {
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: GREEN,
    fontWeight: 700,
    marginBottom: 10,
  },
  serviceSidebarTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 30,
    lineHeight: 1.1,
    fontWeight: 700,
    marginBottom: 10,
  },
  serviceSidebarText: {
    fontSize: 15,
    color: "#6b876f",
    lineHeight: 1.75,
    margin: "0 0 18px",
  },
  serviceListsGrid: {
    maxWidth: 1280,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 24,
  },
  serviceListCard: {
    background: "#fff",
    borderTop: `3px solid ${GREEN}`,
    padding: "30px 30px 26px",
    boxShadow: "0 8px 24px rgba(20,31,22,0.05)",
  },
  serviceListEyebrow: {
    fontSize: 12,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: GREEN,
    fontWeight: 700,
    marginBottom: 18,
  },
  serviceList: {
    listStyle: "disc",
    margin: 0,
    paddingLeft: 20,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  serviceListItem: {
    fontSize: 16,
    color: "#556d5b",
    lineHeight: 1.65,
    paddingLeft: 2,
  },

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
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
    padding: "20px 18px",
    minHeight: 124,
    background: "#fff",
    border: `1px solid ${GREEN_BORDER}`,
    borderLeft: `3px solid ${GREEN}`,
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s, transform 0.2s",
    gap: 8,
    fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none",
    color: "inherit",
  },
  servicesNavIndex: { fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#6b876f", fontWeight: 700 },
  servicesNavName: { fontSize: 18, fontWeight: 600, color: "#141f16", lineHeight: 1.25 },
  servicesNavSub: { fontSize: 12, color: "#6b876f", letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.4 },
  servicesNavCta: {
    display: "inline-block",
    color: GREEN,
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textDecoration: "none",
    borderBottom: `2px solid ${GREEN}`,
    paddingBottom: 3,
  },
  backToOverview: {
    display: "inline-block",
    color: "#6b876f",
    fontSize: 13,
    textDecoration: "none",
    letterSpacing: "0.06em",
    marginBottom: 20,
    transition: "color 0.2s",
    borderBottom: "1px solid rgba(107,135,111,0.3)",
    paddingBottom: 2,
  },

  homeServicesFooter: { textAlign: "center", marginTop: 40 },
  homeBunkerSection: {
    padding: "0 24px 56px",
    background: "#fff",
  },
  homeBunkerCard: {
    maxWidth: 1280,
    margin: "0 auto",
    background: "linear-gradient(120deg, #0d1710 0%, #122417 58%, #18321f 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 18px 40px rgba(8,18,11,0.18)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 36,
    padding: "36px 36px 34px",
    position: "relative",
    overflow: "hidden",
  },
  homeBunkerCopy: { maxWidth: 760 },
  homeBunkerBadge: {
    display: "inline-block",
    marginBottom: 16,
    padding: "7px 12px",
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#d6e6d7",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.04)",
  },
  homeBunkerEyebrow: {
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#d7eadb",
    fontWeight: 700,
  },
  homeBunkerTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(34px, 4vw, 52px)",
    lineHeight: 1.08,
    color: "#fff",
    margin: "0 0 16px",
    maxWidth: 780,
  },
  homeBunkerText: {
    margin: 0,
    fontSize: 17,
    lineHeight: 1.8,
    color: "rgba(255,255,255,0.72)",
    fontWeight: 300,
    maxWidth: 660,
  },
  homeBunkerActions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 14,
    minWidth: 220,
  },
  homeBunkerNote: {
    fontSize: 13,
    letterSpacing: "0.06em",
    color: "rgba(255,255,255,0.56)",
  },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 28 },
  serviceCard: {
    background: "#fff",
    border: `1px solid ${GREEN_BORDER}`,
    overflow: "hidden",
    transition: "box-shadow 0.3s, transform 0.3s",
    display: "flex",
    flexDirection: "column",
  },
  serviceCardHighlight: { border: `2px solid ${GREEN}` },
  serviceCardHover: { boxShadow: "0 16px 48px rgba(26,74,38,0.14)", transform: "translateY(-4px)" },
  highlightBadge: {
    background: GREEN,
    color: "#fff",
    fontSize: 10,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 700,
    padding: "6px 14px",
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  serviceImgWrap: { height: 200, overflow: "hidden", position: "relative", flexShrink: 0 },
  serviceImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" },
  serviceImgOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "linear-gradient(to top, rgba(26,74,38,0.15), transparent)" },
  serviceBody: { padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" },
  serviceSubtitle: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, marginBottom: 8, fontWeight: 600 },
  serviceTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 26,
    fontWeight: 700,
    color: "#141f16",
    marginBottom: 12,
    lineHeight: 1.2,
  },
  serviceDesc: { fontSize: 15, color: "#6b876f", lineHeight: 1.75, fontWeight: 300, flex: 1 },
  serviceTags: { display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16, marginBottom: 20 },
  serviceTag: { background: GREEN_DIM, color: "#3d5c42", fontSize: 11, letterSpacing: "0.08em", padding: "5px 11px", fontWeight: 500 },
  serviceBtn: {
    background: "none",
    border: `1px solid ${GREEN}`,
    color: GREEN,
    padding: "11px 22px",
    fontSize: 13,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
  serviceLinkBtn: {
    background: "none",
    border: `1px solid ${GREEN}`,
    color: GREEN,
    padding: "11px 22px",
    fontSize: 13,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 700,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    alignSelf: "flex-start",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },

  bunkerNote: {
    marginTop: 48,
    padding: "20px 28px",
    background: "#f4f8f5",
    border: `1px solid ${GREEN_BORDER}`,
    borderLeft: `4px solid ${GREEN}`,
    display: "block",
    fontSize: 15,
    color: "#3d5c42",
    lineHeight: 1.7,
  },
  bunkerLink: { color: GREEN, fontWeight: 700, textDecoration: "none" },

  spotlightSection: { background: "#111", position: "relative", padding: "100px 64px", overflow: "hidden" },
  spotlightBg: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    background: "radial-gradient(ellipse at 70% 50%, rgba(26,74,38,0.25) 0%, transparent 70%)",
    pointerEvents: "none",
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

  aboutInner: { display: "flex", gap: 80, alignItems: "center", maxWidth: 1280, margin: "0 auto" },
  aboutText: { flex: 1 },
  aboutDesc: { fontSize: 17, color: "#6b876f", lineHeight: 1.8, fontWeight: 300, marginBottom: 18 },
  aboutStats: { display: "grid", gridTemplateColumns: "repeat(2, minmax(180px, 1fr))", gap: 18, marginTop: 40, maxWidth: 560 },
  aboutStat: { textAlign: "center", padding: "24px 18px", background: "#f4f8f5", borderTop: `3px solid ${GREEN}`, width: "100%", boxSizing: "border-box" },
  aboutStatVal: { fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: GREEN, lineHeight: 1 },
  aboutStatLabel: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b876f", marginTop: 6 },
  aboutImages: { flex: 1, display: "grid", gridTemplateColumns: "1fr", gap: 16 },
  aboutImg: { width: "100%", aspectRatio: "4/3", objectFit: "cover" },

  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 1280, margin: "0 auto" },
  projectThumb: { position: "relative", overflow: "hidden", aspectRatio: "4/3", cursor: "pointer" },
  projectImg: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" },
  projectOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "rgba(26,74,38,0.7)", display: "flex", alignItems: "flex-end", padding: 16, transition: "opacity 0.3s" },
  projectLabel: { color: "#fff", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em" },

  contactSection: { background: "#0f1f12", position: "relative", overflow: "hidden" },
  contactPageSection: { paddingTop: 104 },
  contactBg: {
    position: "absolute",
    top: 0, right: 0, bottom: 0, left: 0,
    background: "radial-gradient(ellipse at 30% 50%, rgba(26,74,38,0.3) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  contactInner: { maxWidth: 1280, margin: "0 auto", padding: "100px 64px", display: "flex", gap: 80, alignItems: "flex-start" },
  contactText: { flex: 1 },
  contactDetails: { display: "flex", flexDirection: "column", gap: 16, marginTop: 32 },
  contactItem: { display: "flex", alignItems: "baseline", gap: 12, color: "rgba(255,255,255,0.8)", fontSize: 17, textDecoration: "none", lineHeight: 1.5 },
  contactItemLabel: { minWidth: 84, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.56)", fontWeight: 700, flexShrink: 0 },
  contactFormCard: { flex: 1, background: "#fff", padding: "40px", maxWidth: 480 },
  contactFormTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, color: "#141f16", marginBottom: 8 },
  contactFormSub: { fontSize: 15, color: "#6b876f", marginBottom: 24 },

  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 },
  input: {
    width: "100%",
    padding: "13px 16px",
    border: `1px solid ${GREEN_BORDER}`,
    background: "#f4f8f5",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    color: "#141f16",
    outline: "none",
    display: "block",
  },
  formNote: { fontSize: 13, color: "#6b876f", textAlign: "center" },

  modalOverlay: {
    position: "fixed",
    top: 0, right: 0, bottom: 0, left: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalBox: { background: "#fff", padding: "40px 36px", maxWidth: 480, width: "100%", position: "relative" },
  modalClose: { position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#6b876f" },
  modalEyebrow: { fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: GREEN, marginBottom: 8 },
  modalTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 700, marginBottom: 8 },
  modalService: { fontSize: 14, color: "#6b876f", marginBottom: 20, padding: "8px 14px", background: GREEN_DIM, display: "inline-block" },

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
    width: 46,
    height: 46,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(209,176,117,0.45)",
    color: "rgba(255,255,255,0.78)",
    textDecoration: "none",
    transition: "border-color 0.2s, color 0.2s, background 0.2s",
  },
  footerSocialBtnWa: { borderColor: "#23df71", color: "#23df71" },
  footerBottom: { maxWidth: 1280, margin: "0 auto", padding: "20px 0", display: "flex", justifyContent: "space-between", fontSize: 13, color: "rgba(255,255,255,0.3)" },

  waFloat: {
    position: "fixed",
    bottom: 16,
    right: 16,
    zIndex: 150,
    minHeight: 56,
    width: 188,
    maxWidth: "calc(100vw - 20px)",
    borderRadius: 0,
    background: "#25d366",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "0 14px",
    boxShadow: "0 8px 22px rgba(37,211,102,0.28)",
    textDecoration: "none",
  },
  waFloatText: { fontSize: 13, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1, fontFamily: "'DM Sans', sans-serif" },

  notFoundSection: {
    padding: "168px 24px 96px",
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundCard: {
    maxWidth: 760,
    width: "100%",
    background: "#f4f8f5",
    borderTop: `4px solid ${GREEN}`,
    padding: "44px 36px",
    textAlign: "center",
  },

  janGroupBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 201,
    height: 36,
    background: "#080f09",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  janGroupBarInner: {
    display: "flex",
    alignItems: "stretch",
    height: "100%",
  },
  janGroupBarTab: {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.36)",
    fontWeight: 500,
    textDecoration: "none",
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s",
    borderRight: "1px solid rgba(255,255,255,0.05)",
  },
  janGroupBarCurrent: {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.80)",
    fontWeight: 600,
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: "1px solid rgba(255,255,255,0.10)",
    margin: "6px 10px",
    background: "rgba(255,255,255,0.04)",
  },
  janGroupBarCurrentDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: "#5aad6e",
    flexShrink: 0,
  },

  mobileCta: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 8,
    paddingTop: 16,
    borderTop: `1px solid ${GREEN_BORDER}`,
  },
  mobileWaBtn: {
    background: "#25d366",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    padding: "13px 24px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    textDecoration: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  mobileJanGroup: {
    marginTop: 4,
    paddingTop: 16,
    borderTop: `1px solid ${GREEN_BORDER}`,
  },
  mobileJanGroupLabel: {
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#6b876f",
    fontWeight: 600,
    marginBottom: 4,
  },
  mobileJanBrandRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 0",
    borderBottom: `1px solid ${GREEN_BORDER}`,
    color: "inherit",
  },
  mobileJanBrandIconBox: {
    width: 32,
    height: 32,
    border: `1px solid ${GREEN_BORDER}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: GREEN,
    flexShrink: 0,
  },
  mobileJanBrandName: {
    fontSize: 14,
    color: "#141f16",
    fontWeight: 500,
    flex: 1,
  },
  mobileJanBrandTag: {
    fontSize: 10,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: GREEN,
    fontWeight: 700,
    border: `1px solid ${GREEN_BORDER}`,
    padding: "4px 8px",
  },

  janGroupSection: {
    background: "#07100a",
    padding: "60px 64px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  janGroupSectionInner: {
    maxWidth: 1280,
    margin: "0 auto",
  },
  janGroupSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 32,
    paddingBottom: 22,
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  janGroupSectionEyebrow: {
    fontSize: 11,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.38)",
    fontWeight: 600,
  },
  janGroupSectionTagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.02em",
    fontStyle: "italic",
  },
  janBrandsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 1,
    background: "rgba(255,255,255,0.05)",
  },
  janBrandCard: {
    background: "#07100a",
    padding: "32px 28px 28px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  janBrandCardCurrent: {
    background: "rgba(255,255,255,0.025)",
  },
  janBrandCurrentBadge: {
    position: "absolute",
    top: 18,
    right: 18,
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.4)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "5px 10px",
  },
  janBrandIconBox: {
    width: 48,
    height: 48,
    border: "1px solid rgba(255,255,255,0.10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 18,
    flexShrink: 0,
  },
  janBrandName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 600,
    color: "rgba(255,255,255,0.86)",
    marginBottom: 10,
    lineHeight: 1.2,
  },
  janBrandDesc: {
    fontSize: 14,
    color: "rgba(255,255,255,0.36)",
    lineHeight: 1.75,
    fontWeight: 300,
    margin: "0 0 22px",
    flex: 1,
  },
  janBrandVisit: {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.42)",
    textDecoration: "none",
    fontWeight: 600,
    transition: "color 0.2s",
    alignSelf: "flex-start",
  },
};
