import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getFeaturedProducts } from '../../data/products';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-featured-products',
  imports: [RouterLink, Reveal],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.css',
})
export class FeaturedProducts {
  protected readonly products = getFeaturedProducts();
}
