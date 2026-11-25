export type Fonte = { titulo: string; url: string };

export type FotoNoticia = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Noticia = {
  slug: string;
  titulo: string;
  // Document title when `titulo` is too long for the 60-character SERP limit. The h1 stays `titulo`.
  metaTitle?: string;
  data: string;
  dataIso: string;
  resumo: string;
  etiqueta: string;
  corpoTitulo: string;
  paragrafos: readonly string[];
  ficha: readonly { term: string; value: string }[];
  fontes: readonly Fonte[];
  foto?: FotoNoticia;
  ligacao?: { href: string; label: string };
};

// Newest first. A fact needs a named, dated source, or it has to be visible in a photo she sent.
export const noticias: readonly Noticia[] = [
  {
    slug: "perfil-de-delgrace-aeppli",
    titulo: "Delgrace Aeppli: uma gigante pela própria natureza",
    metaTitle: "Perfil de Delgrace Aeppli",
    data: "25 de novembro de 2026",
    dataIso: "2026-11-25",
    etiqueta: "Imprensa",
    corpoTitulo: "O perfil",
    resumo:
      "O Café com Shah publicou, a 25 de novembro de 2026, um perfil de Delgrace Aeppli, da Associação Comadres de Cascais, parceira do instituto.",
    paragrafos: [
      "A 25 de novembro de 2026, o Café com Shah publicou o perfil «Delgrace Aeppli: uma gigante pela própria natureza», assinado por Luizinho Filho.",
      "O texto apresenta Maria Delgrace Conceição Aeppli e indica-a como CEO da Associação Comadres de Cascais, parceira do instituto.",
      "O perfil diz que colaborou na 1.ª Festa de Santa Bárbara em Lisboa, como co-coordenadora, e que participou no cortejo de 6 de setembro de 2026. A legenda da fotografia, de Duda Tawil, refere a festa como idealizada e realizada por Maria Andreza Sá.",
    ],
    ficha: [
      { term: "Data do perfil", value: "25 de novembro de 2026" },
      { term: "Publicação", value: "Café com Shah" },
      { term: "Parceira", value: "Associação Comadres de Cascais" },
    ],
    fontes: [
      {
        titulo: "Café com Shah, 25 de novembro de 2026",
        url: "https://cafecomshah.com.br/delgrace-aeppli-uma-gigante-pela-propria-natureza-2/",
      },
    ],
    ligacao: {
      href: "/projetos/festa-de-santa-barbara-lisboa-2026/",
      label: "1.ª Festa de Santa Bárbara em Lisboa",
    },
  },
  {
    slug: "primeira-festa-de-santa-barbara-oya-na-europa",
    titulo: "Primeira Festa de Santa Bárbara/Oyá na Europa agitou Lisboa",
    metaTitle: "Festa de Santa Bárbara/Oyá agitou Lisboa",
    data: "7 de setembro de 2026",
    dataIso: "2026-09-07",
    etiqueta: "Imprensa",
    corpoTitulo: "A reportagem",
    resumo:
      "O Portal Turismo Total publicou, a 7 de setembro de 2026, uma reportagem sobre a 1.ª Festa de Santa Bárbara em Lisboa.",
    paragrafos: [
      "A 7 de setembro de 2026, o Portal Turismo Total publicou a reportagem «Primeira Festa de Santa Bárbara/Oyá na Europa agitou Lisboa».",
      "A festa decorreu de 4 a 6 de setembro de 2026, em Arroios, organizada pelo Instituto Cultural e Artístico Luso-Brasileiro Maria Andreza Sá. No domingo, 6 de setembro, houve missa na Igreja de Nossa Senhora dos Anjos.",
      "O relato da associação, as fotografias e as restantes fontes estão na página da festa.",
    ],
    ficha: [
      { term: "Data da reportagem", value: "7 de setembro de 2026" },
      { term: "Festa", value: "4 a 6 de setembro de 2026" },
      { term: "Local", value: "Arroios, Lisboa" },
    ],
    fontes: [
      {
        titulo: "Portal Turismo Total, 7 de setembro de 2026",
        url: "https://portalturismototal.com.br/index.php/2026/09/07/primeira-festa-de-santa-barbara-oya-na-europa-agitou-lisboa/",
      },
    ],
    ligacao: {
      href: "/projetos/festa-de-santa-barbara-lisboa-2026/",
      label: "1.ª Festa de Santa Bárbara em Lisboa",
    },
  },
  {
    slug: "xiii-forum-de-lisboa-2025",
    titulo: "Maria Andreza Sá no XIII Fórum de Lisboa",
    data: "2 a 4 de julho de 2025",
    dataIso: "2025-07-02",
    etiqueta: "Presença",
    corpoTitulo: "O encontro",
    resumo:
      "Maria Andreza Sá esteve no XIII Fórum de Lisboa, realizado de 2 a 4 de julho de 2025, na Faculdade de Direito da Universidade de Lisboa.",
    paragrafos: [
      "Maria Andreza Sá esteve no XIII Fórum de Lisboa, na Faculdade de Direito da Universidade de Lisboa. O encontro realizou-se de 2 a 4 de julho de 2025.",
      "O tema era O mundo em transformação: Direito, Democracia e Sustentabilidade na Era Inteligente. Organizaram o IDP (Instituto Brasileiro de Ensino, Desenvolvimento e Pesquisa), a FGV Justiça e o Lisbon Public Law.",
      "A fotografia, enviada pela presidente, mostra-a junto ao cartaz. No crachá lê-se Imprensa. A imprensa consultada não a inclui entre os oradores.",
    ],
    ficha: [
      { term: "Data", value: "2 a 4 de julho de 2025" },
      { term: "Local", value: "Faculdade de Direito da Universidade de Lisboa" },
      { term: "Crachá", value: "Imprensa" },
    ],
    fontes: [
      {
        titulo: "Executive Digest, 30 de junho de 2025",
        url: "https://executivedigest.sapo.pt/forum-de-lisboa-2025-debate-direito-democracia-e-sustentabilidade-na-era-da-inteligencia-artificial/",
      },
      {
        titulo: "Lisbon Public Law, XIII Fórum de Lisboa",
        url: "https://lisbonpubliclaw.pt/en/noticias/xiii-forum-de-lisboa/",
      },
    ],
    foto: {
      src: "/noticias/forum-de-lisboa.webp",
      width: 1200,
      height: 1600,
      alt: "Maria Andreza Sá no XIII Fórum de Lisboa, junto ao cartaz do encontro.",
    },
  },
  {
    slug: "premios-embaixadores-2025",
    titulo: "Maria Andreza Sá nos Prémios Embaixadores",
    data: "24 de maio de 2025",
    dataIso: "2025-05-24",
    etiqueta: "Presença",
    corpoTitulo: "A noite da gala",
    resumo:
      "Maria Andreza Sá esteve nos Prémios Embaixadores 2025. Em fevereiro foi anunciada uma homenagem na categoria Justiça, para 24 de maio.",
    paragrafos: [
      "Maria Andreza Sá esteve na edição de 2025 dos Prémios Embaixadores. A fotografia, enviada pela presidente, mostra-a no painel dessa noite.",
      "O Portal Turismo Total anunciou, a 14 de fevereiro de 2025, uma homenagem na categoria Justiça, na gala marcada para 24 de maio, no Hotel The One Palácio da Anunciada, em Lisboa.",
    ],
    ficha: [
      { term: "Data anunciada", value: "24 de maio de 2025" },
      { term: "Local anunciado", value: "Hotel The One Palácio da Anunciada, Lisboa" },
      { term: "Categoria anunciada", value: "Justiça" },
    ],
    fontes: [
      {
        titulo: "Portal Turismo Total, 14 de fevereiro de 2025",
        url: "https://portalturismototal.com.br/index.php/2025/02/14/bahia-e-portugal-festejam-andreza-sa-carnaval-sem-fome-e-musica-no-tour-cultural/",
      },
    ],
    foto: {
      src: "/noticias/premios-embaixadores.webp",
      width: 1200,
      height: 1600,
      alt: "Maria Andreza Sá na noite dos Prémios Embaixadores 2025.",
    },
  },
  {
    slug: "entrelinhas-historias-de-mulheres-brasileiras-em-portugal",
    titulo: "Maria Andreza Sá no livro Entrelinhas",
    data: "19 de outubro de 2024",
    dataIso: "2024-10-19",
    etiqueta: "Livro",
    corpoTitulo: "O livro e o lançamento",
    resumo:
      "Maria Andreza Sá é uma das 17 mulheres do livro Entrelinhas. O lançamento foi anunciado para 19 de outubro de 2024, na Casa do Brasil de Lisboa.",
    paragrafos: [
      "Maria Andreza Sá é uma das 17 mulheres reunidas em Entrelinhas - Histórias de Mulheres Brasileiras em Portugal, com relatos em português e em inglês. Cláudia Canto e Lau Nascimento assinam a coletânea, no projeto Riqueza Descoberta. O Público, a 23 de outubro de 2024, inclui a baiana Andreza de Sá Gonçalves, nome com que a imprensa refere Maria Andreza Sá.",
      "O DN Brasil anunciou, a 16 de setembro de 2024, o lançamento para 19 de outubro de 2024, na Casa do Brasil de Lisboa, aberto ao público.",
      "A Migrant Women Press noticiou, a 18 de novembro de 2024, que o lançamento se realizou na Casa do Brasil de Lisboa.",
      "A fotografia, enviada pela presidente, mostra-a com o livro no lançamento.",
    ],
    ficha: [
      { term: "Data anunciada", value: "19 de outubro de 2024" },
      { term: "Local anunciado", value: "Casa do Brasil de Lisboa" },
    ],
    fontes: [
      {
        titulo: "Público, 23 de outubro de 2024",
        url: "https://www.publico.pt/2024/10/23/publico-brasil/noticia/livro-reune-17-historias-real-brasileiras-portugal-2108680",
      },
      {
        titulo: "DN Brasil, 16 de setembro de 2024",
        url: "https://dnbrasil.dn.pt/ex-empregada-em-portugal-brasileira-vira-escritora-e-lanca-livro-que-valoriza-conterraneas-no-pais",
      },
      {
        titulo: "Migrant Women Press, 18 de novembro de 2024",
        url: "https://migrantwomenpress.com/2024/11/18/brazilian-immigrant-womens-lives-told-through-a-powerful-new-collection/",
      },
    ],
    foto: {
      src: "/noticias/entrelinhas.webp",
      width: 720,
      height: 1600,
      alt: "Maria Andreza Sá com o livro Entrelinhas, no lançamento.",
    },
  },
];
