import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';

export type ParallaxMode = 'translate' | 'background';

interface ParallaxItem {
  el: HTMLElement;
  speed: () => number;
  max: () => number;
  mode: () => ParallaxMode;
}

const items = new Set<ParallaxItem>();
let frame = 0;
let listening = false;

function update(item: ParallaxItem, viewport: number, mobile: boolean): void {
  // Measure a box that the effect itself never moves, or the offset feeds back into the next frame.
  const reference =
    item.mode() === 'translate' ? (item.el.parentElement ?? item.el) : item.el;
  const rect = reference.getBoundingClientRect();
  if (rect.bottom < -viewport * 0.5 || rect.top > viewport * 1.5) {
    return;
  }

  const offset = rect.top + rect.height / 2 - viewport / 2;
  const speed = item.speed() * (mobile ? 0.55 : 1);
  const max = item.max();
  const shift = Math.max(-max, Math.min(max, -offset * speed));

  if (item.mode() === 'background') {
    item.el.style.setProperty('--parallax-bg', `${shift.toFixed(1)}px`);
  } else {
    item.el.style.translate = `0 ${shift.toFixed(1)}px`;
  }
  item.el.style.setProperty('--parallax-progress', (-offset / viewport).toFixed(3));
}

function tick(): void {
  frame = 0;
  const viewport = window.innerHeight;
  const mobile = window.innerWidth < 720;
  for (const item of items) {
    update(item, viewport, mobile);
  }
}

function schedule(): void {
  if (!frame) {
    frame = requestAnimationFrame(tick);
  }
}

function register(item: ParallaxItem): void {
  items.add(item);
  if (!listening) {
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    listening = true;
  }
  schedule();
}

function unregister(item: ParallaxItem): void {
  items.delete(item);
  if (items.size === 0 && listening) {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    listening = false;
    if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  }
}

/**
 * Positive speed: layer lags behind the scroll (background depth).
 * Negative speed: layer moves ahead of the scroll (foreground).
 */
@Directive({
  selector: '[appParallax]',
})
export class Parallax {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly appParallax = input(0.15);
  readonly parallaxMax = input(120);
  readonly parallaxMode = input<ParallaxMode>('translate');

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const item: ParallaxItem = {
        el: this.el.nativeElement as HTMLElement,
        speed: this.appParallax,
        max: this.parallaxMax,
        mode: this.parallaxMode,
      };
      register(item);
      this.destroyRef.onDestroy(() => unregister(item));
    });
  }
}
