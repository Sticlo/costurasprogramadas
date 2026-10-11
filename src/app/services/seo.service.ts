import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  SITE_NAME,
  SITE_URL,
} from '../data/products';

export interface PageSeo {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  noindex?: boolean;
}

export interface Crumb {
  name: string;
  path: string;
}

type JsonLd = Record<string, unknown>;

const PAGE_JSON_LD_ID = 'app-json-ld';
const SITE_JSON_LD_ID = 'site-json-ld';
const DEFAULT_IMAGE = '/assets/og-costuras-programadas.jpg';

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(seo: PageSeo): void {
    const fullTitle = seo.title.includes(SITE_NAME) ? seo.title : `${seo.title} | ${SITE_NAME}`;
    const url = absoluteUrl(seo.path ?? '/');
    const image = absoluteUrl(seo.image ?? DEFAULT_IMAGE);
    const imageAlt = seo.imageAlt ?? fullTitle;

    this.title.setTitle(fullTitle);
    this.setCanonical(url);
    this.removeScript(PAGE_JSON_LD_ID);

    const tags: Array<[attr: 'name' | 'property', key: string, content: string]> = [
      ['name', 'description', seo.description],
      ['name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
      ['property', 'og:title', fullTitle],
      ['property', 'og:description', seo.description],
      ['property', 'og:type', seo.type ?? 'website'],
      ['property', 'og:url', url],
      ['property', 'og:image', image],
      ['property', 'og:image:alt', imageAlt],
      ['property', 'og:site_name', SITE_NAME],
      ['property', 'og:locale', 'es_CO'],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', fullTitle],
      ['name', 'twitter:description', seo.description],
      ['name', 'twitter:image', image],
      ['name', 'twitter:image:alt', imageAlt],
    ];
    for (const [attr, key, content] of tags) {
      this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
    }
  }

  /** Page-specific structured data; replaced on every `update()`. */
  setJsonLd(data: JsonLd | JsonLd[]): void {
    this.writeScript(PAGE_JSON_LD_ID, data);
  }

  /** Business + website schema present on every page. */
  setSiteJsonLd(): void {
    this.writeScript(SITE_JSON_LD_ID, [
      {
        '@context': 'https://schema.org',
        '@type': 'Store',
        '@id': `${SITE_URL}/#negocio`,
        name: SITE_NAME,
        description:
          'Venta de máquinas de coser industriales y familiares en Bogotá, con asesoría, repuestos, servicio técnico y envíos a todo Colombia.',
        url: `${SITE_URL}/`,
        logo: absoluteUrl('/assets/logo-costuras-programadas-light.png'),
        image: absoluteUrl(DEFAULT_IMAGE),
        email: CONTACT_EMAIL,
        telephone: `+57 ${CONTACT_PHONE_DISPLAY}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Barrio La Alquería',
          addressLocality: 'Bogotá',
          addressRegion: 'Bogotá D.C.',
          addressCountry: 'CO',
        },
        areaServed: { '@type': 'Country', name: 'Colombia' },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: `+57 ${CONTACT_PHONE_DISPLAY}`,
          contactType: 'sales',
          areaServed: 'CO',
          availableLanguage: 'Spanish',
        },
        knowsAbout: [
          'Máquinas de coser industriales',
          'Máquinas planas',
          'Fileteadoras',
          'Collarines',
          'Recubridoras',
          'Cortadoras verticales de tela',
          'Bordadoras industriales',
          'Repuestos y servicio técnico para máquinas de coser',
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#sitio`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        inLanguage: 'es-CO',
        publisher: { '@id': `${SITE_URL}/#negocio` },
      },
    ]);
  }

  breadcrumbs(crumbs: Crumb[]): JsonLd {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path),
      })),
    };
  }

  private setCanonical(url: string): void {
    const head = this.document.head;
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private writeScript(id: string, data: JsonLd | JsonLd[]): void {
    let script = this.document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', id);
      this.document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }

  private removeScript(id: string): void {
    this.document.getElementById(id)?.remove();
  }
}
