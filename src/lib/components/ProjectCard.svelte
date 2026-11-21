<script lang="ts">
  import { onMount } from 'svelte';
  import type { Project } from '#lib/content.ts';
  import ImageGallery from './ImageGallery.svelte';

  let { project }: { project: Project } = $props();
  let details = $state<HTMLDetailsElement>();
  let reveal = $state<HTMLDivElement>();
  let preference: MediaQueryList | undefined;
  let animation: Animation | undefined;
  let desiredOpen = false;

  function finishAnimation() {
    const current = animation;
    animation = undefined;
    if (current) {
      current.onfinish = null;
      current.oncancel = null;
      current.cancel();
    }
    if (details) details.open = desiredOpen;
    if (reveal) {
      reveal.style.removeProperty('height');
      reveal.style.removeProperty('overflow');
    }
  }

  function toggleDetails(event: MouseEvent) {
    if (!details || !reveal || !preference || preference.matches || typeof reveal.animate !== 'function') return;
    event.preventDefault();
    const currentHeight = details.open ? reveal.getBoundingClientRect().height : 0;
    desiredOpen = animation ? !desiredOpen : !details.open;
    if (animation) {
      animation.onfinish = null;
      animation.oncancel = null;
      animation.cancel();
    }
    details.open = true;
    reveal.style.removeProperty('height');
    const targetHeight = desiredOpen ? reveal.getBoundingClientRect().height : 0;
    reveal.style.height = `${currentHeight}px`;
    reveal.style.overflow = 'hidden';
    animation = reveal.animate([
      { height: `${currentHeight}px` },
      { height: `${targetHeight}px` },
    ], { duration: 360, easing: 'cubic-bezier(.2, .65, .25, 1)', fill: 'both' });
    animation.onfinish = finishAnimation;
    animation.oncancel = finishAnimation;
  }

  onMount(() => {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const motionPreference = preference;
    function handleMotion() {
      if (motionPreference.matches && animation) finishAnimation();
    }
    motionPreference.addEventListener('change', handleMotion);
    return () => {
      motionPreference.removeEventListener('change', handleMotion);
      if (animation) finishAnimation();
    };
  });
</script>

<article class="project">
  <div class="project-overview">
    <div class="project-heading">
      <h3>{project.solution}</h3>
      <div class="project-meta"><span class="project-name">{project.title}</span><span class="project-year">{project.year}</span></div>
    </div>
    <div class="project-thumbnail"><ImageGallery images={project.images} label={project.title} /></div>
    <p class="project-summary">{project.summary}</p>
    <ul class="project-domains" aria-label={`${project.title} domains`}>{#each project.domains as domain}<li>{domain}</li>{/each}</ul>
  </div>
  <details class="project-details" bind:this={details}>
    <summary aria-label={`Details about ${project.title}`} onclick={toggleDetails}>[ details ]</summary>
    <div class="project-reveal" bind:this={reveal}>
      <div class="project-prose">
        {#each project.paragraphs as paragraph}
          <p>{#each paragraph as part}{#if part.strong}<strong>{part.text}</strong>{:else}{part.text}{/if}{/each}</p>
        {/each}
      </div>
    </div>
  </details>
</article>
