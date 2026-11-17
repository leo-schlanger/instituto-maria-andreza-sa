import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(".");
const dist = path.join(root, "dist");

test("a home apresenta os parceiros, sem a campanha ainda por acontecer", () => {
  const html = readFileSync(path.join(dist, "index.html"), "utf8");
  const section = html.match(/<section class="partners[\s\S]*?<\/section>/);
  assert.ok(section, "falta a secção de parceiros na home");
  const block = section[0];
  assert.match(block, /Associação Comadres de Cascais/);
  assert.match(block, /href="https:\/\/comadresdecascais\.com\/"/);
  assert.match(block, /target="_blank"/);
  assert.match(block, /rel="noopener"/);
  assert.match(block, /src="\/parceiros\/comadres-de-cascais\.svg"/);
  assert.equal(/pijama/i.test(block), false);
  const logo = readFileSync(path.join(root, "public/parceiros/comadres-de-cascais.svg"), "utf8");
  assert.equal(/<script/i.test(logo), false);
  assert.equal(/https?:\/\/(?!www\.w3\.org)/i.test(logo), false);
});
