import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_HOURS,
  CONTACT_PHONE_DISPLAY,
  whatsappGeneralUrl,
  whatsappQuoteUrl,
} from '../../data/products';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [Reveal, FormsModule, Parallax],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly address = CONTACT_ADDRESS;
  protected readonly phone = CONTACT_PHONE_DISPLAY;
  protected readonly email = CONTACT_EMAIL;
  protected readonly hours = CONTACT_HOURS;
  protected readonly whatsapp = whatsappGeneralUrl();

  protected readonly need = signal('');
  protected readonly city = signal('Bogotá');

  ngOnInit(): void {
    this.seo.update({
      title: 'Contacto: tienda de máquinas de coser en La Alquería, Bogotá',
      description:
        'Visítenos en La Alquería, Bogotá, o escríbanos al WhatsApp 319 339 9817. Cotice máquinas de coser, repuestos y servicio técnico. Lunes a sábado, 8 a. m. a 6 p. m.',
      path: '/contacto',
    });
    this.seo.setJsonLd(
      this.seo.breadcrumbs([
        { name: 'Inicio', path: '/' },
        { name: 'Contacto', path: '/contacto' },
      ]),
    );
  }

  protected openQuote(): void {
    const need = this.need().trim() || 'asesoría para elegir maquinaria';
    const city = this.city().trim() || 'Bogotá';
    window.open(whatsappQuoteUrl(need, city), '_blank', 'noopener,noreferrer');
  }
}
