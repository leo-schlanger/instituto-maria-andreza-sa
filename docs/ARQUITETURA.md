# Arquitetura — site institucional Maria Andreza Sá

Data: 2026-11-10. Plano para o developer. Não é implementação. Decisões neste ficheiro (não há `docs/adr/`).

Pasta ainda sem `.git` e sem código. Já existem:

| Ficheiro | Medido em 2026-11-10 |
|---|---|
| `public/brand/logo.png` | PNG 1254×1254, 2 174 485 bytes. Píxel (0,0) = `#FCF8E9` |
| `docs/marca/guia-de-marca.png` | PNG 1536×1024, 2 001 168 bytes |

Não existem ainda: `docs/CONTEUDO.md`, `docs/PRIVACIDADE.md`, `docs/COOKIES.md`, `docs/ESTUDO-CORES.md`, `docs/DESIGN.md`, `CLAUDE.md`. Se faltarem quando o developer começar, vale o contrato abaixo. Quando existirem, o texto e as cores desses ficheiros substituem o fallback. Não se inventa uma segunda paleta.

Nome público (está no logótipo): **Instituto Associativo Cultural & Artístico Maria Andreza Sá**, linha **Luso-Brasileiro**. Língua do site: português de Portugal.

## O que é esta versão

Site estático, nove rotas HTML, SEO, um menu móvel em React. Sem backend, sem API, sem base de dados, sem POST, sem analytics, sem cookies de aplicação, sem painel, sem sócios, sem pagamentos, sem blog, sem outras redes.

O build não mexe no DNS. O domínio só passa a mostrar o site numa fase à parte, depois do URL `*.vercel.app` estar verde e do passo jurídico indicado no fim.

## Decisões

### Fontes — self-host (escolhida)

O guia (`docs/marca/guia-de-marca.png`, rótulos grandes, leitura de 2026-11-10) indica **Playfair Display** nos títulos e **Montserrat** no texto. Não houve OCR: se `docs/DESIGN.md` der outros nomes ou ficheiros, o DESIGN ganha e estes pacotes saem.

| Opção | Custo | Risco | Manutenção a sós |
|---|---|---|---|
| Self-host via `@fontsource/playfair-display` e `@fontsource/montserrat` (os dois em **5.3.0**, sem `^`) | Zero euros. O Vite copia o woff2 para `/_astro/` | Subir de versão muda o ficheiro; o CSP não muda porque continua `'self'` | Um import por peso. Licença OFL fica no pacote npm |
| Google Fonts com preconnect | Menos ficheiros no repo | CSP mais longa (`fonts.googleapis.com`, `fonts.gstatic.com`). O browser fala com a Google. Contra o espírito «sem analytics» | Dois hosts para vigiar |
| Só fontes do sistema | Nada a servir | Ignora o guia que já está no repo | Nenhuma |

**Escolha: self-host.** CSP fica `font-src 'self'` e não há pedido a terceiros. Importar só o que se usa:

- `@fontsource/playfair-display/600.css` — `h1` e `h2`
- `@fontsource/montserrat/400.css` e `600.css` — resto (nav, botões, texto)

Não copiar woff2 de origem solta para o git. Não usar itálico nesta versão. `font-display` é o `swap` que o fontsource já traz. O subset latin desses pacotes cobre o pt-PT (ç, ã, õ, acentos). O teste falha se `dist/` contiver `fonts.googleapis.com` ou `fonts.gstatic.com`.

`style-src` leva `'unsafe-inline'` à mesma (atributos `style` do Radix). Isso não é motivo para ir buscar a fonte à Google.

### JSON-LD — `Organization` (escolhida)

| Opção | Nota |
|---|---|
| `NGO` | Mais específico. Afirma natureza que os estatutos ainda não confirmaram |
| `Organization` | Não afirma mais do que o nome público e o URL |

**Escolha: `Organization`.** Trocar para `NGO` é uma linha, quando houver confirmação. Não é mudança de arquitetura.

Chaves permitidas, e só estas: `@context`, `@type`, `name`, `url`, `sameAs`. Sem `logo` nesta versão (o PNG de origem pesa 2,1 MB; a imagem social vai no `og:image`). Sem morada, e-mail, telefone, NIPC, `taxID`, `vatID`, `identifier`.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Instituto Associativo Cultural & Artístico Maria Andreza Sá",
  "url": "https://mariaandrezasa.org/",
  "sameAs": ["https://www.instagram.com/festasantabarbaralx/"]
}
```

`sameAs` é exactamente esse URL, sem barra final e sem mais nenhuma rede. O JSON vai em `<script type="application/ld+json">` só na página `/`. `JSON.stringify` com `<` escapado para `\u003c`. Este script não entra nos hashes da CSP (o leitor de hashes ignora `ld+json`, como em `devinsaesthetic/scripts/csp.mjs`).

### Formulário — desenhado e morto (escolhida)

Não há servidor para receber POST. Um `mailto:` publicaria um endereço, e esta versão não tem endereço confirmado.

O componente `ContactForm.astro` existe só em `/contactos/`, fora do Markdown (um texto não o liga). `<form>` sem `action` e sem `method`. `<fieldset disabled>`. Campos: nome e mensagem. Sem campo de e-mail (evita o autofill mostrar um endereço num sítio que não envia). Botão `type="button"` `disabled`. Texto visível: o envio não existe nesta versão; o contacto público é o Instagram. CSP: `form-action 'none'`.

### www → ápice — no domínio da Vercel, não no `vercel.json`

Em `devinsaesthetic` (2026-10-20) um `redirects` com `has: host` no `vercel.json` não fez o 308. Ficou no domínio `www` do projeto (PATCH da API da Vercel, 308 para o ápice). Repetir isso aqui. O `vercel.json` deste site não tem redirect de host.

### HSTS — sem subdomínios e sem preload

| Opção | Nota |
|---|---|
| Sem HSTS | Mais fraco no dia em que o DNS virar |
| `max-age=63072000` sem `includeSubDomains` e sem preload | O cabeçalho só sai quando o tráfego já chega à Vercel por HTTPS |
| `includeSubDomains` + preload | Rejeitado. O domínio tem dois dias (whois). Não se sabe se haverá correio ou outro host. O preload é irreversível durante meses (lição do outro site) |

**Escolha: a do meio.**

## Stack (fixa, sem `^`)

A mesma linha de `/mnt/d/Projetos/devinsaesthetic`, mais o sitemap oficial. Node **24** (`engines.node`: `24.x`). Nesta máquina: v24.18.1.

| Pacote | Versão |
|---|---|
| `astro` | 7.4.1 |
| `@astrojs/react` | 7.1.0 |
| `@astrojs/sitemap` | 3.7.4 (devDependency de Astro 7.2.10 no próprio pacote; sem `peerDependencies`) |
| `@tailwindcss/vite` | 4.3.3 |
| `tailwindcss` | 4.3.3 |
| `react` / `react-dom` | 19.3.1 |
| `@types/react` / `@types/react-dom` | 19.3.0 |
| `radix-ui` | 1.8.1 |
| `class-variance-authority` | 0.7.1 |
| `clsx` | 2.1.1 |
| `tailwind-merge` | 3.7.0 |
| `@fontsource/playfair-display` | 5.3.0 |
| `@fontsource/montserrat` | 5.3.0 |

`package-lock.json` versionado. Sem Next.js. Sem Playwright neste `package.json` (o qa acrescenta-o; não bloqueia o build). Sem adaptador de servidor. `output` estático não usa `@astrojs/vercel`.

`astro.config.mjs`:

- `site`: `(process.env.SITE_URL || "https://mariaandrezasa.org").replace(/\/$/, "")`
- `output: "static"`
- `trailingSlash: "always"`
- `build.format: "directory"`
- `build.inlineStylesheets: "never"`
- `compressHTML: true` (no Astro 7 o omissão passou a `'jsx'` e come espaços entre elementos inline; lição do outro site em 2026-10-20)
- `integrations`: `react()` e `sitemap({ filter, namespaces: { news: false, xhtml: false, image: false, video: false } })`
- `vite.plugins`: `@tailwindcss/vite`
- O `filter` do sitemap aceita só o `pathname` das nove rotas (com barra final). Não comparar o host: um `SITE_URL` de preview deitaria as páginas todas fora. Sem `lastmod`, `changefreq` ou `priority` (o `new Date()` suja o diff; a Google ignora os outros dois).

`tsconfig.json` como no outro site: `extends` `astro/tsconfigs/strict`, `jsx` `react-jsx`, alias `@/*` → `src/*`.

`components.json` no padrão desse repo: style `new-york`, `rsc: false`, `tsx: true`, CSS `src/styles/global.css`, `cssVariables: true`, aliases `@/components`, `@/lib/utils`, `@/components/ui`. Só se copiam os primitivos que o menu usa (`button`, `sheet`) e `src/lib/utils.ts` (`cn` = `twMerge(clsx())`). Não instalar o catálogo inteiro.

### `/mnt/d` não cria symlinks

`npm i --no-bin-links`. O `node_modules/.bin/astro` não aparece. Por isso os scripts não podem ser `astro build` à letra (no outro site o fallback está só na documentação; aqui tem de estar no script, porque a Vercel tem o binário e este disco não).

`scripts/run-astro.mjs` recebe os argumentos (`build`, `dev`, `preview`):

- se `node_modules/.bin/astro` existir, executa-o;
- senão, executa `node node_modules/astro/bin/astro.mjs` com os mesmos argumentos.

`package.json`:

- `dev` → `node scripts/run-astro.mjs dev`
- `build` → `node scripts/run-astro.mjs build`
- `preview` → `node scripts/run-astro.mjs preview --port 4173`
- `test` → `node --test tests/unit/*.test.mjs tests/smoke.test.mjs`

Na Vercel o `npm install` cria o binário; o mesmo script serve. `npm run build` é o comando dos dois sítios. Se `VERCEL=1` (a Vercel define-o), o `build` depois de gerar o `dist/` corre `node scripts/csp.mjs` **sem** `--write` e falha se os hashes não baterem certo. Em local o `build` não falha por isso: gera-se o `dist/`, corre-se `node scripts/csp.mjs --write`, e o `npm test` é que exige a igualdade. Assim o primeiro build local não fica preso sem hashes.

No Astro 7 o `preview` fica em daemon. Parar com `node scripts/run-astro.mjs preview stop`.

## Árvore

```
CLAUDE.md
package.json
package-lock.json
astro.config.mjs
tsconfig.json
components.json
vercel.json
.gitignore
public/
  robots.txt
  og.png
  favicon-32.png
  apple-touch-icon.png
  site.webmanifest
  brand/logo.png          derivado pequeno, não o original de 2,1 MB
src/
  layouts/Base.astro
  pages/                  um .astro por rota + 404.astro
  components/Header.astro
  components/Footer.astro
  components/Page.astro
  components/ContactForm.astro
  components/islands/MobileMenu.tsx
  components/ui/button.tsx
  components/ui/sheet.tsx
  lib/site.mjs            JS puro, imports relativos
  lib/content.mjs         idem; único sítio que lê os Markdown
  lib/utils.ts
  styles/global.css
scripts/run-astro.mjs
scripts/csp.mjs
tests/lib/forbidden.mjs
tests/unit/forbidden.test.mjs
tests/unit/csp.test.mjs
tests/smoke.test.mjs
docs/                     já existe; o site não publica esta pasta
```

`.gitignore`: `node_modules/`, `dist/`, `.astro/`, `.vercel`. Não se versiona o `dist/`.

`site.mjs` e `content.mjs` não usam o alias `@/` (o `node --test` tem de os importar). A ilha React não importa `content.mjs` (esse módulo usa `node:fs`). A ilha recebe o array `NAV` por props, já renderizado no servidor (`client:idle`, nunca `client:only`).

Nenhuma classe CSS com nome de utilitário Tailwind (`.ring` no outro site desenhou um quadrado à volta do logótipo).

## Rotas

Cada página é HTML estático. `lang="pt-PT"`. Um só `<h1>` (vem do campo `h1`, não do Markdown). `<title>`, meta description, canonical e Open Graph próprios. Canonical = `https://mariaandrezasa.org` + caminho com barra final. O canonical de produção mantém-se mesmo num preview da Vercel: não pôr `SITE_URL` igual ao `*.vercel.app`.

| Caminho | `title` | `h1` | No menu |
|---|---|---|---|
| `/` | Instituto Associativo Cultural & Artístico Maria Andreza Sá | o mesmo | Início |
| `/associacao/` | A associação · Instituto Maria Andreza Sá | A associação | Associação |
| `/cultura/` | Cultura · Instituto Maria Andreza Sá | Cultura | Cultura |
| `/portugal-e-brasil/` | Portugal e Brasil · Instituto Maria Andreza Sá | Portugal e Brasil | Portugal e Brasil |
| `/projetos/` | Projetos · Instituto Maria Andreza Sá | Projetos | Projetos |
| `/noticias/` | Notícias · Instituto Maria Andreza Sá | Notícias | Notícias |
| `/contactos/` | Contactos · Instituto Maria Andreza Sá | Contactos | Contactos |
| `/privacidade/` | Privacidade · Instituto Maria Andreza Sá | Privacidade | não (rodapé) |
| `/cookies/` | Cookies · Instituto Maria Andreza Sá | Cookies | não (rodapé) |

Ficheiro Astro → pasta em `dist/` (`associacao.astro` → `dist/associacao/index.html`), por causa de `format: "directory"`.

`/projetos/` e `/noticias/` dizem, em texto visível, que estão em preparação. Sem cartões, sem datas, sem RSS, sem posts falsos.

`src/pages/404.astro` → `dist/404.html`. Título «Página não encontrada · Instituto Maria Andreza Sá», um `h1` «Página não encontrada», `<meta name="robots" content="noindex">`, sem canonical. Fora das nove rotas e fora do sitemap. O cabeçalho e o rodapé mantêm-se.

Open Graph, em todas as indexáveis: `og:type=website`, `og:site_name` = nome público completo, `og:title` = title, `og:description` = description, `og:url` = canonical, `og:locale=pt_PT`, `og:image` = `https://mariaandrezasa.org/og.png`, largura 1200, altura 630. `twitter:card=summary_large_image`. Sem `hreflang` (uma língua só). `<link rel="sitemap" href="/sitemap-index.xml">` no head.

`public/robots.txt` estático:

```
User-agent: *
Allow: /

Sitemap: https://mariaandrezasa.org/sitemap-index.xml
```

O `@astrojs/sitemap` 3.7.4 escreve `dist/sitemap-index.xml` e `dist/sitemap-0.xml`. O smoke exige que `sitemap-0.xml` tenha exactamente as nove `<loc>` (com barra final) e nenhuma ocorrência de `404`.

JSON-LD só em `/`, com o objeto acima. O smoke faz parse e recusa qualquer outra chave.

## Conteúdo

Fonte, por esta ordem:

1. Se `docs/CONTEUDO.md` existir, define as nove rotas todas. Se faltar uma, o build falha com o caminho em falta. Não se mistura metade ficheiro, metade fallback.
2. Se não existir, `content.mjs` usa o fallback desta secção e escreve uma linha no stdout a dizer que está em fallback.

`docs/PRIVACIDADE.md` e `docs/COOKIES.md`, quando existirem, substituem o corpo (e title, description, h1) dessas duas rotas. O mesmo formato.

Formato de `CONTEUDO.md` (sem dependência de parser; o corpo não é HTML):

```
# page: /

title: …
description: …
h1: …

Corpo em Markdown até ao próximo marcador.

# page: /associacao/

title: …
```

Linhas `title:`, `description:`, `h1:` obrigatórias. Description com no máximo 160 caracteres. O corpo só pode ter parágrafos (linha em branco), `##`, listas `- ` e links `[texto](url)`. URL do link: `https://` ou caminho do próprio site a começar por `/`. Qualquer `<` ou linha `# ` no corpo faz falhar o build (evita um segundo `h1` ou um script). O renderer são poucas dezenas de linhas em `content.mjs`. Sem `marked`, sem content collections, sem MDX.

Fallback (copiar para `content.mjs` enquanto os Markdown não existirem). Descriptions medidas abaixo de 160 caracteres.

- `/` — description: «Página institucional do Instituto Associativo Cultural e Artístico Maria Andreza Sá, de cultura luso-brasileira.» Corpo: o instituto dedica-se à cultura que liga Portugal e o Brasil. Esta é a página pública. Projetos e notícias ainda não estão publicados. O contacto público, por agora, é o Instagram.
- `/associacao/` — description: «Apresentação do instituto. Sede, NIPC e contactos registais só entram no site quando estiverem confirmados para publicar.» Corpo: o nome é o do logótipo, luso-brasileiro. Nesta versão não se publicam sede, NIPC nem contactos institucionais.
- `/cultura/` — description: «Cultura no instituto: página institucional, ainda sem programa de eventos.» Corpo: a atividade será apresentada aqui. Sem calendário, sem espetáculos, sem inscrições.
- `/portugal-e-brasil/` — description: «A ligação cultural entre Portugal e o Brasil no trabalho do instituto.» Corpo: não lista moradas, pessoas nem representações locais.
- `/projetos/` — description: «Projetos do instituto. Página em preparação, sem iniciativas listadas.» Corpo: «Em preparação. Ainda não há projetos publicados.»
- `/noticias/` — description: «Notícias do instituto. Página em preparação, sem publicações.» Corpo: «Em preparação. Ainda não há notícias.»
- `/contactos/` — description: «Contacto público pelo Instagram. O formulário vê-se na página e está desativado: não envia dados.» Corpo: o único contacto público nesta versão é o Instagram. O formulário é o componente, não o Markdown.
- `/privacidade/` — description: «Privacidade do site. A aplicação não pede contas, não envia formulários e não usa analytics.» Corpo: site estático; não cria conta; não envia o formulário; não carrega analytics. O Instagram é um serviço de terceiros com política própria. Frase final: texto técnico desta versão, à espera de revisão jurídica antes do domínio público.
- `/cookies/` — description: «A aplicação não escreve cookies e não mostra aviso de consentimento, porque não há cookies opcionais.» Corpo: a aplicação não escreve cookies nem usa cookies de analytics ou de publicidade. Não há banner. Se uma versão futura escrever cookies, a página e o aviso mudam juntos. A mesma frase de texto técnico à espera de revisão.

O Instagram no corpo e no rodapé sai da constante `INSTAGRAM` em `site.mjs`: `https://www.instagram.com/festasantabarbaralx/`. `rel="noopener noreferrer"`. Não há `mailto:`.

## Visual

Mobile first. Estilo base = telemóvel. Breakpoints os do Tailwind 4, só `min-width`. Sem `max-width` em media queries. Alvos de toque com pelo menos 44 px de altura. `color-scheme: light`. Um tema só.

Cores medidas nas manchas chapadas de `docs/marca/guia-de-marca.png` (centro de uma janela de baixa variância, 2026-11-10). O PNG não é uma cor lisa (numa janela de 9×9 há cerca de uma dúzia de valores vizinhos). Não se leu o hex impresso na legenda (não há OCR); se a legenda ou o `DESIGN.md` divergirem, ganha o DESIGN / o estudo de cores.

| Token | Hex medido | Uso |
|---|---|---|
| `--background` | `#FCF8E9` | Fundo. É o píxel (0,0) do logótipo, para a marca não mostrar um retângulo. O fundo do guia, canto superior, anda à volta de `#FEF4E3` |
| `--bordo` | `#5C020C` | Cabeçalho, rodapé, títulos, botão principal |
| `--vermelho` | `#A91B1D` | Hover do bordô, pouco |
| `--dourado` | `#EEB629` | Fio, foco, botão secundário. Texto desse botão é `--foreground`, não marfim (o dourado é claro) |
| `--verde` | `#2B762B` | Quase sem uso. Não é cor de CTA |
| `--foreground` | `#181818` | Texto |

O guia mostra botões de exemplo «Saiba Mais» e «Participe». São amostra de estilo, não páginas nem ações. Não criar inscrição, donativo, área de sócio nem botão que não leve a uma destas rotas ou ao Instagram.

Logótipo e `og.png`:

- O original de 2 174 485 bytes sai de `public/` para `docs/marca/logo-original.png` antes do primeiro deploy. `docs/marca/guia-de-marca.png` fica onde está (não é servido).
- `public/brand/logo.png` passa a ser o derivado do cabeçalho: largura de ecrã até 192 px, ficheiro ≤ 80 KB. `alt` = nome público completo.
- `public/og.png`: 1200×630, fundo `#FCF8E9`, logótipo centrado com margem (o círculo não se corta), PNG quantizado, ≤ 300 KB. Sem texto extra: o nome já está no desenho.
- `favicon-32.png` e `apple-touch-icon.png` (180×180) saem do mesmo desenho.
- `site.webmanifest`: `name` «Instituto Maria Andreza Sá», `lang` `pt-PT`, `start_url` `/`, `display` `browser`, `background_color` e `theme_color` `#FCF8E9`. Sem service worker. Isto não é uma PWA.
- Nenhum ficheiro em `public/` pode ter 300 KB ou mais. O smoke falha se isso acontecer.

`<meta name="theme-color" content="#FCF8E9">` até o DESIGN mudar o token.

Rodapé, em todas as páginas, discreto: link para o Instagram; links Privacidade e Cookies; «Desenvolvido por leoschlanger.com» para `https://leoschlanger.com` (texto pequeno, cor atenuada, sublinhado só no hover).

## Menu

`NAV` em `site.mjs` é a única lista dos sete links do cabeçalho (os do quadro). O `<ul>` do desktop e o `MobileMenu` mapeiam esse array. A ilha é `Sheet` (Radix), `client:idle`, conteúdo no HTML do servidor.

Um script inline no `<head>` faz `document.documentElement.classList.add("js")`. Com `.js` e ecrã pequeno, o `<ul>` esconde-se e fica o botão da ilha. Sem `.js` (ou se a CSP bloquear o script), o `<ul>` vê-se empilhado. A falha da CSP não pode esconder a navegação. Desktop: lista horizontal sempre; a ilha não se mostra.

## Segurança (`vercel.json`)

Modelo do outro site, sem mapa e sem hashes inventados. Cabeçalhos em `/(.*)`:

- `Content-Security-Policy` (imposta, não report-only), numa linha:

`default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; manifest-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests`

Depois de `csp.mjs --write`, `script-src` fica `'self'` mais os `'sha256-…'` dos scripts inline executáveis. Sem `'unsafe-eval'`. Sem `'unsafe-inline'` em scripts. Sem hosts da Google.

- `Strict-Transport-Security`: `max-age=63072000`
- `Cross-Origin-Opener-Policy`: `same-origin`
- `X-Content-Type-Options`: `nosniff`
- `Referrer-Policy`: `strict-origin-when-cross-origin`
- `X-Frame-Options`: `DENY` (alinha com `frame-ancestors 'none'`)
- `Permissions-Policy`: `camera=(), microphone=(), geolocation=(), payment=()`

Sem `Cross-Origin-Resource-Policy` (no outro site partia o `og` reutilizado noutro domínio).

Não usar `security.csp` do Astro: nesse site hasheava o `style-src` e ignorava o script do 404.

`scripts/csp.mjs`: percorre o HTML de `dist/`, ignora `<script src>` e `ld+json`, calcula `sha256` em base64 do corpo, compara com o `script-src` do header cujo `source` é `/(.*)`. `--write` reescreve essa directiva para `'self'` mais os hashes encontrados, ordenados. O teste falha se faltar ou sobrar um hash. Qualquer mudança em `Base.astro`, na ilha, no script da classe `js` ou um upgrade de Astro/React muda um hash: o browser bloqueia o JavaScript em silêncio se o `vercel.json` não for atualizado.

Cache, à parte do header geral:

- `/_astro/(.*)` → `public, max-age=31536000, immutable`
- ficheiros de fonte que o Vite emita por baixo de `/_astro/` já ficam cobertos. Não há pasta `/fonts/` se o fontsource for o caminho. Se um dia houver `public/fonts/`, o mesmo `immutable`.
- `/og.png` e `/brand/(.*)` → `public, max-age=2592000`

HTML sem cache longo. `cleanUrls: true`, `trailingSlash: true`, `framework: astro`, `buildCommand: npm run build`, `outputDirectory: dist`. Sem redirects.

## Testes

Comando, nesta ordem:

```
npm i --no-bin-links
npm run build
node scripts/csp.mjs --write
npm test
```

`npm test` é `node --test tests/unit/*.test.mjs tests/smoke.test.mjs`. O smoke falha (não faz skip) se `dist/` não existir, com a mensagem para correr o build primeiro. Na Vercel o `build` já inclui a verificação da CSP sem `--write`.

`tests/lib/forbidden.mjs` exporta os padrões e o leitor. Não lê `tests/`, `node_modules/`, `docs/ARQUITETURA.md`, `docs/DESIGN.md`, `docs/ESTUDO-CORES.md` nem `docs/marca/` (o teste precisa de poder escrever a expressão; o guia é imagem).

Padrões, sem exceção e sem lista branca:

- E-mail: letra ou dígito, depois o resto local, `@`, domínio que começa por letra, ponto, TLD com pelo menos duas letras. Assim `ficheiro@2x.png` não dispara.
- `mailto:` em qualquer capitalização.
- A palavra `passaporte`, `NIF` ou `NIPC` (sem distinguir maiúsculas) e um dígito na mesma linha, até 40 caracteres para cada lado, sem atravessar a quebra de linha.
- Código postal português: quatro dígitos, hífen, três dígitos, sem dígito colado antes ou depois.

`tests/unit/forbidden.test.mjs` aplica-os a `src/**` (`.astro`, `.ts`, `.tsx`, `.mjs`, `.js`, `.css`, `.svg`, `.json`, `.txt`, `.md`) e, se existirem, a `docs/CONTEUDO.md`, `docs/PRIVACIDADE.md`, `docs/COOKIES.md`.

`tests/smoke.test.mjs`, depois do build:

- as nove rotas em `dist/` (`dist/index.html`, `dist/associacao/index.html`, e as outras no mesmo padrão);
- `<title>` igual ao `title` que `content.mjs` devolve para esse caminho;
- exactamente um `<h1>`, texto igual ao campo `h1` (espaços seguidos contam como um);
- cada HTML contém os sete `href` do `NAV` e os `href` de privacidade, cookies e Instagram;
- `/contactos/` tem `<form`, não tem `action=`, não tem `method=`, tem `disabled` no fieldset e no botão;
- `sitemap-0.xml` com exactamente as nove locs, sem `404`;
- `dist/404.html` existe, tem `noindex`, um `h1`;
- nenhum HTML, JS ou CSS de `dist/` contém `fonts.googleapis.com`, `fonts.gstatic.com`, `googletagmanager`, `google-analytics`, `plausible`, `umami`, `facebook.net`, `hotjar`, nem `document.cookie`;
- os mesmos padrões proibidos, em todo o texto de `dist/` (html, js, css, svg, json, txt, xml);
- nenhum ficheiro de `public/` com tamanho ≥ 300 KB (o `og.png` tem de ser 1200×630; ler o IHDR);
- CSP: o conjunto de hashes do `dist/` é igual ao do `vercel.json`, e a política não contém `unsafe-eval`.

Playwright e axe ficam com o qa. Não são critério desta arquitetura.

Publicar um e-mail, um NIPC ou um código postal mais tarde é uma mudança deliberada deste teste, no mesmo commit, não um `skip`. Dados de RCBE não entram nessa exceção: não se publicam e não vão para o git.

## Deploy e DNS (fases separadas)

### Fase 1 — fatia vertical (o developer, sem domínio)

Um layout, as nove rotas, o 404, o menu, o formulário morto, SEO, `og.png`, cabeçalhos, testes verdes em local. Não vale a pena uma fase «só a home»: não há backend; o layout é o mesmo.

Aceite quando `npm test` passa com o comando de cima e `npm run preview` mostra as nove rotas em `http://localhost:4173` com barra final.

### Fase 2 — Vercel, ainda sem DNS

Repo privado GitHub `leo-schlanger/instituto-maria-andreza-sa` (criar se não existir). Projeto na conta Vercel `leo-schlanger`, framework Astro, build `npm run build`, saída `dist`, produção = push à `main`. Sem variáveis secretas. Não definir `SITE_URL` para o URL da Vercel.

Aceite quando o URL `*.vercel.app` do projeto devolve as nove rotas em HTTPS, o `sitemap-index.xml` e os cabeçalhos (incluindo CSP). O domínio próprio ainda não mostra este site.

### Fase 3 — DNS, manual, fora do build

Quem tem a conta do registrador edita a zona. Este repo não tem essa sessão. Não se muda o nameserver para a Vercel: a zona fica onde está e só mudam os registos (foi o que se pediu: DNS de terceiros).

Medido em 2026-11-10, sem login:

- Whois (registo PIR): registrar **GoDaddy.com, LLC**, URL `http://www.whois.godaddy.com`. Criação `2026-11-08T12:42:31Z`. Expira `2027-11-08T12:42:31Z`.
- Nameservers: `ns01.domaincontrol.com`, `ns02.domaincontrol.com`.
- Estados: `clientDeleteProhibited`, `clientRenewProhibited`, `clientTransferProhibited`, `clientUpdateProhibited`, `addPeriod`. O `clientUpdateProhibited` é o bloqueio habitual. Não se verificou se a zona, na interface, deixa gravar. Se não deixar, desbloqueia o titular da conta. Daqui não se desbloqueia.
- `mariaandrezasa.org` e `www.mariaandrezasa.org` resolvem os dois para **3.33.130.190** e **15.197.148.33**. Não são o IP da Vercel. Não medi o produto que está atrás desses IP (não havia `dig`; usei `getaddrinfo`).

Na conta Vercel, depois da fase 2: `vercel domains add` para o ápice e para `www`. **Valem os registos que o ecrã mostrar nesse momento.** O par habitual com DNS de terceiros, o que se deve esperar, é:

- A do ápice → `76.76.21.21`
- CNAME de `www` → `cname.vercel-dns.com`

No outro site, na GoDaddy, a Vercel pediu outros A (`216.198.79.1` e `64.29.17.1`) e um CNAME próprio do projeto. Não copiar esses. Se o ecrã divergir do par habitual, segue-se o ecrã.

Na zona GoDaddy: apagar os A actuais do ápice (os dois IP AWS) e pôr só o A que a Vercel indicar. Deixar um IP AWS ao lado do IP da Vercel reparte o tráfego. `www` passa a CNAME e não pode ter A ao mesmo tempo. O 308 de `www` para `https://mariaandrezasa.org` configura-se no domínio `www` do projeto Vercel, não no `vercel.json`.

Aceite da fase 3, à mão: `https://mariaandrezasa.org/` devolve o site com certificado válido; `https://www.mariaandrezasa.org/` responde 308 para o ápice; os A do ápice já não são `3.33.130.190` nem `15.197.148.33`.

Esta fase não começa sem o passo jurídico do fim.

## Fluxo de dados e falhas

```
docs/*.md  (ou o fallback em content.mjs)
    → build Node, HTML em dist/
        → push main → Vercel (novo build, CSP conferida)
            → *.vercel.app  já é o site
            → DNS GoDaddy, mais tarde, só aponta
```

Não há webhook, fila, pagamento nem escrita. O build é idempotente: as mesmas fontes e o mesmo lockfile produzem o mesmo HTML, desde que ninguém meta `new Date()` no sitemap ou no layout. Não há cobrança para duplicar.

| Falha | O que se vê | Trava |
|---|---|---|
| `astro` symlink em falta no `/mnt/d` | `npm run build` não arranca | `run-astro.mjs` chama o `astro.mjs` |
| Hash CSP velho | Menu morto; no pior caso a página parece partida | Teste local e, na Vercel, o build falha. Sem JS a lista de links continua no HTML |
| `public/brand/logo.png` original | 2,1 MB no ar | Smoke: nada em `public/` ≥ 300 KB. O original vai para `docs/marca/` |
| E-mail, NIPC com dígitos ou código postal no texto | Dados a mais no git e no HTML | `forbidden` em `src/`, nos três Markdown e em `dist/` |
| Formulário «quase» ligado | POST ou `mailto:` | Sem `action`, fieldset disabled, `form-action 'none'`, smoke |
| DNS a meio | Metade das visitas ainda vê os IP AWS | Não deixar os A velhos. A fase 3 é explícita e reversível (voltar a pôr os A anteriores) |
| Canonical no URL da Vercel | A Google indexa o preview | `site` por omissão é o ápice; não definir `SITE_URL` na Vercel |
| Preview indexável | Página duplicada | O canonical aponta ao domínio final. Não se promete `X-Robots-Tag` no preview nesta versão |

Observabilidade: o log do deploy na Vercel e o `npm test`. Sem APM, sem analytics. Consola do browser: uma violação de CSP é o sinal de hash trocado.

## `CLAUDE.md` (o developer escreve-o na raiz)

Curto, com:

- O que é: site institucional estático do Instituto Associativo Cultural & Artístico Maria Andreza Sá (luso-brasileiro), pt-PT, SEO. Canónico `https://mariaandrezasa.org` (`www` → ápice, fase de DNS à parte).
- Stack e versões desta página, e o comando de build.
- Disco: `npm i --no-bin-links`; `npm run build` chama `node node_modules/astro/bin/astro.mjs` quando `node_modules/.bin/astro` não existe.
- TODO desta versão: projetos sem posts; notícias sem posts; contactos institucionais por confirmar (sem e-mail, sem morada, sem telefone); NIPC por confirmar e não publicar.
- Regra: não meter no git dados pessoais do RCBE (beneficiários, moradas, documentos de identificação, datas de nascimento, números). O nome público do instituto, que já está no logótipo e no domínio, não é ficha de RCBE.
- Fora desta versão: painel, sócios, pagamentos, blog dinâmico, mais redes.
- DNS não faz parte do build. Whois e IP actuais estão nesta arquitetura.

## Fora desta versão

Painel, área de sócios, quotas, pagamentos, formulário que envie, newsletter, blog ou notícias dinâmicas, mais redes além daquele Instagram, mapa, analytics, banner de cookies, PWA, línguas extra, `NGO` no JSON-LD, NIPC e sede no HTML.

## Pendências

Obrigatório antes da fase 3 (DNS). Se não se fizer, o site pode ficar no `*.vercel.app` e o domínio continua nos IP AWS medidos acima. Não se aponta o domínio com o texto jurídico ainda por rever:

- O `juridico` revê `docs/PRIVACIDADE.md` e `docs/COOKIES.md`, ou o fallback se esses ficheiros ainda não existirem. O qa do lançamento vem depois dessa revisão.
- O Leo (ou quem tiver a conta GoDaddy do domínio) confirma que consegue editar a zona. Sem isso ninguém aplica o A e o CNAME.

Opcional. Se nunca se fizer, o site fica como está, de propósito:

- Confirmar NIPC, sede, e-mail ou telefone para uma versão futura. Até lá não entram no HTML nem no JSON-LD.
- `docs/DESIGN.md` e `docs/ESTUDO-CORES.md` podem substituir os hex medidos e as fontes. Até lá valem os tokens desta página.
