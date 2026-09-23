import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface PageSeo {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly siteName = 'Costuras Programadas';
  private readonly origin = 'https://costurasprogramadas.com';
  private readonly defaultImage = '/assets/logo-nav-light.png';

  update(seo: PageSeo): void {
    const fullTitle = seo.title.includes(this.siteName)
      ? seo.title
      : `${seo.title} | ${this.siteName}`;
    const image = seo.image ?? this.defaultImage;
    const url = `${this.origin}${seo.path ?? '/'}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:type', content: seo.type ?? 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: `${this.origin}${image}` });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: `${this.origin}${image}` });
  }

  setJsonLd(data: Record<string, unknown> | Record<string, unknown>[]): void {
    const doc = this.document;
    const id = 'app-json-ld';
    let script = doc.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }
}
