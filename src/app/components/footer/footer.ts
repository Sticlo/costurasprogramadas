import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  whatsappGeneralUrl,
} from '../../data/products';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Reveal, Parallax],
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
