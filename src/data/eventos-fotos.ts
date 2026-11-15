// Files live in public/eventos/<slug>/NN.webp (up to 1600 px) and NN-800.webp (800 px wide, or the
// original width when narrower). NN follows the order of the source files, so gaps are photos held back.
// Only photos cleared by the legal review (2026-11-15): no recognisable person in the foreground.
export type Foto = {
  src: string;
  src800: string;
  alt: string;
  largura: number;
  altura: number;
  credito?: string;
  origem: string;
  // CSS object-position when the photo is cropped by a frame (default: centre).
  posicao?: string;
};

const cedida = "Fotografia cedida pela organização";

function foto(slug: string, nn: string, largura: number, altura: number, alt: string, posicao?: string): Foto {
  const base = `/eventos/${slug}/${nn}`;
  return { src: `${base}.webp`, src800: `${base}-800.webp`, alt, largura, altura, origem: cedida, ...(posicao ? { posicao } : {}) };
}

const sb = "festa-de-santa-barbara-lisboa-2026";

export const fotosPorEvento: Record<string, Foto[]> = {
  [sb]: [
    foto(sb, "14", 1080, 1439, "Imagem de Santa Bárbara, de manto vermelho e coroa, diante de uma moldura de rosas vermelhas com o logótipo da 1.ª Festa de Santa Bárbara, entre flores brancas e vermelhas.", "50% 3%"),
    foto(sb, "09", 1200, 1600, "Andor com a imagem de Santa Bárbara e arranjos de flores brancas e vermelhas, levado aos ombros numa rua de Arroios, visto por trás, com mulheres de saias rendadas vermelhas e brancas."),
    foto(sb, "07", 900, 1600, "Carrinha enfeitada com balões vermelhos, brancos e dourados e com a faixa da 1.ª Festa de Santa Bárbara, a abrir o cortejo numa avenida arborizada de Lisboa."),
    foto(sb, "03", 1080, 864, "Interior da Igreja de Nossa Senhora dos Anjos, em Arroios: abóbada pintada, talha dourada e o altar-mor com o crucifixo."),
    foto(sb, "06", 739, 1311, "Imagem de Santa Bárbara ao lado de um painel redondo com o logótipo da festa e de um andor com flores, num espaço interior."),
    foto(sb, "04", 739, 1311, "Frente da carrinha decorada com arco de balões e faixa vermelha com rosas e o nome da festa: Arroios, Lisboa, Portugal."),
    foto(sb, "05", 739, 1311, "Bandeiras do Brasil e da Bahia presas a um veículo do cortejo, sob um céu azul."),
    foto(sb, "12", 1080, 1440, "Mãos a segurar um cesto forrado de renda, cheio de bolinhos fritos, durante a festa.", "50% 60%"),
  ],
};
