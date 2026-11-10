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

## 4. Direção

Institucional, editorial, elegante, minimalista, cultural, contemporânea. Linhas finas douradas, bordas discretas, fundos em marfim, padrões subtis de azulejo, elementos botânicos discretos, transições suaves. Sem excesso de ornamentos, sem gradientes pesados, sem sombras pesadas, sem visual de template, sem barroco.

## 5. Componentes

shadcn/ui (Radix + Tailwind), não HTML cru.

Botão principal: fundo `#6D1723`, texto `#FFFFFF`, hover `#8A2733`, borda dourada opcional. Botão secundário: fundo `#B58A3A`, texto `#2D2927`, hover `#DCCBAA`. Cartões brancos ou marfim, borda discreta, cantos ligeiramente arredondados, sombra muito suave.

Cabeçalho com a logo à esquerda, menu horizontal no desktop, menu no telemóvel, Montserrat, hover subtil em dourado, botão de contacto em destaque.

## 6. Contraste medido em 10 de novembro de 2026

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

O ficheiro da logo é RGB, sem transparência, campo cerca de `#FCF8E9`. O cabeçalho fica em marfim para o selo não aparecer dentro de um quadrado. O bordô entra no rodapé, nos títulos, no botão principal e numa faixa curta.

## 7. Conteúdo que esta versão não inventa

Não há fotografias de eventos da associação. Não há projetos com nome, data ou descrição confirmados. Não há notícias. Essas zonas usam cartões shadcn em estado vazio e apontam para o Instagram https://www.instagram.com/festasantabarbaralx/

A fundadora, no texto público pedido neste brief, é Maria Andreza Sá. Uma frase, sem biografia inventada. Dados pessoais do registo (documento, morada, e-mail, números) não entram no site nem no git.
