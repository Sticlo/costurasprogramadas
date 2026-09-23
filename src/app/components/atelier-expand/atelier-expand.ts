import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { loadGsap, prefersReducedMotion, scheduleScrollRefresh } from '../../utils/gsap';

interface FrameInset {
  top: number;
  side: number;
  bottom: number;
}

function cardInset(): FrameInset {
  return window.innerWidth < 720
    ? { top: 40, side: 6, bottom: 13 }
    : { top: 36, side: 24, bottom: 10 };
}

@Component({
  selector: 'app-atelier-expand',
  imports: [RouterLink],
  templateUrl: './atelier-expand.html',
  styleUrl: './atelier-expand.css',
})
export class AtelierExpand {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    let destroyed = false;
    let revert: (() => void) | undefined;
    this.destroyRef.onDestroy(() => {
      destroyed = true;
      revert?.();
    });

    afterNextRender(async () => {
      const host = this.element.nativeElement as HTMLElement;
      if (prefersReducedMotion()) {
        host.classList.add('expand--static');
        return;
      }

      const kit = await loadGsap();
      if (destroyed) {
        return;
      }

      const { gsap } = kit;
      const pin = host.querySelector('.expand__pin') as HTMLElement;
      const media = host.querySelector('.expand__media') as HTMLElement;
      const img = media.querySelector('img') as HTMLImageElement;

      const clip = () => {
        const i = cardInset();
        return `inset(${i.top}% ${i.side}% ${i.bottom}% ${i.side}% round 14px)`;
      };
      const seamBox = {
        top: () => `${cardInset().top}%`,
        left: () => `${cardInset().side}%`,
        right: () => `${cardInset().side}%`,
        bottom: () => `${cardInset().bottom}%`,
      };

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: '+=170%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(media, { clipPath: clip }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 }, 0)
          .fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1 }, 0)
          .fromTo(
            '.expand__seam',
            seamBox,
            { top: '2.5%', left: '2.5%', right: '2.5%', bottom: '2.5%', duration: 1 },
            0,
          )
          .to('.expand__seam', { opacity: 0, duration: 0.25 }, 0.85)
          .to('.expand__intro', { yPercent: -70, opacity: 0, duration: 0.22, ease: 'power1.in' }, 0)
          .fromTo('.expand__shade', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.45)
          .fromTo(
            '.expand__outro > *',
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.08 },
            0.72,
          );
      }, host);
      revert = () => ctx.revert();

      if (!img.complete) {
        img.addEventListener('load', () => scheduleScrollRefresh(kit), { once: true });
      }
    });
  }
}
