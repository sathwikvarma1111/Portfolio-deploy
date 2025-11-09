// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ✅ Configuration for GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: "/Portfolio-deploy/",
});
