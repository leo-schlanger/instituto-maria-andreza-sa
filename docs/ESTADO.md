# Estado

Atualizado a 2026-11-10, depois dos DNS na GoDaddy. O `www` abre o site. O endereço sem `www` ainda pode cair no parqueamento.

Estimativa do projeto: **90%**. As páginas, o layout e o `www` estão feitos. Falta apagar dois registos A velhos no ápice, e o conteúdo que a associação ainda não fechou.

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

- O `www` está certo. Em 10 de novembro de 2026 a Vercel verificou o CNAME e https://www.mariaandrezasa.org abre o site. Os nameservers continuam na GoDaddy. O ápice ainda tem, ao mesmo tempo, os A novos (`216.198.79.1` e `64.29.17.1`) e os A de parqueamento (`3.33.130.190` e `15.197.148.33`). Enquanto estes dois últimos existirem, https://mariaandrezasa.org pode cair na página de parqueamento.

## Próximo

- Leo apaga na GoDaddy os A de parqueamento `3.33.130.190` e `15.197.148.33`. Os outros registos ficam.
- Olhar o layout novo no endereço da Vercel.

## Pendente do Leo

- Na GoDaddy, apagar só os A `3.33.130.190` e `15.197.148.33`. Não mexer nos nameservers, nem nos A `216.198.79.1` e `64.29.17.1`, nem no CNAME de `www`. Sem apagar os dois velhos, `mariaandrezasa.org` (sem www) continua a poder abrir a página de parqueamento. Não há acesso à conta GoDaddy nesta máquina.
- Confirmar e-mail, telefone e morada institucionais antes de entrarem no site. Opcional até haver atividade económica (quotas, eventos pagos ou patrocínio). Se houver, morada e e-mail passam a ser obrigatórios.
- O NIPC 518875270 já está só na privacidade e nos termos. Se algum dígito da declaração estiver mal lido, corrigir.
- Fechar a lista de projetos e as notícias. As páginas dizem que ainda não há.
