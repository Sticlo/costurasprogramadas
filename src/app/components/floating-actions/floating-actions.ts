import { Component, signal } from '@angular/core';
import { CONTACT_PHONE_DISPLAY, whatsappGeneralUrl, WHATSAPP_NUMBER } from '../../data/products';

@Component({
  selector: 'app-floating-actions',
  templateUrl: './floating-actions.html',
  styleUrl: './floating-actions.css',
})
export class FloatingActions {
  protected readonly panelOpen = signal(false);
  protected readonly phone = CONTACT_PHONE_DISPLAY;
  protected readonly whatsapp = whatsappGeneralUrl();

  protected readonly quickPrompts = [
    'Quiero una máquina recta para producción diaria',
    'Necesito overlock para tela elástica',
    '¿Dan servicio técnico en Bogotá?',
    'Quiero cotizar máquinas para un taller nuevo',
  ];

  openAiPanel(): void {
    this.panelOpen.update((open) => !open);
  }

  closePanel(): void {
    this.panelOpen.set(false);
  }

  askAi(prompt: string): void {
    const text = encodeURIComponent(
      `Hola Costuras Programadas, necesito ayuda:\n\n${prompt}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
  }
}
