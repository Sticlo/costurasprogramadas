import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFeaturedProducts } from '../../data/products';
import { ExpandImage } from '../../directives/expand-image';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-featured-products',
  imports: [RouterLink, Reveal, Parallax, ExpandImage],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts {
  protected readonly products = getFeaturedProducts();
}
