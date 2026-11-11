import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const dist = path.resolve("dist");

// Lei 10/2024, art. 12.º: the association cannot present legal advice or defence as its own service.
// Allowed: the founder's own biography and negated sentences in the terms ("Não presta consulta jurídica…").
const BANNED = /apoio jurídico|defesa jurídica|suporte jurídico|consulta jurídica|representação (jurídica|legal|em tribunal)|representa(?:mos)? em tribunal/gi;

function htmlFiles(dir = dist, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

test("sem serviço jurídico atribuído ao Instituto", async () => {
  assert.ok(existsSync(path.join(dist, "index.html")), "dist/ em falta. Corre npm run build antes de npm test.");
  const { founder } = await import("../src/data/site.ts");
  const hits = [];
  for (const file of htmlFiles()) {
    let text = readFileSync(file, "utf8").replace(/<[^>]+>/g, " ").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    for (const p of founder.bio) text = text.split(p).join(" ");
    text = text.replace(/Não [^.]*\./g, " ");
    for (const m of text.matchAll(BANNED)) hits.push(`${path.relative(dist, file)}: ${m[0]}`);
  }
  assert.deepEqual(hits, []);
});

test("títulos e índices legais sem o formulário retirado", () => {
  for (const file of ["privacidade/index.html", "termos/index.html"]) {
    const html = readFileSync(path.join(dist, file), "utf8");
    const toc = html.match(/<nav class="toc"[\s\S]*?<\/nav>/);
    if (toc) assert.equal(/formul/i.test(toc[0]), false, file);
  }
});
