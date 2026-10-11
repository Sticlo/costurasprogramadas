import { Component, inject, OnInit } from '@angular/core';
import { About } from '../../components/about/about';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-nosotros',
  imports: [About],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Nosotros: expertos en máquinas de coser en Bogotá',
      description:
        'Conozca a Costuras Programadas: historia, equipo en la Feria CREATEX 2026 y nuestra misión de acompañar a talleres de confección en Bogotá y toda Colombia.',
      path: '/nosotros',
      image: '/assets/equipo-createx-2026.jpg',
      imageAlt: 'Equipo de Costuras Programadas en su stand de la Feria CREATEX 2026',
    });
    this.seo.setJsonLd(
      this.seo.breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Nosotros', path: '/nosotros' },
      ]),
    );
  }
}
