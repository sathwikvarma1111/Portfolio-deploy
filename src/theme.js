// ————————————————————————————————————————
// AURORA NEON PRO — premium + attractive palettes
// Dark: carbon + violet + teal glow
// Light: soft gray + royal blue + cyan
// ————————————————————————————————————————

const THEMES = {
  DARK: {
    label: "Aurora Neon Pro (Dark)",
    bg: "#0E1014",            // carbon
    surface: "rgba(255,255,255,0.06)",
    text: "#E6F1FF",          // soft white
    primary: "#8B5CF6",       // violet
    accent: "#06B6D4",        // teal
    muted: "#9AA4AE",
    ring: "rgba(255,255,255,.14)",
    gradient: `
      radial-gradient(40% 60% at 0% 0%, rgba(139,92,246,.25), transparent 60%),
      radial-gradient(50% 70% at 100% 40%, rgba(6,182,212,.18), transparent 60%)
    `,
  },
  LIGHT: {
    label: "Aurora Neon Pro (Light)",
    bg: "#F5F7FB",            // soft light gray
    surface: "rgba(255,255,255,0.9)",
    text: "#212936",          // near-black
    primary: "#2563EB",       // royal blue
    accent: "#22D3EE",        // cyan
    muted: "#6B7280",
    ring: "rgba(0,0,0,.12)",
    gradient: `
      radial-gradient(40% 60% at 0% 0%, rgba(37,99,235,.18), transparent 60%),
      radial-gradient(50% 70% at 100% 40%, rgba(34,211,238,.14), transparent 60%)
    `,
  },
};

export default THEMES;
