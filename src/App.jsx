import { useState, useEffect, useRef } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap');`;

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #fafaf8;
    --bg2: #f4f3ef;
    --ink: #1a1a18;
    --ink2: #3d3d3a;
    --muted: #9a9890;
    --accent: #c8a96e;
    --accent2: #2d6a4f;
    --border: #e8e6e0;
    --font-display: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--ink);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 24px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(250,250,248,0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
  }

  nav.scrolled { border-bottom-color: var(--border); }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  .nav-logo span { color: var(--accent); }

  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }

  .nav-links a {
    font-size: 13px;
    font-weight: 400;
    color: var(--muted);
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .nav-links a:hover { color: var(--ink); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 120px 60px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border);
  }

  .hero-inner {
    max-width: 1100px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 28px;
  }

  .hero-tag::before {
    content: '';
    width: 24px;
    height: 1px;
    background: var(--accent);
  }

  .hero h1 {
    font-family: var(--font-display);
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 900;
    line-height: 1.0;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .hero h1 em {
    font-style: italic;
    color: var(--accent);
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(16px, 2vw, 22px);
    font-weight: 400;
    font-style: italic;
    color: var(--muted);
    margin-bottom: 32px;
    letter-spacing: 0.01em;
  }

  .hero-desc {
    font-size: 15px;
    color: var(--ink2);
    max-width: 420px;
    line-height: 1.8;
    margin-bottom: 44px;
  }

  .hero-ctas {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .btn-primary {
    padding: 14px 28px;
    background: var(--ink);
    color: var(--bg);
    border: none;
    border-radius: 2px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  .btn-primary:hover { background: var(--ink2); transform: translateY(-1px); }

  .btn-outline {
    padding: 14px 28px;
    background: transparent;
    color: var(--ink);
    border: 1px solid var(--border);
    border-radius: 2px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  .btn-outline:hover { border-color: var(--ink); transform: translateY(-1px); }

  /* Hero right side — stat cards */
  .hero-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .stat-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 28px 24px;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(0,0,0,0.06); }

  .stat-card:first-child {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .stat-num {
    font-family: var(--font-display);
    font-size: 42px;
    font-weight: 900;
    color: var(--ink);
    line-height: 1;
  }

  .stat-num.accent { color: var(--accent); }
  .stat-num.green { color: var(--accent2); }

  .stat-label {
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.06em;
    margin-top: 4px;
    text-transform: uppercase;
  }

  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--border);
  }

  /* SECTION COMMONS */
  section {
    padding: 100px 60px;
  }

  .section-inner {
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-tag {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-tag::before {
    content: '';
    width: 24px;
    height: 1px;
    background: var(--accent);
  }

  .section-title {
    font-family: var(--font-display);
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 16px;
  }

  .section-title em { font-style: italic; color: var(--accent); }

  /* ABOUT */
  .about { background: white; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
    margin-top: 56px;
  }

  .about-text p {
    font-size: 15px;
    color: var(--ink2);
    line-height: 1.9;
    margin-bottom: 20px;
  }

  .about-text p strong {
    color: var(--ink);
    font-weight: 500;
  }

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .skill-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 4px;
  }

  .skill-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--ink);
  }

  .skill-tag {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
  }

  .tag-cs { background: rgba(45,106,79,0.08); color: var(--accent2); }
  .tag-ai { background: rgba(200,169,110,0.12); color: #a07840; }
  .tag-tech { background: rgba(26,26,24,0.06); color: var(--ink2); }

  /* PROJECTS */
  .projects { background: var(--bg2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
    margin-top: 56px;
  }

  .project-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .project-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }

  .project-card.featured {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .project-preview {
    background: #0a0e1a;
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    position: relative;
    overflow: hidden;
  }

  .project-preview::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 20% 30%, rgba(0,229,255,0.1) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 70%, rgba(255,107,107,0.08) 0%, transparent 60%);
  }

  .preview-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #00e5ff;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .preview-score {
    font-family: serif;
    font-size: 64px;
    font-weight: 900;
    color: #ffd166;
    line-height: 1;
    position: relative;
    z-index: 1;
    text-shadow: 0 0 40px rgba(255,209,102,0.4);
  }

  .preview-inner {
    text-align: center;
    position: relative;
    z-index: 1;
  }

  .project-body { padding: 32px; }

  .project-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 16px;
  }

  .project-tag {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 2px;
    background: var(--bg2);
    color: var(--muted);
    border: 1px solid var(--border);
  }

  .project-name {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }

  .project-desc {
    font-size: 14px;
    color: var(--ink2);
    line-height: 1.7;
    margin-bottom: 24px;
  }

  .project-links {
    display: flex;
    gap: 12px;
  }

  .project-link {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    border-bottom: 1px solid var(--border);
    padding-bottom: 2px;
    transition: border-color 0.2s, color 0.2s;
  }

  .project-link:hover { border-color: var(--accent); color: var(--accent); }

  .coming-soon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 160px;
    border: 2px dashed var(--border);
    border-radius: 8px;
    color: var(--muted);
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* RESUME */
  .resume { background: white; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

  .resume-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    flex-wrap: wrap;
    margin-top: 56px;
    padding: 48px;
    background: var(--bg2);
    border: 1px solid var(--border);
    border-radius: 8px;
  }

  .resume-text h3 {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .resume-text p {
    font-size: 14px;
    color: var(--muted);
    line-height: 1.6;
    max-width: 420px;
  }

  /* CONTACT */
  .contact { background: var(--ink); }

  .contact .section-tag { color: var(--accent); }
  .contact .section-tag::before { background: var(--accent); }
  .contact .section-title { color: white; }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: start;
    margin-top: 56px;
  }

  .contact-desc {
    font-size: 15px;
    color: rgba(255,255,255,0.5);
    line-height: 1.8;
    margin-bottom: 36px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    color: rgba(255,255,255,0.7);
    font-size: 14px;
    transition: color 0.2s;
    padding: 16px 20px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    background: rgba(255,255,255,0.03);
  }

  .contact-link:hover { color: white; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.06); }

  .contact-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .contact-form input,
  .contact-form textarea {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 4px;
    padding: 14px 16px;
    font-family: var(--font-body);
    font-size: 14px;
    color: white;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
  }

  .contact-form input::placeholder,
  .contact-form textarea::placeholder { color: rgba(255,255,255,0.25); }

  .contact-form input:focus,
  .contact-form textarea:focus { border-color: var(--accent); }

  .contact-form textarea { min-height: 120px; resize: vertical; }

  .btn-send {
    padding: 14px 28px;
    background: var(--accent);
    color: var(--ink);
    border: none;
    border-radius: 2px;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-start;
  }

  .btn-send:hover { background: #d4b87e; transform: translateY(-1px); }

  /* FOOTER */
  footer {
    background: var(--ink);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 32px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-logo {
    font-family: var(--font-display);
    font-size: 15px;
    font-weight: 700;
    color: rgba(255,255,255,0.4);
  }

  .footer-logo span { color: var(--accent); }

  .footer-copy {
    font-size: 12px;
    color: rgba(255,255,255,0.25);
  }

  /* ANIMATIONS */
  .fade-in {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-in-delay-1 { transition-delay: 0.1s; }
  .fade-in-delay-2 { transition-delay: 0.2s; }
  .fade-in-delay-3 { transition-delay: 0.3s; }
  .fade-in-delay-4 { transition-delay: 0.4s; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    nav { padding: 20px 24px; }
    .nav-links { display: none; }
    section { padding: 72px 24px; }
    .hero { padding: 100px 24px 72px; }
    .hero-inner { grid-template-columns: 1fr; gap: 48px; }
    .hero-stats { display: none; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; }
    .project-card.featured { grid-template-columns: 1fr; }
    .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    footer { padding: 24px; flex-direction: column; gap: 8px; text-align: center; }
    .resume-inner { padding: 28px; }
  }
`;

function useScrollFade() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

export default function Portfolio() {
  useScrollFade();
  const scrolled = useScrollNav();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleContact(e) {
    e.preventDefault();
    window.location.href = `mailto:Munoke22@gmail.com?subject=Hi Kellan — from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
    setSent(true);
  }

  return (
    <>
      <style>{fonts + styles}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">Kellan <span>Muno</span></div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#resume">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div>
            <div className="hero-tag fade-in">Available for opportunities</div>
            <h1 className="fade-in fade-in-delay-1">Kellan<br /><em>Muno.</em></h1>
            <div className="hero-title fade-in fade-in-delay-2">Customer Success King</div>
            <p className="hero-desc fade-in fade-in-delay-3">
              2 years turning customer data into retention wins. Now building AI-powered tools
              that help CS teams move faster, spot risk earlier, and keep customers for life.
            </p>
            <div className="hero-ctas fade-in fade-in-delay-4">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-outline">Get In Touch</a>
            </div>
          </div>

          <div className="hero-stats fade-in fade-in-delay-2">
            <div className="stat-card">
              <div>
                <div className="stat-num accent">2+</div>
                <div className="stat-label">Years in CS</div>
              </div>
              <div className="stat-divider" />
              <div>
                <div className="stat-num green">AI</div>
                <div className="stat-label">Powered Tools</div>
              </div>
              <div className="stat-divider" />
              <div>
                <div className="stat-num">B2B</div>
                <div className="stat-label">SaaS Focus</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-num accent" style={{fontSize:"32px"}}>NPS</div>
              <div className="stat-label">Driven Strategy</div>
            </div>
            <div className="stat-card">
              <div className="stat-num green" style={{fontSize:"32px"}}>↓</div>
              <div className="stat-label">Churn Fighter</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-inner">
          <div className="section-tag fade-in">About Me</div>
          <h2 className="section-title fade-in">CS is more than<br />a <em>support ticket.</em></h2>
          <div className="about-grid">
            <div className="about-text fade-in">
              <p>
                I've spent 2 years in the trenches of B2B SaaS customer success — managing accounts,
                running QBRs, fighting churn, and helping customers find real value in the products they pay for.
              </p>
              <p>
                What sets me apart is that I don't just work <strong>in</strong> CS — I think about how to make CS
                <strong> smarter</strong>. I built PulseCS, an AI-powered churn risk predictor, because I was tired of
                finding out about at-risk accounts too late.
              </p>
              <p>
                I'm looking for a team that believes customer success is a growth engine, not a cost center —
                and is excited to use AI to get there faster.
              </p>
            </div>
            <div className="skills-list fade-in fade-in-delay-1">
              {[
                ["Churn Prevention & Retention", "cs"],
                ["QBR / EBR Facilitation", "cs"],
                ["NPS & CSAT Analysis", "cs"],
                ["Onboarding & Time-to-Value", "cs"],
                ["AI-Powered CS Tooling", "ai"],
                ["Claude & Anthropic API", "ai"],
                ["React & JavaScript", "tech"],
                ["Git & Vercel Deployment", "tech"],
              ].map(([name, type]) => (
                <div className="skill-item" key={name}>
                  <span className="skill-name">{name}</span>
                  <span className={`skill-tag tag-${type}`}>{type === "cs" ? "CS" : type === "ai" ? "AI" : "Tech"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="projects" id="projects">
        <div className="section-inner">
          <div className="section-tag fade-in">Projects</div>
          <h2 className="section-title fade-in">Things I've <em>built.</em></h2>
          <div className="projects-grid">

            {/* Featured project */}
            <div className="project-card featured fade-in">
              <div className="project-preview">
                <div className="preview-inner">
                  <div className="preview-label" style={{marginBottom:"12px"}}>PulseCS · Risk Score</div>
                  <div className="preview-score">72</div>
                  <div className="preview-label" style={{marginTop:"8px", color:"#ff6b6b"}}>⚠ High Risk</div>
                </div>
              </div>
              <div className="project-body">
                <div className="project-tags">
                  <span className="project-tag">React</span>
                  <span className="project-tag">Claude AI</span>
                  <span className="project-tag">Vercel</span>
                  <span className="project-tag">Customer Success</span>
                </div>
                <div className="project-name">PulseCS — Churn Risk Predictor</div>
                <p className="project-desc">
                  An AI-powered dashboard that scores customer churn risk from live account signals —
                  login frequency, NPS, support tickets, feature adoption — and generates a 3-step
                  CSM action playbook using Claude AI. Built from real experience watching accounts go silent.
                </p>
                <div className="project-links">
                  <a href="https://churn-mu.vercel.app" target="_blank" className="project-link">Live Demo →</a>
                  <a href="https://github.com/CrimpyRAUGE/Churn" target="_blank" className="project-link">GitHub →</a>
                </div>
              </div>
            </div>

            {/* Coming soon cards */}
            <div className="coming-soon fade-in fade-in-delay-1">+ More projects coming soon</div>
            <div className="coming-soon fade-in fade-in-delay-2">+ More projects coming soon</div>

          </div>
        </div>
      </section>

      {/* RESUME */}
      <section className="resume" id="resume">
        <div className="section-inner">
          <div className="section-tag fade-in">Resume</div>
          <h2 className="section-title fade-in">My full <em>background.</em></h2>
          <div className="resume-inner fade-in fade-in-delay-1">
            <div className="resume-text">
              <h3>Kellan Muno — CS & AI</h3>
              <p>2 years of B2B SaaS customer success experience combined with hands-on AI tooling skills.
              Download my resume to see the full picture.</p>
            </div>
            <a href="#" className="btn-primary" onClick={e => { e.preventDefault(); alert("https://drive.google.com/file/d/1AmlQTS5FY_odl-pmurnR5zsGk4ohxR_B/view?usp=drivesdk"); }}>
              Download Resume →
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="section-inner">
          <div className="section-tag fade-in">Contact</div>
          <h2 className="section-title fade-in">Let's <em>talk.</em></h2>
          <div className="contact-grid">
            <div>
              <p className="contact-desc fade-in">
                I'm actively looking for customer success roles at B2B SaaS companies that are
                excited about AI. If that sounds like your team, I'd love to connect.
              </p>
              <div className="contact-links fade-in fade-in-delay-1">
                <a href="mailto:Munoke22@gmail.com" className="contact-link">
                  <div className="contact-icon">✉</div>
                  Munoke22@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/kellan-muno" target="_blank" className="contact-link">
                  <div className="contact-icon">in</div>
                  linkedin.com/in/kellan-muno
                </a>
                <a href="https://github.com/CrimpyRAUGE" target="_blank" className="contact-link">
                  <div className="contact-icon">⌥</div>
                  github.com/CrimpyRAUGE
                </a>
              </div>
            </div>
            <div className="fade-in fade-in-delay-2">
              {sent ? (
                <div style={{color:"var(--accent)", fontSize:"15px", padding:"40px 0"}}>
                  ✓ Opening your email client...
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContact}>
                  <input
                    type="text" placeholder="Your name" required
                    value={formData.name} onChange={e => setFormData(f => ({...f, name: e.target.value}))}
                  />
                  <input
                    type="email" placeholder="Your email" required
                    value={formData.email} onChange={e => setFormData(f => ({...f, email: e.target.value}))}
                  />
                  <textarea
                    placeholder="Your message..." required
                    value={formData.message} onChange={e => setFormData(f => ({...f, message: e.target.value}))}
                  />
                  <button type="submit" className="btn-send">Send Message →</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Kellan <span>Muno</span></div>
        <div className="footer-copy">© 2026 · Customer Success King</div>
      </footer>
    </>
  );
}

