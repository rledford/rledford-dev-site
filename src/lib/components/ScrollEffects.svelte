<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = [...document.querySelectorAll<HTMLElement>('.terminal-panel, .timeline li, .project')];
    const completed = new Set<HTMLElement>();
    const root = document.documentElement;
    let observer: IntersectionObserver | undefined;
    let frame: number | undefined;

    function updateProgress() {
      frame = undefined;
      const distance = root.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      root.style.setProperty('--scroll-progress', String(progress));
    }

    function requestProgress() {
      if (frame !== undefined || preference.matches) return;
      frame = window.requestAnimationFrame(updateProgress);
    }

    function expose(element: HTMLElement, animate: boolean) {
      completed.add(element);
      element.dataset.scrollReveal = animate ? 'revealed' : 'visible';
      observer?.unobserve(element);
    }

    function exposeTarget(target: Element) {
      for (const element of elements) {
        if (element === target || element.contains(target) || target.contains(element)) expose(element, false);
      }
    }

    function handleFocus(event: FocusEvent) {
      if (event.target instanceof Element && event.target.matches(':focus-visible')) exposeTarget(event.target);
    }

    function handleHash() {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target) exposeTarget(target);
    }

    function handleBeforeMatch(event: Event) {
      if (event.target instanceof Element) exposeTarget(event.target);
    }

    function updateMotion() {
      observer?.disconnect();
      root.dataset.scrollEffects = preference.matches ? 'reduced' : 'enabled';
      if (preference.matches || !('IntersectionObserver' in window)) {
        for (const element of elements) expose(element, false);
        return;
      }

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) expose(entry.target, true);
        }
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

      for (const element of elements) {
        if (completed.has(element)) continue;
        if (element.getBoundingClientRect().top < window.innerHeight) {
          expose(element, false);
          continue;
        }
        element.dataset.scrollReveal = 'pending';
        observer.observe(element);
      }

      handleHash();
      updateProgress();
    }

    updateMotion();
    window.addEventListener('scroll', requestProgress, { passive: true });
    window.addEventListener('resize', requestProgress, { passive: true });
    window.addEventListener('hashchange', handleHash);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('beforematch', handleBeforeMatch);
    preference.addEventListener('change', updateMotion);

    return () => {
      observer?.disconnect();
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestProgress);
      window.removeEventListener('resize', requestProgress);
      window.removeEventListener('hashchange', handleHash);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('beforematch', handleBeforeMatch);
      preference.removeEventListener('change', updateMotion);
      delete root.dataset.scrollEffects;
      root.style.removeProperty('--scroll-progress');
      for (const element of elements) delete element.dataset.scrollReveal;
    };
  });
</script>
