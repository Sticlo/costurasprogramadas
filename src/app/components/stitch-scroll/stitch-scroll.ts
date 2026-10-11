import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';

/** Matches CSS stroke-dasharray: 12 10 on the thread path. */
const DASH_PERIOD = 22;
const VIEW_W = 1200;
const VIEW_H = 260;

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
      const host = this.element.nativeElement as HTMLElement;
      const track = host.querySelector('.stitch__track') as SVGPathElement | null;
      const clip = host.querySelector('.stitch__clip') as SVGRectElement | null;
      let frame = 0;
      let pathLength = 0;
      let stitchCount = 32;

      const measure = () => {
        if (!track) {
          return;
        }

        pathLength = track.getTotalLength();
        const svgWidth = track.ownerSVGElement?.getBoundingClientRect().width ?? VIEW_W;
        const renderedLength = pathLength * (svgWidth / VIEW_W);
        stitchCount = Math.max(18, Math.round(renderedLength / DASH_PERIOD));
      };

      const pointOnPath = (t: number) => {
        const clamped = Math.min(1, Math.max(0, t));
        if (track && pathLength > 0) {
          return track.getPointAtLength(clamped * pathLength);
        }
        return { x: 100 + clamped * 1000, y: 150 };
      };

      const update = () => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        const distance = Math.max(host.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / distance));

        const sew = Math.min(1, progress / 0.7);
        const open = Math.max(0, Math.min(1, (progress - 0.7) / 0.3));
        const openEase = open * open * (3 - 2 * open);

        const pt = pointOnPath(sew);
        const needleX = (pt.x / VIEW_W) * 100;
        const needleY = (pt.y / VIEW_H) * 100;

        const plunge = Math.sin(sew * Math.PI * 2 * stitchCount);
        const sewing = sew > 0.002 && sew < 0.998 && open < 0.04;
        const contact = Math.max(0, plunge);
        const needleBob = sewing ? contact * 9 : 0;
        const tipFlash = sewing ? contact : 0;

        // The seam only moves left-to-right, so clipping by x reveals exactly up to the needle.
        clip?.setAttribute('width', sew > 0 ? pt.x.toFixed(2) : '0');

        host.style.setProperty('--stitch-progress', sew.toFixed(4));
        host.style.setProperty('--open-progress', openEase.toFixed(4));
        host.style.setProperty('--needle-x', `${needleX.toFixed(3)}%`);
        host.style.setProperty('--needle-y', `${needleY.toFixed(3)}%`);
        host.style.setProperty('--needle-bob', `${needleBob.toFixed(2)}px`);
        host.style.setProperty('--tip-flash', tipFlash.toFixed(3));
        host.classList.toggle('is-sewing', sewing);
        host.classList.toggle('is-opening', open > 0.01);
        host.classList.toggle('is-open', open > 0.88);
      };

      const onScroll = () => {
        if (!frame) {
          frame = requestAnimationFrame(update);
        }
      };

      const onResize = () => {
        measure();
        onScroll();
      };

      measure();
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        if (frame) {
          cancelAnimationFrame(frame);
        }
      });
    });
  }
}
