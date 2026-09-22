import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-benefits',
  imports: [Reveal],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css',
})
export class Benefits {
  protected readonly items = [
    {
      title: 'Asesoría real de taller',
      text: 'Te orientamos según el tipo de prenda, volumen y presupuesto — sin tecnicismos vacíos.',
    },
    {
      title: 'Equipo listo para producir',
      text: 'Máquinas y herramientas seleccionadas por durabilidad, repuestos y soporte en Colombia.',
    },
    {
      title: 'Compra con acompañamiento',
      text: 'Cotización clara por WhatsApp o correo, con seguimiento después de la entrega.',
    },
  ];
}
