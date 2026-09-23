import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { loadGsap, prefersReducedMotion, scheduleScrollRefresh } from '../utils/gsap';

/**
 * Put on an overflow-hidden frame that wraps an <img>.
 * The frame opens from an inset card to full bleed while the photo settles from a zoom.
 */
@Directive({
  selector: '[appExpandImage]',
})
export class ExpandImage {
  private readonly el = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** Starting inset of the frame, in percent. */
  readonly appExpandImage = input(9);
  readonly expandZoom = input(1.28);

  constructor() {
    let destroyed = false;
    let revert: (() => void) | undefined;
    this.destroyRef.onDestroy(() => {
      destroyed = true;
      revert?.();
    });

    afterNextRender(async () => {
      if (prefersReducedMotion()) {
        return;
      }

      const kit = await loadGsap();
      if (destroyed) {
        return;
      }

      const { gsap } = kit;
      const frame = this.el.nativeElement as HTMLElement;
      const img = frame.querySelector('img');
      const inset = this.appExpandImage();

      const ctx = gsap.context(() => {
        gsap.fromTo(
          frame,
          { clipPath: `inset(${inset}% ${inset}% ${inset}% ${inset}% round 14px)` },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top 96%', end: 'top 38%', scrub: 0.8 },
          },
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: this.expandZoom(), yPercent: -5 },
            {
              scale: 1,
              yPercent: 5,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            },
          );
        }
      }, frame);
      revert = () => ctx.revert();

      if (img && !img.complete) {
        img.addEventListener('load', () => scheduleScrollRefresh(kit), { once: true });
      }
    });
  }
}
