import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  DEFAULT_WHEN_TITLE,
  getOtherSolutions,
  getSolutionBySlug,
  Solution,
  whatsappSolutionUrl,
} from '../../data/solutions';
import {
  CONTACT_ADDRESS,
  CONTACT_HOURS,
  CONTACT_PHONE_DISPLAY,
  getProductBySlug,
  Product,
  productImage,
  SITE_NAME,
} from '../../data/products';
import { Reveal } from '../../directives/reveal';
import { absoluteUrl, SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-solution-detail',
  imports: [RouterLink, Reveal],
  templateUrl: './solution-detail.html',
  styleUrl: './solution-detail.css',
})
export class SolutionDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  protected readonly solution = computed(() => getSolutionBySlug(this.slug()));
  protected readonly products = computed(() =>
    (this.solution()?.products ?? [])
      .map((slug) => getProductBySlug(slug))
      .filter((product): product is Product => !!product),
  );
  protected readonly others = computed(() => {
    const item = this.solution();
    return item ? getOtherSolutions(item) : [];
  });

  protected readonly phone = CONTACT_PHONE_DISPLAY;
  protected readonly address = CONTACT_ADDRESS;
  protected readonly hours = CONTACT_HOURS;
  protected readonly imageOf = productImage;
  protected readonly whatsappOf = whatsappSolutionUrl;
  protected readonly defaultWhenTitle = DEFAULT_WHEN_TITLE;

  constructor() {
    effect(() => {
      const item = this.solution();
      if (!item) {
        this.seo.update({
          title: 'Solución no encontrada',
          description: 'La guía solicitada no está disponible.',
          path: '/soluciones',
          noindex: true,
        });
        return;
      }

      const path = `/soluciones/${item.slug}`;
      this.seo.update({
        title: item.seoTitle,
        description: item.seoDescription,
        path,
        type: 'article',
        imageAlt: item.problem,
      });
      this.seo.setJsonLd([
        this.articleSchema(item, path),
        this.faqSchema(item),
        this.seo.breadcrumbs([
          { name: 'Inicio', path: '/' },
          { name: 'Soluciones', path: '/soluciones' },
          { name: item.problem, path },
        ]),
      ]);
    });
  }

  private articleSchema(item: Solution, path: string): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: item.problem,
      description: item.seoDescription,
      abstract: item.answer,
      url: absoluteUrl(path),
      inLanguage: 'es-CO',
      keywords: item.searches.join(', '),
      about: { '@type': 'Thing', name: 'Máquinas de coser' },
      author: { '@id': absoluteUrl('/#negocio') },
      publisher: { '@id': absoluteUrl('/#negocio') },
      image: absoluteUrl('/assets/og-costuras-programadas.jpg'),
      mainEntityOfPage: absoluteUrl(path),
    };
  }

  private faqSchema(item: Solution): Record<string, unknown> {
    const qa = (question: string, answer: string) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    });
    const points = item.points.map((point) => `${point.title}: ${point.text}`).join(' ');
    const steps = item.steps.map((step, index) => `${index + 1}. ${step}`).join(' ');
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        qa(item.question, item.answer),
        qa(item.pointsTitle, points),
        qa(item.stepsTitle, steps),
        qa(
          item.whenTitle ?? DEFAULT_WHEN_TITLE,
          `${item.whenToCall} ${SITE_NAME}: ${CONTACT_ADDRESS}. WhatsApp ${CONTACT_PHONE_DISPLAY}. ${CONTACT_HOURS}.`,
        ),
      ],
    };
  }
}
