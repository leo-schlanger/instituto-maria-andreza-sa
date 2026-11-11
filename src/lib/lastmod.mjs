import { execFileSync } from "node:child_process";

// Sitemap lastmod: last commit that touched the files behind each route.
// Falls back to the build time when git history is missing (shallow or no clone).

const shared = ["src/data/site.ts"];
const legal = { "/privacidade/": "docs/PRIVACIDADE.md", "/cookies/": "docs/COOKIES.md", "/termos/": "docs/TERMOS.md" };
const pageFile = {
  "/": "src/pages/index.astro",
  "/associacao/": "src/pages/associacao.astro",
  "/cultura/": "src/pages/cultura.astro",
  "/portugal-e-brasil/": "src/pages/portugal-e-brasil.astro",
  "/projetos/": "src/pages/projetos/index.astro",
  "/noticias/": "src/pages/noticias.astro",
  "/contactos/": "src/pages/contactos.astro",
};

export function sourcesFor(pathname) {
  if (legal[pathname]) return [legal[pathname]];
  if (pathname.startsWith("/projetos/") && pathname !== "/projetos/") {
    return ["src/data/eventos.ts", "src/data/eventos-fotos.ts", "src/pages/projetos/[slug].astro"];
  }
  if (pathname === "/projetos/") return [pageFile[pathname], "src/data/eventos.ts", ...shared];
  return [pageFile[pathname], ...shared].filter(Boolean);
}

const cache = new Map();

export function lastModified(pathname) {
  const files = sourcesFor(pathname);
  const key = files.join("|");
  if (!cache.has(key)) {
    let iso = "";
    try {
      iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...files], { encoding: "utf8" }).trim();
    } catch {
      iso = "";
    }
    cache.set(key, iso ? new Date(iso).toISOString() : new Date().toISOString());
  }
  return cache.get(key);
}
