# Estado

Atualizado a 2026-11-10, depois do deploy. Há um endereço na Vercel. O domínio próprio ainda aponta para o parqueamento da GoDaddy.

Estimativa do projeto: **80%**. As páginas, o visual, as páginas legais e o endereço de pré-visualização estão feitos. Falta o DNS e o conteúdo que a associação ainda não fechou.

## Feito

- Site estático Astro com as nove rotas, o 404, o menu (Sheet), o rodapé e o formulário desativado.
- Componentes shadcn em `src/components/ui/`: Button, Sheet, Card, Separator, Input, Label, Textarea. Paleta do brief de 10 de novembro de 2026.
- Textos em `src/data/site.ts`. Privacidade e cookies saem dos Markdown já existentes.
- `npm run build` e `npm test` passaram, 9 testes.
- Deploy de produção: https://instituto-maria-andreza-sa.vercel.app
- Repositório privado: https://github.com/leo-schlanger/instituto-maria-andreza-sa
- Domínio `mariaandrezasa.org` e `www` adicionados ao projeto na Vercel. O DNS ainda está na GoDaddy.

## A meio

- O domínio próprio. A Vercel espera os nameservers `ns1.vercel-dns.com` e `ns2.vercel-dns.com`, ou o registo `A` para `76.76.21.21` no ápice e no `www`. Hoje os nameservers são `ns01.domaincontrol.com` e `ns02.domaincontrol.com`.

## Próximo

- Validação do qa no endereço da Vercel.
- Trocar o DNS na GoDaddy para o site deixar o parqueamento.

## Pendente do Leo

- Na GoDaddy, trocar os nameservers para `ns1.vercel-dns.com` e `ns2.vercel-dns.com`. É obrigatório para `mariaandrezasa.org` abrir o site. Sem isto, o domínio continua na página de parqueamento.
- Confirmar e-mail, telefone e morada institucionais antes de entrarem no site. Opcional até haver atividade económica (quotas, eventos pagos ou patrocínio). Se houver, morada e e-mail passam a ser obrigatórios.
- O NIPC 518875270 já está só na privacidade e nos termos. Se algum dígito da declaração estiver mal lido, corrigir.
- Fechar a lista de projetos e as notícias. As páginas dizem que ainda não há.
