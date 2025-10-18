// Centralized mock data and brand config for OSHSOME Consultancy (frontend-only)
// Note: Colors and fonts are placeholders derived from brand proposal descriptions.
// Replace with exact hex codes and font families once provided.

export const brand = {
  name: "OSHSOME Consultancy",
  legalName: "OSHSOME Resiliency Training Consultancy Service",
  colors: {
    // Safety Green (approx rich emerald) – replace with exact brand hex when available
    primary: "#1B8E6B",
    // Slate Gray (professional neutral)
    slate: "#2F3B45",
    // Gold Accent (prestige)
    gold: "#C9A227",
    // Base neutrals
    white: "#FFFFFF",
    ink: "#0F172A",
    muted: "#F3F4F6",
  },
  fonts: {
    heading: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
    body: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
  },
  contact: {
    email: "oshsome2025@gmail.com",
    phone: "(02) 7116-1132",
    address:
      "Unit 1503, South Tower, AMAIA Skies Sta. Mesa, V. Mapa St., Barangay 600, Sampaloc, NCR, City of Manila, First District, 1016",
    permit: {
      permitNo: "2025-000000000",
      eOR: "OR-2025-00000-A",
      dateIssued: "10/06/2025",
    },
  },
  hero: {
    headline: "Empowering Safer, Smarter, and More Resilient Workplaces.",
    sub: "Building a culture of safety and resilience through professional OSH training.",
    images: [
      // Selected for text-overlaid hero usage
      "https://images.unsplash.com/photo-1552879890-3a06dd3a06c2?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1662309376159-b95fb193d96b?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1659353588972-f3be41ae0834?auto=format&fit=crop&w=2000&q=80",
    ],
  },
};

export const valuePillars = [
  {
    title: "Safety",
    desc: "Protecting people with practical, standards-aligned training.",
    icon: "ShieldCheck",
  },
  {
    title: "Resilience",
    desc: "Strengthening culture to anticipate, adapt, and recover.",
    icon: "Activity",
  },
  {
    title: "Compliance",
    desc: "Guided by DOLE-OSHC standards and global best practices.",
    icon: "FileCheck",
  },
];

export const modules = [
  {
    id: "wem",
    title: "Module 1: Work Environment Measurement (WEM)",
    blurb:
      "Certified industrial hygienists assess physical, chemical, and ventilation factors for compliance and well-being.",
    icon: "Wind",
    cta: "Explore Module 1",
    path: "/module/wem",
  },
  {
    id: "module2",
    title: "Module 2: Coming Soon",
    blurb: "Advanced OSH training module in development.",
    icon: "GraduationCap",
    cta: "Notify Me",
    path: "/services",
  },
  {
    id: "module3",
    title: "Module 3: Coming Soon",
    blurb: "Specialized training for evolving workplace needs.",
    icon: "Lightbulb",
    cta: "Notify Me",
    path: "/services",
  },
  {
    id: "custom",
    title: "Custom Training",
    blurb: "Tailored programs for your specific hazards and operations.",
    icon: "Sliders",
    cta: "Request Proposal",
    path: "/contact",
  },
];

export const trust = {
  badges: [
    { label: "DOLE OSHC", sub: "Accredited Consultancy" },
    { label: "Permits", sub: "Verified & Current" },
  ],
  metrics: [
    { label: "Trained Employees", value: 1200, suffix: "+" },
    { label: "Programs Delivered", value: 85, suffix: "+" },
    { label: "Avg. CSAT", value: 4.9, suffix: "/5" },
  ],
};

export const faqHome = [
  {
    q: "What industries do you serve?",
    a: "Manufacturing, offices, healthcare, retail, logistics, and more—programs adapt to your risk profile.",
  },
  {
    q: "Are trainings customizable?",
    a: "Yes. We tailor content, depth, and delivery to your needs, including on-site seminars.",
  },
  {
    q: "How fast can we start?",
    a: "Proposal typically within 24 hours after your request.",
  },
];

export const wemContent = {
  hero: {
    title: "Work Environment Measurement (WEM)",
    subtitle:
      "Optimizing Indoor Air Quality — a breath of fresh air for your employees.",
    cta: "Book a WEM Training Session",
  },
  definition:
    "Oshsome’s certified industrial hygienists assess physical and chemical hazards such as ventilation, airborne contaminants, illumination, and noise to ensure workplace compliance and employee well-being. DOLE-OSHC-ECD Accredited Consultancy Service.",
  scope: [
    {
      title: "CAT 1A – Physical Hazards",
      items:
        "Noise, illumination, temperature, humidity, ventilation, radiation, ergonomics",
      icon: "Activity",
    },
    {
      title: "CAT 1B – Chemical Hazards",
      items: "Dust, fumes, gases, vapors, solvents",
      icon: "FlaskConical",
    },
    {
      title: "CAT 1C – Ventilation",
      items: "Air movement, air change rates, local exhaust ventilation",
      icon: "Wind",
    },
    {
      title: "Optional – Biological Hazards",
      items: "Upon request",
      icon: "Biohazard",
    },
  ],
  benefits: [
    {
      title: "Enhanced Employee Well-Being",
      icon: "HeartPulse",
      desc: "Reduce exposure and improve comfort through targeted controls.",
    },
    {
      title: "Compliance Expertise",
      icon: "ShieldCheck",
      desc: "Align with Philippine OSHS and international standards.",
    },
    {
      title: "Proactive & Actionable",
      icon: "CheckCircle2",
      desc: "Prioritize hazards and plan corrective actions efficiently.",
    },
    {
      title: "Data-Driven Decisions",
      icon: "BarChart3",
      desc: "Collect, analyze, and act on measurements that matter.",
    },
  ],
  process: [
    "Submit Request (email / form)",
    "Ocular Visit & Assessment",
    "Proposal Sent within 24 hours",
    "Test Plan Preparation",
    "On-Site Awareness Seminar",
    "WEM Sampling & Discussion of Findings",
    "Laboratory & Data Analysis",
    "Certificate of Completion",
    "Client Access via QR Code Results",
  ],
  faq: [
    {
      q: "What is the process?",
      a: "We follow a 9-step sequence from request to certificate and QR-based results access.",
    },
    {
      q: "How long does an assessment take?",
      a: "It depends on facility size and scope; proposals include timelines.",
    },
    {
      q: "Can you help comply with Philippine OSHS?",
      a: "Yes, we align with Rules 1070–1180 and related regulations.",
    },
    {
      q: "Do you follow international standards?",
      a: "Yes, including SS 554 (Singapore) and cross-referenced benchmarks.",
    },
    {
      q: "Do you provide recommendations?",
      a: "Yes — engineering, administrative controls, and PPE guidance.",
    },
  ],
};

export function saveFormLocally(key, data) {
  try {
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    list.push({ ...data, savedAt: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error("Local save error", e);
    return false;
  }
}
