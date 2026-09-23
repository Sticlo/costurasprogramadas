import type { gsap as GsapInstance } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export interface GsapKit {
  gsap: typeof GsapInstance;
  ScrollTrigger: typeof ScrollTriggerType;
}

let loader: Promise<GsapKit> | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | undefined;

/** Browser-only; call from afterNextRender so SSR never evaluates GSAP. */
export function loadGsap(): Promise<GsapKit> {
  loader ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
    ([core, plugin]) => {
      core.gsap.registerPlugin(plugin.ScrollTrigger);
      return { gsap: core.gsap, ScrollTrigger: plugin.ScrollTrigger };
    },
  );
  return loader;
}

/** Lazy images change page height; batch the recalculation of trigger positions. */
export function scheduleScrollRefresh(kit: GsapKit): void {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => kit.ScrollTrigger.refresh(), 150);
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
