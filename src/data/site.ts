export const siteUrl = "https://mariaandrezasa.org";

export const instagramUrl = "https://www.instagram.com/festasantabarbaralx/";

export const registeredName = "Instituto Associativo Cultural & Artístico Luso Brasileiro Maria Andreza Sá";

export const seatLine = "Rua Soeiro Pereira Gomes, n.º 12, 3.º frente, Quinta da Grinja, 2600-265 Vila Franca de Xira";

export const seatMapUrl = "https://www.google.com/maps/search/?api=1&query=Rua%20Soeiro%20Pereira%20Gomes%2012%203%C2%BA%20frente%202600-265%20Vila%20Franca%20de%20Xira";

export const orgName = "Instituto Associativo Cultural & Artístico Luso-Brasileiro";

export const brandName = "Maria Andreza Sá";

export const founderLine = "A fundadora é Maria Andreza Sá.";

export const logoAlt = "Selo do Instituto Associativo Cultural & Artístico Luso-Brasileiro";

export const nav = [
  { href: "/", label: "Início" },
  { href: "/associacao/", label: "A associação" },
  { href: "/cultura/", label: "Cultura" },
  { href: "/portugal-e-brasil/", label: "Portugal e Brasil" },
  { href: "/projetos/", label: "Projetos" },
  { href: "/noticias/", label: "Notícias" },
  { href: "/contactos/", label: "Contactos" },
] as const;

export function isCurrent(pathname: string, href: string): boolean {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return path === href;
}

const privacyDescription =
  "O que o site faz com dados pessoais. O site é institucional e estático. Não cria conta nem perfil.";

const cookiesDescription = "Que cookies usa o site. Este site não grava cookies.";

export const pages = {
  home: {
    path: "/",
    title: "Instituto Maria Andreza Sá",
    description:
      "Associação cultural e artística em Portugal, dedicada à ligação entre Portugal e o Brasil.",
    h1: "Instituto Associativo Cultural & Artístico Luso-Brasileiro",
    paragraphs: [
      "Bem-vindo. Somos uma associação cultural e artística. O nome de marca é Maria Andreza Sá.",
      "O trabalho da associação está na cultura que Portugal e o Brasil partilham: a língua, as artes e a tradição de cada um. Foi constituída em 30 de junho de 2025 e tem sede em Vila Franca de Xira.",
      "O canal público, por agora, é o Instagram da Festa de Santa Bárbara, em Lisboa.",
    ],
  },
  associacao: {
    path: "/associacao/",
    title: "A associação | Maria Andreza Sá",
    description:
      "O que é o Instituto Associativo Cultural & Artístico Luso-Brasileiro e quem o representa.",
    h1: "A associação",
    paragraphs: [
      `O Instituto Associativo Cultural & Artístico Luso-Brasileiro é uma associação cultural e artística. Portugal e o Brasil estão no nome. O nome registado é ${registeredName}.`,
      "Foi constituída em 30 de junho de 2025. A atividade registada é a de associação cultural e recreativa.",
      `A sede fica na ${seatLine}.`,
      "O propósito é tratar a tradição com cuidado, dar espaço à cultura e manter a ligação entre os dois países em atividades concretas, quando elas existirem.",
      founderLine,
      "Aline dos Santos Silva é a responsável pela associação.",
      "A história escrita, com datas e factos, será publicada nesta página pela própria associação quando estiver fechada. Até lá, não descrevemos um percurso que ainda não foi escrito.",
      "Tradição é o que se recebe e se continua. Cultura é o que se faz em conjunto, na arte, no encontro e na memória. A união luso-brasileira é o motivo do nome.",
    ],
  },
  cultura: {
    path: "/cultura/",
    title: "Cultura | Maria Andreza Sá",
    description: "Atividades culturais, exposições, arte e património no âmbito do instituto.",
    h1: "Cultura",
    paragraphs: [
      "Esta área vai reunir as atividades culturais da associação, as exposições, a arte e o património de Portugal e do Brasil que o instituto escolher mostrar.",
      "Ainda não há um calendário publicado. Quando houver uma exposição, uma oficina ou uma visita, o registo entra aqui e no Instagram.",
    ],
  },
  portugal: {
    path: "/portugal-e-brasil/",
    title: "Portugal e Brasil | Maria Andreza Sá",
    description: "A ligação entre Portugal e o Brasil no instituto Maria Andreza Sá.",
    h1: "Portugal e Brasil",
    paragraphs: [
      "A associação leva os dois países no nome. A língua é comum. As culturas não são a mesma, e é essa diferença que justifica o intercâmbio.",
      "Esta página vai documentar iniciativas que liguem artistas, associações e públicos dos dois lados, com data e lugar. Ainda não há uma lista.",
    ],
  },
  projetos: {
    path: "/projetos/",
    title: "Projetos | Maria Andreza Sá",
    description: "Iniciativas e eventos do instituto. Página em preparação.",
    h1: "Projetos em preparação",
    paragraphs: [
      "As iniciativas e os eventos ainda não estão listados neste site. Quando a associação fechar um projeto, ele aparece aqui.",
      "Até lá, o Instagram é onde a atividade pública se vê.",
    ],
  },
  noticias: {
    path: "/noticias/",
    title: "Notícias | Maria Andreza Sá",
    description: "Novidades do instituto. Ainda não há notícias publicadas.",
    h1: "Notícias",
    paragraphs: [
      "Ainda não há notícias publicadas. Esta página fica para a cobertura das atividades, quando elas acontecem.",
    ],
  },
  contactos: {
    path: "/contactos/",
    title: "Contactos | Maria Andreza Sá",
    description: "Sede em Vila Franca de Xira e Instagram. E-mail e telefone ainda não estão publicados.",
    h1: "Contactos",
    paragraphs: [
      "O contacto que já funciona é o Instagram.",
      `A sede fica na ${seatLine}.`,
      "E-mail e telefone institucionais ainda não estão publicados. Entram nesta página quando a associação os confirmar.",
    ],
    formNotice:
      "Este formulário está desativado. Não envia a mensagem, não a guarda e ninguém a recebe. Para falar com a associação, use o Instagram.",
  },
  privacidade: {
    path: "/privacidade/",
    title: "Política de privacidade | Maria Andreza Sá",
    description: privacyDescription,
    file: "docs/PRIVACIDADE.md",
  },
  cookies: {
    path: "/cookies/",
    title: "Política de cookies | Maria Andreza Sá",
    description: cookiesDescription,
    file: "docs/COOKIES.md",
  },
  termos: {
    path: "/termos/",
    title: "Termos de utilização | Maria Andreza Sá",
    description: "Regras de utilização do site da associação. Não é loja e não há conta.",
    file: "docs/TERMOS.md",
  },
} as const;

export const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: orgName,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/brand/logo.webp`,
  sameAs: [instagramUrl],
}).replaceAll("<", "\\u003c");
