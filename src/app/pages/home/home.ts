import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { FeaturedProducts } from '../../components/featured-products/featured-products';
import { Benefits } from '../../components/benefits/benefits';
import { StitchScroll } from '../../components/stitch-scroll/stitch-scroll';
import { AtelierExpand } from '../../components/atelier-expand/atelier-expand';
import { SeoService } from '../../services/seo.service';
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_DISPLAY } from '../../data/products';

@Component({
  selector: 'app-home',
  imports: [Hero, StitchScroll, FeaturedProducts, AtelierExpand, Benefits],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Ingeniería textil y maquinaria de confección',
      description:
        'Costuras Programadas: maquinaria y herramientas de precisión para talleres de alto rendimiento en Colombia. Asesoría técnica y catálogo especializado.',
      path: '/',
    });
    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Costuras Programadas',
      url: 'https://costurasprogramadas.com',
      email: CONTACT_EMAIL,
      telephone: `+57 ${CONTACT_PHONE_DISPLAY}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bogotá',
        addressCountry: 'CO',
        streetAddress: CONTACT_ADDRESS,
      },
    });
  }
}
