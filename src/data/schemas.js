const BASE_URL = "https://alhadeeqacontracting.com";

export const ORG_ID = `${BASE_URL}/#organization`;

// ─── ORGANISATION (global) ────────────────────────────────────────────────────
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "HomeAndConstructionBusiness"],
  additionalType: "https://schema.org/GeneralContractor",
  "@id": ORG_ID,
  name: "Al Hadeeqa Contracting Co. L.L.C",
  legalName: "Al Hadeeqa Contracting Co. L.L.C",
  alternateName: ["Al Hadeeqa Contracting", "Al Hadeeqa Construction"],
  url: BASE_URL,
  logo: `${BASE_URL}/logo.jpeg`,
  image: `${BASE_URL}/assets/images/bunker-bg.jpeg`,
  description:
    "Al Hadeeqa Contracting is a Dubai-based construction company specialising in pergolas, carports, dewatering, underground bunkers, boundary walls, and general contracting. Established in 2009, ISO 9001 and ISO 14001 certified, with 50+ crew and 15+ years of experience across UAE residential and commercial projects.",
  foundingDate: "2009",
  founder: {
    "@type": "Person",
    name: "Engr. Muhammad Ashraf Jan",
    jobTitle: "Founder & Managing Director",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office 404, PTC Building, Al Qusais Industrial First",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "234305",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "25.2760",
    longitude: "55.3862",
  },
  telephone: "+97142632371",
  email: "alhadeeqallc@gmail.com",
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "City", name: "Abu Dhabi" },
    { "@type": "City", name: "Sharjah" },
    { "@type": "City", name: "Ajman" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ISO 9001:2015 (Quality Management)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ISO 14001:2015 (Environmental Management)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "OHSAS 18001:2007 (Health & Safety)",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "ASCB(E) Accredited",
    },
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Dubai Economy (DED) License",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 50,
  },
  sameAs: [
    "https://www.instagram.com/alhadeeqallc/",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+971544419854",
      contactType: "sales",
      availableLanguage: ["English", "Arabic", "Urdu"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+971504824621",
      contactType: "customer service",
      availableLanguage: ["English", "Arabic", "Urdu"],
    },
  ],
};

// ─── BREADCRUMB HELPER ────────────────────────────────────────────────────────
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── SERVICE SCHEMAS ──────────────────────────────────────────────────────────
export function serviceSchema({ serviceType, name, description, serviceUrl, catalog = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    name,
    description,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      "@id": ORG_ID,
    },
    areaServed: { "@type": "City", name: "Dubai" },
    url: serviceUrl,
    hasOfferCatalog:
      catalog.length > 0
        ? {
            "@type": "OfferCatalog",
            name,
            itemListElement: catalog.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          }
        : undefined,
  };
}

// ─── SERVICE-SPECIFIC SCHEMAS ─────────────────────────────────────────────────
export const pergolaServiceSchema = serviceSchema({
  serviceType: "Pergola Construction",
  name: "Custom Pergola Design & Construction in Dubai",
  description:
    "Al Hadeeqa Contracting designs and builds custom pergolas across Dubai and the UAE. Materials include steel, aluminium, and timber. Projects range from residential garden pergolas to commercial outdoor shade structures. Average timeline is 2–4 weeks from design to handover.",
  serviceUrl: `${BASE_URL}/services/pergolas`,
  catalog: [
    "Residential Garden Pergolas",
    "Commercial Shade Structures",
    "Motorised Louvre Pergolas",
    "Timber Pergolas",
    "Steel & Aluminium Pergolas",
  ],
});

export const carportServiceSchema = serviceSchema({
  serviceType: "Carport Construction",
  name: "Premium Carport Construction in Dubai",
  description:
    "Al Hadeeqa Contracting builds premium steel and aluminium carports across Dubai. Custom footprints for 1 to 6+ vehicles, UV-resistant roofing, and 10-year warranty. Suitable for luxury villas and commercial properties.",
  serviceUrl: `${BASE_URL}/services/carports`,
  catalog: [
    "Residential Villa Carports",
    "Multi-Vehicle Carports",
    "Solar-Ready Carport Structures",
    "Aluminium Carports",
    "Steel Carports",
  ],
});

export const dewateringServiceSchema = serviceSchema({
  serviceType: "Dewatering Services",
  name: "Construction Dewatering Services in Dubai & UAE",
  description:
    "Al Hadeeqa Contracting provides professional dewatering services for construction sites across Dubai and the UAE. Services include wellpoint systems, deepwell dewatering, and sump pumping for basements, foundations, and deep excavations.",
  serviceUrl: `${BASE_URL}/services/dewatering`,
  catalog: [
    "Wellpoint Dewatering Systems",
    "Deepwell Dewatering",
    "Sump Pumping",
    "Groundwater Management",
    "Basement Dewatering",
  ],
});

export const constructionServiceSchema = serviceSchema({
  serviceType: "General Contracting",
  name: "Construction & Remodeling in Dubai | Al Hadeeqa Contracting",
  description:
    "Al Hadeeqa Contracting delivers full-scope residential and commercial construction in Dubai. Services include villa extensions, interior fit-outs, remodeling, and complete build projects. 15+ years experience, ISO certified, 50+ crew.",
  serviceUrl: `${BASE_URL}/services/construction`,
  catalog: [
    "Villa Construction & Extensions",
    "Commercial Fit-Out",
    "Interior Remodeling",
    "Structural Works",
  ],
});

// ─── WEBSITE SCHEMA ───────────────────────────────────────────────────────────
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Al Hadeeqa Contracting",
  url: BASE_URL,
  publisher: { "@id": ORG_ID },
};

// ─── ADDITIONAL SERVICE SCHEMAS ───────────────────────────────────────────────
export const shoringServiceSchema = serviceSchema({
  serviceType: "Shoring & Excavation Support",
  name: "Shoring Services in Dubai | Al Hadeeqa Contracting",
  description:
    "Al Hadeeqa Contracting provides excavation shoring services for residential and commercial construction in Dubai. Services include sheet piling, soldier piles, and trench boxes coordinated with dewatering and excavation packages.",
  serviceUrl: `${BASE_URL}/services/shoring`,
  catalog: [
    "Sheet Piling",
    "Soldier Piles & Timber Lagging",
    "Trench Boxes",
    "Basement Shoring",
    "Coordinated Dewatering & Shoring Packages",
  ],
});

export const excavationServiceSchema = serviceSchema({
  serviceType: "Excavation Services",
  name: "Excavation Services in Dubai | Al Hadeeqa Contracting",
  description:
    "Al Hadeeqa Contracting provides residential and commercial excavation services in Dubai including foundation excavation, basement digging, utility trenching, swimming pool excavation, and general earthworks. Coordinated with shoring and dewatering where required.",
  serviceUrl: `${BASE_URL}/services/excavation`,
  catalog: [
    "Foundation & Basement Excavation",
    "Swimming Pool Excavation",
    "Utility Trenching",
    "Underground Shelter Installation",
    "Site Earthworks & Levelling",
  ],
});

export const demolitionServiceSchema = serviceSchema({
  serviceType: "Demolition Services",
  name: "Demolition Services in Dubai | Al Hadeeqa Contracting",
  description:
    "Al Hadeeqa Contracting provides licensed residential and commercial demolition in Dubai including full villa demolition, partial structural demolition, internal strip-out, and site clearance. Debris removal included. Dubai Municipality permits managed.",
  serviceUrl: `${BASE_URL}/services/demolition`,
  catalog: [
    "Full Villa Demolition",
    "Partial Structural Demolition",
    "Internal Strip-Out",
    "Debris Removal & Site Clearance",
    "Boundary Wall Demolition",
  ],
});

export const glassroomsServiceSchema = serviceSchema({
  serviceType: "Glass Room & Partition Installation",
  name: "Glass Rooms & Partitions in Dubai | Al Hadeeqa Contracting",
  description:
    "Al Hadeeqa Contracting builds glass rooms, frameless partitions, balustrades, and glass enclosures for villas and commercial properties in Dubai. Tempered heat-resistant glass. Design, supply, and installation included.",
  serviceUrl: `${BASE_URL}/services/glassrooms`,
  catalog: [
    "Villa Patio Glass Rooms",
    "Frameless Glass Partitions",
    "Office Glass Partitions",
    "Glass Balustrades & Railings",
    "Custom Glass Enclosures",
  ],
});

export const waterproofingServiceSchema = {
  ...serviceSchema({
    serviceType: "Waterproofing Services",
    name: "Waterproofing Dubai | Al Hadeeqa Contracting",
    description:
      "Al Hadeeqa Contracting provides construction-grade waterproofing for Dubai villas, basements, wet areas, and metal roofs. Systems include torch-applied bituminous membranes, liquid polyurethane coatings, crystalline waterproofing, and injection grouting. From AED 200/sqm. Up to 10-year warranty. Free site inspection. Established 2009, ISO 9001 certified.",
    serviceUrl: `${BASE_URL}/services/waterproofing`,
    catalog: [
      "Villa Flat Roof Waterproofing",
      "Basement & Below-Slab Waterproofing",
      "Bathroom & Wet Area Tanking",
      "Metal Roof & Warehouse Waterproofing",
    ],
  }),
  priceRange: "AED 200–800 per sqm",
  offers: [
    {
      "@type": "Offer",
      name: "Villa Flat Roof Waterproofing",
      description: "Torch-applied bituminous membrane or liquid polyurethane coating for flat roofs and terraces. UV-resistant topcoat. Joint and penetration detailing.",
      priceCurrency: "AED",
      priceSpecification: { "@type": "UnitPriceSpecification", price: "200", priceCurrency: "AED", unitText: "per sqm" },
      seller: { "@type": "Organization", "@id": ORG_ID },
    },
    {
      "@type": "Offer",
      name: "Basement & Below-Slab Waterproofing",
      description: "Crystalline waterproofing, external membranes, injection grouting, and negative-side coatings for basements and below-grade concrete.",
      priceCurrency: "AED",
      seller: { "@type": "Organization", "@id": ORG_ID },
    },
    {
      "@type": "Offer",
      name: "Bathroom & Wet Area Tanking",
      description: "Cementitious and flexible liquid membranes for bathrooms, kitchens, laundry rooms, and balconies. Before or after tile removal.",
      priceCurrency: "AED",
      seller: { "@type": "Organization", "@id": ORG_ID },
    },
    {
      "@type": "Offer",
      name: "Metal Roof & Warehouse Waterproofing",
      description: "Joint and screw sealing, rust treatment, and elastomeric coating systems for metal and industrial roofs.",
      priceCurrency: "AED",
      seller: { "@type": "Organization", "@id": ORG_ID },
    },
  ],
};

export const maintenanceServiceSchema = serviceSchema({
  serviceType: "Property Maintenance",
  name: "Property Maintenance Services in Dubai | Al Hadeeqa Contracting",
  description:
    "Al Hadeeqa Contracting provides planned and reactive property maintenance for villas and commercial buildings in Dubai. Services include painting, repairs, fixture replacement, waterproofing maintenance, and pergola upkeep. Annual maintenance contracts available.",
  serviceUrl: `${BASE_URL}/services/maintenance`,
  catalog: [
    "Villa Painting (Interior & Exterior)",
    "General Repairs & Handyman Services",
    "Waterproofing Maintenance",
    "Pergola & Carport Servicing",
    "Annual Maintenance Contracts",
  ],
});

// ─── BUNKER PRODUCT SCHEMAS ───────────────────────────────────────────────────
export const emergencyPodSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Emergency Pod — Precast Underground Shelter Dubai",
  description:
    "The Emergency Pod is a precast reinforced concrete underground shelter for 2–4 people, starting at AED 100,000. Manufactured at Al Hadeeqa's Ajman facility in 5–7 days and installed on your Dubai property in 1–2 days by crane. Internal dimensions: 2.5m × 3.0m × 2.0m (7.5 sqm). Includes steel hatch, ventilation, water storage, chemical toilet, and emergency supplies.",
  brand: {
    "@type": "Brand",
    name: "Al Hadeeqa Contracting",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "100000",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/bunkers/emergency-pod`,
    seller: { "@type": "Organization", "@id": ORG_ID },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Internal Area", value: "7–8 sqm" },
    { "@type": "PropertyValue", name: "Capacity", value: "2–4 people" },
    { "@type": "PropertyValue", name: "Construction Type", value: "Precast reinforced concrete" },
    { "@type": "PropertyValue", name: "Manufacturing Time", value: "5–7 days" },
    { "@type": "PropertyValue", name: "Installation Time", value: "1–2 days" },
    { "@type": "PropertyValue", name: "Depth", value: "2.5–3.0m below grade" },
    { "@type": "PropertyValue", name: "Wall Thickness", value: "220mm reinforced concrete" },
    { "@type": "PropertyValue", name: "Autonomy", value: "12–24 hours" },
    { "@type": "PropertyValue", name: "Entry", value: "Top steel hatch" },
    { "@type": "PropertyValue", name: "Location", value: "Dubai, UAE" },
  ],
};

export const compactShelterSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Compact Shelter — Precast Underground Shelter Dubai",
  description:
    "The Compact Shelter is a precast reinforced concrete underground shelter for 6–8 people, starting at AED 200,000. Manufactured at Al Hadeeqa's Ajman facility and installed in 2–3 days. 15–20 sqm internal space, 250mm reinforced concrete walls, HEPA air filtration included.",
  brand: {
    "@type": "Brand",
    name: "Al Hadeeqa Contracting",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "200000",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/bunkers/compact-shelter`,
    seller: { "@type": "Organization", "@id": ORG_ID },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Internal Area", value: "15–20 sqm" },
    { "@type": "PropertyValue", name: "Capacity", value: "6–8 people" },
    { "@type": "PropertyValue", name: "Construction Type", value: "Precast reinforced concrete" },
    { "@type": "PropertyValue", name: "Manufacturing Time", value: "7–10 days" },
    { "@type": "PropertyValue", name: "Installation Time", value: "2–3 days" },
    { "@type": "PropertyValue", name: "Depth", value: "3.0–3.5m below grade" },
    { "@type": "PropertyValue", name: "Wall Thickness", value: "250mm reinforced concrete" },
    { "@type": "PropertyValue", name: "Autonomy", value: "1–3 days" },
    { "@type": "PropertyValue", name: "Air Filtration", value: "HEPA filtration system included" },
    { "@type": "PropertyValue", name: "Entry", value: "Top steel hatch" },
  ],
};

export const shelterSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Shelter — Poured-in-Place Underground Shelter Dubai",
  description:
    "The Shelter is a poured-in-place reinforced concrete underground shelter for 8–15 people, from AED 500,000. Built on-site in 4–6 weeks. 25–35 sqm internal space, 300–400mm concrete walls, blast door, full bathroom, kitchen, HEPA filtration, and independent power.",
  brand: {
    "@type": "Brand",
    name: "Al Hadeeqa Contracting",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "500000",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/bunkers/shelter`,
    seller: { "@type": "Organization", "@id": ORG_ID },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Internal Area", value: "25–35 sqm" },
    { "@type": "PropertyValue", name: "Capacity", value: "8–15 people" },
    { "@type": "PropertyValue", name: "Construction Type", value: "Poured-in-place reinforced concrete" },
    { "@type": "PropertyValue", name: "Construction Time", value: "4–6 weeks on-site" },
    { "@type": "PropertyValue", name: "Depth", value: "3.0–4.0m below grade" },
    { "@type": "PropertyValue", name: "Wall Thickness", value: "300–400mm reinforced concrete" },
    { "@type": "PropertyValue", name: "Autonomy", value: "1–3 days" },
    { "@type": "PropertyValue", name: "Entry", value: "Ladder access / blast door" },
    { "@type": "PropertyValue", name: "Air Filtration", value: "HEPA filtration system" },
    { "@type": "PropertyValue", name: "Bathroom", value: "Full bathroom included" },
  ],
};

export const vaultProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "The Vault — Underground Luxury Residence Dubai",
  description:
    "The Vault is an underground luxury residence by Al Hadeeqa Contracting in Dubai. Starting from AED 5,000,000. 300–500+ sqm of underground living space combining bunker-grade reinforced concrete construction (500mm walls) with luxury finishes. Features include underground garage with car ramp, home cinema, gym, lounge bar, bedrooms, and full kitchen. Each Vault is custom designed.",
  brand: {
    "@type": "Brand",
    name: "Al Hadeeqa Contracting",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "AED",
    price: "5000000",
    priceValidUntil: "2026-12-31",
    availability: "https://schema.org/InStock",
    url: `${BASE_URL}/the-vault`,
    seller: { "@type": "Organization", "@id": ORG_ID },
  },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Internal Area", value: "300–500+ sqm" },
    { "@type": "PropertyValue", name: "Capacity", value: "15–30 people" },
    { "@type": "PropertyValue", name: "Construction Type", value: "Poured-in-place reinforced concrete" },
    { "@type": "PropertyValue", name: "Depth", value: "5–6m below grade" },
    { "@type": "PropertyValue", name: "Wall Thickness", value: "500mm reinforced concrete" },
    { "@type": "PropertyValue", name: "Entry", value: "Car ramp with underground garage" },
    { "@type": "PropertyValue", name: "Features", value: "Garage, cinema, gym, lounge, bedrooms, kitchen" },
    { "@type": "PropertyValue", name: "Category", value: "Luxury Underground Construction" },
  ],
};

// ─── FAQ SCHEMA HELPER ────────────────────────────────────────────────────────
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ─── ARTICLE SCHEMA HELPER ────────────────────────────────────────────────────
export function articleSchema({ headline, description, url, datePublished = "2026-03-25", keywords, about, mentions }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: { "@type": "Organization", "@id": ORG_ID },
    publisher: { "@type": "Organization", "@id": ORG_ID },
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: url,
    ...(keywords ? { keywords } : {}),
    ...(about ? { about } : {}),
    ...(mentions ? { mentions } : {}),
  };
}
