<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionLink } from '#lib/content.ts';

  let { sections }: { sections: SectionLink[] } = $props();
  let active = $state('identity');

  onMount(() => {
    function updateActive() {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1) {
        active = sections.at(-1)?.id ?? 'identity';
        return;
      }
      let current = 'identity';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.25) current = section.id;
      }
      active = current;
    }
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  });
</script>

<header class="terminal-header">
  <div class="workspace-bar">
    <a class="workspace-name" href="#identity"><span class="prompt" aria-hidden="true">&gt;_</span> rledford<span class="workspace-path"> / portfolio</span></a>
    <span class="workspace-type">PERSONAL WORKSPACE</span>
  </div>
  <nav aria-label="Portfolio sections" class="terminal-nav">
    {#each sections as section}
      <a href={`#${section.id}`} class:active={active === section.id} aria-current={active === section.id ? 'location' : undefined} onclick={() => active = section.id}>
        {section.title}
      </a>
    {/each}
  </nav>
</header>
