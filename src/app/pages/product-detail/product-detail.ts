import {
  afterNextRender,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  getProductBySlug,
  getRelatedProducts,
  productBrand,
  productImage,
  whatsappProductUrl,
  CONTACT_EMAIL,
} from '../../data/products';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';
import { absoluteUrl, SeoService } from '../../services/seo.service';

const DESCRIPTION_SUFFIX = ' Asesoría en Bogotá y envíos a todo Colombia. Cotice por WhatsApp.';

function productDescription(summary: string): string {
  const full = `${summary}${DESCRIPTION_SUFFIX}`;
  return full.length <= 165 ? full : summary;
}

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
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const bar = host.querySelector<HTMLElement>('.detail__sticky');
      if (!bar) return;
      const root = document.documentElement;
      const observer = new ResizeObserver(() =>
        root.style.setProperty('--sticky-cta-h', `${bar.offsetHeight}px`),
      );
      observer.observe(bar);
      destroyRef.onDestroy(() => {
        observer.disconnect();
        root.style.removeProperty('--sticky-cta-h');
      });
    });

    effect(() => {
      const item = this.product();
      this.activeImage.set(0);

      if (!item) {
        this.seo.update({
          title: 'Producto no encontrado',
          description: 'El producto solicitado no está disponible en el catálogo.',
          path: '/catalogo',
          noindex: true,
        });
        return;
      }

      const path = `/catalogo/${item.slug}`;
      const brand = productBrand(item);

      this.seo.update({
        title: `${item.name} en Bogotá`,
        description: productDescription(item.summary),
        path,
        image: productImage(item),
        imageAlt: item.name,
        type: 'product',
      });

      this.seo.setJsonLd([
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: item.name,
          description: item.description,
          url: absoluteUrl(path),
          image: item.images.map(absoluteUrl),
          category: 'Máquinas de coser',
          ...(brand && { brand: { '@type': 'Brand', name: brand } }),
          additionalProperty: item.specs.map((spec) => ({
            '@type': 'PropertyValue',
            name: 'Característica',
            value: spec,
          })),
        },
        this.seo.breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: 'Catálogo', path: '/catalogo' },
          { name: item.name, path },
        ]),
      ]);
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
