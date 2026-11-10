import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptTag = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

function asPath(dir) {
  if (dir instanceof URL) return fileURLToPath(dir);
  if (typeof dir === "string" && dir.startsWith("file:")) return fileURLToPath(dir);
  return dir;
}

async function htmlFiles(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await htmlFiles(full, out);
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

// Astro inlines the island boot as a classic script. CSP only allows src="/_astro/…".
export function externalizeInlineScripts() {
  return {
    name: "externalize-inline-scripts",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = asPath(dir);
        const files = await htmlFiles(root);
        const bodies = new Map();
        for (const file of files) {
          const html = await readFile(file, "utf8");
          const next = html.replace(scriptTag, (full, attrs, body) => {
            if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) return full;
            if (/(?:^|\s)src\s*=/.test(attrs)) return full;
            if (!body.trim()) return full;
            let name = bodies.get(body);
            if (!name) {
              const hash = createHash("sha256").update(body).digest("hex").slice(0, 16);
              name = `boot.${hash}.js`;
              bodies.set(body, name);
            }
            const extra = attrs.trim();
            return extra ? `<script src="/_astro/${name}" ${extra}></script>` : `<script src="/_astro/${name}"></script>`;
          });
          if (next !== html) await writeFile(file, next);
        }
        const astroDir = path.join(root, "_astro");
        for (const [body, name] of bodies) {
          await writeFile(path.join(astroDir, name), body);
        }
      },
    },
  };
}
