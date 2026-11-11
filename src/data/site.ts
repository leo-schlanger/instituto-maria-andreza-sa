export const siteUrl = "https://mariaandrezasa.org";

// Official Instagram of the association. Empty until it exists; UI hides the link while empty.
export const instagramOficialUrl = "";

export const registeredName = "Instituto Associativo Cultural & Artístico Luso Brasileiro Maria Andreza Sá";

export const seatLine = "Rua Soeiro Pereira Gomes, n.º 12, 3.º frente, Quinta da Grinja, 2600-265 Vila Franca de Xira";

export const seatMapUrl = "https://www.google.com/maps/search/?api=1&query=Rua%20Soeiro%20Pereira%20Gomes%2012%203%C2%BA%20frente%202600-265%20Vila%20Franca%20de%20Xira";

export const orgName = "Instituto Associativo Cultural & Artístico Luso-Brasileiro";

export const brandName = "Maria Andreza Sá";

export const founderLine = "A fundadora é Maria Andreza Sá.";

// Facts already stated in the page texts, shown as a data sheet.
export const facts = [
  { term: "Constituição", value: "30 de junho de 2025" },
  { term: "Sede", value: "Vila Franca de Xira" },
  { term: "Atividade registada", value: "Associação cultural e recreativa" },
  { term: "Fundadora", value: "Maria Andreza Sá" },
] as const;

export const associationFacts = [
  { term: "Nome registado", value: registeredName },
  { term: "Constituição", value: "30 de junho de 2025" },
  { term: "Atividade registada", value: "Associação cultural e recreativa" },
  { term: "Sede", value: seatLine },
  { term: "Fundadora", value: "Maria Andreza Sá" },
  { term: "Responsável", value: "Aline dos Santos Silva" },
] as const;

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
    title: "Instituto Maria Andreza Sá, associação luso-brasileira",
    description:
      "Associação cultural e artística luso-brasileira com sede em Vila Franca de Xira. Organizou a 1.ª Festa de Santa Bárbara em Lisboa, em 2026.",
    h1: "Associação cultural e artística luso-brasileira",
    paragraphs: [
      "O Instituto Associativo Cultural & Artístico Luso-Brasileiro Maria Andreza Sá é uma associação cultural e artística. Foi constituída a 30 de junho de 2025 e tem sede em Vila Franca de Xira.",
      "O trabalho está na cultura que Portugal e o Brasil partilham. A língua é a mesma. As tradições de cada país têm aqui lugar próprio.",
      "A associação organizou a 1.ª Festa de Santa Bárbara em Lisboa. Decorreu em Arroios, de 4 a 6 de setembro de 2026, com missa, cortejo e feijoada. A cantora Alcione foi a madrinha.",
      "A festa trouxe a Lisboa uma tradição de Salvador da Bahia. Teve notícia no Público, no DN Brasil e na imprensa baiana.",
      "O Instagram que ligamos neste site é o da Festa de Santa Bárbara.",
    ],
  },
  associacao: {
    path: "/associacao/",
    title: "Associação cultural luso-brasileira em Vila Franca de Xira",
    description:
      "O Instituto Maria Andreza Sá é uma associação cultural e recreativa, constituída em 2025, com sede em Vila Franca de Xira. Cultura de Portugal e do Brasil.",
    h1: "A associação",
    paragraphs: [
      `O Instituto Associativo Cultural & Artístico Luso-Brasileiro é uma associação cultural e artística. O nome registado é ${registeredName}.`,
      "Foi constituída a 30 de junho de 2025. A atividade registada é a de associação cultural e recreativa.",
      `A sede fica na ${seatLine}.`,
      "Portugal e o Brasil estão no nome. A associação trabalha a tradição, as artes e o encontro entre as pessoas dos dois países.",
      "A associação organizou a 1.ª Festa de Santa Bárbara em Lisboa. Decorreu em Arroios, de 4 a 6 de setembro de 2026, sem fins lucrativos.",
      founderLine,
      "Aline dos Santos Silva é a responsável pela associação.",
      "A história escrita da associação, com datas e factos, será publicada aqui pela própria associação.",
    ],
  },
  cultura: {
    path: "/cultura/",
    title: "Cultura brasileira em Portugal | Maria Andreza Sá",
    description:
      "Atividades culturais da associação Maria Andreza Sá. A 1.ª Festa de Santa Bárbara levou a Lisboa missa, cortejo afro-brasileiro, arte e gastronomia baiana.",
    h1: "Cultura",
    paragraphs: [
      "Esta página reúne as atividades culturais da associação. A arte, a música, a fé popular e a cozinha de Portugal e do Brasil cabem aqui.",
      "A primeira atividade com registo público é a Festa de Santa Bárbara em Lisboa, que a associação organizou em setembro de 2026. No domingo, 6 de setembro, houve missa na Igreja de Nossa Senhora dos Anjos, em Arroios, e depois um cortejo pelas ruas do centro até à Praça da Figueira.",
      "O programa anunciado juntava grupos afro-brasileiros, capoeira e percussão, a exposição «Afro Barroco Cachoeira, Recôncavo da Bahia, Religiosidade», com curadoria de Jomar Lima, uma mostra de moda e gastronomia baiana.",
      "As próximas atividades entram nesta página com data e lugar, quando a associação as anunciar.",
    ],
  },
  portugal: {
    path: "/portugal-e-brasil/",
    title: "Portugal e Brasil, de Salvador a Lisboa",
    description:
      "Em Salvador, a Festa de Santa Bárbara faz-se a 4 de dezembro. Em 2026 chegou a Arroios, em Lisboa. A ligação entre Portugal e o Brasil na associação.",
    h1: "Portugal e Brasil",
    paragraphs: [
      "A associação leva os dois países no nome. A língua é comum. As culturas são duas, e é essa diferença que dá sentido ao intercâmbio.",
      "A Festa de Santa Bárbara mostra bem esta ligação. Em Salvador da Bahia, o culto existe desde 1641 e a festa faz-se a 4 de dezembro, no Centro Histórico. Desde 2008 é Património Imaterial da Bahia.",
      "Segundo o Público, a imagem da santa foi levada para Salvador por um casal de portugueses há quase 400 anos. Na Bahia, o candomblé homenageia na mesma festa a divindade Iansã.",
      "Em setembro de 2026, a festa fez o caminho de volta. A associação organizou a 1.ª edição em Arroios, em Lisboa. O lema da 1.ª edição foi «Os ventos que ventam lá, ventam cá».",
      "Esta página vai juntar outras iniciativas entre os dois países, com data e lugar, quando existirem.",
    ],
    sources: [
      { titulo: "IPAC, Festa de Santa Bárbara", url: "https://www.ba.gov.br/ipac/festa-de-santa-barbara" },
      {
        titulo: "Secretaria de Cultura da Bahia",
        url: "https://www.ba.gov.br/cultura/noticias/2025-12/63538/multidao-celebra-santa-barbara-com-fe-e-devocao-no-centro-historico-de",
      },
      {
        titulo: "Público Brasil",
        url: "https://www.publico.pt/2026/06/17/publico-brasil/noticia/brasileira-traz-festa-santa-barbara-bahia-lisboa-fe-tradicao-2178440",
      },
      {
        titulo: "Alô Alô Bahia",
        url: "https://aloalobahia.com/noticias/2026/08/28/alcione-sera-madrinha-da-primeira-festa-de-santa-barbara-realizada-em-lisboa/",
      },
    ],
  },
  projetos: {
    path: "/projetos/",
    title: "Projetos | Maria Andreza Sá",
    description: "Iniciativas e eventos do Instituto Maria Andreza Sá.",
    h1: "Projetos e eventos",
    paragraphs: [
      "As iniciativas e os eventos ainda não estão listados neste site. Quando a associação fechar um projeto, ele aparece aqui.",
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
    description: "Sede em Vila Franca de Xira. E-mail e telefone ainda não estão publicados.",
    h1: "Contactos",
    paragraphs: [
      `A sede fica na ${seatLine}.`,
      "E-mail e telefone institucionais ainda não estão publicados. Entram nesta página quando a associação os confirmar.",
    ],
    formNotice:
      "Este formulário está desativado. Não envia a mensagem, não a guarda e ninguém a recebe.",
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
  ...(instagramOficialUrl ? { sameAs: [instagramOficialUrl] } : {}),
}).replaceAll("<", "\\u003c");
