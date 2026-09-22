import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './data/products';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'catalogo/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PRODUCTS.map((product) => ({ slug: product.slug }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
