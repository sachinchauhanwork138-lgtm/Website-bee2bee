import { useEffect, useState, useRef, useCallback } from "react";
import "@/App.css";
import { ArrowRight, ArrowUpRight, Menu, X, Linkedin, Twitter, Mail, ChevronRight } from "lucide-react";

const PROFILE_IMG = "https://customer-assets.emergentagent.com/job_marketing-leverage/artifacts/8vav0lz0_ChatGPT%20Image%20Oct%2020%2C%202025%20at%2011_16_56%20PM.png";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Expertise", href: "#expertise" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
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
            className="font-heading text-xl font-800 tracking-tight"
            style={{ color: '#0b0b0b', textDecoration: 'none' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            bee<span style={{ color: '#ff6a00' }}>2</span>bee
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8" data-testid="desktop-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                data-testid={`nav-${link.label.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
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

      {/* Mobile overlay */}
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
              className="mobile-nav-link"
              data-testid={`mobile-nav-${link.label.toLowerCase()}`}
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
          {/* Text */}
          <div className="flex-1 max-w-2xl">
            <h1
              className="hero-headline font-heading"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: '#0b0b0b',
              }}
              data-testid="hero-headline"
            >
              Hello! I'm Sachin,<br />
              Your <span className="accent-underline">Marketing</span> Specialist
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

          {/* Avatar */}
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
                alt="Sachin — B2B Marketing Specialist"
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
                    color: '#0b0b0b',
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
      <div className="container-main" style={{ maxWidth: '800px' }}>
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
            Marketing is not content.<br />
            Marketing is <span style={{ color: '#ff6a00' }}>leverage</span>.
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
          <div
            className="mt-8 font-body"
            style={{
              fontSize: '1.05rem',
              lineHeight: 2,
              color: '#0b0b0b',
              fontWeight: 500,
            }}
            data-testid="philosophy-list"
          >
            <p>Demand generation.</p>
            <p>Pipeline infrastructure.</p>
            <p>Positioning that makes buyers choose you.</p>
          </div>
        </RevealSection>

        <RevealSection delay={4}>
          <p className="mt-8" style={{ color: '#6b6b6b', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Not noise. Not vanity.<br />
            <span style={{ color: '#0b0b0b', fontWeight: 700 }}>Real growth.</span>
          </p>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Expertise Section ─── */
function ExpertiseSection() {
  const expertise = [
    "Marketing Strategy", "Growth Marketing", "Demand Generation",
    "Content Marketing", "Performance Marketing", "Event Marketing",
    "Copywriting", "Sales & Pipeline Building", "Account Management",
    "MarTech & Automation", "Business Strategy", "Graphic Design",
    "HTML & CSS",
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {expertise.map((item, i) => (
            <RevealSection key={item} delay={Math.min(i % 4 + 1, 8)}>
              <div className="expertise-card" data-testid={`expertise-card-${i}`}>
                <span className="font-heading" style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0b0b0b' }}>
                  {item}
                </span>
              </div>
            </RevealSection>
          ))}
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
    },
    {
      company: "The Global Associates",
      role: "Sr. Copywriter / Account Manager",
      period: "Dec 2022 \u2013 Nov 2023",
      description: "Led B2B demand generation for SaaS clients. Managed email campaigns, LinkedIn outreach, outbound pipeline creation, and client growth strategy.",
    },
    {
      company: "Forefacts Inc",
      role: "Content Manager",
      period: "July 2021 \u2013 Nov 2022",
      description: "Owned content strategy, inbound marketing, editorial planning, and lead generation infrastructure.",
    },
    {
      company: "EHNOTE Softlabs",
      role: "Content Writer",
      period: "Jan 2021 \u2013 July 2021",
      description: "Created whitepapers, landing pages, blog content, and product positioning materials.",
    },
    {
      company: "Bajaj Finserv",
      role: "Sales Executive",
      period: "Aug 2020 \u2013 Jan 2021",
      description: "Built persuasion skills, customer acquisition experience, and real sales understanding.",
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

        <div className="mt-14 relative" style={{ paddingLeft: '48px' }}>
          <div className="timeline-line" />

          {roles.map((r, i) => (
            <TimelineItem key={r.company} role={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ role, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`timeline-item ${isVisible ? 'visible' : ''} flex items-start gap-5 mb-12`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      data-testid={`timeline-item-${index}`}
    >
      <div className="timeline-dot" style={{ marginTop: '6px', marginLeft: '-42px' }} />
      <div>
        <h3 className="font-heading" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0b0b0b' }}>
          {role.company}
        </h3>
        <p className="font-heading" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ff6a00', marginTop: '2px' }}>
          {role.role}
        </p>
        <p className="font-body" style={{ fontSize: '0.8rem', color: '#6b6b6b', fontWeight: 500, marginTop: '4px', letterSpacing: '0.02em' }}>
          {role.period}
        </p>
        <p className="font-body" style={{ fontSize: '0.95rem', color: '#6b6b6b', lineHeight: 1.7, marginTop: '10px', maxWidth: '560px' }}>
          {role.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Industry Section ─── */
function IndustrySection() {
  const industries = [
    "HealthTech", "FinTech", "EdTech", "MarTech",
    "CyberTech", "HRTech", "LegalTech", "AdTech",
  ];

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

        <div className="flex flex-wrap gap-3 mt-10">
          {industries.map((ind, i) => (
            <RevealSection key={ind} delay={Math.min(i + 1, 8)}>
              <span className="industry-pill" data-testid={`industry-pill-${i}`}>{ind}</span>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── What I Build Section ─── */
function WhatIBuildSection() {
  const items = [
    { title: "Demand generation systems", desc: "Systematic approaches to create and capture demand at every stage of the buyer journey." },
    { title: "Inbound pipeline engines", desc: "Content-driven infrastructure that attracts and converts qualified prospects organically." },
    { title: "Outbound acquisition systems", desc: "Targeted outreach frameworks that open doors with the right accounts at the right time." },
    { title: "Product positioning frameworks", desc: "Clear, compelling narratives that make buyers understand why you're the obvious choice." },
    { title: "Marketing automation infrastructure", desc: "Tech-enabled workflows that scale your marketing impact without scaling your team." },
    { title: "Sales enablement systems", desc: "Content, tools, and processes that make your sales team close faster and bigger." },
    { title: "Business growth strategy", desc: "End-to-end strategic planning that aligns marketing, sales, and product for compounding growth." },
  ];

  return (
    <section id="work" data-testid="work-section" className="section-padding" style={{ background: '#fafafa' }}>
      <div className="container-main">
        <RevealSection>
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
        </RevealSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {items.map((item, i) => (
            <RevealSection key={item.title} delay={Math.min(i % 3 + 1, 8)}>
              <div className="value-card h-full" data-testid={`value-card-${i}`}>
                <div className="flex items-start gap-3">
                  <span style={{ color: '#ff6a00', marginTop: '2px', flexShrink: 0 }}>
                    <ChevronRight size={18} strokeWidth={3} />
                  </span>
                  <div>
                    <h3 className="font-heading" style={{ fontWeight: 700, fontSize: '1rem', color: '#0b0b0b' }}>
                      {item.title}
                    </h3>
                    <p className="font-body mt-2" style={{ fontSize: '0.875rem', color: '#6b6b6b', lineHeight: 1.65 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Closing / Contact Section ─── */
function ClosingSection() {
  return (
    <section id="contact" data-testid="contact-section" className="section-padding">
      <div className="container-main" style={{ maxWidth: '800px' }}>
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
            <div className="hubspot-form-container" data-testid="hubspot-form-container">
              <div style={{ textAlign: 'center' }}>
                <p className="font-body" style={{ color: '#6b6b6b', fontSize: '0.9rem' }}>
                  {/* HubSpot form will be embedded here */}
                  Contact form loading...
                </p>
                <p className="font-body mt-2" style={{ color: '#999', fontSize: '0.8rem' }}>
                  Paste your HubSpot embed code to replace this placeholder
                </p>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={4}>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a href="mailto:hello@bee2bee.com" className="btn-accent" data-testid="contact-me-btn">
              Contact Me <ArrowUpRight size={18} className="ml-2" />
            </a>
            <span className="font-body" style={{ color: '#6b6b6b', fontSize: '0.85rem' }}>
              or reach out at <a href="mailto:hello@bee2bee.com" style={{ color: '#0b0b0b', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>hello@bee2bee.com</a>
            </span>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer data-testid="footer" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', padding: '3rem 0' }}>
      <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-heading" style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0b0b0b' }}>
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
