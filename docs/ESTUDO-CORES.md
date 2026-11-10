# Estudo de cores

Instituto Associativo Cultural & Artístico Luso-Brasileiro. Nome no selo: Maria Andreza Sá. Data da medição: 10 de novembro de 2026.

O brief de 10 de novembro de 2026 substitui esta paleta. A fonte viva é `docs/DIRETRIZES-VISUAIS.md`. Os hex `#7A0F1E`, `#E6C333`, `#FAF3E0` e `#1A1A1A` deixam de mandar.

Este documento fixa a paleta e a regra de contraste. O texto público está em `docs/CONTEUDO.md` e não se altera daqui.

## O que manda

Quando o guia e a decisão do cliente não dizem a mesma coisa, manda o cliente. O brief de 10 de novembro de 2026 substitui a paleta anterior. Detalhe em `docs/DIRETRIZES-VISUAIS.md`.

O guia antigo mostra gradiente, onda e ícones dourados. Isso não entra. O botão secundário do brief, fundo `#B58A3A` e texto `#2D2927`, entra.

- A base é marfim `#F8F4EA`. Cartões brancos.
- O bordô `#6D1723` entra nos títulos, nos links, no botão principal e no rodapé. O cabeçalho fica marfim, por causa do selo sem transparência.
- O dourado `#B58A3A` é fio de 1 px, borda e fundo do botão secundário. Não é texto sobre marfim.
- Uma faixa bordô curta chega. Não há modo escuro.

## Fontes

| Peça | Caminho | SHA-256 |
| --- | --- | --- |
| Selo, original | `/mnt/c/Users/leosc/Downloads/Instituto Cultural Luso-Brasileiro.png` | `3dec262955dae32913fc0d5f9c9cc3bc933a6aba4d1f954793826979be638456` |
| Selo no site | `public/brand/logo.png` | o mesmo hash, 2 174 485 bytes, 1254×1254, RGB sem alfa |
| Guia, original | `/mnt/c/Users/leosc/Downloads/Guia de Marca Luso-Brasileira Regia.png` | `306aff1730c3c16f54c3c4b3413b3898c8354b0c6687a56ec2833be713c2f8c6` |
| Guia no repo | `docs/marca/guia-de-marca.png` | o mesmo hash |

Os hex abaixo são os que o guia rotula. Não se usa o contagotas no PNG. O desenho do guia não é uma amostra plana. As manchas pintadas desviam do rótulo.

O campo do selo, medido nos cantos, tem média `#FCF8EB` (cerca de 253, 249, 236). A distância euclidiana a `#FAF3E0` é 13,4. O quadrado pode notar-se um pouco sobre o marfim. Não se recorta o selo para esconder isso. O conteúdo útil chega a 10 px do topo num ficheiro de 1254 px. Uma máscara circular come o anel.

## Paleta

Brief de 10 de novembro de 2026. Contraste medido nesse brief, em `docs/DIRETRIZES-VISUAIS.md`.

| Token | Hex | Papel | Onde entra | Onde não entra |
| --- | --- | --- | --- | --- |
| `--color-background` | `#F8F4EA` | Marfim | Fundo da página e do cabeçalho | Texto |
| `--color-surface` / `--color-card` | `#FFFFFF` | Branco | Cartões | Faixa grande |
| `--color-primary` | `#6D1723` | Bordô | Títulos, links, botão principal, rodapé | Parágrafos, página inteira |
| `--color-secondary` | `#B58A3A` | Dourado | Fio de 1 px, borda do botão principal, fundo do botão secundário | Texto ou ícone que tenha de ser lido. Sobre marfim falha (2,87:1) |
| `--color-text` | `#2D2927` | Carvão | Texto corrido e texto do botão secundário (peso 600, corpo ≥ 16 px, 4,57:1) | |
| `--color-accent` | `#A9433D` | Terracota | Destaque cultural | Fundo de página |
| `--color-champagne` | `#DCCBAA` | Champanhe | Hover do botão secundário | Texto sobre marfim |
| `--color-olive` | `#596B50` | Verde oliveira | Apoio pontual | Fundo de página |

Tokens extra, justificados. Não são cores de marca. Existem para a interface passar sem gastar bordô nem ouro.

| Token | Hex | Para que serve | Limite |
| --- | --- | --- | --- |
| `--line` | `#7A726A` | Contorno de campo, cartão e separador | 4,2681:1 sobre `#FAF3E0`. Passa UI (3:1). Falha texto normal (4,5:1). Não é cor de texto |
| `--ink-soft` | `#5C564E` | Crédito discreto do rodapé e texto de campo desativado | 6,5470:1 sobre `#FAF3E0`. Pode ser texto a partir de 14 px |
| `--field` | `#EFE6D4` | Fundo do campo desativado | Não é texto. Tinta sobre este fundo: 14,0391:1. `--ink-soft` sobre este fundo: 5,8489:1 |
| `--bordeaux-hover` | `#64101C` | Fundo do botão ao pairar | Texto marfim: 11,6132:1 |
| `--bordeaux-active` | `#4E0912` | Fundo do botão premido | Texto marfim: 13,8228:1 |

## Método

Contraste WCAG 2.x, em sRGB. Não foi arredondado antes de comparar com o limiar.

Para cada canal de 0 a 255, `c = canal / 255`. Se `c <= 0,04045`, o canal linear é `c / 12,92`. Senão é `((c + 0,055) / 1,055) ^ 2,4`.

Luminância relativa `L = 0,2126 R + 0,7152 G + 0,0722 B`.

Rácio = `(L mais clara + 0,05) / (L mais escura + 0,05)`.

Limiares usados na tabela:

- Texto normal (abaixo de 24 px regular, ou abaixo de cerca de 19 px em negrito): passa se o rácio for maior ou igual a 4,5:1.
- Texto grande e componentes de interface (não texto): passa se o rácio for maior ou igual a 3:1.

O rácio não muda com o tamanho. O que muda é o limiar. Um par que passa a 4,5:1 também passa em texto grande.

| Hex | L |
| --- | --- |
| `#1A1A1A` | 0,010330 |
| `#7A0F1E` | 0,045730 |
| `#B4292B` | 0,114636 |
| `#2E7D32` | 0,154784 |
| `#E6C333` | 0,560922 |
| `#FAF3E0` | 0,898070 |
| `#FFFFFF` | 1,000000 |

## Pares pedidos

| Par | Rácio | Texto normal 4,5:1 | Texto grande e UI 3:1 |
| --- | --- | --- | --- |
| `#1A1A1A` sobre `#FAF3E0` | 15,7148:1 | PASS | PASS |
| `#7A0F1E` sobre `#FAF3E0` | 9,9036:1 | PASS | PASS |
| `#FAF3E0` sobre `#7A0F1E` | 9,9036:1 | PASS | PASS |
| `#E6C333` sobre `#FAF3E0` | 1,5519:1 | FAIL | FAIL |
| `#E6C333` sobre `#7A0F1E` | 6,3817:1 | PASS | PASS |
| `#FFFFFF` sobre `#7A0F1E` | 10,9684:1 | PASS | PASS |
| `#B4292B` sobre `#FAF3E0` | 5,7586:1 | PASS | PASS |

Nota de folga, não é o critério pedido. Tinta sobre marfim, bordô sobre marfim, marfim sobre bordô e branco sobre bordô também ficam em ou acima de 7:1. Ouro sobre bordô fica em 6,3817:1 e por isso não chega a 7:1. Vermelho sobre marfim fica em 5,7586:1.

Par extra, porque a regra do verde precisa dele. `#2E7D32` sobre `#FAF3E0` dá 4,6296:1. PASS em texto normal, por uma margem de 0,1296. FAIL se alguém escurecer o fundo. Não autoriza o uso do verde nesta versão.

## Regra que o developer segue

O brief de 10 de novembro de 2026 substitui as regras da paleta anterior. Os números abaixo são os do brief, não os da medição antiga.

1. Fundo da página e do cabeçalho: `#F8F4EA`. Cartões: `#FFFFFF`.
2. Texto corrido: `#2D2927` sobre marfim (13,11:1) ou sobre branco (14,40:1).
3. Títulos e links: `#6D1723`, links sublinhados (10,64:1 sobre marfim). Hover do link em bordô, não em dourado.
4. Botão principal: fundo `#6D1723`, texto `#FFFFFF` (11,69:1), hover `#8A2733` (8,68:1). Borda dourada de 1 px só neste botão.
5. Botão secundário: fundo `#B58A3A`, texto `#2D2927` (4,57:1), peso 600, corpo ≥ 16 px. Hover `#DCCBAA` (9,03:1).
6. `#B58A3A` sobre `#F8F4EA` falha (2,87:1). Não é texto nem ícone que se leia. Serve para fio de 1 px e borda.
7. Rodapé bordô com texto branco. Uma faixa bordô curta. O resto é marfim e cartões brancos.
8. Não há modo escuro. `color-scheme: light`.

## Medição da paleta anterior

Substituída. Fica só como histórico. Não aplicar `#7A0F1E`, `#E6C333`, `#FAF3E0` nem `#1A1A1A`.

## Visão de cores (Machado)

As matrizes são as de Machado 2009, severidade 1.0, as mesmas de `astral-vita-produtos/docs/design/_contraste.py`. A distância é CIE76. Um ΔE perto de 3 confunde. O par que importa:

| Par | Visão comum | Deuteranopia | Protanopia | Tritanopia |
| --- | --- | --- | --- | --- |
| `#B4292B` e `#2E7D32` | 95,20 | 8,92 | 24,35 | 103,17 |
| `#7A0F1E` e `#1A1A1A` | 51,90 | 32,80 | 14,91 | 61,12 |
| `#E6C333` e `#FAF3E0` | 63,43 | 61,21 | 69,56 | 28,54 |

Vermelho cultural e verde esperança ficam a ΔE 8,92 em deuteranopia. Não podem ser o único sinal de dois estados. Nesta versão nenhum dos dois é aplicado, por isso o problema não chega à página.

Bordô e tinta continuam distintos, e o título ainda se separa pelo desenho da letra (Playfair, maior). Não usar a troca bordô/tinta como único código de um estado pequeno.

O ouro está longe do marfim no Lab e mesmo assim falha o contraste WCAG. Manda o rácio, não o ΔE. O ouro não é texto.

## O que o guia pede e o site não faz

- Gradiente a encher um bloco.
- Onda de rodapé.
- Texto ou ícone dourado sobre marfim.
- Cabeçalho ou hero pintados de bordô.
- O botão secundário do brief (`#B58A3A` com texto `#2D2927`) não é texto dourado. É o único botão com fundo dourado.
