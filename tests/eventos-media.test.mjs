import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

const root = path.resolve(".");
const dist = path.resolve("dist");
const { eventos } = await import("../src/data/eventos.ts");
const { fotosPorEvento } = await import("../src/data/eventos-fotos.ts");

const readDist = (rel) => {
  assert.ok(existsSync(path.join(dist, "index.html")), "dist/ em falta. Corre npm run build antes de npm test.");
  return readFileSync(path.join(dist, rel), "utf8");
};
const pageOf = (slug) => readDist(`projetos/${slug}/index.html`);
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Width, height and chunk list of a WebP file (VP8, VP8L or VP8X).
function webpInfo(file) {
  const b = readFileSync(file);
  assert.equal(b.toString("ascii", 0, 4), "RIFF", file);
  assert.equal(b.toString("ascii", 8, 12), "WEBP", file);
  const chunks = [];
  for (let o = 12; o + 8 <= b.length; o += 8 + b.readUInt32LE(o + 4) + (b.readUInt32LE(o + 4) % 2)) chunks.push(b.toString("ascii", o, o + 4));
  const kind = b.toString("ascii", 12, 16);
  let width, height;
  if (kind === "VP8 ") {
    width = b.readUInt16LE(26) & 0x3fff;
    height = b.readUInt16LE(28) & 0x3fff;
  } else if (kind === "VP8L") {
    const bits = b.readUInt32LE(21);
    width = (bits & 0x3fff) + 1;
    height = ((bits >> 14) & 0x3fff) + 1;
  } else if (kind === "VP8X") {
    width = b.readUIntLE(24, 3) + 1;
    height = b.readUIntLE(27, 3) + 1;
  } else assert.fail(`${file}: chunk ${kind}`);
  return { width, height, chunks };
}

const allFotos = Object.entries(fotosPorEvento).flatMap(([slug, fotos]) => fotos.map((foto) => ({ slug, foto })));

test("fotos do contrato existem com as dimensões declaradas e sem metadados", () => {
  assert.ok(allFotos.length > 0);
  for (const { foto } of allFotos) {
    for (const dir of [path.join(root, "public"), dist]) {
      const big = webpInfo(path.join(dir, foto.src));
      const small = webpInfo(path.join(dir, foto.src800));
      assert.deepEqual([big.width, big.height], [foto.largura, foto.altura], foto.src);
      assert.ok(Math.max(big.width, big.height) <= 1600, foto.src);
      assert.equal(small.width, Math.min(800, foto.largura), foto.src800);
      assert.ok(Math.abs(small.height - Math.round((foto.altura * small.width) / foto.largura)) <= 1, foto.src800);
      for (const info of [big, small]) {
        assert.deepEqual(info.chunks.filter((c) => ["EXIF", "XMP ", "ICCP"].includes(c)), [], `${foto.src} com metadados`);
      }
    }
  }
});

test("fotos com alt descritivo, único, e origem", () => {
  const alts = new Set();
  for (const { foto } of allFotos) {
    assert.ok(foto.alt.length >= 30 && foto.alt.endsWith("."), foto.src);
    assert.equal(/\b(foto|imagem)\s+\d/i.test(foto.alt), false, foto.alt);
    assert.ok(!alts.has(foto.alt), `alt repetido: ${foto.alt}`);
    alts.add(foto.alt);
    assert.ok(foto.origem.trim().length > 0, foto.src);
  }
});

test("só as fotos do contrato estão publicadas (as retidas ficam fora de public/)", () => {
  const base = path.join(root, "public", "eventos");
  const listed = new Set(allFotos.flatMap(({ foto }) => [foto.src, foto.src800]));
  const files = existsSync(base)
    ? readdirSync(base, { recursive: true, withFileTypes: true })
        .filter((d) => d.isFile())
        .map((d) => "/" + path.relative(path.join(root, "public"), path.join(d.parentPath, d.name)).split(path.sep).join("/"))
    : [];
  assert.ok(files.length > 0);
  assert.deepEqual(files.filter((f) => !listed.has(f)).sort(), [], "ficheiro em public/eventos fora do contrato");
});

test("galeria, capa do hero e cartão usam as fotos do evento", () => {
  for (const evento of eventos) {
    const fotos = fotosPorEvento[evento.slug] ?? [];
    const html = pageOf(evento.slug);
    for (const foto of fotos) {
      assert.ok(html.includes(`src="${foto.src800}"`), foto.src800);
      assert.ok(decode(html).includes(`alt="${foto.alt}"`), foto.alt);
    }
    if (fotos.length === 0) continue;
    const hero = html.match(/<figure class="page-hero__photo[^"]*">([\s\S]*?)<\/figure>/);
    assert.ok(hero, `${evento.slug} sem foto no hero`);
    assert.match(hero[1], /loading="eager"/);
    assert.ok(hero[1].includes(fotos[0].src800));
    assert.match(html, /Origem das imagens: fotografia cedida pela organização\./);
    for (const rel of ["projetos/index.html", "index.html"]) {
      const card = readDist(rel).match(new RegExp(`<article class="event-card"[^>]*data-evento="${evento.slug}"[\\s\\S]*?</article>`));
      assert.ok(card && card[0].includes(fotos[0].src800), `${rel} sem a capa`);
    }
  }
});

test("vídeo opcional: bloco e VideoObject só com o ficheiro no build", () => {
  for (const evento of eventos.filter((e) => e.video)) {
    const v = evento.video;
    const has = existsSync(path.join(root, "public", v.ficheiro));
    const html = pageOf(evento.slug);
    const videoTags = html.match(/<video\b[^>]*>/g) ?? [];
    const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1])["@graph"]);
    const vo = ld.filter((n) => n["@type"] === "VideoObject");
    if (!has) {
      assert.equal(videoTags.length, 0, evento.slug);
      assert.equal(vo.length, 0);
      assert.equal(readDist("index.html").includes("<video"), false);
      continue;
    }
    assert.equal(videoTags.length, 1);
    const tag = videoTags[0];
    for (const attr of ["controls", 'preload="none"', "playsinline", `poster="${v.poster}"`]) assert.ok(tag.includes(attr), attr);
    assert.ok(html.includes(`<source src="${v.ficheiro}" type="video/mp4">`));
    assert.equal(vo.length, 1);
    assert.equal(vo[0].name, v.nome);
    assert.equal(vo[0].description, v.descricao);
    assert.equal(vo[0].duration, v.duracao);
    assert.equal(vo[0].uploadDate, v.carregadoEm);
    assert.match(vo[0].contentUrl, /^https:\/\/mariaandrezasa\.org\/video\//);
    assert.ok(existsSync(path.join(dist, v.poster)));
    assert.match(tag, /width="1920" height="1080"/);
    for (const rel of [`projetos/${evento.slug}/index.html`, "index.html"]) {
      const h = readDist(rel);
      assert.equal(/<meta [^>]*(og:image|twitter:image)[^>]*\/video\//.test(h), false, `${rel}: og com o poster`);
      assert.equal((h.match(/<video\b/g) ?? []).length, 1, rel);
    }
  }
});

test("videoDoEvento: ausente, completo e incompleto", async () => {
  const { videoDoEvento } = await import("../src/lib/video.ts");
  const tmp = mkdtempSync(path.join(tmpdir(), "imas-video-"));
  const cwd = process.cwd();
  const base = { ficheiro: "/video/v.mp4", poster: "/video/v.jpg", nome: "n", descricao: "d" };
  try {
    process.chdir(tmp);
    assert.equal(videoDoEvento({ video: base }), null);
    assert.equal(videoDoEvento({}), null);
    mkdirSync(path.join(tmp, "public", "video"), { recursive: true });
    writeFileSync(path.join(tmp, "public", "video", "v.mp4"), "x");
    assert.throws(() => videoDoEvento({ video: base }), /poster.*duracao.*carregadoEm/);
    writeFileSync(path.join(tmp, "public", "video", "v.jpg"), "x");
    assert.throws(() => videoDoEvento({ video: { ...base, duracao: "PT", carregadoEm: "2026-11-15" } }), /duracao/);
    const ok = { ...base, duracao: "PT2M5S", carregadoEm: "2026-11-15" };
    assert.deepEqual(videoDoEvento({ video: ok }), ok);
  } finally {
    process.chdir(cwd);
    rmSync(tmp, { recursive: true, force: true });
  }
});

test("CSP deixa tocar vídeo do próprio site", () => {
  const cfg = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
  const csp = cfg.headers.flatMap((h) => h.headers).find((h) => h.key === "Content-Security-Policy").value;
  const directive = (name) => csp.split(";").map((d) => d.trim()).find((d) => d.startsWith(`${name} `));
  const media = directive("media-src") ?? directive("default-src");
  assert.equal(media.split(/\s+/).slice(1).join(" "), "'self'");
  assert.match(directive("img-src"), /'self'/);
});

// Private data from the missal that must never reach the site: readers, thanks list, private
// phone and handles. Stored as sha256 prefixes so the names themselves are not in git.
// 2026-11-17: one 2-gram left this set. The president asked to name who brought Santa Dulce's image.
const PRIVATE = new Set([
  "677d1b35ed8feac4", "f8e618234b063505", "6c30e363fcb4d3a4", "e8c7dc6adbd22102",
  "01b24f64bc23e7a2", "7a582ec491f9c908", "2c7acdb4d7b2f4e1", "8c71304f53f8c396",
]);
const words = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
const sha = (s) => createHash("sha256").update(s).digest("hex").slice(0, 16);

test("dados privados do missal fora do site", () => {
  const hits = [];
  const files = readdirSync(dist, { recursive: true }).map(String).filter((f) => /\.(html|xml|txt|json)$/.test(f));
  for (const rel of files) {
    const raw = readFileSync(path.join(dist, rel), "utf8");
    const w = words(raw.replace(/<[^>]+>/g, " "));
    for (let n = 1; n <= 6; n++) {
      for (let i = 0; i + n <= w.length; i++) if (PRIVATE.has(sha(w.slice(i, i + n).join(" ")))) hits.push(`${rel}: n=${n}`);
    }
    if (/\+?55\s*71|71\s*9\d{2}\s*\d{3}\s*\d{3}|999\s*090\s*803/.test(raw)) hits.push(`${rel}: telefone do Brasil`);
    if (/terra\.com\.br/i.test(raw)) hits.push(`${rel}: e-mail pessoal`);
  }
  assert.deepEqual(hits, []);
});

test("página dos grupos com o texto da presidente, foto inteira e sem WhatsApp", async () => {
  const { grupos } = await import("../src/data/grupos.ts");
  const html = readDist("amigos-e-guardioes/index.html");
  const text = decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  assert.ok(text.includes(grupos.titulo));
  for (const parte of [...grupos.intro, grupos.chamada, ...grupos.grupos, ...grupos.fecho, grupos.saudacao, grupos.memoriasTitulo, grupos.memorias, grupos.adesaoTitulo, ...grupos.adesao]) {
    assert.ok(text.includes(parte), parte.slice(0, 48));
  }
  assert.equal(/WhatsApp/i.test(html), false);
  assert.equal(/Facebook/i.test(html), false);
  assert.match(html, /Instagram da Festa de Santa Bárbara/);
  assert.ok(html.includes(grupos.foto.src));
  assert.equal(grupos.foto.src.includes("/eventos/"), false);
  assert.ok(html.includes("mailto:institutomariaandrezasa@gmail.com"));
  assert.ok(html.includes('href="tel:+351968050922"'));
  const festa = pageOf("festa-de-santa-barbara-lisboa-2026");
  assert.equal(festa.includes("Quem Somos: Os Amigos"), false);
  assert.equal(festa.includes("Eparrey Oyá"), false);
  assert.equal(festa.includes("Largo de Santa Bárbara"), false);
  assert.ok(festa.includes('href="/amigos-e-guardioes/"'));
  assert.ok(festa.includes("Praça da Figueira"));
  for (const dir of [path.join(root, "public"), dist]) {
    const big = webpInfo(path.join(dir, grupos.foto.src.slice(1)));
    const small = webpInfo(path.join(dir, grupos.foto.src800.slice(1)));
    assert.deepEqual([big.width, big.height], [grupos.foto.largura, grupos.foto.altura]);
    assert.equal(small.width, 800);
    for (const info of [big, small]) assert.deepEqual(info.chunks.filter((c) => ["EXIF", "XMP ", "ICCP"].includes(c)), []);
  }
});

test("celebração do missal publicada com data, hora, igreja e programa", () => {
  for (const evento of eventos.filter((e) => e.celebracao)) {
    const text = decode(pageOf(evento.slug).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
    assert.ok(text.includes("6 de setembro de 2026, às 10h"));
    assert.ok(text.includes("Igreja de Nossa Senhora dos Anjos"));
    for (const item of evento.celebracao.programa) assert.ok(text.includes(item.parte), item.parte);
    for (const p of evento.celebracao.paragrafos) assert.ok(text.includes(p), p.slice(0, 40));
  }
});

test("galeria sem buraco na última linha (2 e 3 colunas)", () => {
  for (const evento of eventos) {
    const n = (fotosPorEvento[evento.slug] ?? []).length;
    if (n < 3) continue;
    const figs = [...pageOf(evento.slug).matchAll(/<figure class="(gallery__item[^"]*)"/g)].map((m) => m[1].split(" "));
    assert.equal(figs.length, n);
    // Cells used per row: lead = full row; wide tiles take 2 (or 3) cells.
    for (const cols of [2, 3]) {
      let cells = 0;
      figs.forEach((c, i) => {
        if (c.includes("gallery__item--lead")) return;
        const span = cols === 2 ? (c.includes("gallery__item--fill2") ? 2 : 1) : c.includes("gallery__item--fill3") ? 3 : c.includes("gallery__item--wide3") ? 2 : 1;
        cells += span;
      });
      assert.equal(cells % cols, 0, `${evento.slug}: ${cols} colunas com buraco`);
    }
  }
});

test("enquadramento por foto e referências bíblicas sem quebra", () => {
  for (const evento of eventos) {
    const html = pageOf(evento.slug);
    for (const foto of (fotosPorEvento[evento.slug] ?? []).filter((f) => f.posicao)) {
      const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]).filter((t) => t.includes(`src="${foto.src800}"`));
      assert.ok(imgs.length > 0 && imgs.every((t) => t.includes(`object-position: ${foto.posicao}`)), foto.src);
    }
    if (evento.celebracao) {
      const refs = evento.celebracao.programa.flatMap((p) => p.itens.match(/\d+, \d+(?:-\d+)?/g) ?? []);
      assert.ok(refs.length > 0);
      for (const r of refs) assert.ok(html.includes(`<span class="celebration__ref">${r}</span>`), r);
    }
  }
});

test("Portugal e Brasil: foto das bandeiras emoldurada, nunca a capa do evento", () => {
  const html = readDist("portugal-e-brasil/index.html");
  const fig = html.match(/<figure class="frame-photo"[^>]*>([\s\S]*?)<\/figure>/);
  assert.ok(fig, "sem a foto");
  const img = fig[1].match(/<img\b[^>]*>/)[0];
  const foto = fotosPorEvento["festa-de-santa-barbara-lisboa-2026"].find((f) => f.src.endsWith("/05.webp"));
  assert.ok(img.includes(`src="${foto.src800}"`));
  assert.ok(foto.largura <= 800 && !img.includes("srcset"), "sem srcset falso numa foto estreita");
  assert.match(img, /loading="lazy"/);
  const alt = decode(img.match(/alt="([^"]*)"/)[1]);
  assert.ok(alt.length >= 30 && alt !== foto.alt, "alt próprio");
  assert.match(fig[1], /<figcaption>[\s\S]*href="\/projetos\/festa-de-santa-barbara-lisboa-2026\/"/);
  const capa = fotosPorEvento["festa-de-santa-barbara-lisboa-2026"][0];
  assert.equal(html.includes(capa.src800) || html.includes(capa.src), false, "repete a capa do evento");
});
