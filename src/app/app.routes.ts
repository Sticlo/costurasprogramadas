import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout';
import { Home } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Contact } from './pages/contact/contact';
import { Nosotros } from './pages/nosotros/nosotros';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'catalogo', component: Catalog },
      { path: 'catalogo/:slug', component: ProductDetail },
      { path: 'nosotros', component: Nosotros },
      { path: 'contacto', component: Contact },
      { path: '**', redirectTo: '' },
    ],
  },
];
