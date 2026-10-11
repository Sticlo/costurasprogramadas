import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { whatsappGeneralUrl } from '../../data/products';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-benefits',
  imports: [Reveal, Parallax, RouterLink],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  protected readonly whatsappUrl = whatsappGeneralUrl();

  protected readonly items = [
    {
      icon: 'advice',
      title: 'Asesoría de taller',
      text: 'Le orientamos según el tipo de prenda, el volumen de trabajo y su presupuesto, con palabras claras y sin tecnicismos.',
    },
    {
      icon: 'machine',
      title: 'Marcas confiables',
      text: 'Trabajamos con JACK, KANSEW, UNION, PEGASUS y más, elegidas por su durabilidad, repuestos y soporte en Colombia.',
    },
    {
      icon: 'support',
      title: 'Acompañamiento real',
      text: 'Cotización clara por WhatsApp o correo, y servicio técnico y seguimiento después de la entrega.',
    },
  ];
}
