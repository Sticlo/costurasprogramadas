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
      title: 'Nosotros',
      description:
        'Conozca Costuras Programadas: maquinaria y herramientas de confección con asesoría cercana en Bogotá y Colombia.',
      path: '/nosotros',
      image: '/assets/workshop-taller.jpg',
    });
  }
}
