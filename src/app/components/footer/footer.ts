import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  whatsappGeneralUrl,
} from '../../data/products';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly email = CONTACT_EMAIL;
  protected readonly phone = CONTACT_PHONE_DISPLAY;
  protected readonly address = CONTACT_ADDRESS;
  protected readonly whatsapp = whatsappGeneralUrl();
}
