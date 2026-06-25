import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Counter animation ── */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.4);
  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const start = performance.now();
    const num = parseFloat(target);
    const frame = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Number.isInteger(num) ? Math.floor(eased * num) : +(eased * num).toFixed(1));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Sticky Note ── */
function StickyNote({ className, title, body, tag }) {
  return (
    <div className={`sticky-note ${className}`}>
      <div className="note-title">{title}</div>
      <div className="note-body">{body}</div>
      {tag && <span className="note-tag">{tag}</span>}
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, desc, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`feature-card${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="feature-icon">{icon}</div>
      <div className="feature-title">{title}</div>
      <div className="feature-desc">{desc}</div>
    </div>
  );
}

/* ── Testimonial Card ── */
function TestimonialCard({ quote, name, role, avatar, color, delay = 0 }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`testimonial-card${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="testimonial-stars">★★★★★</div>
      <p className="testimonial-q">"{quote}"</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar" style={{ background: color }}>{avatar}</div>
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">{role}</div>
        </div>
      </div>
    </div>
  );
}

/* ── App ── */
function App() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const features = [
    { icon: "📝", title: "Rich Text Notes", desc: "Format your thoughts with headings, lists, bold, and highlights. Every note looks exactly the way you want it." },
    { icon: "☁️", title: "Cloud Sync", desc: "Your notes follow you everywhere. Instant sync across all your devices — phone, tablet, and desktop." },
    { icon: "🔒", title: "App Lock", desc: "Biometric and PIN protection keeps your notes private. Your ideas stay yours, always." },
    { icon: "🎙️", title: "Voice Notes", desc: "Capture thoughts hands-free. Record audio, and Fast Notes transcribes it for you automatically." },
    { icon: "🔔", title: "Smart Reminders", desc: "Never miss a deadline. Set reminders tied to specific notes and get nudged at the right time." },
    { icon: "🌙", title: "Dark Mode", desc: "Easy on the eyes, day or night. Beautiful dark and light themes that switch automatically." },
  ];

  const testimonials = [
    { quote: "Fast Notes replaced three different apps for me. Everything I need is in one place and it just works.", name: "Maya T.", role: "Product Designer", avatar: "M", color: "#7B5CF0" },
    { quote: "The voice note feature is incredible. I capture ideas while driving and they're ready to review when I get home.", name: "James K.", role: "Entrepreneur", avatar: "J", color: "#FF6B6B" },
    { quote: "I've tried dozens of note apps. Fast Notes is the first one I've actually stuck with for more than a week.", name: "Priya S.", role: "Developer", avatar: "P", color: "#2196F3" },
  ];

  return (
    <>
      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-logo">
          <span className="nav-logo-dot" />
          Fast Notes
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#reviews">Reviews</a>
          <a href="#download" className="nav-cta">Download Free</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Your Digital Notebook
            </div>
            <h1 className="hero-h1">
              Notes that <span className="accent">think</span> as fast as{" "}
              <span className="underline-coral">you do</span>
            </h1>
            <p className="hero-p">
              Capture ideas, organize your world, and stay in sync across every device — all in one beautifully simple app.
            </p>
            <div className="hero-actions">
              <a href="#download" className="btn-primary">
                Download Fast Notes
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v14M5 9l7 7 7-7" />
                  <path d="M3 20h18" />
                </svg>
              </a>
              <a href="#features" className="btn-secondary">
                See all features
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="notes-scene">
              <StickyNote
                className="note-1"
                title="Today's Goals"
                body="Ship the landing page redesign ✓ Review Q3 plan with team ○"
                tag="#work"
              />
              <StickyNote
                className="note-2"
                title="Recipe Idea"
                body="Mango avocado salad — lime dressing, chili flakes, toasted seeds"
                tag="#personal"
              />
              <StickyNote
                className="note-3"
                title="Meeting Notes"
                body="Focus on onboarding flow. Users drop off at step 3. Need redesign ASAP."
                tag="#ideas"
              />
              <StickyNote
                className="note-4"
                title="Read Later"
                body="The Almanack of Naval Ravikant · Deep Work · SPQR"
                tag="#reading"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-strip">
        <div className="stats-inner">
          <div>
            <div className="stat-num"><Counter target={2.4} suffix="M" /><span>+</span></div>
            <div className="stat-label">Notes created every day</div>
          </div>
          <div>
            <div className="stat-num"><Counter target={180} /><span>+</span></div>
            <div className="stat-label">Countries worldwide</div>
          </div>
          <div>
            <div className="stat-num"><Counter target={4.9} /></div>
            <div className="stat-label">Average App Store rating</div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-label">Features</div>
        <h2 className="section-h2">Everything your notes deserve</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="reviews">
        <div className="testimonials-inner">
          <div className="section-label">Reviews</div>
          <h2 className="section-h2">People who switched and never looked back</h2>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="download">
        <div className="cta-card">
          <h2 className="cta-h2">Start capturing your best ideas today</h2>
          <p className="cta-p">Free forever, no account required. Available on iOS and Android.</p>
          <a href="#" className="cta-btn">
            Download Fast Notes — Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v14M5 9l7 7 7-7" />
              <path d="M3 20h18" />
            </svg>
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Fast Notes</div>
        <div className="footer-copy">© 2026 AEN Creative. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
