import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  getProductBySlug,
  getRelatedProducts,
  productImage,
  whatsappProductUrl,
  CONTACT_EMAIL,
} from '../../data/products';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, Reveal, Parallax],
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
  protected readonly related = computed(() => {
    const item = this.product();
    return item ? getRelatedProducts(item) : [];
  });
  protected readonly activeImage = signal(0);
  protected readonly email = CONTACT_EMAIL;

  constructor() {
    effect(() => {
      const item = this.product();
      this.activeImage.set(0);

      if (!item) {
        this.seo.update({
          title: 'Producto no encontrado',
          description: 'El producto solicitado no está disponible en el catálogo.',
          path: '/catalogo',
        });
        return;
      }

      const image = productImage(item);

      this.seo.update({
        title: item.name,
        description: item.summary,
        path: `/catalogo/${item.slug}`,
        image,
        type: 'product',
      });

      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: item.name,
        description: item.description,
        image: item.images.map((src) => `https://costurasprogramadas.com${src}`),
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

  protected selectImage(index: number): void {
    this.activeImage.set(index);
  }

  protected whatsappHref(): string {
    const item = this.product();
    return item ? whatsappProductUrl(item.name) : '#';
  }

  protected imageOf = productImage;
}
