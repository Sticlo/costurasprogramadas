import {
  afterNextRender,
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

export type RevealKind = 'up' | 'down' | 'fade' | 'left' | 'right' | 'scale' | 'blur' | 'rise';

@Directive({
  selector: '[appReveal]',
})
export class Reveal implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  readonly appReveal = input<RevealKind>('up');
  readonly revealDelay = input(0);

  constructor() {
    afterNextRender(() => {
      const native = this.el.nativeElement;
      this.renderer.addClass(native, 'reveal');
      this.renderer.addClass(native, `reveal--${this.appReveal()}`);

      const delay = this.revealDelay();
      if (delay > 0) {
        this.renderer.setStyle(native, 'transition-delay', `${delay}ms`);
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.renderer.addClass(native, 'is-visible');
        return;
      }

      if (typeof IntersectionObserver === 'undefined') {
        this.renderer.addClass(native, 'is-visible');
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.renderer.addClass(native, 'is-visible');
              this.observer?.unobserve(native);
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
      );
      this.observer.observe(native);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
