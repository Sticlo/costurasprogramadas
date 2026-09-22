import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-stitch-scroll',
  templateUrl: './stitch-scroll.html',
  styleUrl: './stitch-scroll.css',
})
export class StitchScroll {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const host = this.element.nativeElement;
      let frame = 0;

      const update = () => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        const distance = Math.max(host.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / distance));
        const needleX = 12 + progress * 76;
        const needleBob = Math.abs(Math.sin(progress * Math.PI * 24)) * 11;

        host.style.setProperty('--stitch-progress', progress.toFixed(4));
        host.style.setProperty('--needle-x', `${needleX.toFixed(2)}%`);
        host.style.setProperty('--needle-bob', `${needleBob.toFixed(2)}px`);
        host.style.setProperty('--fabric-shift', `${(-progress * 36).toFixed(2)}px`);
      };

      const onScroll = () => {
        if (!frame) {
          frame = requestAnimationFrame(update);
        }
      };

      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (frame) {
          cancelAnimationFrame(frame);
        }
      });
    });
  }
}
