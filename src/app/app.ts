import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly viewport = inject(ViewportScroller);

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const tree = this.router.parseUrl(event.urlAfterRedirects);
        const fragment = tree.fragment?.trim();

        if (fragment) {
          setTimeout(() => this.viewport.scrollToAnchor(fragment));
          return;
        }

        this.viewport.scrollToPosition([0, 0]);
      });
  }
}
