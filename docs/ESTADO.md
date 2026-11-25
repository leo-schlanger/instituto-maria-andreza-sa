# Estado

Atualizado a 2026-11-25, com a notícia do perfil de Delgrace Aeppli no Café com Shah. O domínio e o `www` estão verificados na Vercel.

Estimativa do projeto: **95%**. O site e o DNS estão feitos. Falta o que a associação ainda não fechou.

## Feito

- 2026-11-25 (notícias): perfil de Delgrace Aeppli, Café com Shah, 25 de novembro de 2026, em `/noticias/perfil-de-delgrace-aeppli/`. A presidente pediu, depois de autorização da Delgrace. Resumo nosso e ligação à fonte. Sem a fotografia de Duda Tawil. A parceira entra como Associação Comadres de Cascais. A campanha de pijamas e o Clube Brasil Portugal, ainda em preparação, continuam de fora. A narrativa da festa não mudou.

- 2026-11-23 (música): a música de fundo do Santa Bárbara passou a tocar só na página da festa. O resto do site toca «Maria Maria», de Milton Nascimento, com o mesmo controlo discreto. A gravação é da Universal e não tem licença: foi decisão do Leo, que assumiu o risco (nota no CLAUDE.md).

- 2026-11-23: página própria `/amigos-e-guardioes/` com o texto da presidente sobre os Amigos de Santa Bárbara, Protegidos por Oyá e os Guardiões da Ancestralidade. Não fica no meio da página da festa: lá há um apontador. Sem lista de nomes. A homenagem ao marido não entrou: não veio texto. Fotografia dela na Igreja de Nossa Senhora dos Anjos em `public/festa/`, inteira, sem desfoque, por indicação dela e do Leo. Notícia com a reportagem do Portal Turismo Total de 7 de setembro de 2026, sem o programa que não se realizou. Convite à 2.ª festa em 2027, sem dia marcado.

- 2026-11-17 (parceiros): secção na home, entre Portugal e Brasil e o índice do site. A primeira é a Associação Comadres de Cascais, com o logótipo dela e a ligação para comadresdecascais.com. A campanha de pijamas de dezembro continua por publicar.

- 2026-11-17 (notícias): três páginas em /noticias/. Livro Entrelinhas, com a fotografia dela e o livro. XIII Fórum de Lisboa, presença de 2 a 4 de julho de 2025, crachá de imprensa, sem a tratar como oradora. Prémios Embaixadores 2025, presença no painel da edição e homenagem na categoria Justiça só como anúncio de fevereiro, para 24 de maio. Fora: Sorbonne (só o letreiro), o pódio de outubro sem sala identificada, a frase «dois congressos em perspectiva», o troféu com texto ilegível e a parceria dos pijamas.

- 2026-11-17: a presidente corrigiu a missa. Saiu o programa anunciado que não se realizou (exposição, moda, grupos até à Abadá Capoeira), na página do evento e em /cultura/. O cortejo passou a incluir Santa Bárbara e a imagem de Santa Dulce, trazida de Salvador por Laura Tanure. O padrinho e os embaixadores deixaram de aparecer como presentes na missa e continuam no agradecimento. Saíram a Junta de Freguesia. Entraram os Guardiões da Ancestralidade e os amigos vindos de Salvador. Retrato da fundadora em /associacao/ e na home (`public/fundadora.webp`). A campanha de pijamas de dezembro ficou de fora: ainda não ocorreu. O livro entrou nas notícias no mesmo dia, com fotografia. A Sorbonne continua de fora.

- 2026-11-15 (tarde): vídeo institucional da festa (68 s) publicado na página do evento e na home, com `VideoObject`; rostos de fundo desfocados nas fotos 04, 07 e 09; foto das bandeiras em /portugal-e-brasil/.

- 2026-11-15, material da presidente sobre a Festa de Santa Bárbara: 8 fotografias publicadas (triagem do juridico) na galeria do evento, no topo da página do evento, no cartão de /projetos/ e no destaque da home; secção «A missa de 6 de setembro» com o programa do missal; lugar para o vídeo institucional (aparece sozinho quando o mp4 entrar em `public/video/`); privacidade e termos atualizados (texto de 15 de novembro). 6 fotografias com pessoas em destaque retidas até autorização escrita. 37 testes verdes.

- 2026-11-11 (noite), correções do qa: anel de foco claro em todas as superfícies escuras (medido 10,64 a 15,31:1), concordância em /associacao/, selo no máximo 2 vezes por página com painéis de ornamentos no lugar, título do pilar 1 e meta da home segundo o juridico, testes de foco e de linguagem jurídica.

- 2026-11-11 (tarde), conteúdo oficial da presidente: biografia da fundadora em /associacao/#fundadora (resumo na home), três pilares na home e em /associacao/, narrativa da festa antes dos factos da imprensa, nome público novo. Morada da sede e nome da antiga responsável retirados de todo o site e do JSON-LD. Contactos com e-mail e telefone reais, sem formulário. Pilar 1 redigido segundo o parecer jurídico, com 112 e a linha 800 202 148.

- 2026-11-11, SEO: JSON-LD em todas as páginas (associação com sede, constituição e NIPC, site, página, migalhas nas interiores, `Event` da Festa de Santa Bárbara com datas ISO), Open Graph e Twitter completos, `og:type=article` no evento, sitemap com `lastmod` do git, preload das fontes do título e do fundo do hero, selo com `srcset` (o cabeçalho deixou de descarregar 142 KB em cada página), cache de `/ornaments/` e `/brand/`, botão «Ler sobre Portugal e Brasil» em vez de «Ler mais». `tests/seo.test.mjs` com 11 verificações; 21 testes verdes.
- 2026-11-11, redesenho completo: hero bordô com selo em medalhão, ficha institucional, princípios, painel Portugal e Brasil com a onda da calçada, índice de secções, cabeçalhos de página bordô com azulejo, estados vazios com moldura, contactos com canais e formulário desativado, legais com índice, 404 com selo, rodapé completo, OG novo. Movimento só em CSS, com `prefers-reduced-motion`.
- 2026-11-11, Instagram corrigido: o perfil `festasantabarbaralx` passa a ser do evento. Evento «1.ª Festa de Santa Bárbara em Lisboa» com página própria em `/projetos/festa-de-santa-barbara-lisboa-2026/`, fontes e galeria pronta (0 a 20 fotos). Textos de início, associação, cultura e Portugal e Brasil atualizados com a pesquisa.
- `npm run build` e `npm test` passaram, 11 testes.

- Site estático Astro com as rotas, o 404, o menu (Sheet), o rodapé e o formulário desativado.
- Layout editorial: selo no hero, três frases em faixa champanhe, faixa bordô de Portugal e Brasil, dois cartões para projetos e notícias, páginas de texto em coluna de leitura.
- Componentes shadcn em `src/components/ui/`. Paleta do brief de 10 de novembro de 2026.
- Textos em `src/data/site.ts`. Privacidade, cookies e termos saem do Markdown.
- `npm run build` e `npm test` passaram, 9 testes.
- Deploy de produção: https://instituto-maria-andreza-sa.vercel.app
- Repositório público: https://github.com/leo-schlanger/instituto-maria-andreza-sa
- DNS fechado em 10 de novembro de 2026. Nameservers continuam na GoDaddy. A GoDaddy publica só A `@` `216.198.79.1` e `64.29.17.1`, e CNAME `www` `a68994be907dd78b.vercel-dns-017.com`. A Vercel marcou o ápice e o `www` como configuração válida.

## A meio

- Nada no DNS. Um cache antigo pode ainda mostrar o parqueamento durante cerca de 10 minutos.

## Próximo

- Abrir https://mariaandrezasa.org quando o cache do browser deixar o parqueamento.

## Pendente do Leo

- Levar à presidente o título e a frase final do pilar 1 (reescritos por parecer jurídico) e confirmar que aceita.
- O retrato da fundadora entrou a 17 de novembro de 2026. Se ela quiser outro enquadramento, substitui-se `public/fundadora.webp` (800×1000).

- Na Vercel, em Settings → Domains, pôr `www.mariaandrezasa.org` a redirecionar (308) para `mariaandrezasa.org`. Hoje os dois respondem 200 com o mesmo conteúdo. Recomendado: o canonical já aponta ao ápice, mas o redirect junta os sinais num só host. Sem isto não há erro, só sinais repartidos.
- Google Search Console: adicionar a propriedade de domínio `mariaandrezasa.org` (registo TXT na GoDaddy) e submeter `https://mariaandrezasa.org/sitemap-index.xml`. Opcional, mas é a única forma de ver a indexação e os erros de dados estruturados. Bing Webmaster Tools importa do Search Console. Opcional.
- Autorizações escritas das pessoas nas 6 fotografias retidas da festa (lista em `~/.cache/imas-fotos/`, fora do git). Opcional: sem elas a galeria fica com as 8 de hoje.
- Criar o Instagram oficial (preencher `instagramOficialUrl`). Opcional.

- Não apagar mais registos DNS. Têm de ficar os dois A (`216.198.79.1` e `64.29.17.1`) e o CNAME de `www`.
- O NIPC 518875270 já está só na privacidade e nos termos. Se algum dígito da declaração estiver mal lido, corrigir.
- Fechar a lista de projetos. /projetos/ continua a dizer que não há mais eventos. As notícias do livro, do fórum e dos prémios já estão publicadas.
