import { existsSync } from "node:fs";
import path from "node:path";
import type { Evento, VideoEvento } from "@/data/eventos";

export type VideoPronto = VideoEvento & { duracao: string; carregadoEm: string };

const publicFile = (p: string) => path.join(process.cwd(), "public", p.replace(/^\//, ""));

// Build-time check: the video block exists only when the editor's file is in public/.
export function videoDoEvento(evento: Evento | undefined): VideoPronto | null {
  const v = evento?.video;
  if (!v || !existsSync(publicFile(v.ficheiro))) return null;
  const falta = [
    !existsSync(publicFile(v.poster)) && `poster ${v.poster}`,
    !/^PT(?=\d)(\d+H)?(\d+M)?(\d+S)?$/.test(v.duracao ?? "") && "duracao (ISO 8601, ex.: PT1M30S)",
    !/^\d{4}-\d{2}-\d{2}$/.test(v.carregadoEm ?? "") && "carregadoEm (YYYY-MM-DD)",
  ].filter(Boolean);
  if (falta.length > 0) throw new Error(`${v.ficheiro} existe, mas falta em eventos.ts: ${falta.join(", ")}`);
  return v as VideoPronto;
}
