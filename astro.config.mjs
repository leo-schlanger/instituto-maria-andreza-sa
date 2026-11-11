// @ts-check
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import { externalizeInlineScripts } from "./src/lib/externalize-scripts.mjs";

const site = "https://mariaandrezasa.org";
const src = fileURLToPath(new URL("./src", import.meta.url));

const indexable = new Set([
  "/",
  "/associacao/",
  "/cultura/",
  "/portugal-e-brasil/",
  "/projetos/",
  "/noticias/",
  "/contactos/",
  "/privacidade/",
  "/cookies/",
  "/termos/",
]);

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "never" },
  compressHTML: true,
  integrations: [
    react(),
    externalizeInlineScripts(),
    sitemap({
      filter: (page) => {
        const p = new URL(page).pathname;
        return indexable.has(p) || /^\/projetos\/[a-z0-9-]+\/$/.test(p);
      },
      namespaces: { news: false, xhtml: false, image: false, video: false },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [{ find: /^@\//, replacement: `${src}/` }],
    },
    // Fonts stay files. A data: URI would need font-src data:, which the CSP does not allow.
    build: { assetsInlineLimit: 0 },
  },
});
