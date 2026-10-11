import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  getProductsByCategory,
  ProductCategory,
  PRODUCTS,
  whatsappProductUrl,
} from '../../data/products';
import { ExpandImage } from '../../directives/expand-image';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';
import { absoluteUrl, SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, Reveal, Parallax, ExpandImage],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly selected = signal<ProductCategory | 'todos'>('todos');

  private readonly categories: { id: ProductCategory; label: string }[] = [
    { id: 'maquinaria', label: 'Maquinaria' },
    { id: 'herramientas', label: 'Herramientas' },
    { id: 'accesorios', label: 'Accesorios' },
  ];

  protected readonly filters: { id: ProductCategory | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    ...this.categories.filter((c) => PRODUCTS.some((p) => p.category === c.id)),
  ];

  protected readonly showFilters = this.filters.length > 2;

  protected readonly products = computed(() => {
    const filter = this.selected();
    return filter === 'todos' ? PRODUCTS : getProductsByCategory(filter);
  });

  protected readonly resultLabel = computed(() => {
    const count = this.products().length;
    if (count === 0) {
      return 'No hay productos en esta categoría';
    }
    return count === 1 ? '1 producto' : `${count} productos`;
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Catálogo de máquinas de coser industriales y familiares',
      description:
        'Planas, fileteadoras, collarines, recubridoras, cortadoras verticales, botonadoras y bordadoras JACK, KANSEW, UNION, PEGASUS y Brother en Bogotá. Cotice por WhatsApp.',
      path: '/catalogo',
    });
    this.seo.setJsonLd([
      this.seo.breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Catálogo', path: '/catalogo' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Catálogo de máquinas de coser',
        numberOfItems: PRODUCTS.length,
        itemListElement: PRODUCTS.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: product.name,
          url: absoluteUrl(`/catalogo/${product.slug}`),
        })),
      },
    ]);
  }

  selectFilter(id: ProductCategory | 'todos'): void {
    this.selected.set(id);
  }

  whatsappFor(name: string): string {
    return whatsappProductUrl(name);
  }
}
