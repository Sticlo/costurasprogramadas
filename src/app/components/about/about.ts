import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExpandImage } from '../../directives/expand-image';
import { Parallax } from '../../directives/parallax';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-about',
  imports: [RouterLink, Reveal, Parallax, ExpandImage],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
