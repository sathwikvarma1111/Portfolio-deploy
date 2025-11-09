import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typed from "typed.js";
import {
  Github, Linkedin, MapPin, ArrowUp, FileText, MessageCircle,
  Sun, Moon, Mail, Phone
} from "lucide-react";
import THEMES from "./theme";

/* ---------------- PROFILE ---------------- */
const PROFILE = {
  name: "P.N. Sathwik Varma",
  role: "Full-Stack Developer",
  tagline:
    "I build scalable, user-centric web applications with React, Node.js, Express, and MongoDB.",
  location: "India",
  email: "sathwikvarma1111@gmail.com",
  phone: "+91-9014749657",
  socials: {
    github: "https://github.com/sathwikvarma1111",
    linkedin: "https://www.linkedin.com/in/p-nanda-sathwik-varma-9823a1336",
  },
};

/* ---------------- SKILLS (with logos) ---------------- */
const SKILLS = [
  { name: "React", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Node.js", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "MongoDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Java", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },

  // ✅ Added (replaced Tailwind)
  { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "HTML",   img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS",    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "MySQL",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "NumPy",  img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },

  { name: "PostgreSQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Git",        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

/* ---------------- ANIMATIONS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};
const reveal = {
  hidden: { opacity: 0, y: 26, filter: "blur(4px)" },
  show:   { opacity: 1, y: 0, filter: "blur(0)", transition: { duration: 0.6, ease: "easeOut" } },
};
const overlayWipe = {
  initial: { x: "100%" },
  animate: { x: "-100%", transition: { duration: 0.6, ease: "easeInOut" } },
};
/* Fancy animated text (stagger letters) */
const textContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.02 } },
};
const textChild = {
  hidden: { opacity: 0, y: 10, filter: "blur(3px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.35, ease: "easeOut" } },
};
/** Renders animated letters */
const AnimatedText = ({ text, className, colorVar }) => (
  <motion.span
    className={className}
    variants={textContainer}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
    style={colorVar ? { color: `var(${colorVar})` } : {}}
  >
    {text.split("").map((ch, i) => (
      <motion.span key={i} variants={textChild} className="inline-block">
        {ch === " " ? "\u00A0" : ch}
      </motion.span>
    ))}
  </motion.span>
);

/* ---------------- THEME CSS + BACKGROUND FX ---------------- */
const useThemeCSS = (theme) =>
  useMemo(() => {
    return `
      html{scroll-behavior:smooth}
      :root{
        --bg:${theme.bg}; --surface:${theme.surface}; --text:${theme.text};
        --primary:${theme.primary}; --accent:${theme.accent}; --muted:${theme.muted}; --ring:${theme.ring};
      }
      body{background:var(--bg); color:var(--text)}
      .surface{background:var(--surface)}
      .text-muted{color:var(--muted)}
      .ring{box-shadow:0 0 0 1px var(--ring) inset}

      .btn-primary{
        background:linear-gradient(135deg, var(--primary), var(--accent));
        color:white; font-weight:600; border:none;
        box-shadow:0 12px 32px color-mix(in oklab, var(--primary) 35%, transparent);
        transition:transform .3s ease, box-shadow .3s ease;
      }
      .btn-primary:hover{transform:translateY(-2px); box-shadow:0 18px 44px color-mix(in oklab, var(--accent) 45%, transparent)}
      .btn-outline{border:1px solid var(--primary); color:var(--primary)}
      .btn-outline:hover{background:color-mix(in oklab, var(--primary) 12%, transparent)}

      .nav-link{position:relative; padding:.35rem .6rem; border-radius:.5rem}
      .nav-link.active{color:var(--primary)}
      .nav-link.active::after{
        content:""; position:absolute; left:.6rem; right:.6rem; bottom:-6px; height:2px;
        background:linear-gradient(90deg,var(--accent),var(--primary)); border-radius:2px;
      }

      .card{backdrop-filter: blur(12px); background: var(--surface); border:1px solid var(--ring)}
      .chip{background:color-mix(in oklab, var(--primary) 12%, transparent); border:1px solid var(--ring)}

      .bg-aurora{
        background:${theme.gradient};
        background-size: 200% 200%;
        animation: auroraShift 18s ease-in-out infinite;
      }
      @keyframes auroraShift { 0%{background-position: 0% 0%} 50%{background-position: 100% 50%} 100%{background-position: 0% 0%} }

      .gridlines:before{
        content:""; position:absolute; inset:0; background:
          linear-gradient(to right, rgba(255,255,255,.06) 1px, transparent 1px) 0 0 / 48px 48px,
          linear-gradient(to bottom, rgba(255,255,255,.04) 1px, transparent 1px) 0 0 / 48px 48px;
        mask-image: radial-gradient(ellipse at 50% 20%, black 60%, transparent 80%);
        pointer-events:none;
        animation:gridMove 24s linear infinite;
      }
      @keyframes gridMove { 0%{transform:translateY(0)} 100%{transform:translateY(-48px)} }

      @keyframes float { 0%{transform:translateY(0)} 50%{transform:translateY(-12px)} 100%{transform:translateY(0)} }
      .particle{position:absolute; border-radius:9999px; opacity:.45; filter:blur(.2px); animation: float 6s ease-in-out infinite}

      @keyframes meteor {
        0%{ transform: translate3d(0,-20vh,0); opacity:0 }
        10%{ opacity:1 }
        100%{ transform: translate3d(-40vw,100vh,0); opacity:0 }
      }
      .meteor{
        position:absolute; width:2px; height:60px; background:linear-gradient(to bottom, var(--accent), transparent);
        filter:blur(0.2px); opacity:.8; transform: rotate(25deg);
        animation: meteor 3.8s linear infinite;
      }
      .twinkle{
        position:absolute; width:3px; height:3px; border-radius:9999px; background:var(--text);
        opacity:.35; animation: tw 2.4s ease-in-out infinite;
      }
      @keyframes tw { 0%,100%{opacity:.15; transform:scale(1)} 50%{opacity:.55; transform:scale(1.6)} }

      @keyframes orbit {from {transform: rotate(0deg)} to {transform: rotate(360deg)}}
      .orbit { position:absolute; width:340px; height:340px; border-radius:50%; border:1px dashed var(--ring); animation:orbit 16s linear infinite; }
      .orbit .dot{ position:absolute; width:8px; height:8px; border-radius:9999px; background:var(--accent); top:-4px; left:50%; transform:translateX(-50%); }

      /* ===== Boom (send message) animation ===== */
      .boom {
        position:absolute; left:50%; top:50%;
        width:10px; height:10px; border-radius:9999px;
        background: hsl(var(--hue), 90%, 60%);
        transform: translate(-50%, -50%) rotate(var(--angle));
        box-shadow: 0 0 12px hsl(var(--hue), 90%, 60%);
        animation: boomFly .9s ease-out forwards, boomFade .9s ease-out forwards;
      }
      @keyframes boomFly {
        to { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(220px); }
      }
      @keyframes boomFade {
        0% { opacity: 1; scale: 1; }
        70% { opacity: .9; scale: 1.1; }
        100% { opacity: 0; scale: .8; }
      }
      .boom-ring {
        position:absolute; left:50%; top:50%;
        width:8px; height:8px; border:2px solid var(--accent); border-radius:9999px;
        transform: translate(-50%,-50%);
        animation: ringOut .9s ease-out forwards;
        box-shadow: 0 0 30px color-mix(in oklab, var(--accent) 60%, transparent);
      }
      @keyframes ringOut {
        from { opacity: .9; transform: translate(-50%,-50%) scale(.4); }
        to   { opacity: 0;  transform: translate(-50%,-50%) scale(16); }
      }
    `;
  }, [theme]);

/* ---------- Boom FX overlay ---------- */
const Boom = ({ show }) => {
  if (!show) return null;
  const count = 22;
  const parts = Array.from({ length: count });
  return (
    <div className="fixed inset-0 pointer-events-none z-[70]">
      <div className="relative w-full h-full">
        <span className="boom-ring" />
        {parts.map((_, i) => {
          const angle = (i / count) * 360;
          const hue = (i * 33) % 360;
          const delay = (i % 5) * 0.02;
          return (
            <span
              key={i}
              className="boom"
              style={{
                ["--angle"]: `${angle}deg`,
                ["--hue"]: hue,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "DARK");
  const theme = THEMES[mode];
  const css = useThemeCSS(theme);

  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [toast, setToast] = useState(null);
  const notify = (msg) => { setToast(msg); setTimeout(()=>setToast(null), 2400); };

  // NEW: burst state
  const [burst, setBurst] = useState(false);
  const triggerBurst = () => {
    setBurst(true);
    setTimeout(() => setBurst(false), 1200);
  };

  // SAFE Typed.js — name always visible
  useEffect(() => {
    const el = document.getElementById("typed-name");
    if (!el) return;
    el.textContent = PROFILE.name; // ensure visible immediately

    const typed = new Typed(el, {
      strings: [PROFILE.name],
      typeSpeed: 60,
      backSpeed: 30,
      loop: false,
      showCursor: false,
    });

    return () => {
      try { typed.destroy(); } catch (_) {}
      if (el) el.textContent = PROFILE.name; // restore on cleanup
    };
  }, []); // run once

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
      setShowTop(y > 400);
      let cur = "home";
      for (const s of sections) {
        const off = s.getBoundingClientRect().top + window.scrollY - 140;
        if (y >= off) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = mode === "DARK" ? "LIGHT" : "DARK";
    setMode(next);
    localStorage.setItem("themeMode", next);
    notify(`Switched to ${THEMES[next].label}`);
  };

  // photo auto-detect with cache-bust
  const [heroSrc, setHeroSrc] = useState("/nanda-hero.jpg");
  useEffect(() => {
    const candidates = [
      "/nanda-hero.jpg",
      "/nanda-hero.jpeg",
      "/nanda-hero.jpg.jpeg",
      "/nanda-hero.JPG",
      "/nanda-hero.JPEG",
    ];
    (async () => {
      for (const src of candidates) {
        try {
          const res = await fetch(src + "?v=" + Date.now(), { cache: "no-store" });
          if (res.ok) { setHeroSrc(src + "?v=" + Date.now()); return; }
        } catch {}
      }
      setHeroSrc("https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&q=80");
    })();
  }, []);

  /* Navbar: Home link placed BEFORE About Me */
  const nav = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Me" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Project" },
    { id: "contact", label: "Contact" },
  ];

  const Meteors = () => (
    <div className="pointer-events-none fixed inset-0 -z-5">
      {[...Array(8)].map((_, i) => (
        <div key={"m"+i} className="meteor"
          style={{ left: `${10 + i * 11}%`, top: `${-10 - i * 7}%`, animationDelay: `${i * 0.8}s` }} />
      ))}
      {[...Array(30)].map((_, i) => (
        <div key={"t"+i} className="twinkle"
          style={{ left: `${((i * 37) % 100)}%`, top: `${((i * 19) % 100)}%`, animationDelay: `${(i % 10) * 0.3}s` }} />
      ))}
      <div className="particle" style={{ width: 10, height: 10, left: "10%", top: "30%", background: "var(--primary)", animationDuration: "7s" }} />
      <div className="particle" style={{ width: 14, height: 14, left: "75%", top: "55%", background: "var(--accent)", animationDuration: "6s" }} />
      <div className="particle" style={{ width: 8, height: 8, left: "45%", top: "40%", background: "var(--primary)", animationDuration: "8s" }} />
    </div>
  );

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="fixed inset-0 -z-20 bg-aurora" />
      <div className="fixed inset-0 -z-10 gridlines" />
      <Meteors />
      {/* NEW: Boom overlay */}
      <Boom show={burst} />

      <div className="fixed top-0 left-0 h-1 z-[60]" style={{ width: `${progress}%`, background: "var(--primary)" }} />

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur surface/70 ring">
        <nav className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <span className="font-bold text-xl">P.N. Sathwik Varma</span>
          <div className="flex items-center gap-4 text-sm">
            {nav.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={`nav-link ${active === id ? "active" : ""}`}>
                {label}
              </a>
            ))}
            <a
              href="/NandaSathwikVarma-Resume.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg btn-primary"
              title="Download Resume"
            >
              <FileText className="h-4 w-4" /> Resume
            </a>
            <button onClick={toggleTheme} className="p-2 rounded-full ring" title="Toggle theme">
              {mode === "DARK" ? <Sun /> : <Moon />}
            </button>
          </div>
        </nav>
      </header>

      {/* PAGE-CHANGE OVERLAY */}
      <AnimatePresence mode="wait">
        <motion.div key={active} variants={overlayWipe} initial="initial" animate="animate" exit="initial"
          className="pointer-events-none fixed inset-y-16 left-0 right-0 z-10"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,.06), transparent)" }}
        />
      </AnimatePresence>

      {/* HERO */}
      <section id="home" className="max-w-6xl mx-auto px-6 pt-14 pb-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* stable key so hero never disappears */}
          <AnimatePresence mode="wait">
            <motion.div key="hero" variants={fadeUp} initial="hidden" animate="show" exit="hidden">
              <h1 className="text-5xl sm:text-6xl font-extrabold mb-1"><span id="typed-name" /></h1>
              {/* animated subtitle */}
              <AnimatedText
                text={PROFILE.role}
                className="mt-1 text-2xl block"
                colorVar="--primary"
              />
              <AnimatedText
                text={PROFILE.tagline}
                className="mt-4 block max-w-2xl"
              />

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#projects" className="px-6 py-3 rounded-xl shadow-xl btn-primary">View Projects</a>
                <a href="#contact" className="px-6 py-3 rounded-xl btn-outline">Contact Me</a>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm">
                <span className="inline-flex items-center gap-2 text-muted">
                  <MapPin className="h-4 w-4" /> {PROFILE.location}
                </span>
                <a href={`tel:${PROFILE.phone}`} className="inline-flex items-center gap-1 hover:opacity-80">
                  <Phone className="h-4 w-4" /> {PROFILE.phone}
                </a>
                <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1 hover:opacity-80">
                  <Mail className="h-4 w-4" /> Mail
                </a>
                <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:opacity-80">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:opacity-80">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative flex justify-center md:justify-end z-0">
            <div className="absolute w-[300px] h-[300px] rounded-full blur-2xl opacity-40 -z-10"
                 style={{ background: "radial-gradient(60% 60% at 50% 40%, var(--accent), transparent 60%)" }} />
            <div className="orbit -z-10"><div className="dot" /></div>
            <img
              src={heroSrc}
              alt="P.N. Sathwik Varma"
              className="relative w-[280px] h-[280px] object-cover rounded-full ring z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-10">
        <AnimatedText text="About me" className="text-3xl font-bold mb-6 block" colorVar="--primary" />
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="p-6 rounded-2xl card leading-7 space-y-3">
          <AnimatedText
            text="I’m a Full-Stack, Python and Machine Learning developer focused on clean architecture and performance. I build modern UIs in React + Tailwind, secure APIs in Node/Express, and data-driven features in MongoDB / PostgreSQL."
            className="block"
          />
          <AnimatedText
            text="In ML, I work with NumPy, Pandas, scikit-learn for data prep, feature engineering and classical models, and deploy lightweight inference services. I love delivering fast, accessible web apps with great UX."
            className="block"
          />
          <AnimatedText
            text="I serve as an Executive Body Member at ISTE — organizing workshops, hackathons and mentoring peers."
            className="block"
          />
        </motion.div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="max-w-6xl mx-auto px-6 py-12">
        <AnimatedText text="Education" className="text-3xl font-bold mb-6 block" colorVar="--primary" />
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl card">
            <h4 className="text-xl font-semibold">B.Tech in CSE (AIML)</h4>
            <p className="text-muted mt-1">Sagi Rama Krishnam Raju Engineering College, 2023 – Present</p>
            <p className="mt-2">Current CGPA: <b>8.48</b>. Courses: DS & Algo, ML, DBMS, OS, Web Tech, Cloud Basics.</p>
          </div>
          <div className="p-6 rounded-2xl card">
            <h4 className="text-xl font-semibold">Intermediate (MPC)</h4>
            <p className="text-muted mt-1">Sasi Junior College, 2021 – 2023</p>
            <p className="mt-2">Percentage: <b>94.5%</b>. Focus: Mathematics, Physics, Chemistry.</p>
          </div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
        <AnimatedText text="Skills" className="text-3xl font-bold mb-10 text-center block" />
        <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 place-items-center">
          {SKILLS.map((s) => (
            <div key={s.name} className="p-5 rounded-2xl card text-center w-full hover:scale-[1.03] transition">
              <img src={s.img} alt={s.name} className="w-12 h-12 mx-auto mb-2" />
              <div className="font-semibold">{s.name}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <AnimatedText text="My Projects" className="text-3xl font-bold mb-10 text-center block" />
        <div className="grid md:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <motion.div key={i} variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="rounded-2xl p-6 card hover:scale-[1.02] transition">
              <div className="mb-2" style={{ color: "var(--primary)" }}>Project {i}</div>
              <h4 className="text-xl font-semibold">Project Title {i}</h4>
              <p className="mt-2 text-muted">Short description of the project goes here.</p>
              <div className="mt-4 flex gap-2 text-xs">
                <span className="px-2 py-1 rounded chip">React</span>
                <span className="px-2 py-1 rounded chip">Node</span>
                <span className="px-2 py-1 rounded chip">MongoDB</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT — wired to Formspree + BOOM on click */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
        <AnimatedText text="Contact" className="text-3xl font-bold mb-8 text-center block" />
        <motion.form
          variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="max-w-xl mx-auto grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.target;
            const fd = new FormData(form);
            try {
              const res = await fetch("https://formspree.io/f/xldarwle", {
                method: "POST",
                headers: { Accept: "application/json" },
                body: fd,
              });
              if (!res.ok) throw new Error("Formspree error");
              form.reset();
              alert("✅ Message sent via Formspree!");
            } catch (err) {
              alert("❌ Could not send message. Please try again.");
              console.error(err);
            }
          }}
        >
          <input name="name" required placeholder="Your Name" className="p-3 rounded-lg card" />
          <input name="email" type="email" required placeholder="Your Email" className="p-3 rounded-lg card" />
          <textarea name="message" rows={5} required placeholder="Your Message" className="p-3 rounded-lg card" />
          <button
            className="px-6 py-3 rounded-xl shadow-xl btn-primary"
            onClick={() => triggerBurst()} // << boom!
          >
            Send Message
          </button>

          {/* icon-only contacts (no text) */}
          <div className="mt-6 flex justify-center gap-5">
            <a href={`tel:${PROFILE.phone}`} title="Call" className="p-2 rounded-full ring hover:scale-110 transition">
              <Phone className="h-5 w-5" />
            </a>
            <a href={`mailto:${PROFILE.email}`} title="Email" className="p-2 rounded-full ring hover:scale-110 transition">
              <Mail className="h-5 w-5" />
            </a>
            <a href={PROFILE.socials.github} target="_blank" rel="noreferrer" title="GitHub" className="p-2 rounded-full ring hover:scale-110 transition">
              <Github className="h-5 w-5" />
            </a>
            <a href={PROFILE.socials.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="p-2 rounded-full ring hover:scale-110 transition">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </motion.form>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-muted">
        © {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.
      </footer>

      {/* WhatsApp & Back to top */}
      <a
        href={`https://wa.me/919014749657?text=${encodeURIComponent("Hi! I saw your portfolio and would like to connect.")}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-[60] rounded-full p-3 text-white shadow-xl hover:scale-110 transition"
        style={{ background: "#25D366" }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-[60] rounded-full p-3 shadow-xl hover:scale-110 transition"
          style={{ background: "color-mix(in oklab, var(--primary) 15%, var(--bg))" }}
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* tiny toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-xl surface ring">
          {toast}
        </div>
      )}
    </div>
  );
}
