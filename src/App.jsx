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
  breadcrumbSchema,
  pergolaServiceSchema,
  carportServiceSchema,
  dewateringServiceSchema,
  constructionServiceSchema,
  faqSchema,
  serviceSchema,
} from "./data/schemas";
import {
  pergolaFAQs,
  carportFAQs,
  dewateringFAQs,
  generalFAQs,
} from "./data/faqs";
import FAQPage from "./pages/FAQPage";

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
  { val: "35+", label: "Years in UAE" },
  { val: "500+", label: "Projects Completed" },
  { val: "10yr", label: "Warranty on Select Works" },
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

  if (normalizedPath === "/bunker") {
    return { type: "bunker", pathname: normalizedPath };
  }

  if (normalizedPath === "/vault") {
    return { type: "vault", pathname: normalizedPath };
  }

  if (normalizedPath === "/faq") {
    return { type: "faq", pathname: normalizedPath };
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
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Bunkers", href: "/bunker" },
    { label: "The Vault", href: "/vault", vault: true },
    { label: "Contact", href: "/contact" },
  ];

  const VAULT_LINK = { label: "The Vault", href: "/vault", vault: true };

  if (route.type === "services") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "#services-list", active: true },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunker" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "service") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services", active: true },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunker" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "about") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about", active: true },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunker" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "projects") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects", active: true },
      { label: "Bunkers", href: "/bunker" },
      VAULT_LINK,
      { label: "Contact", href: "/contact" },
    ];
  } else if (route.type === "contact") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunker" },
      VAULT_LINK,
      { label: "Contact", href: "/contact", active: true },
    ];
  } else if (route.type === "not-found") {
    navLinks = [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Bunkers", href: "/bunker" },
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
          <div key={stat.label} style={styles.heroStatItem} className="hero-stat-item">
            <div style={styles.heroStatVal}>{stat.val}</div>
            <div style={styles.heroStatLabel}>{stat.label}</div>
          </div>
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
        <a href={getServiceHref(service.id)} style={styles.serviceLinkBtn}>Learn More →</a>
      </div>
    </div>
  );
}

function HomeServicesPreview() {
  const [ref, inView] = useInView();
  const featuredServices = ["construction", "shoring", "excavation", "carports"]
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
            Al Hadeeqa has spent 35 years building across the UAE — from enabling works and specialist site packages to luxury pergolas, fit-outs, glass, waterproofing, and maintenance.
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
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
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
          <a href="/bunker" style={styles.btnPrimaryLink}>Explore Our Solutions</a>
          <div style={styles.homeBunkerNote}>Available by consultation only.</div>
        </div>
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
            35 years in the UAE, a fully licensed in-house crew, and a track record that spans residential villas, commercial fit-outs, and complex enabling works — all under one contractor.
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
          <a href="/bunker" style={styles.bunkerLink}>Learn more →</a>
        </div>
      </div>
    </section>
  );
}

const SERVICE_FAQS = {
  pergolas: pergolaFAQs,
  carports: carportFAQs,
  dewatering: dewateringFAQs,
};

const SERVICE_SCHEMAS = {
  pergolas: pergolaServiceSchema,
  carports: carportServiceSchema,
  dewatering: dewateringServiceSchema,
  construction: constructionServiceSchema,
};

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

  usePageMeta({
    title: `${service.title} in Dubai | Al Hadeeqa Contracting — ${service.subtitle}`,
    description: `${service.heroDescription} Al Hadeeqa Contracting — established 2009, ISO 9001 certified, 50+ crew, 15+ years experience in Dubai. Free site assessment.`,
    canonical: serviceUrl,
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
            Al Hadeeqa Contracting, Dewatering, Aluminum & Glass LLC has been building across the UAE for 35 years. We are a fully licensed contractor serving Dubai with a team that has seen and solved every site condition the city can throw at a project.
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

function Contact({ pageOffset = false }) {
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
              <a key={service.id} href={getServiceHref(service.id)} style={styles.footerLink}>{service.title}</a>
            ))}
          </div>
          <div style={styles.footerLinkGroup}>
            <div style={styles.footerLinkHead}>Contact</div>
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noreferrer" style={styles.footerLink}>{CONTACT_PHONE_DISPLAY}</a>
            <a href={CONTACT_TEL_URL} style={styles.footerLink}>{CONTACT_PHONE_DISPLAY}</a>
            <a href="mailto:alhadeeqallc@gmail.com" style={styles.footerLink}>alhadeeqallc@gmail.com</a>
            <div style={{ ...styles.footerLink, cursor: "default" }}>Downtown Dubai, UAE 23435</div>
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
            <a href="/bunker" style={styles.footerLink}>Underground Shelters</a>
            <a href="/faq" style={styles.footerLink}>FAQs</a>
            <a href="/vault" style={{ ...styles.footerLink, color: "#c9a54e" }}>The Vault ↗</a>
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
  usePageMeta({
    title: "Al Hadeeqa Contracting — Construction, Pergolas, Carports & Underground Shelters in Dubai",
    description:
      "Al Hadeeqa Contracting: Dubai's trusted construction company since 2009. Pergolas, carports, dewatering, excavation, underground shelters from AED 100,000, and The Vault luxury underground residence. ISO 9001 certified. 50+ crew. Free site assessment.",
    canonical: "https://alhadeeqacontracting.com/",
    schemas: [
      organizationSchema,
      breadcrumbSchema([{ name: "Al Hadeeqa Contracting", url: "https://alhadeeqacontracting.com" }]),
    ],
  });
  return (
    <>
      <Hero onContact={onContact} />
      <HomeServicesPreview />
      <HomeBunkerPreview />
      <HomeAboutPreview />
      <HomeProjectsPreview />
      <Contact />
    </>
  );
}

function ServicesPage({ onContact }) {
  usePageMeta({
    title: "Construction Services in Dubai | Al Hadeeqa Contracting — Pergolas, Carports, Dewatering & More",
    description:
      "Al Hadeeqa Contracting offers pergola construction, carports, dewatering, excavation, shoring, demolition, glass rooms, waterproofing, and maintenance in Dubai. ISO certified. 15+ years experience. Free site assessment.",
    canonical: "https://alhadeeqacontracting.com/services",
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
      <ServicesPageHero onContact={onContact} />
      <ServicesQuickNav />
      <ServicesPageSection />
      <LuxurySpotlight onContact={onContact} />
      <Contact />
    </>
  );
}

function AboutPage({ onContact }) {
  usePageMeta({
    title: "About Al Hadeeqa Contracting | Dubai Construction Company Since 2009 | ISO Certified",
    description:
      "Al Hadeeqa Contracting Co. L.L.C — founded 2009 by Engr. Muhammad Ashraf Jan. Dubai Municipality licensed, ISO 9001:2015 & 14001:2015 certified. 50+ crew, 500+ projects completed across UAE. Pergolas, carports, dewatering, underground shelters.",
    canonical: "https://alhadeeqacontracting.com/about",
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
      <AboutPageHero onContact={onContact} />
      <About />
      <Contact />
    </>
  );
}

function ProjectsPage({ onContact }) {
  return (
    <>
      <ProjectsPageHero onContact={onContact} />
      <Projects />
      <Contact />
    </>
  );
}

function ContactPage() {
  return (
    <>
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
      document.title = `${route.service.title} | Al Hadeeqa Contracting`;
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

    if (route.type === "vault") {
      document.title = "The Vault — Underground Luxury Residence | Al Hadeeqa Contracting";
      return;
    }

    if (route.type === "faq") {
      document.title = "Frequently Asked Questions | Al Hadeeqa Contracting";
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
  } else if (route.type === "vault") {
    page = <StaticPageRedirect to="/vault.html" />;
  } else if (route.type === "faq") {
    page = <FAQPage />;
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
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/assets/images/bunker-full.png')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        {/* Subtle light overlay */}
        <div style={{
          display: "block",
          position: "absolute",
          inset: 0,
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
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    opacity: 0.68,
  },
  videoOverlay: {
    position: "absolute",
    inset: 0,
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
    inset: 0,
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
    inset: 0,
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
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
    backgroundRepeat: "no-repeat",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
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
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    transform: "scale(1.02)",
  },
  pageHeroOverlay: {
    position: "absolute",
    inset: 0,
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
  serviceImgOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,74,38,0.15), transparent)" },
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
    inset: 0,
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
  projectOverlay: { position: "absolute", inset: 0, background: "rgba(26,74,38,0.7)", display: "flex", alignItems: "flex-end", padding: 16, transition: "opacity 0.3s" },
  projectLabel: { color: "#fff", fontSize: 15, fontWeight: 500, letterSpacing: "0.04em" },

  contactSection: { background: "#0f1f12", position: "relative", overflow: "hidden" },
  contactPageSection: { paddingTop: 104 },
  contactBg: {
    position: "absolute",
    inset: 0,
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
    inset: 0,
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
