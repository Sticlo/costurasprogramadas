import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { whatsappGeneralUrl } from '../../data/products';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly whatsapp = whatsappGeneralUrl();
}
