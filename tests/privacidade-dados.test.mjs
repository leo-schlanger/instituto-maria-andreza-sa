import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(".");
const roots = ["src", "public", "docs"];
const binary = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".otf", ".pdf", ".zip"]);
const email = /[A-Za-z0-9][A-Za-z0-9._%+-]*@[A-Za-z][A-Za-z0-9.-]*\.[A-Za-z]{2,}/;
const postal = /(?<!\d)\d{4}-\d{3}(?!\d)/g;
const cnpdPostal = "1200-651";

function filesIn(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel = path.relative(root, full).split(path.sep).join("/");
    if (rel === "docs/marca" || rel.startsWith("docs/marca/")) continue;
    if (statSync(full).isDirectory()) {
      filesIn(full, out);
      continue;
    }
    if (binary.has(path.extname(entry).toLowerCase())) continue;
    out.push({ full, rel });
  }
  return out;
}

function passaporteAllowed(rel, line) {
  if (rel === "docs/CONTEUDO.md" && line.trim() === "Passaporte.") return true;
  if (rel === "docs/ARQUITETURA.md" && line.includes("`passaporte`")) return true;
  return false;
}

test("sem e-mail, passaporte, campus ou morada privada", () => {
  const hits = [];
  for (const folder of roots) {
    for (const file of filesIn(path.join(root, folder))) {
      const text = readFileSync(file.full, "utf8");
      const lines = text.split(/\r?\n/);
      lines.forEach((line, index) => {
        const where = `${file.rel}:${index + 1}`;
        if (email.test(line)) hits.push(`${where} e-mail`);
        if (/passaporte/i.test(line) && !passaporteAllowed(file.rel, line)) hits.push(`${where} passaporte`);
        if (/campus\.ul\.pt/i.test(line)) hits.push(`${where} campus`);
        for (const code of line.matchAll(postal)) {
          if (code[0] !== cnpdPostal) hits.push(`${where} código postal`);
        }
      });
    }
  }
  assert.deepEqual(hits, []);
});
