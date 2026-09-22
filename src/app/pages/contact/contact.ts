import { Component, inject, OnInit } from '@angular/core';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  whatsappGeneralUrl,
} from '../../data/products';
import { Reveal } from '../../directives/reveal';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-contact',
  imports: [Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {
  private readonly seo = inject(SeoService);

  protected readonly address = CONTACT_ADDRESS;
  protected readonly phone = CONTACT_PHONE_DISPLAY;
  protected readonly email = CONTACT_EMAIL;
  protected readonly whatsapp = whatsappGeneralUrl();

  ngOnInit(): void {
    this.seo.update({
      title: 'Contacto y cotizaciones',
      description:
        'Contacta a Costuras Programadas en La Alquería, Bogotá. WhatsApp 319 339 9817 para cotizar maquinaria y herramientas.',
      path: '/contacto',
    });
  }
}
