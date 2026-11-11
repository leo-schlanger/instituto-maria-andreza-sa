import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const dist = path.resolve("dist");
const site = "https://mariaandrezasa.org";
const orgId = `${site}/#organizacao`;

function htmlFiles(dir = dist, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

// Indexable pages with the route each one is served at.
function pages() {
  assert.ok(existsSync(path.join(dist, "index.html")), "dist/ em falta. Corre npm run build antes de npm test.");
  return htmlFiles()
    .filter((file) => path.basename(file) === "index.html")
    .map((file) => {
      const rel = path.relative(dist, path.dirname(file)).split(path.sep).join("/");
      const route = rel ? `/${rel}/` : "/";
      return { file, route, html: readFileSync(file, "utf8") };
    });
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, attr, name) => {
  const m = html.match(new RegExp(`<meta ${attr}="${name.replace(/[.:]/g, "\\$&")}" content="([^"]*)"`));
  return m ? decode(m[1]) : undefined;
};
const title = (html) => decode(html.match(/<title>([^<]*)<\/title>/)[1]);

function jsonLd(html) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(blocks.length, 1, "um bloco JSON-LD por página");
  const data = JSON.parse(blocks[0][1]);
  assert.equal(data["@context"], "https://schema.org");
  assert.ok(Array.isArray(data["@graph"]));
  return data["@graph"];
}
const byType = (graph, type) => graph.filter((n) => n["@type"] === type);

test("JSON-LD da associação e do site em todas as páginas indexáveis", async () => {
  const { nipc, instagramOficialUrl, foundingDate, registeredName, publicName, contactEmail, contactPhone } = await import("../src/data/site.ts");
  for (const page of pages()) {
    const graph = jsonLd(page.html);
    const [org] = byType(graph, "Organization");
    assert.ok(org, `${page.route} sem Organization`);
    assert.equal(org["@id"], orgId);
    assert.equal(org.name, publicName);
    assert.equal(org.legalName, registeredName);
    assert.ok(org.alternateName.includes("Instituto Maria Andreza Sá"));
    assert.equal(org.url, `${site}/`);
    assert.equal(org.logo.url, `${site}/brand/logo.webp`);
    assert.equal(org.taxID, nipc);
    assert.equal(org.foundingDate, foundingDate);
    assert.match(org.foundingDate, /^\d{4}-\d{2}-\d{2}$/);
    // The seat address is not published (2026-11-11); contact is e-mail and phone.
    assert.equal(Object.hasOwn(org, "address"), false);
    assert.equal(org.email, contactEmail);
    assert.equal(org.telephone, contactPhone);
    assert.equal(org.contactPoint.email, contactEmail);
    assert.equal(org.contactPoint.telephone, contactPhone);
    if (instagramOficialUrl) assert.deepEqual(org.sameAs, [instagramOficialUrl]);
    else assert.equal(Object.hasOwn(org, "sameAs"), false);
    assert.equal(JSON.stringify(graph).includes("festasantabarbaralx"), false, page.route);

    const [website] = byType(graph, "WebSite");
    assert.equal(website.url, `${site}/`);
    assert.equal(website.inLanguage, "pt-PT");
    assert.deepEqual(website.publisher, { "@id": orgId });

    const webPage = graph.find((n) => /Page$/.test(n["@type"]));
    assert.ok(webPage, page.route);
    assert.equal(webPage.url, site + page.route);
    assert.equal(webPage.name, title(page.html));
    assert.equal(webPage.description, meta(page.html, "name", "description"));
  }
});

test("factos do JSON-LD estão visíveis no site", async () => {
  const { nipc, contactEmail, publicName } = await import("../src/data/site.ts");
  const assoc = pages().find((p) => p.route === "/associacao/").html;
  assert.ok(decode(assoc).includes(publicName));
  const contactos = pages().find((p) => p.route === "/contactos/").html;
  assert.ok(contactos.includes(contactEmail));
  assert.ok(contactos.includes("+351 968 050 922"));
  assert.ok(assoc.includes("30 de junho de 2025"));
  const legal = pages().find((p) => p.route === "/privacidade/").html;
  assert.ok(legal.includes(nipc), "NIPC tem de estar na privacidade");
});

test("BreadcrumbList nas páginas interiores segue as migalhas visíveis", () => {
  for (const page of pages()) {
    const crumbs = byType(jsonLd(page.html), "BreadcrumbList");
    if (page.route === "/") {
      assert.equal(crumbs.length, 0);
      continue;
    }
    assert.equal(crumbs.length, 1, page.route);
    const items = crumbs[0].itemListElement;
    assert.ok(items.length >= 2, page.route);
    items.forEach((item, i) => assert.equal(item.position, i + 1));
    assert.deepEqual([items[0].name, items[0].item], ["Início", `${site}/`]);
    assert.equal(items.at(-1).item, site + page.route);
    const nav = page.html.match(/<nav class="crumbs" aria-label="Localização">([\s\S]*?)<\/nav>/);
    assert.ok(nav, `${page.route} sem migalhas visíveis`);
    const visible = [...nav[1].matchAll(/<(?:a|span aria-current="page")[^>]*>([^<]*)<\/(?:a|span)>/g)].map((m) => decode(m[1]).trim());
    assert.deepEqual(items.map((i) => i.name), visible, page.route);
  }
});

test("Event nas páginas de evento", async () => {
  const { eventos } = await import("../src/data/eventos.ts");
  const { fotosPorEvento } = await import("../src/data/eventos-fotos.ts");
  for (const evento of eventos) {
    const page = pages().find((p) => p.route === `/projetos/${evento.slug}/`);
    assert.ok(page, evento.slug);
    assert.equal(meta(page.html, "property", "og:type"), "article");
    const events = byType(jsonLd(page.html), "Event");
    if (!evento.inicio) {
      assert.equal(events.length, 0);
      continue;
    }
    assert.equal(events.length, 1);
    const ev = events[0];
    assert.equal(ev.name, evento.titulo);
    assert.equal(ev.url, site + page.route);
    assert.match(ev.startDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(ev.endDate, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(ev.startDate <= ev.endDate);
    // ISO dates must match the visible date text ("4 a 6 de setembro de 2026").
    const [y, , d1] = ev.startDate.split("-").map(Number);
    const d2 = Number(ev.endDate.split("-")[2]);
    assert.ok(evento.data.includes(String(y)) && evento.data.includes(String(d1)) && evento.data.includes(String(d2)), evento.data);
    assert.equal(ev.eventStatus, "https://schema.org/EventScheduled");
    assert.equal(ev.eventAttendanceMode, "https://schema.org/OfflineEventAttendanceMode");
    assert.equal(ev.location.name, evento.local);
    assert.ok(ev.location.address.addressLocality);
    assert.equal(ev.organizer["@id"], orgId);
    const fotos = fotosPorEvento[evento.slug] ?? [];
    if (fotos.length === 0) assert.equal(Object.hasOwn(ev, "image"), false);
    else assert.equal(ev.image.length, fotos.length);
  }
});

test("title e description únicos e com tamanho de SERP", () => {
  const titles = new Map();
  const descriptions = new Map();
  for (const page of pages()) {
    const t = title(page.html);
    const d = meta(page.html, "name", "description");
    assert.ok(t.length >= 10 && t.length <= 60, `${page.route} title com ${t.length}`);
    assert.ok(d && d.length >= 50 && d.length <= 160, `${page.route} description com ${d?.length}`);
    assert.ok(!titles.has(t), `title repetido em ${page.route} e ${titles.get(t)}`);
    assert.ok(!descriptions.has(d), `description repetida em ${page.route} e ${descriptions.get(d)}`);
    titles.set(t, page.route);
    descriptions.set(d, page.route);
  }
});

test("canonical, og e twitter por rota no host final", () => {
  for (const page of pages()) {
    const canonical = site + page.route;
    const links = [...page.html.matchAll(/rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
    assert.deepEqual(links, [canonical], page.route);
    assert.equal(meta(page.html, "property", "og:url"), canonical);
    assert.equal(meta(page.html, "property", "og:title"), title(page.html));
    assert.equal(meta(page.html, "property", "og:description"), meta(page.html, "name", "description"));
    assert.equal(meta(page.html, "property", "og:locale"), "pt_PT");
    assert.equal(meta(page.html, "name", "twitter:title"), title(page.html));
    assert.equal(meta(page.html, "name", "twitter:image"), `${site}/og.jpg`);
    assert.ok(meta(page.html, "property", "og:image:alt"));
    assert.match(meta(page.html, "name", "robots"), /^index, follow/);
    assert.match(page.html, /<meta name="theme-color" content="#[0-9A-Fa-f]{6}">/);
  }
});

test("404 sem índice e sem JSON-LD", () => {
  const html = readFileSync(path.join(dist, "404.html"), "utf8");
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.equal(html.includes("application/ld+json"), false);
  assert.equal(html.includes('property="og:url"'), false);
});

test("sitemap com lastmod, sem 404, igual às páginas indexáveis", () => {
  const index = readFileSync(path.join(dist, "sitemap-index.xml"), "utf8");
  assert.ok(index.includes(`<loc>${site}/sitemap-0.xml</loc>`));
  const xml = readFileSync(path.join(dist, "sitemap-0.xml"), "utf8");
  const urls = [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)];
  assert.equal(urls.length, (xml.match(/<url>/g) || []).length, "todas as URLs com lastmod");
  const now = Date.now() + 60_000;
  for (const [, , lastmod] of urls) {
    assert.match(lastmod, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    assert.ok(Date.parse(lastmod) <= now, lastmod);
  }
  const locs = urls.map((u) => u[1]).sort();
  assert.deepEqual(locs, pages().map((p) => site + p.route).sort());
  assert.equal(locs.some((l) => l.includes("404")), false);
  for (const legal of ["/privacidade/", "/cookies/", "/termos/"]) assert.ok(locs.includes(site + legal), legal);
});

test("robots.txt aponta para o sitemap do host final", () => {
  const robots = readFileSync(path.join(dist, "robots.txt"), "utf8");
  assert.match(robots, /^User-agent: \*$/m);
  assert.doesNotMatch(robots, /^Disallow: \/\s*$/m);
  assert.match(robots, new RegExp(`^Sitemap: ${site.replace(/\./g, "\\.")}/sitemap-index\\.xml$`, "m"));
});

test("headings sem saltos, imagens com alt e dimensões, links externos com rel", () => {
  for (const file of htmlFiles()) {
    const html = readFileSync(file, "utf8");
    const rel = path.relative(dist, file);
    const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
    assert.equal(levels.filter((l) => l === 1).length, 1, `${rel} H1`);
    assert.equal(levels[0], 1, `${rel} começa sem H1`);
    levels.forEach((l, i) => i > 0 && assert.ok(l <= levels[i - 1] + 1, `${rel} salta de h${levels[i - 1]} para h${l}`));
    for (const img of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(img[0], /\salt(=|\s|>)/, `${rel} img sem alt`);
      assert.match(img[0], /\swidth="\d+"/, `${rel} img sem width`);
      assert.match(img[0], /\sheight="\d+"/, `${rel} img sem height`);
    }
    for (const a of html.matchAll(/<a\b[^>]*href="https?:\/\/(?!mariaandrezasa\.org)[^"]*"[^>]*>/g)) {
      assert.match(a[0], /rel="[^"]*noopener/, `${rel} ${a[0]}`);
    }
    for (const a of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) {
      const text = a[1].replace(/<[^>]+>/g, "").trim().toLowerCase();
      assert.ok(!["ler mais", "clique aqui", "aqui", "saber mais"].includes(text), `${rel} âncora vaga: ${text}`);
    }
  }
});

test("preload das fontes do H1 e do texto aponta para ficheiros do build", () => {
  const html = readFileSync(path.join(dist, "index.html"), "utf8");
  const fonts = [...html.matchAll(/<link rel="preload" href="([^"]+)" as="font" type="font\/woff2" crossorigin>/g)].map((m) => m[1]);
  assert.equal(fonts.length, 2);
  const css = readdirSync(path.join(dist, "_astro"))
    .filter((f) => f.endsWith(".css"))
    .map((f) => readFileSync(path.join(dist, "_astro", f), "utf8"))
    .join("\n");
  for (const href of fonts) {
    assert.ok(existsSync(path.join(dist, href)), href);
    assert.ok(css.includes(href), `${href} não é o ficheiro que o CSS usa`);
  }
  assert.ok(fonts.some((f) => /playfair-display-latin-500-normal/.test(f)));
  assert.match(css, /font-display:swap/);
});
