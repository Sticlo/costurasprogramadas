import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
