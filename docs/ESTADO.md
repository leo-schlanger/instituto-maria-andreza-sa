# Estado

Atualizado a 2026-11-10, depois do layout editorial. Há um endereço na Vercel. O domínio próprio ainda aponta para o parqueamento da GoDaddy.

Estimativa do projeto: **85%**. As páginas, o layout, as páginas legais e o endereço de pré-visualização estão feitos. Falta o DNS, que só se muda no painel da GoDaddy, e o conteúdo que a associação ainda não fechou.

## Feito

- Site estático Astro com as rotas, o 404, o menu (Sheet), o rodapé e o formulário desativado.
- Layout editorial: selo no hero, três frases em faixa champanhe, faixa bordô de Portugal e Brasil, dois cartões para projetos e notícias, páginas de texto em coluna de leitura.
- Componentes shadcn em `src/components/ui/`. Paleta do brief de 10 de novembro de 2026.
- Textos em `src/data/site.ts`. Privacidade, cookies e termos saem do Markdown.
- `npm run build` e `npm test` passaram, 9 testes.
- Deploy de produção: https://instituto-maria-andreza-sa.vercel.app
- Repositório privado: https://github.com/leo-schlanger/instituto-maria-andreza-sa
- Domínio `mariaandrezasa.org` e `www` adicionados ao projeto na Vercel.

## A meio

- O domínio próprio. Os nameservers ficam na GoDaddy (`ns01.domaincontrol.com` e `ns02.domaincontrol.com`). Não se trocam. A Vercel, em `vercel domains verify` a 10 de novembro de 2026, pede registos DNS: A `@` `216.198.79.1`, A `@` `64.29.17.1`, CNAME `www` `a68994be907dd78b.vercel-dns-017.com`. Hoje o ápice ainda resolve para `3.33.130.190` e `15.197.148.33`.

## Próximo

- Leo grava esses registos na GoDaddy e apaga o parqueamento.
- Olhar o layout novo no endereço da Vercel.

## Pendente do Leo

- Na GoDaddy, DNS do domínio, sem mudar nameservers. Apagar os A `3.33.130.190` e `15.197.148.33` e o CNAME de `www` que aponta para o próprio domínio. Criar os dois A e o CNAME acima. É obrigatório para `mariaandrezasa.org` abrir o site. Sem isto, o domínio continua na página de parqueamento. Não há acesso à conta GoDaddy nesta máquina.
- Confirmar e-mail, telefone e morada institucionais antes de entrarem no site. Opcional até haver atividade económica (quotas, eventos pagos ou patrocínio). Se houver, morada e e-mail passam a ser obrigatórios.
- O NIPC 518875270 já está só na privacidade e nos termos. Se algum dígito da declaração estiver mal lido, corrigir.
- Fechar a lista de projetos e as notícias. As páginas dizem que ainda não há.
