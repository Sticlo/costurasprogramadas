import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { whatsappGeneralUrl } from '../../data/products';
import { Parallax } from '../../directives/parallax';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, Parallax],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly whatsapp = whatsappGeneralUrl();
}
