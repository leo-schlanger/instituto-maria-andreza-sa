// Facts only from the sources listed per event (checked 2026-11-11). Research and pending items: docs/PESQUISA-ASSOCIACAO.md.
export type Fonte = { titulo: string; url: string };

export type Evento = {
  slug: string;
  titulo: string;
  resumo: string;
  // The association's own account of the event, shown before the press facts.
  narrativaTitulo?: string;
  narrativa?: string[];
  corpo: string[];
  data?: string;
  // ISO dates (YYYY-MM-DD) matching `data`, for structured data.
  inicio?: string;
  fim?: string;
  local?: string;
  // City of `local`, for the Event address.
  localidade?: string;
  instagramUrl?: string;
  // The Mass as printed in the official missal (no names of readers or private people).
  celebracao?: Celebracao;
  // Institutional video; the page only draws it when `ficheiro` exists in public/ at build time.
  video?: VideoEvento;
  fontes: Fonte[];
};

export type Celebracao = {
  titulo: string;
  fonte: string;
  paragrafos: string[];
  citacao?: string;
  programa: { parte: string; itens: string }[];
};

export type VideoEvento = {
  // Paths under public/ (contract with the video editor).
  ficheiro: string;
  poster: string;
  nome: string;
  descricao: string;
  // ISO 8601 duration (PT1M30S) and upload date (YYYY-MM-DD); required once the file exists.
  duracao?: string;
  carregadoEm?: string;
};

export const eventos: Evento[] = [
  {
    slug: "festa-de-santa-barbara-lisboa-2026",
    titulo: "1.ª Festa de Santa Bárbara em Lisboa",
    resumo:
      "A associação organizou a 1.ª Festa de Santa Bárbara em Lisboa, em Arroios, de 4 a 6 de setembro de 2026, com missa, cortejo e feijoada.",
    narrativaTitulo: "Um reencontro histórico e ancestral",
    narrativa: [
      "No dia 6 de setembro, Lisboa viveu um momento histórico e profundamente emocionante, a realização da 1.ª Festa de Santa Bárbara em Lisboa, promovida pelo Instituto Cultural e Artístico Luso-Brasileiro Maria Andreza Sá, com ampla repercussão na imprensa e nos meios culturais luso-brasileiros.",
      "Mais do que uma celebração festiva, este evento representa o fecho de um ciclo secular entre Portugal e a Bahia. Segundo a história, a devoção a Santa Bárbara foi levada de Portugal para Salvador por um casal português, Francisco Lago e Andreza de Araújo.",
      "Séculos depois, Maria Andreza trouxe essa tradição de volta a solo português. Nasceu no Centro Histórico de Salvador, onde a festa se eternizou, é neta e homónima de Maria Andreza de Araújo, devota de Santa Bárbara, e é filha de Iansã.",
      "Celebrar Santa Bárbara e Iansã em Lisboa é honrar a memória dos antepassados, celebrar a força do sincretismo religioso, exaltar a cultura afro-baiana e reafirmar o poder da mulher que enfrenta tempestades com coragem, fé e alegria.",
    ],
    corpo: [
      "O Instituto Associativo Cultural & Artístico Luso-Brasileiro Maria Andreza Sá organizou a 1.ª Festa de Santa Bárbara em Lisboa, com o nome Os Ventos de Oyá. Decorreu de 4 a 6 de setembro de 2026, na freguesia de Arroios. Segundo o Público e a imprensa baiana, a festa foi idealizada por Maria Andreza Sá, fundadora e presidente do instituto.",
      "A cantora Alcione foi a madrinha da 1.ª edição. Segundo o Público, o padrinho foi Carlos Marão, e Thales Melo de Ayrá e Milu Ferreira, fundadora da Galeria Arte Livre, foram embaixadores do projeto.",
      "A abertura estava marcada para sexta-feira, 4 de setembro, com uma mesa-redonda na Galeria Arte Livre, na Avenida da Liberdade. No domingo, 6 de setembro, houve missa às 10h na Igreja de Nossa Senhora dos Anjos, em Arroios. Seguiu-se um cortejo pelas ruas do centro até à Praça da Figueira. Uma feijoada na Baixa encerrou a festa.",
      "Em Salvador da Bahia, a Festa de Santa Bárbara faz-se a 4 de dezembro, no Centro Histórico, e é Património Imaterial da Bahia desde 2008. No candomblé, a santa é homenageada como Iansã, também chamada Oyá.",
    ],
    data: "4 a 6 de setembro de 2026",
    inicio: "2026-09-04",
    fim: "2026-09-06",
    local: "Arroios, Lisboa",
    localidade: "Lisboa",
    instagramUrl: "https://www.instagram.com/festasantabarbaralx/",
    celebracao: {
      titulo: "A missa de 6 de setembro",
      fonte: "Missal da celebração, distribuído a 6 de setembro de 2026. O cortejo, os cânticos e os agradecimentos foram corrigidos pela presidente a 17 de novembro de 2026.",
      paragrafos: [
        "A celebração eucarística em honra de Santa Bárbara decorreu no domingo, 6 de setembro de 2026, às 10h, na Igreja de Nossa Senhora dos Anjos, em Arroios. Presidiu o Padre Paulo Araújo. Maria Andreza Sá foi a comentarista principal.",
        "A missa abriu com o cortejo de entrada, com Santa Bárbara e a imagem de Santa Dulce dos Pobres, que veio de Salvador através de Laura Tanure, que faz parte dos Amigos de Dulce. Os cânticos juntaram as duas margens: Roberto Carlos, Maria Bethânia e Amália Rodrigues.",
        "Antes da bênção final houve um momento de gratidão à madrinha, ao padrinho e aos embaixadores, e ao grupo Amigos de Bárbara Protegidos por Oyá, que, de uma forma ou de outra, contribuíram para o brilho da festa. Seguiram-se os agradecimentos aos Guardiões da Ancestralidade, babalorixás e yalorixás, representantes da religião de matriz africana, à Paróquia de Arroios e aos amigos que vieram de Salvador.",
      ],
      citacao: "Esta festa nasce da fé, mas também nasce da memória.",
      programa: [
        { parte: "Ritos iniciais", itens: "Cortejo de entrada com Santa Bárbara e a imagem de Santa Dulce dos Pobres, saudação, ato penitencial e glória." },
        { parte: "Liturgia da Palavra", itens: "Ezequiel 33, 7-9; Salmo 94 (95); Romanos 13, 8-10; Evangelho segundo São Mateus 18, 15-20; homilia, credo e oração dos fiéis." },
        { parte: "Liturgia eucarística", itens: "Apresentação das oferendas e oração eucarística." },
        { parte: "Ritos de comunhão", itens: "Comunhão, com o cântico «Foi Deus»." },
        { parte: "Ação de graças e ritos finais", itens: "Momento de gratidão e homenagens, oração de proteção aos filhos e ao lar, bênção final e cântico de envio." },
      ],
    },
    video: {
      ficheiro: "/video/festa-santa-barbara.mp4",
      poster: "/video/festa-santa-barbara-poster.jpg",
      nome: "A 1.ª Festa de Santa Bárbara em Lisboa, em vídeo",
      descricao: "Como foi a 1.ª Festa de Santa Bárbara em Lisboa, organizada pelo Instituto Maria Andreza Sá em Arroios, de 4 a 6 de setembro de 2026.",
      duracao: "PT1M8S",
      carregadoEm: "2026-11-15",
    },
    fontes: [
      {
        titulo: "Público Brasil, 17 de junho de 2026",
        url: "https://www.publico.pt/2026/06/17/publico-brasil/noticia/brasileira-traz-festa-santa-barbara-bahia-lisboa-fe-tradicao-2178440",
      },
      {
        titulo: "DN Brasil, 20 de julho de 2026",
        url: "https://dnbrasil.dn.pt/cultura-dn-brasil/lisboa-ter-festa-dedicada-a-santa-brbara-em-setembro",
      },
      {
        titulo: "Magazine e Ação, 6 de abril de 2026",
        url: "https://www.magazineeacao.com.br/lisboa-vai-acolher-a-1a-festa-de-santa-barbara-em-setembro/",
      },
      {
        titulo: "Alô Alô Bahia, 28 de agosto de 2026",
        url: "https://aloalobahia.com/noticias/2026/08/28/alcione-sera-madrinha-da-primeira-festa-de-santa-barbara-realizada-em-lisboa/",
      },
      {
        titulo: "Africanize, 26 de agosto de 2026",
        url: "https://africanizeoficial.com.br/alcione-e-madrinha-da-primeira-festa-de-santa-barbara-realizada-em-lisboa",
      },
      {
        titulo: "Bahia Notícias, 28 de agosto de 2026",
        url: "https://www.bahianoticias.com.br/holofote/noticia/85466-alcione-leva-festa-de-santa-barbara-e-cultura-baiana-para-portugal",
      },
      {
        titulo: "Portal Turismo Total, programa, 3 de setembro de 2026",
        url: "https://portalturismototal.com.br/index.php/2026/09/03/a-fe-e-tradicao-de-santa-barbara-de-salvador-da-bahia-para-lisboa/",
      },
      {
        titulo: "Portal Turismo Total, reportagem, 7 de setembro de 2026",
        url: "https://portalturismototal.com.br/index.php/2026/09/07/primeira-festa-de-santa-barbara-oya-na-europa-agitou-lisboa/",
      },
      {
        titulo: "A Tarde, 7 de setembro de 2026",
        url: "https://atarde.com.br/colunistas/july/fe-e-tradicao-baiana-atravessam-o-atlantico-1401247",
      },
      {
        titulo: "IPAC, Festa de Santa Bárbara em Salvador",
        url: "https://www.ba.gov.br/ipac/festa-de-santa-barbara",
      },
      {
        titulo: "Secretaria de Cultura da Bahia, 4 de dezembro de 2025",
        url: "https://www.ba.gov.br/cultura/noticias/2025-12/63538/multidao-celebra-santa-barbara-com-fe-e-devocao-no-centro-historico-de",
      },
    ],
  },
];
