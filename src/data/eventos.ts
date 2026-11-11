// Facts only from the sources listed per event (checked 2026-11-11). Research and pending items: docs/PESQUISA-ASSOCIACAO.md.
export type Fonte = { titulo: string; url: string };

export type Evento = {
  slug: string;
  titulo: string;
  resumo: string;
  corpo: string[];
  data?: string;
  // ISO dates (YYYY-MM-DD) matching `data`, for structured data.
  inicio?: string;
  fim?: string;
  local?: string;
  // City of `local`, for the Event address.
  localidade?: string;
  instagramUrl?: string;
  fontes: Fonte[];
};

export const eventos: Evento[] = [
  {
    slug: "festa-de-santa-barbara-lisboa-2026",
    titulo: "1.ª Festa de Santa Bárbara em Lisboa",
    resumo:
      "A associação organizou a 1.ª Festa de Santa Bárbara em Lisboa, em Arroios, de 4 a 6 de setembro de 2026, com missa, cortejo e feijoada.",
    corpo: [
      "O Instituto Associativo Cultural & Artístico Luso-Brasileiro Maria Andreza Sá organizou a 1.ª Festa de Santa Bárbara em Lisboa, com o nome Os Ventos de Oyá. Decorreu de 4 a 6 de setembro de 2026, na freguesia de Arroios. Segundo o Público e a imprensa baiana, a festa foi idealizada por Maria Andreza Sá, presidente do instituto.",
      "A cantora Alcione foi a madrinha da 1.ª edição. Segundo o Público, o padrinho foi Carlos Marão, e Thales Melo de Ayrá e Milu Ferreira, fundadora da Galeria Arte Livre, foram embaixadores do projeto.",
      "A abertura estava marcada para sexta-feira, 4 de setembro, com uma mesa-redonda na Galeria Arte Livre, na Avenida da Liberdade. No domingo, 6 de setembro, houve missa às 10h na Igreja de Nossa Senhora dos Anjos, em Arroios. Seguiu-se um cortejo pelas ruas do centro até à Praça da Figueira. Uma feijoada na Baixa encerrou a festa.",
      "O programa anunciado incluía também homenagens e rodas de conversa, a exposição Afro Barroco Cachoeira, Recôncavo da Bahia, Religiosidade, com curadoria de Jomar Lima, e a mostra de moda Barafunda, de Conceição Aflitos e Antônio Carlos dos Santos. Estavam anunciados grupos como as Filhas de Gandhy, o Baque do Tejo, o Lisbloco e a Abadá Capoeira.",
      "Em Salvador da Bahia, a Festa de Santa Bárbara faz-se a 4 de dezembro, no Centro Histórico, e é Património Imaterial da Bahia desde 2008. No candomblé, a santa é homenageada como Iansã, também chamada Oyá.",
    ],
    data: "4 a 6 de setembro de 2026",
    inicio: "2026-09-04",
    fim: "2026-09-06",
    local: "Arroios, Lisboa",
    localidade: "Lisboa",
    instagramUrl: "https://www.instagram.com/festasantabarbaralx/",
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
