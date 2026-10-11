import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './data/products';
import { SOLUTIONS } from './data/solutions';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'catalogo/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PRODUCTS.map((product) => ({ slug: product.slug }));
    },
  },
  {
    path: 'soluciones/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return SOLUTIONS.map((solution) => ({ slug: solution.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
