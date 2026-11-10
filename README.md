# Instituto Maria Andreza Sá

Site institucional estático. Domínio previsto: https://mariaandrezasa.org

## Correr

Node 24. Neste disco o npm não cria symlinks.

```bash
npm i --no-bin-links
npm run build
npm test
npm run dev
```

Os testes leem `dist/`. A ordem é `npm run build && npm test`.

O servidor de desenvolvimento escuta em `127.0.0.1`. O preview usa a porta `4173`. No Astro 7 o preview fica em daemon. Para o parar: `node node_modules/astro/bin/astro.mjs preview stop`.

## Onde está o texto

As páginas leem `src/data/site.ts`.
A política de privacidade e a de cookies são o texto de `docs/PRIVACIDADE.md` e `docs/COOKIES.md`, copiado no build.

## De propósito desativado

O formulário em Contactos está visível e desativado. Não envia a mensagem, não a guarda e ninguém a recebe.
Projetos e notícias não têm lista.
E-mail e telefone não estão publicados. A sede registada está em Contactos, com ligação para o Google Maps. O NIPC está na privacidade e nos termos.

O site está em https://mariaandrezasa.org.
