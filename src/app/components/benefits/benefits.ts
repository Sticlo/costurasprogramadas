import { Component } from '@angular/core';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-benefits',
  imports: [Reveal, Parallax],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  protected readonly items = [
    {
      title: 'Asesoría de taller',
      text: 'Le orientamos según el tipo de prenda, el volumen y el presupuesto, con palabras claras.',
    },
    {
      title: 'Equipo listo para producir',
      text: 'Máquinas y herramientas elegidas por durabilidad, repuestos y soporte en Colombia.',
    },
    {
      title: 'Compra con acompañamiento',
      text: 'Cotización clara por WhatsApp o correo, y seguimiento después de la entrega.',
    },
  ];
}
