import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  getProductBySlug,
  whatsappProductUrl,
  CONTACT_EMAIL,
} from '../../data/products';
import { Reveal } from '../../directives/reveal';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, Reveal],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  protected readonly product = computed(() => getProductBySlug(this.slug()));
  protected readonly email = CONTACT_EMAIL;

  constructor() {
    effect(() => {
      const item = this.product();
      if (!item) {
        this.seo.update({
          title: 'Producto no encontrado',
          description: 'El producto solicitado no está disponible en el catálogo.',
          path: '/catalogo',
        });
        return;
      }

      this.seo.update({
        title: item.name,
        description: item.summary,
        path: `/catalogo/${item.slug}`,
        image: item.image,
        type: 'product',
      });

      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: item.name,
        description: item.description,
        image: `https://costurasprogramadas.com${item.image}`,
        brand: {
          '@type': 'Brand',
          name: 'Costuras Programadas',
        },
        category: item.categoryLabel,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceCurrency: 'COP',
          url: `https://costurasprogramadas.com/catalogo/${item.slug}`,
        },
      });
    });
  }

  protected whatsappHref(): string {
    const item = this.product();
    return item ? whatsappProductUrl(item.name) : '#';
  }
}
