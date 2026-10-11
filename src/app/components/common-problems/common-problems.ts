import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SOLUTIONS } from '../../data/solutions';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-common-problems',
  imports: [RouterLink, Reveal],
  templateUrl: './common-problems.html',
  styleUrl: './common-problems.css',
})
export class CommonProblems {
  protected readonly problems = SOLUTIONS.slice(0, 6);
}
