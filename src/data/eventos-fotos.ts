// Stub: filled by the photo agent. Files live in public/eventos/<slug>/NN.webp and NN-800.webp.
export type Foto = {
  src: string;
  src800: string;
  alt: string;
  largura: number;
  altura: number;
  credito?: string;
  origem: string;
};

export const fotosPorEvento: Record<string, Foto[]> = {};
