import { useEffect, useState, useRef } from "react";
import "@/App.css";
import {
  ArrowRight, ArrowUpRight, Menu, X, Linkedin, Twitter, Mail,
  Target, TrendingUp, Zap, FileText, BarChart3, CalendarDays,
  PenTool, Users, Briefcase, Settings, Compass, Palette, Code,
  Heart, DollarSign, GraduationCap, Megaphone, Shield, UserCheck, Scale, Monitor,
  Layers, Send, Cpu, Rocket, ArrowDownToLine, Handshake,
  LayoutDashboard, Globe, LineChart, MessageSquare, Database, Workflow
} from "lucide-react";

const PROFILE_IMG = "https://customer-assets.emergentagent.com/job_marketing-leverage/artifacts/8vav0lz0_ChatGPT%20Image%20Oct%2020%2C%202025%20at%2011_16_56%20PM.png";
const LOGO_IMG = "https://customer-assets.emergentagent.com/job_marketing-leverage/artifacts/qqxly645_ChatGPT%20Image%20Feb%206%2C%202026%2C%2004_56_18%20PM.png";

/* ─── useInView Hook ─── */
function useInView(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, { threshold: options.threshold || 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold]);

  return [ref, isVisible];
}

/* ─── CountUp Component ─── */
function CountUp({ end, suffix = "", prefix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useInView({ threshold: 0.3 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── RevealSection Component ─── */
function RevealSection({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''} ${delay ? `reveal-delay-${delay}` : ''} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── Navigation ─── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Determine active section
      const sections = [
        { id: "expertise", offset: document.getElementById("expertise")?.offsetTop || 99999 },
        { id: "work", offset: document.getElementById("work")?.offsetTop || 99999 },
      ];
      const scrollPos = window.scrollY + 200;
      let current = "home";
      for (const s of sections) {
        if (scrollPos >= s.offset) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#top", section: "home" },
    { label: "My Expertise", href: "#expertise", section: "expertise" },
    { label: "My Portfolio", href: "#work", section: "work" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'nav-glass py-3' : 'py-5 bg-transparent'
        }`}
        style={{ transitionProperty: 'padding, background, border-color, backdrop-filter' }}
      >
        <div className="container-main flex items-center justify-between">
          <a
            href="#"
            data-testid="logo-link"
            className="font-heading text-xl font-800 tracking-tight flex items-center"
            style={{ color: '#0b0b0b', textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img src={LOGO_IMG} alt="bee2bee" style={{ height: '40px', width: '40px', objectFit: 'contain', borderRadius: '8px' }} />
            <span className="ml-2">bee<span style={{ color: '#ff6a00' }}>2</span>bee</span>
          </a>

          <div className="hidden md:flex items-center gap-2" data-testid="desktop-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-pill ${activeSection === link.section ? 'nav-pill-active' : ''}`}
                data-testid={`nav-${link.section}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav-overlay" data-testid="mobile-nav-overlay">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-6 p-2"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            data-testid="mobile-nav-close"
          >
            <X size={28} />
          </button>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`mobile-nav-link ${activeSection === link.section ? 'mobile-nav-active' : ''}`}
              data-testid={`mobile-nav-${link.section}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center parallax-section"
      style={{ paddingTop: '6rem' }}
    >
      <div className="ambient-shape ambient-shape-1" />
      <div className="ambient-shape ambient-shape-2" />

      <div className="container-main w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 max-w-2xl">
            {/* Hello badge */}
            <div className="hero-badge" data-testid="hero-hello-badge">
              <span className="hello-pill">Hello!</span>
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none" style={{ marginLeft: '4px', marginTop: '-8px' }}>
                <path d="M6 20C8 14 10 10 12 4" stroke="#ffb380" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M10 22C13 16 15 12 18 6" stroke="#ffb380" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M15 22C17 17 19 14 22 10" stroke="#ffb380" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <h1
              className="hero-headline font-heading"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#0b0b0b',
                marginTop: '1rem',
              }}
              data-testid="hero-headline"
            >
              I'm <span style={{ color: '#ff6a00' }}>Sachin</span>,<br />
              Your <span className="accent-underline">Marketing Specialist</span>
            </h1>

            <p
              className="hero-subline font-body mt-6"
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                lineHeight: 1.7,
                color: '#6b6b6b',
                maxWidth: '520px',
              }}
              data-testid="hero-subline"
            >
              I build brand presence, pipeline, and revenue engines for B2B SaaS companies.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mt-10" data-testid="hero-buttons">
              <a href="#work" className="btn-primary" data-testid="hero-view-work-btn"
                onClick={(e) => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }); }}>
                View My Work <ArrowRight size={16} className="ml-2" />
              </a>
              <a href="#experience" className="btn-secondary" data-testid="hero-experience-btn"
                onClick={(e) => { e.preventDefault(); document.querySelector('#experience')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Explore My Experience
              </a>
            </div>
          </div>

          <div className="hero-avatar flex-shrink-0" data-testid="hero-avatar">
            <div
              style={{
                width: 'clamp(260px, 28vw, 380px)',
                height: 'clamp(260px, 28vw, 380px)',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                overflow: 'hidden',
                background: '#fafafa',
                border: '3px solid rgba(255,106,0,0.1)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src={PROFILE_IMG}
                alt="Sachin - B2B Marketing Specialist"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                data-testid="hero-profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Metrics Section ─── */
function MetricsSection() {
  const metrics = [
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 237, suffix: "%", label: "Growth in Qualified Leads" },
    { value: 336, suffix: "%", label: "US Market Traffic Growth" },
    { value: 177, suffix: "%", label: "Organic Traffic Growth" },
    { value: 18, suffix: "%", label: "Lead-to-Demo Conversion" },
    { value: 144, suffix: "%", label: "Content Engagement Growth" },
  ];

  return (
    <section data-testid="metrics-section" className="section-padding" style={{ background: '#fff' }}>
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
          {metrics.map((m, i) => (
            <RevealSection key={m.label} delay={i + 1}>
              <div className="metric-card" data-testid={`metric-card-${i}`}>
                <div
                  className="font-heading"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 800,
                    color: '#ff6a00',
                    lineHeight: 1.1,
                  }}
                >
                  <CountUp end={m.value} suffix={m.suffix} />
                </div>
                <p
                  className="font-body mt-2"
                  style={{ fontSize: '0.875rem', color: '#6b6b6b', fontWeight: 500 }}
                >
                  {m.label}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Philosophy Section ─── */
function PhilosophySection() {
  return (
    <section data-testid="philosophy-section" className="section-padding" style={{ background: '#fafafa' }}>
      <div className="container-main">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          {/* Text content */}
          <div className="flex-1 max-w-xl">
            <RevealSection>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: '#0b0b0b',
                  letterSpacing: '-0.02em',
                }}
                data-testid="philosophy-headline"
              >
                Marketing is a <span style={{ color: '#ff6a00' }}>gamble</span>.<br />
                I help you place the bets that win.
              </h2>
            </RevealSection>

            <RevealSection delay={2}>
              <div className="mt-8" style={{ color: '#6b6b6b', fontSize: '1.05rem', lineHeight: 1.8 }}>
                <p>Most companies don't fail because of bad products.</p>
                <p>They fail because they never build the systems that create trust, demand, and conversion.</p>
                <p className="mt-6" style={{ color: '#0b0b0b', fontWeight: 600 }}>I build those systems.</p>
              </div>
            </RevealSection>

            <RevealSection delay={3}>
              <ul className="mt-8 philosophy-list" data-testid="philosophy-list">
                <li className="philosophy-list-item">
                  <span className="philosophy-bullet" />
                  <span className="font-body" style={{ fontSize: '1.05rem', color: '#0b0b0b', fontWeight: 400 }}>Demand generation.</span>
                </li>
                <li className="philosophy-list-item">
                  <span className="philosophy-bullet" />
                  <span className="font-body" style={{ fontSize: '1.05rem', color: '#0b0b0b', fontWeight: 400 }}>Pipeline infrastructure.</span>
                </li>
                <li className="philosophy-list-item">
                  <span className="philosophy-bullet" />
                  <span className="font-body" style={{ fontSize: '1.05rem', color: '#0b0b0b', fontWeight: 400 }}>Positioning that makes buyers choose you.</span>
                </li>
              </ul>
            </RevealSection>
          </div>

          {/* Gambling/Strategy Illustration */}
          <RevealSection delay={2} className="flex-1 hidden lg:flex items-center justify-center">
            <div className="philosophy-illustration" data-testid="philosophy-illustration">
              <svg width="340" height="340" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Roulette-like target rings */}
                <circle cx="170" cy="170" r="150" stroke="#f0f0f0" strokeWidth="1.5" strokeDasharray="8 6" />
                <circle cx="170" cy="170" r="110" stroke="#e8e8e8" strokeWidth="1" strokeDasharray="6 4" />
                <circle cx="170" cy="170" r="70" stroke="#ffcfa3" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx="170" cy="170" r="30" fill="#ff6a00" opacity="0.08" stroke="#ff6a00" strokeWidth="1.5" />
                <circle cx="170" cy="170" r="8" fill="#ff6a00" opacity="0.35" />
                {/* Dice 1 */}
                <g transform="translate(60, 60) rotate(-15, 40, 40)">
                  <rect x="10" y="10" width="60" height="60" rx="10" fill="white" stroke="#0b0b0b" strokeWidth="1.5" />
                  <circle cx="28" cy="28" r="4" fill="#0b0b0b" />
                  <circle cx="52" cy="28" r="4" fill="#0b0b0b" />
                  <circle cx="40" cy="40" r="4" fill="#ff6a00" />
                  <circle cx="28" cy="52" r="4" fill="#0b0b0b" />
                  <circle cx="52" cy="52" r="4" fill="#0b0b0b" />
                </g>
                {/* Dice 2 */}
                <g transform="translate(220, 210) rotate(12, 35, 35)">
                  <rect x="5" y="5" width="55" height="55" rx="9" fill="white" stroke="#0b0b0b" strokeWidth="1.5" />
                  <circle cx="22" cy="22" r="3.5" fill="#0b0b0b" />
                  <circle cx="42" cy="22" r="3.5" fill="#0b0b0b" />
                  <circle cx="22" cy="42" r="3.5" fill="#ff6a00" />
                  <circle cx="42" cy="42" r="3.5" fill="#0b0b0b" />
                </g>
                {/* Poker chips stack */}
                <g transform="translate(230, 70)">
                  <ellipse cx="30" cy="40" rx="28" ry="8" fill="#e0e0e0" />
                  <ellipse cx="30" cy="34" rx="28" ry="8" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="1" />
                  <ellipse cx="30" cy="28" rx="28" ry="8" fill="#ffe0c2" stroke="#ffcfa3" strokeWidth="1" />
                  <ellipse cx="30" cy="22" rx="28" ry="8" fill="#ff6a00" opacity="0.3" stroke="#ff6a00" strokeWidth="1" />
                  <ellipse cx="30" cy="16" rx="28" ry="8" fill="#ff6a00" opacity="0.5" stroke="#ff6a00" strokeWidth="1.2" />
                </g>
                {/* Cards */}
                <g transform="translate(50, 210) rotate(-8, 35, 45)">
                  <rect x="8" y="4" width="48" height="66" rx="6" fill="#f8f8f8" stroke="#e0e0e0" strokeWidth="1" />
                  <rect x="0" y="0" width="48" height="66" rx="6" fill="white" stroke="#0b0b0b" strokeWidth="1.5" />
                  <text x="10" y="20" fontFamily="Manrope" fontSize="14" fontWeight="800" fill="#ff6a00">A</text>
                  <text x="30" y="50" fontFamily="Manrope" fontSize="11" fill="#ff6a00">&#9830;</text>
                </g>
                {/* Arrow hitting bullseye */}
                <line x1="80" y1="280" x2="162" y2="178" stroke="#ff6a00" strokeWidth="2" strokeLinecap="round" />
                <polygon points="162,178 158,188 168,185" fill="#ff6a00" />
                {/* Sparkle accents */}
                <circle cx="290" cy="130" r="3" fill="#ff6a00" opacity="0.4" />
                <circle cx="70" cy="170" r="2.5" fill="#ffcfa3" />
                <circle cx="260" cy="180" r="2" fill="#ff6a00" opacity="0.3" />
                <circle cx="130" cy="290" r="3" fill="#ffcfa3" />
              </svg>
            </div>
          </RevealSection>
        </div>

        {/* Center-aligned closing */}
        <RevealSection delay={4}>
          <div className="mt-16 pt-10" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', textAlign: 'center' }}>
            <p className="font-heading" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#6b6b6b', lineHeight: 1.8 }}>
              Not noise. Not vanity.<br />
              <span style={{ color: '#0b0b0b', fontWeight: 800, fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)' }}>Real growth.</span>
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Expertise Section ─── */
function ExpertiseSection() {
  const expertise = [
    { name: "Marketing Strategy", icon: Target, color: "#ff6a00" },
    { name: "Growth Marketing", icon: TrendingUp, color: "#e85d00" },
    { name: "Demand Generation", icon: Zap, color: "#ff6a00" },
    { name: "Performance Marketing", icon: BarChart3, color: "#ff6a00" },
    { name: "Event Marketing", icon: CalendarDays, color: "#e85d00" },
    { name: "Copywriting", icon: PenTool, color: "#ff6a00" },
    { name: "Sales & Pipeline Building", icon: Users, color: "#e85d00" },
    { name: "Account Management", icon: Briefcase, color: "#ff6a00" },
    { name: "MarTech & Automation", icon: Settings, color: "#e85d00" },
    { name: "Business Strategy", icon: Compass, color: "#ff6a00" },
    { name: "Graphic Design", icon: Palette, color: "#e85d00" },
    { name: "HTML & CSS", icon: Code, color: "#ff6a00" },
  ];

  return (
    <section id="expertise" data-testid="expertise-section" className="section-padding">
      <div className="container-main">
        <RevealSection>
          <p className="font-body" style={{ color: '#ff6a00', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Expertise</p>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0b0b0b',
              letterSpacing: '-0.02em',
            }}
            data-testid="expertise-headline"
          >
            What I do best.
          </h2>
        </RevealSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5 mt-12">
          {expertise.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealSection key={item.name} delay={Math.min(i % 4 + 1, 8)}>
                <div className="expertise-card-v2" data-testid={`expertise-card-${i}`}>
                  <div className="expertise-icon-wrap">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <span className="font-heading" style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0b0b0b', marginTop: '0.75rem', display: 'block' }}>
                    {item.name}
                  </span>
                  <div className="expertise-accent-line" />
                </div>
              </RevealSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Experience Section ─── */
function ExperienceSection() {
  const roles = [
    {
      company: "EHNOTE Inc",
      role: "Marketing Lead",
      period: "Nov 2023 \u2013 Present",
      description: "Full-cycle marketing leadership. Built demand generation systems, positioning strategy, inbound pipeline, and revenue growth programs.",
      tags: ["Demand Gen", "Strategy", "Pipeline", "Leadership"],
      icon: LayoutDashboard,
    },
    {
      company: "The Global Associates",
      role: "Sr. Copywriter / Account Manager",
      period: "Dec 2022 \u2013 Nov 2023",
      description: "Led B2B demand generation for SaaS clients. Managed email campaigns, LinkedIn outreach, outbound pipeline creation, and client growth strategy.",
      tags: ["B2B SaaS", "Email", "LinkedIn", "Outbound"],
      icon: Globe,
    },
    {
      company: "Forefacts Inc",
      role: "Content Manager",
      period: "July 2021 \u2013 Nov 2022",
      description: "Owned content strategy, inbound marketing, editorial planning, and lead generation infrastructure.",
      tags: ["Content", "Inbound", "Editorial", "Lead Gen"],
      icon: LineChart,
    },
    {
      company: "EHNOTE Softlabs",
      role: "Content Writer",
      period: "Jan 2021 \u2013 July 2021",
      description: "Created whitepapers, landing pages, blog content, and product positioning materials.",
      tags: ["Whitepapers", "Landing Pages", "Positioning"],
      icon: MessageSquare,
    },
    {
      company: "Bajaj Finserv",
      role: "Sales Executive",
      period: "Aug 2020 \u2013 Jan 2021",
      description: "Built persuasion skills, customer acquisition experience, and real sales understanding.",
      tags: ["Sales", "Acquisition", "Persuasion"],
      icon: Handshake,
    },
  ];

  return (
    <section id="experience" data-testid="experience-section" className="section-padding" style={{ background: '#fafafa' }}>
      <div className="container-main">
        <RevealSection>
          <p className="font-body" style={{ color: '#ff6a00', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Experience</p>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0b0b0b',
              letterSpacing: '-0.02em',
            }}
            data-testid="experience-headline"
          >
            Where I've built growth.
          </h2>
        </RevealSection>

        <div className="mt-14 space-y-0">
          {roles.map((r, i) => (
            <TimelineItem key={r.company} role={r} index={i} isLast={i === roles.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ role, index, isLast }) {
  const [ref, isVisible] = useInView({ threshold: 0.2 });
  const Icon = role.icon;

  return (
    <div
      ref={ref}
      className={`timeline-item ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      data-testid={`timeline-item-${index}`}
    >
      <div className="timeline-row">
        {/* Left: Timeline spine */}
        <div className="timeline-spine">
          <div className="timeline-dot" />
          {!isLast && <div className="timeline-connector" />}
        </div>

        {/* Center: Content */}
        <div className="timeline-content">
          <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0b0b0b' }}>
            {role.company}
          </h3>
          <p className="font-heading" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ff6a00', marginTop: '2px' }}>
            {role.role}
          </p>
          <p className="font-body" style={{ fontSize: '0.8rem', color: '#6b6b6b', fontWeight: 500, marginTop: '4px', letterSpacing: '0.02em' }}>
            {role.period}
          </p>
          <p className="font-body" style={{ fontSize: '0.95rem', color: '#6b6b6b', lineHeight: 1.7, marginTop: '10px' }}>
            {role.description}
          </p>
        </div>

        {/* Right: Decorative elements */}
        <div className="timeline-decoration hidden lg:flex">
          <div className="timeline-icon-badge">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <div className="timeline-tags">
            {role.tags.map((tag) => (
              <span key={tag} className="timeline-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Industry Carousel Section ─── */
function IndustrySection() {
  const industries = [
    { name: "HealthTech", icon: Heart },
    { name: "FinTech", icon: DollarSign },
    { name: "EdTech", icon: GraduationCap },
    { name: "MarTech", icon: Megaphone },
    { name: "CyberTech", icon: Shield },
    { name: "HRTech", icon: UserCheck },
    { name: "LegalTech", icon: Scale },
    { name: "AdTech", icon: Monitor },
  ];

  // Double the items for seamless infinite scroll
  const doubledIndustries = [...industries, ...industries];

  return (
    <section data-testid="industry-section" className="section-padding">
      <div className="container-main">
        <RevealSection>
          <p className="font-body" style={{ color: '#ff6a00', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Industries</p>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 800,
              color: '#0b0b0b',
              letterSpacing: '-0.02em',
            }}
            data-testid="industry-headline"
          >
            Sectors I've worked across.
          </h2>
        </RevealSection>
      </div>

      {/* Auto-sliding carousel */}
      <div className="industry-carousel-wrapper mt-12">
        <div className="industry-carousel-track">
          {doubledIndustries.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div key={`${ind.name}-${i}`} className="industry-carousel-item" data-testid={i < 8 ? `industry-pill-${i}` : undefined}>
                <div className="industry-icon-wrap">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="font-heading" style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0b0b0b' }}>
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── What I Build Section ─── */
function WhatIBuildSection() {
  const items = [
    { title: "Demand generation systems", desc: "Systematic approaches to create and capture demand at every stage of the buyer journey.", icon: Zap },
    { title: "Inbound pipeline engines", desc: "Content-driven infrastructure that attracts and converts qualified prospects organically.", icon: ArrowDownToLine },
    { title: "Outbound acquisition systems", desc: "Targeted outreach frameworks that open doors with the right accounts at the right time.", icon: Send },
    { title: "Product positioning frameworks", desc: "Clear, compelling narratives that make buyers understand why you're the obvious choice.", icon: Layers },
    { title: "Marketing automation infrastructure", desc: "Tech-enabled workflows that scale your marketing impact without scaling your team.", icon: Cpu },
    { title: "Sales enablement systems", desc: "Content, tools, and processes that make your sales team close faster and bigger.", icon: Database },
    { title: "Business growth strategy", desc: "End-to-end strategic planning that aligns marketing, sales, and product for compounding growth.", icon: Rocket },
  ];

  return (
    <section id="work" data-testid="work-section" className="section-padding" style={{ background: '#fafafa' }}>
      <div className="container-main">
        <RevealSection>
          <div style={{ textAlign: 'center' }}>
            <p className="font-body" style={{ color: '#ff6a00', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>What I Build</p>
            <h2
              className="font-heading"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                fontWeight: 800,
                color: '#0b0b0b',
                letterSpacing: '-0.02em',
              }}
              data-testid="work-headline"
            >
              I build growth infrastructure.
            </h2>
          </div>
        </RevealSection>

        {/* Top row: 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {items.slice(0, 4).map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealSection key={item.title} delay={i + 1}>
                <div className="build-card h-full" data-testid={`value-card-${i}`}>
                  <div className="build-card-icon">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-heading mt-4" style={{ fontWeight: 700, fontSize: '1rem', color: '#0b0b0b', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p className="font-body mt-2" style={{ fontSize: '0.85rem', color: '#6b6b6b', lineHeight: 1.65 }}>
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            );
          })}
        </div>

        {/* Bottom row: 3 cards centered */}
        <div className="flex justify-center mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ maxWidth: '900px', width: '100%' }}>
            {items.slice(4).map((item, i) => {
              const Icon = item.icon;
              return (
                <RevealSection key={item.title} delay={i + 1}>
                  <div className="build-card h-full" data-testid={`value-card-${i + 4}`}>
                    <div className="build-card-icon">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-heading mt-4" style={{ fontWeight: 700, fontSize: '1rem', color: '#0b0b0b', lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                    <p className="font-body mt-2" style={{ fontSize: '0.85rem', color: '#6b6b6b', lineHeight: 1.65 }}>
                      {item.desc}
                    </p>
                  </div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Closing / Contact Section ─── */
function ClosingSection() {
  return (
    <section id="contact" data-testid="contact-section" className="section-padding">
      <div className="container-main">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">
          {/* Left: Content */}
          <div className="flex-1 max-w-lg">
            <RevealSection>
              <h2
                className="font-heading"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                  fontWeight: 800,
                  lineHeight: 1.1,
                  color: '#0b0b0b',
                  letterSpacing: '-0.02em',
                }}
                data-testid="contact-headline"
              >
                If you're building something real,<br />
                <span style={{ color: '#ff6a00' }}>we should talk.</span>
              </h2>
            </RevealSection>

            <RevealSection delay={2}>
              <div className="mt-6" style={{ color: '#6b6b6b', fontSize: '1.05rem', lineHeight: 1.9 }}>
                <p>From business to business.</p>
                <p>From presence to pipeline.</p>
                <p>From strategy to growth.</p>
              </div>
            </RevealSection>

            <RevealSection delay={3}>
              <div className="mt-10">
                {/* HubSpot Form Placeholder */}
              </div>
            </RevealSection>
          </div>

          {/* Right: HubSpot Form */}
          <div className="flex-1 w-full">
            <RevealSection delay={2}>
              <div className="hubspot-form-container" data-testid="hubspot-form-container">
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <Mail size={32} style={{ color: '#ff6a00', margin: '0 auto' }} />
                  </div>
                  <p className="font-heading" style={{ color: '#0b0b0b', fontSize: '1.05rem', fontWeight: 700 }}>
                    Get in touch
                  </p>
                  <p className="font-body mt-2" style={{ color: '#6b6b6b', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Paste your HubSpot form embed code here to replace this placeholder
                  </p>
                  <div className="mt-6" style={{ padding: '1rem', background: 'rgba(255,106,0,0.04)', borderRadius: '12px', border: '1px dashed rgba(255,106,0,0.2)' }}>
                    <p className="font-body" style={{ color: '#999', fontSize: '0.8rem' }}>
                      HubSpot CRM form will appear here
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer data-testid="footer" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '3rem 0' }}>
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <img src={LOGO_IMG} alt="bee2bee" style={{ height: '32px', width: '32px', objectFit: 'contain', borderRadius: '6px' }} />
          <span className="font-heading ml-2" style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0b0b0b' }}>
            bee<span style={{ color: '#ff6a00' }}>2</span>bee
          </span>
          <span className="font-body ml-4" style={{ color: '#6b6b6b', fontSize: '0.8rem' }}>
            Sachin | B2B Marketing Specialist
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a href="#" data-testid="social-linkedin" style={{ color: '#6b6b6b', transition: 'color 0.3s ease' }} title="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href="#" data-testid="social-twitter" style={{ color: '#6b6b6b', transition: 'color 0.3s ease' }} title="Twitter">
            <Twitter size={18} />
          </a>
          <a href="mailto:hello@bee2bee.com" data-testid="social-mail" style={{ color: '#6b6b6b', transition: 'color 0.3s ease' }} title="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Scroll Progress Bar ─── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(total > 0 ? (current / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} data-testid="scroll-progress" />;
}

/* ─── Main App ─── */
function App() {
  return (
    <div style={{ background: '#ffffff' }}>
      <ScrollProgress />
      <Navigation />
      <HeroSection />
      <div className="section-divider" />
      <MetricsSection />
      <PhilosophySection />
      <ExpertiseSection />
      <ExperienceSection />
      <IndustrySection />
      <WhatIBuildSection />
      <div className="section-divider" />
      <ClosingSection />
      <Footer />
    </div>
  );
}

export default App;
