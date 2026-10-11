import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOLUTIONS } from '../../data/solutions';
import { CONTACT_PHONE_DISPLAY, whatsappGeneralUrl } from '../../data/products';
import { Reveal } from '../../directives/reveal';
import { absoluteUrl, SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-solutions',
  imports: [RouterLink, Reveal],
  templateUrl: './solutions.html',
  styleUrl: './solutions.css',
})
export class Solutions implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly solutions = SOLUTIONS;
  protected readonly whatsapp = whatsappGeneralUrl();
  protected readonly phone = CONTACT_PHONE_DISPLAY;

  ngOnInit(): void {
    this.seo.update({
      title: 'Problemas con su máquina de coser: causas y soluciones',
      description:
        '¿Su máquina salta puntadas, revienta el hilo o no traspasa el dril? Soluciones sencillas a los problemas más comunes y servicio técnico en Bogotá.',
      path: '/soluciones',
    });
    this.seo.setJsonLd([
      this.seo.breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Soluciones', path: '/soluciones' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Problemas con su máquina de coser: causas y soluciones',
        url: absoluteUrl('/soluciones'),
        inLanguage: 'es-CO',
        publisher: { '@id': absoluteUrl('/#negocio') },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: SOLUTIONS.map((solution, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: solution.problem,
            url: absoluteUrl(`/soluciones/${solution.slug}`),
          })),
        },
      },
    ]);
  }
}
