import { Component, inject, OnInit } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { FeaturedProducts } from '../../components/featured-products/featured-products';
import { Benefits } from '../../components/benefits/benefits';
import { StitchScroll } from '../../components/stitch-scroll/stitch-scroll';
import { AtelierExpand } from '../../components/atelier-expand/atelier-expand';
import { CommonProblems } from '../../components/common-problems/common-problems';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [Hero, StitchScroll, FeaturedProducts, AtelierExpand, CommonProblems, Benefits],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.update({
      title: 'Máquinas de coser industriales y familiares en Bogotá',
      description:
        'Venta de máquinas de coser industriales y familiares en Bogotá: planas, fileteadoras, collarines y bordadoras JACK, KANSEW y UNION. Envíos a todo Colombia.',
      path: '/',
      imageAlt: 'Costuras Programadas: máquinas de coser industriales y familiares en Bogotá',
    });
  }
}
