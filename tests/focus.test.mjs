import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const dist = path.resolve("dist");
const astro = path.join(dist, "_astro");

// Dark brand surfaces. A focus ring in the default bordeaux is invisible on them (1.00:1 and 1.31:1).
const DARK = /#(6d1723|4e0912|8a2733)\b/i;

function siteCss() {
  assert.ok(existsSync(astro), "dist/_astro em falta. Corre npm run build antes de npm test.");
  return readdirSync(astro)
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(path.join(astro, f), "utf8"))
    .join("\n");
}

// Innermost "selector{body}" pairs; @media wrappers are skipped because their body holds braces.
function rules(css) {
  return [...css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((m) => ({
    selectors: m[1].split(",").map((s) => s.trim()),
    body: m[2],
  }));
}

// Subject class of a selector: the last ".class" in it, ignoring pseudo parts.
const subjectClass = (sel) => {
  const classes = [...sel.replace(/::?[a-z-]+(\([^)]*\))?/gi, "").matchAll(/\.([A-Za-z0-9_-]+)/g)].map((m) => m[1]);
  return classes.at(-1);
};

// Focusable elements that are themselves dark (their ring sits on the light page around them).
const SELF_FOCUSABLE = new Set(["skip-link"]);

test("toda a superfície escura redefine a cor do anel de foco", () => {
  const all = rules(siteCss());
  const withFocus = new Set();
  for (const r of all) {
    if (/--focus\s*:\s*#f8f4ea/i.test(r.body) && /--color-ring\s*:\s*#f8f4ea/i.test(r.body)) {
      for (const s of r.selectors) {
        const c = subjectClass(s);
        if (c) withFocus.add(c);
      }
    }
  }
  const missing = new Set();
  for (const r of all) {
    if (!/background(-color|-image)?\s*:[^;]*/i.test(r.body)) continue;
    const bg = r.body.match(/background(?:-color|-image)?\s*:([^;]*)/gi).join(" ");
    if (!DARK.test(bg)) continue;
    for (const s of r.selectors) {
      if (/::selection|::before|::after/.test(s)) continue;
      const c = subjectClass(s);
      if (s.includes("\\")) continue;
      if (!c || SELF_FOCUSABLE.has(c)) continue;
      // Tailwind utilities (bg-*) colour buttons, not containers.
      if (/^(bg|hover|focus|data|aria)-/.test(c) || c.includes("\\:")) continue;
      if (!withFocus.has(c)) missing.add(c);
    }
  }
  assert.deepEqual([...missing], []);
});

test("o anel de foco global usa a variável", () => {
  const css = siteCss();
  assert.match(css, /:focus-visible\{[^}]*outline:2px solid var\(--focus\)/);
  assert.match(css, /:root\{[^}]*--focus:#6d1723/);
});
