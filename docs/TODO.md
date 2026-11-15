# TODO

Coisas que o site ainda não pode inventar. Nenhuma entra sem confirmação da associação.

## Projetos

Só há um evento, a 1.ª Festa de Santa Bárbara em Lisboa (`src/data/eventos.ts`). Projetos novos entram quando a associação entregar nome, descrição e data.

## Festa de Santa Bárbara (2026-11-15)

- 6 fotografias retidas (pessoas reconhecíveis em festa religiosa, art. 9.º RGPD): só entram com autorização escrita de cada pessoa. Ficheiros convertidos fora do repositório.
- Vídeo institucional: `public/video/festa-santa-barbara.mp4` (1920×1080, H.264/AAC, até 15 MB) e `public/video/festa-santa-barbara-poster.jpg` (1920×1080), mais `duracao` e `carregadoEm` em `eventos.ts`.

## Notícias

Não há notícias. `/noticias/` não leva artigos nem datas.

## Contactos institucionais

A morada da sede não se publica (pedido da presidente, 2026-11-11). Contactos públicos: e-mail institutomariaandrezasa@gmail.com e telefone +351 968 050 922. O Instagram https://www.instagram.com/festasantabarbaralx/ é do evento.

O formulário permanece desativado até existir um destino real. Não ligar `action` nem `mailto` antes disso.

## NIPC

O cliente confirmou em 10 de novembro de 2026 que a declaração serve para identificar a instituição. O NIPC 518875270 está só na política de privacidade e nos termos de utilização. Morada, e-mail, telefone e documento de pessoa continuam fora.

## Domínio

O domínio fica na GoDaddy. Não se mudam os nameservers. Em 10 de novembro de 2026 a GoDaddy já só publica os registos abaixo e a Vercel aceitou o ápice e o `www`. Não apagar:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | @ | `216.198.79.1` |
| A | @ | `64.29.17.1` |
| CNAME | www | `a68994be907dd78b.vercel-dns-017.com` |

Valores pedidos pela Vercel em 10 de novembro de 2026 (`vercel domains verify`). Sem acesso à conta GoDaddy a partir desta máquina.
