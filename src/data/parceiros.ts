// Self-hosted marks: the site CSP allows images only from 'self'.
// Do not describe a joint campaign here until it has happened.

export type Parceiro = {
  nome: string;
  texto: string;
  url: string;
  logo: { src: string; width: number; height: number };
};

export const parceirosIntro = "Associações com quem o instituto partilha trabalho.";

export const parceiros: readonly Parceiro[] = [
  {
    nome: "Associação Comadres de Cascais",
    texto:
      "Sem fins lucrativos, apoia pessoas em situação de vulnerabilidade e aproxima as comunidades brasileira e portuguesa em Cascais e arredores.",
    url: "https://comadresdecascais.com/",
    logo: { src: "/parceiros/comadres-de-cascais.svg", width: 1985, height: 1832 },
  },
];
