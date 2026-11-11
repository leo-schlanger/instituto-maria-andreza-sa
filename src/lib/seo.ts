import type { Evento } from "@/data/eventos";
import type { Foto } from "@/data/eventos-fotos";
import {
  brandName,
  foundingDate,
  instagramOficialUrl,
  nipc,
  orgName,
  registeredName,
  seatAddress,
  siteUrl,
} from "@/data/site";

// Structured data (schema.org) built only from facts already published on the site.

export type Crumb = { name: string; path: string };
export type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
type Node = Record<string, unknown>;

export const orgId = `${siteUrl}/#organizacao`;
export const websiteId = `${siteUrl}/#website`;
export const siteName = `Instituto ${brandName}`;

export function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: registeredName,
    legalName: registeredName,
    alternateName: [siteName, orgName],
    url: `${siteUrl}/`,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/brand/logo.webp`,
      width: 960,
      height: 960,
    },
    image: `${siteUrl}/og.jpg`,
    foundingDate,
    founder: { "@type": "Person", name: brandName },
    taxID: nipc,
    address: postalAddress(),
    // Only the association's own profiles; the event Instagram never goes here.
    ...(instagramOficialUrl ? { sameAs: [instagramOficialUrl] } : {}),
  };
}

function postalAddress(): Node {
  return {
    "@type": "PostalAddress",
    streetAddress: seatAddress.street,
    postalCode: seatAddress.postalCode,
    addressLocality: seatAddress.locality,
    addressCountry: seatAddress.country,
  };
}

export function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: siteName,
    alternateName: orgName,
    inLanguage: "pt-PT",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbNode(canonical: string, crumbs: Crumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#migalhas`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: siteUrl + c.path,
    })),
  };
}

export function webPageNode(opts: {
  canonical: string;
  title: string;
  description: string;
  type: PageType;
  hasBreadcrumb: boolean;
  about?: string;
}): Node {
  return {
    "@type": opts.type,
    "@id": `${opts.canonical}#pagina`,
    url: opts.canonical,
    name: opts.title,
    description: opts.description,
    inLanguage: "pt-PT",
    isPartOf: { "@id": websiteId },
    ...(opts.about ? { about: { "@id": opts.about } } : {}),
    ...(opts.hasBreadcrumb ? { breadcrumb: { "@id": `${opts.canonical}#migalhas` } } : {}),
  };
}

export function eventNode(evento: Evento, canonical: string, fotos: Foto[]): Node | null {
  if (!evento.inicio) return null;
  return {
    "@type": "Event",
    "@id": `${canonical}#evento`,
    name: evento.titulo,
    description: evento.resumo,
    url: canonical,
    startDate: evento.inicio,
    endDate: evento.fim ?? evento.inicio,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: "pt-PT",
    ...(evento.local
      ? {
          location: {
            "@type": "Place",
            name: evento.local,
            address: {
              "@type": "PostalAddress",
              ...(evento.localidade ? { addressLocality: evento.localidade } : {}),
              addressCountry: "PT",
            },
          },
        }
      : {}),
    organizer: { "@type": "Organization", "@id": orgId, name: registeredName, url: `${siteUrl}/` },
    ...(fotos.length > 0 ? { image: fotos.map((f) => siteUrl + f.src) } : {}),
  };
}

// JSON for a <script type="application/ld+json"> data block; "<" escaped so no tag can close it.
export function jsonLdScript(nodes: Node[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replaceAll("<", "\\u003c");
}
