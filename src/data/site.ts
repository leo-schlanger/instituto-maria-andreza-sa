export const siteUrl = "https://mariaandrezasa.org";

// Official Instagram of the association. Empty until it exists; UI hides the link while empty.
export const instagramOficialUrl = "";

export const registeredName = "Instituto Associativo Cultural & Artístico Luso Brasileiro Maria Andreza Sá";

// Public name used by the association itself (president's text, 2026-11-11).
export const publicName = "Instituto Cultural e Artístico Luso-Brasileiro Maria Andreza Sá";

// The seat address is not published (president's request, 2026-11-11). Contact is e-mail and phone.
export const contactEmail = "institutomariaandrezasa@gmail.com";
// Phone given for publication by the president and authorised by Leo on 2026-11-11.
export const contactPhone = "+351968050922";
export const contactPhoneLabel = "+351 968 050 922";

// Entity tax number, already published in the legal pages.
export const nipc = "518875270";

// ISO form of the constitution date shown in the facts ("30 de junho de 2025").
export const foundingDate = "2025-06-30";

export const orgName = "Instituto Cultural e Artístico Luso-Brasileiro";

export const brandName = "Maria Andreza Sá";

// Portrait of the founder, still to come. Set src (in public/) with its real width and height.
export const founderPortrait: { src: string; width: number; height: number; alt: string } | null = null;

export const mission =
  "O Instituto Cultural e Artístico Luso-Brasileiro Maria Andreza Sá nasceu com a missão de estreitar os laços históricos, afetivos e culturais entre Portugal e o Brasil, aliando a promoção da arte e das tradições populares a uma atuação social e jurídica transformadora.";

// Emergency line shown next to the legal-support pillar and on /contactos/ (legal review 2026-11-11).
export const safetyNote = {
  text: "Em perigo imediato, ligue 112. Linha de apoio gratuita: 800 202 148.",
  emergency: { label: "112", tel: "112" },
  helpline: { label: "800 202 148", tel: "800202148" },
} as const;

export const pillarsIntro = "A atuação do Instituto assenta em três pilares fundamentais.";

export const pillars = [
  {
    icon: "justice",
    title: "Apoio e acesso à Justiça contra a violência doméstica",
    // Legal review 2026-11-11 (Lei 10/2024, art. 12.º): the association informs and refers; legal advice is given by the lawyer.
    text: "O Instituto informa, acolhe e encaminha mulheres vítimas de violência doméstica, para que possam romper ciclos de abuso, aceder à Justiça e reconstruir as suas vidas com segurança e dignidade. A orientação jurídica individual é prestada pela Dra. Maria Andreza Sá, advogada inscrita na Ordem dos Advogados.",
    safety: true,
  },
  {
    icon: "woman",
    title: "A mulher como um todo",
    subtitle: "Autoestima, determinação e foco",
    text: "Acreditamos que o verdadeiro empoderamento vai além da assistência imediata. O Instituto desenvolve ações voltadas para o resgate da autoestima, da autonomia emocional, da determinação e do foco, incentivando cada mulher a reconhecer o seu valor e a assumir o protagonismo da própria história.",
  },
  {
    icon: "hands",
    title: "Cultura e ação social solidária",
    text: "Promovemos o intercâmbio artístico e cultural entre os dois lados do Atlântico e realizamos campanhas solidárias contínuas junto das comunidades locais, como a Campanha Solidária de Dezembro, realizada em parceria com instituições sociais e dedicada à oferta de pijamas e carinho às crianças acolhidas em orfanatos.",
  },
] as const;

export const founder = {
  name: "Maria Andreza Sá",
  title: "Dra. Maria Andreza Sá",
  role: "Fundadora e presidente",
  bio: [
    "Maria Andreza Sá da Piedade Peres da Silva Gonçalves é advogada luso-brasileira, inscrita na Ordem dos Advogados do Brasil (OAB/BA) e na Ordem dos Advogados de Portugal (Conselho Regional de Lisboa), fundadora e presidente do Instituto Cultural e Artístico Luso-Brasileiro Maria Andreza Sá.",
    "Com uma trajetória académica e profissional marcada pelo pioneirismo, é mestre em Direito Criminal pela prestigiada e secular Universidade de Coimbra. Fez história há cerca de três décadas, ao tornar-se a primeira mulher negra a ingressar naquela Faculdade para frequentar o mestrado. Foi uma experiência profundamente transformadora, que consolidou a sua ligação académica e afetiva com Portugal e reforçou o seu compromisso com uma Justiça mais inclusiva e humana.",
    "Nascida no coração do Centro Histórico de Salvador, na Bahia, berço das mais profundas tradições culturais, históricas e religiosas do Brasil, Maria Andreza carrega no próprio nome uma herança de fé, força e ancestralidade. O seu nome é uma homenagem direta à sua avó materna, Maria Andreza de Araújo, mulher de fé inabalável e fervorosa devota de Santa Bárbara.",
    "Iniciada na religião de matriz africana e filha de Iansã (Oyá), orixá dos ventos, da transformação e da coragem feminina, Maria Andreza construiu uma carreira jurídica de décadas pautada pela defesa incansável da justiça, da dignidade humana e dos direitos das pessoas mais vulneráveis, numa ponte permanente entre o Brasil e Portugal. Ao radicar-se em solo português, transformou a sua vivência académica, jurídica e espiritual num compromisso coletivo, o de criar espaços de acolhimento, defesa jurídica, valorização cultural e fortalecimento da mulher em todas as suas dimensões.",
  ],
} as const;

export const founderLine = "A fundadora e presidente é Maria Andreza Sá.";

// Facts already stated in the page texts, shown as a data sheet.
export const facts = [
  { term: "Constituição", value: "30 de junho de 2025" },
  { term: "Fundadora e presidente", value: "Maria Andreza Sá" },
  { term: "Atividade registada", value: "Associação cultural e recreativa" },
  { term: "NIPC", value: nipc },
] as const;

export const associationFacts = [
  { term: "Nome registado", value: registeredName },
  { term: "Nome público", value: publicName },
  { term: "Constituição", value: "30 de junho de 2025" },
  { term: "Atividade registada", value: "Associação cultural e recreativa" },
  { term: "NIPC", value: nipc },
  { term: "Fundadora e presidente", value: "Maria Andreza Sá" },
] as const;

export const logoAlt = "Selo do Instituto Cultural e Artístico Luso-Brasileiro Maria Andreza Sá";

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
      "Instituto luso-brasileiro de arte e tradições populares, apoio e encaminhamento de mulheres vítimas de violência doméstica e ação social solidária.",
    h1: "Associação cultural e artística luso-brasileira",
    paragraphs: [
      mission,
      pillarsIntro,
      "A associação organizou a 1.ª Festa de Santa Bárbara em Lisboa. Decorreu em Arroios, de 4 a 6 de setembro de 2026, com missa, cortejo e feijoada. A cantora Alcione foi a madrinha.",
      "A festa trouxe a Lisboa uma tradição de Salvador da Bahia. Teve notícia no Público, no DN Brasil e na imprensa baiana.",
      "O Instagram que ligamos neste site é o da Festa de Santa Bárbara.",
    ],
  },
  associacao: {
    path: "/associacao/",
    title: "A associação e a fundadora | Maria Andreza Sá",
    description:
      "Missão, três pilares e biografia da fundadora e presidente, a advogada luso-brasileira Maria Andreza Sá. Associação constituída a 30 de junho de 2025.",
    h1: "A associação",
    paragraphs: [
      mission,
      `O nome registado é ${registeredName}. A associação foi constituída a 30 de junho de 2025. A atividade registada é a de associação cultural e recreativa.`,
      "A associação organizou a 1.ª Festa de Santa Bárbara em Lisboa. Decorreu em Arroios, de 4 a 6 de setembro de 2026, sem fins lucrativos.",
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
    description:
      "Contacte o Instituto Maria Andreza Sá pelo e-mail institutomariaandrezasa@gmail.com ou pelo telefone +351 968 050 922.",
    h1: "Contactos",
    paragraphs: [
      "O e-mail e o telefone são os contactos da associação.",
    ],
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
