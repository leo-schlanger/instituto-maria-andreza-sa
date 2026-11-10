# Estado

Atualizado a 2026-11-10, depois da segunda gravação na GoDaddy. O domínio e o `www` estão verificados na Vercel.

Estimativa do projeto: **92%**. O site e o DNS estão feitos. Falta o conteúdo que a associação ainda não fechou.

## Feito

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

- Não apagar mais registos DNS. Têm de ficar os dois A (`216.198.79.1` e `64.29.17.1`) e o CNAME de `www`.
- Confirmar e-mail e telefone institucionais antes de entrarem no site. A sede registada já está publicada. Se houver atividade económica (quotas, eventos pagos ou patrocínio), o e-mail passa a ser obrigatório.
- O NIPC 518875270 já está só na privacidade e nos termos. Se algum dígito da declaração estiver mal lido, corrigir.
- Fechar a lista de projetos e as notícias. As páginas dizem que ainda não há.
