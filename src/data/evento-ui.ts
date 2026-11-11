import type { Evento } from "@/data/eventos";

export type { Evento };

// The only Instagram linked today belongs to an event, never to the association.
export function eventInstagramLabel(evento: Evento): string {
  return /santa\s+b[áa]rbara/i.test(evento.titulo) ? "Instagram da Festa de Santa Bárbara" : "Instagram do evento";
}
