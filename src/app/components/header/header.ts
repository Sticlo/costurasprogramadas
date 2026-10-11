import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private readonly router = inject(Router);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly isHome = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects.split('?')[0].split('#')[0] === '/'),
      startWith(this.router.url.split('?')[0].split('#')[0] === '/'),
    ),
    { initialValue: true },
  );

  protected readonly links: { label: string; path: string }[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalogo' },
    { label: 'Soluciones', path: '/soluciones' },
    { label: 'Nosotros', path: '/nosotros' },
    { label: 'Contacto', path: '/contacto' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => {
      const next = !open;
      document.body.style.overflow = next ? 'hidden' : '';
      document.body.classList.toggle('menu-open', next);
      return next;
    });
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  }
}
