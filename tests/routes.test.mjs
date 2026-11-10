import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const dist = path.resolve("dist");

const pages = [
  {
    file: "index.html",
    title: "Instituto Maria Andreza Sá",
    h1: "Instituto Associativo Cultural & Artístico Luso-Brasileiro",
    canonical: "https://mariaandrezasa.org/",
  },
  {
    file: "associacao/index.html",
    title: "A associação | Maria Andreza Sá",
    h1: "A associação",
    canonical: "https://mariaandrezasa.org/associacao/",
  },
  {
    file: "cultura/index.html",
    title: "Cultura | Maria Andreza Sá",
    h1: "Cultura",
    canonical: "https://mariaandrezasa.org/cultura/",
  },
  {
    file: "portugal-e-brasil/index.html",
    title: "Portugal e Brasil | Maria Andreza Sá",
    h1: "Portugal e Brasil",
    canonical: "https://mariaandrezasa.org/portugal-e-brasil/",
  },
  {
    file: "projetos/index.html",
    title: "Projetos | Maria Andreza Sá",
    h1: "Projetos em preparação",
    canonical: "https://mariaandrezasa.org/projetos/",
  },
  {
    file: "noticias/index.html",
    title: "Notícias | Maria Andreza Sá",
    h1: "Notícias",
    canonical: "https://mariaandrezasa.org/noticias/",
  },
  {
    file: "contactos/index.html",
    title: "Contactos | Maria Andreza Sá",
    h1: "Contactos",
    canonical: "https://mariaandrezasa.org/contactos/",
  },
  {
    file: "privacidade/index.html",
    title: "Política de privacidade | Maria Andreza Sá",
    h1: "Política de privacidade",
    canonical: "https://mariaandrezasa.org/privacidade/",
  },
  {
    file: "cookies/index.html",
    title: "Política de cookies | Maria Andreza Sá",
    h1: "Política de cookies",
    canonical: "https://mariaandrezasa.org/cookies/",
  },
  {
    file: "termos/index.html",
    title: "Termos de utilização | Maria Andreza Sá",
    h1: "Termos de utilização",
    canonical: "https://mariaandrezasa.org/termos/",
  },
];

function readPage(file) {
  const full = path.join(dist, file);
  assert.ok(existsSync(full), `falta ${file}. Corre npm run build antes de npm test.`);
  return readFileSync(full, "utf8");
}

function innerText(html, tag) {
  const match = html.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  assert.ok(match, `falta <${tag}>`);
  return match[1].replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

test("dist existe", () => {
  assert.ok(existsSync(path.join(dist, "index.html")), "dist/ em falta. Corre npm run build antes de npm test.");
});

test("rotas indexáveis", () => {
  for (const page of pages) {
    const html = readPage(page.file);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, page.file);
    assert.equal((html.match(/<title[\s>]/g) || []).length, 1, page.file);
    assert.equal(innerText(html, "title"), page.title, page.file);
    assert.equal(innerText(html, "h1"), page.h1, page.file);
    assert.match(html, /<html lang="pt-PT">/);
    assert.match(html, new RegExp(`rel="canonical" href="${page.canonical}"`));
    assert.match(html, /property="og:title"/);
    assert.match(html, /property="og:description"/);
    assert.match(html, new RegExp(`property="og:url" content="${page.canonical}"`));
    assert.match(html, /property="og:image" content="https:\/\/mariaandrezasa\.org\/og\.jpg"/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.match(html, /Maria Andreza Sá/);
  }
});

test("canonical da home", () => {
  const html = readPage("index.html");
  assert.match(html, /rel="canonical" href="https:\/\/mariaandrezasa\.org\/"/);
  const json = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(json, "JSON-LD só na home");
  const data = JSON.parse(json[1]);
  assert.deepEqual(Object.keys(data).sort(), ["@context", "@type", "logo", "name", "sameAs", "url"]);
  assert.equal(data["@type"], "Organization");
  assert.equal(data.url, "https://mariaandrezasa.org/");
  assert.equal(data.logo, "https://mariaandrezasa.org/brand/logo.webp");
  assert.deepEqual(data.sameAs, ["https://www.instagram.com/festasantabarbaralx/"]);
  for (const key of ["address", "email", "taxID", "telephone"]) {
    assert.equal(Object.hasOwn(data, key), false, key);
  }
});

test("JSON-LD não sai da home", () => {
  for (const page of pages) {
    if (page.file === "index.html") continue;
    const html = readPage(page.file);
    assert.equal(html.includes("application/ld+json"), false, page.file);
  }
});

test("404", () => {
  const html = readPage("404.html");
  assert.equal((html.match(/<h1[\s>]/g) || []).length, 1);
  assert.equal(innerText(html, "h1"), "Página não encontrada");
  assert.match(html, /<title>Página não encontrada<\/title>/);
  assert.match(html, /<meta name="robots" content="noindex">/);
  assert.equal(html.includes('rel="canonical"'), false);
  assert.match(html, /href="\/"/);
});

test("contactos com formulário morto", () => {
  const html = readPage("contactos/index.html");
  assert.match(html, /Este formulário está desativado\. Não envia a mensagem, não a guarda e ninguém a recebe\. Para falar com a associação, use o Instagram\./);
  const form = html.match(/<form\b[^>]*>/i);
  assert.ok(form);
  assert.doesNotMatch(form[0], /\baction=/i);
  assert.doesNotMatch(form[0], /\bmethod=/i);
  assert.match(html, /<fieldset[^>]*\bdisabled\b/);
  assert.match(html, /<button[^>]*\bdisabled\b[^>]*>Enviar<\/button>|<button[^>]*\bdisabled\b[^>]*>[\s\S]*?Enviar/);
  assert.match(html, /<label[^>]*for="nome"/);
  assert.match(html, /<label[^>]*for="email"/);
  assert.match(html, /<label[^>]*for="mensagem"/);
  assert.equal(html.includes("fetch("), false);
});

test("projetos sem lista fictícia", () => {
  const html = readPage("projetos/index.html");
  assert.match(html, /aria-label="Sem lista de eventos"/);
  assert.equal(html.includes("<article"), false);
  assert.equal(html.includes("<time"), false);
  assert.equal((html.match(/<ul[\s>]/g) || []).length, 0);
});

test("scripts externos e sem fontes de terceiros", () => {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else files.push(full);
    }
  };
  walk(dist);
  const textFiles = files.filter((file) => /\.(html|css|js|mjs)$/.test(file));
  for (const file of textFiles) {
    const text = readFileSync(file, "utf8");
    assert.equal(/fonts\.googleapis\.com|fonts\.gstatic\.com/.test(text), false, file);
  }
  for (const file of files.filter((item) => item.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    for (const tag of html.matchAll(/<script\b([^>]*)>/gi)) {
      const attrs = tag[1];
      if (/type="application\/ld\+json"/.test(attrs)) {
        assert.equal(/src=/.test(attrs), false, path.relative(dist, file));
        continue;
      }
      const src = attrs.match(/\ssrc="([^"]+)"/);
      assert.ok(src, `${path.relative(dist, file)} tem script sem src: ${tag[0]}`);
      assert.match(src[1], /^\/_astro\//, src[1]);
    }
  }
});
