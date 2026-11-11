# Estado

Atualizado a 2026-11-11, depois do redesenho. O domínio e o `www` estão verificados na Vercel.

Estimativa do projeto: **94%**. O site e o DNS estão feitos. Falta o conteúdo que a associação ainda não fechou.

## Feito

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

- Levar à presidente a frase final do pilar 1 (reescrita por parecer jurídico) e confirmar que aceita.
- Mandar o retrato da fundadora (lugar já preparado em /associacao/ e na home). Opcional.

- Na Vercel, em Settings → Domains, pôr `www.mariaandrezasa.org` a redirecionar (308) para `mariaandrezasa.org`. Hoje os dois respondem 200 com o mesmo conteúdo. Recomendado: o canonical já aponta ao ápice, mas o redirect junta os sinais num só host. Sem isto não há erro, só sinais repartidos.
- Google Search Console: adicionar a propriedade de domínio `mariaandrezasa.org` (registo TXT na GoDaddy) e submeter `https://mariaandrezasa.org/sitemap-index.xml`. Opcional, mas é a única forma de ver a indexação e os erros de dados estruturados. Bing Webmaster Tools importa do Search Console. Opcional.
- Enviar as fotos do evento (o contrato e a galeria já estão prontos) e criar o Instagram oficial (preencher `instagramOficialUrl`). Opcional.

- Não apagar mais registos DNS. Têm de ficar os dois A (`216.198.79.1` e `64.29.17.1`) e o CNAME de `www`.
- O NIPC 518875270 já está só na privacidade e nos termos. Se algum dígito da declaração estiver mal lido, corrigir.
- Fechar a lista de projetos e as notícias. As páginas dizem que ainda não há.
