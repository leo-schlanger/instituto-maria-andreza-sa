# Identidade visual e diretrizes de design

Fonte: brief do cliente, 10 de novembro de 2026. Esta paleta substitui a anterior (`#7A0F1E`, `#E6C333`, `#FAF3E0`, `#1A1A1A`).

Instituto Associativo Cultural & Artístico Maria Andreza Sá, Luso-Brasileiro.

## 1. Objetivo

Website institucional moderno, elegante e profissional. Deve transmitir cultura e tradição, união entre Portugal e Brasil, diversidade e inclusão, identidade artística, credibilidade institucional e proximidade com a comunidade.

A identidade parte da logo oficial. Elegância e tradição, com uma abordagem contemporânea para a web. A logo não se redesenha, não se altera e não se distorce.

## 2. Paleta oficial

| Nome | HEX | Aplicação |
| --- | --- | --- |
| Bordô institucional | `#6D1723` | Cor principal, cabeçalho e elementos de destaque |
| Dourado clássico | `#B58A3A` | Detalhes, ícones, linhas e ornamentos |
| Marfim | `#F8F4EA` | Fundo principal |
| Carvão | `#2D2927` | Textos e elementos escuros |
| Terracota | `#A9433D` | Destaques culturais e elementos secundários |
| Champanhe | `#DCCBAA` | Fundos alternativos e separadores |
| Verde oliveira | `#596B50` | Natureza e cultura |
| Branco | `#FFFFFF` | Cartões, áreas de leitura e superfícies |

Distribuição: 50% marfim e branco, 25% bordô, 10% dourado, 10% champanhe, 5% complementares. O dourado é detalhe, não cor dominante.

## 3. Tipografia

Playfair Display nos títulos, cabeçalhos, frases institucionais e destaques. Montserrat no texto, na navegação, nos botões, nos formulários e nas legendas.

## 4. Direção de arte (redesenho de 2026-11-11)

«Arquivo luso-brasileiro»: uma instituição cultural com voz editorial. Bordô pleno nos cabeçalhos de página, marfim nas áreas de leitura, ouro só em fios e ornamentos. Sem fotografia de banco: o carácter vem da tipografia (Playfair grande, itálico em champanhe), do selo em medalhão e de dois grafismos SVG originais.

- Azulejo (`public/ornaments/azulejo-ouro.svg`, `azulejo-bordo.svg`): ladrilho de 96 px com rosáceas nos cantos, losango e quadrifólio. Sobre bordô a 22–32 % de opacidade com máscara em gradiente; sobre areia a 7–8 %.
- Onda da calçada (`calcada.svg`, `calcada-ouro.svg`): o padrão do Rossio que foi para Copacabana, a ponte entre os dois países. Dispositivo assinatura em 3 sítios só: painel «Portugal / Brasil» (home e página Portugal e Brasil), filete no fundo do hero e filete no topo do rodapé. Não é a onda em gradiente do guia antigo.
- Estrela de quatro pontas (`Star.astro`), tirada do selo: marcador de eyebrow, divisor e medalha.

Ritmo da home: hero bordô → ficha institucional (cartão branco a sobrepor o hero) → «A associação» em marfim → evento em destaque em branco → princípios em areia `#F1E9D8` com azulejo → Portugal e Brasil em bordô → índice de secções em cartões → cartão de contacto bordô-escuro → rodapé `#4E0912`.

Páginas interiores: `PageHero` bordô (migalhas, eyebrow, H1 até 72 px, lede) + coluna de leitura (68 ch, capitular quando há mais de 3 parágrafos) + coluna lateral fixa (ficha, continuar a ler). Legais: índice de secções à esquerda, H2 numerados. Vazios: moldura de azulejo tracejada + eyebrow «Em preparação» + ações.

## 5. Componentes

shadcn/ui (Radix + Tailwind). Botões em pílula (como no guia). Variantes: `default` bordô com fio dourado; `secondary` dourado com texto carvão (600, ≥ 16 px); `outline` branco; `ivory` (marfim com texto bordô, para fundos bordô); `outlineLight` (contorno champanhe, texto branco, só sobre bordô). Links externos levam seta ↗.

Cabeçalho: faixa superior `#4E0912` (só ≥ 900 px), barra marfim translúcida com desfoque, selo 52–60 px, nome em Playfair, subtítulo em versaletes só ≥ 1240 px, menu horizontal só ≥ 1100 px (sublinhado dourado que cresce), botão Contactos. Abaixo de 1100 px: botão «Menu» com Sheet numerado.

Evento (`EventCard.astro`): arte em bordô com azulejo ou, havendo fotos em `src/data/eventos-fotos.ts`, a primeira foto com `object-fit: cover`. Galeria (`Gallery.astro`) aguenta 0 a 20 fotos: 0 não desenha nada; 1 ocupa a largura; com 3 ou mais a primeira é larga e as outras em grelha 2/3 colunas. `srcset` 800w + original, `width/height` do ficheiro, `loading="lazy"`.

## 6. Contraste medido em 10 e 11 de novembro de 2026

| Par | Rácio | Uso |
| --- | --- | --- |
| `#FFFFFF` sobre `#6D1723` | 11,69 | Texto do botão principal e do rodapé |
| `#FFFFFF` sobre `#8A2733` | 8,68 | Hover do botão principal |
| `#2D2927` sobre `#F8F4EA` | 13,11 | Texto corrido |
| `#2D2927` sobre `#FFFFFF` | 14,40 | Texto em cartão |
| `#2D2927` sobre `#B58A3A` | 4,57 | Texto do botão secundário. Peso 600, corpo ≥ 16 px |
| `#2D2927` sobre `#DCCBAA` | 9,03 | Hover do botão secundário e faixas champanhe |
| `#6D1723` sobre `#F8F4EA` | 10,64 | Títulos e links |
| `#B58A3A` sobre `#F8F4EA` | 2,87 | Falha como texto. Só linha, ícone decorativo ou ornamento |
| `#B58A3A` sobre `#6D1723` | 3,71 | Borda e fio. Não serve para texto pequeno |
| `#A9433D` sobre `#F8F4EA` | 5,37 | Destaque cultural, com sublinhado se for link |
| `#596B50` sobre `#F8F4EA` | 5,25 | Apoio |
| `#FFFFFF` sobre `#596B50` | 5,76 | Texto sobre oliveira |

| `#DCCBAA` sobre `#6D1723` | 7,33 | Eyebrow e texto secundário em hero bordô |
| `#DCCBAA` sobre `#4E0912` | 9,60 | Texto do rodapé |
| `#FFFFFF` sobre `#4E0912` | 15,31 | Links do rodapé |
| `#A9433D` sobre `#F1E9D8` | 4,89 | Eyebrow em areia (13 px, 600) |
| `#5C564E` sobre `#FFFFFF` | 7,25 | Texto de apoio em cartões |
| `#5C564E` sobre `#EFE6D4` | 5,85 | Campo desativado |
| `#7A726A` sobre `#EFE6D4` | 3,81 | Contorno do campo desativado (UI 3:1) |
| `#D9CCB4` sobre `#FFFFFF` | 1,59 | Borda decorativa de cartão. Nunca é o único limite de um controlo |

O ficheiro da logo é RGB, sem transparência, campo cerca de `#FCF8E9`. O cabeçalho fica em marfim para o selo não aparecer dentro de um quadrado. O bordô entra no rodapé, nos títulos, no botão principal, no hero da home e no topo de cada página (o brief pede 25 % de bordô e cabeçalho bordô; o cabeçalho com o selo continua marfim).

## 7. Conteúdo que esta versão não inventa

Não há fotografias próprias da associação. Fotografias do Instagram do evento só entram com autorização do Leo, pelo contrato de `src/data/eventos-fotos.ts`. Não há notícias: estado vazio com moldura de azulejo.

O Instagram https://www.instagram.com/festasantabarbaralx/ é de um evento (Festa de Santa Bárbara), não da associação. Rótulo sempre «Instagram da Festa de Santa Bárbara» e só junto do evento. O Instagram oficial ainda não existe: `instagramOficialUrl` vazia; o rodapé, o menu e os contactos mostram o link só quando tiver valor.

A fundadora, no texto público pedido neste brief, é Maria Andreza Sá. Uma frase, sem biografia inventada. Dados pessoais do registo (documento, morada, e-mail, números) não entram no site nem no git.

## 8. Logo (selo)

`Seal.astro` em todo o lado (cabeçalho, hero, rodapé, cartão de contacto, 404, OG). O selo nunca se estica nem se corta: a imagem fica a 89,3 % de um disco `#FCF8EC` (a cor medida do campo do ficheiro), com `overflow: hidden`. O anel do selo chega a 524 px do centro num ficheiro de 960 px, por isso uma máscara circular do tamanho da imagem come o anel; o disco 1,12× só corta os cantos lisos do quadrado. Tamanhos: 52/60 px (cabeçalho), 96–112 px (rodapé, contacto), até 260 px no hero do telemóvel e 420 px no desktop.

## 9. Movimento

Entrada do hero em cascata (0,9 s, `cubic-bezier(0.22, 1, 0.36, 1)`), órbita tracejada do medalhão roda uma vez (2,4 s), padrão do hero com paralaxe ligada ao scroll e secções a subir ao entrar no ecrã (`animation-timeline: view()`, só onde o browser suporta; sem suporte o conteúdo aparece logo). Tudo dentro de `prefers-reduced-motion: no-preference`; com `reduce` não há animação. Nenhum movimento infinito. Sem JavaScript para animação.
