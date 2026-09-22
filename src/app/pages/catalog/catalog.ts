import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  getProductsByCategory,
  ProductCategory,
  PRODUCTS,
} from '../../data/products';
import { Reveal } from '../../directives/reveal';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, Reveal],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  private readonly seo = inject(SeoService);
  protected readonly selected = signal<ProductCategory | 'todos'>('todos');

  protected readonly filters: { id: ProductCategory | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'maquinaria', label: 'Maquinaria' },
    { id: 'herramientas', label: 'Herramientas' },
    { id: 'accesorios', label: 'Accesorios' },
  ];

  protected readonly products = computed(() => {
    const filter = this.selected();
    return filter === 'todos' ? PRODUCTS : getProductsByCategory(filter);
  });

  ngOnInit(): void {
    this.seo.update({
      title: 'Catálogo de maquinaria y herramientas',
      description:
        'Explora el catálogo de Costuras Programadas: máquinas industriales, herramientas de corte y accesorios para talleres de confección.',
      path: '/catalogo',
    });
  }

  selectFilter(id: ProductCategory | 'todos'): void {
    this.selected.set(id);
  }
}
