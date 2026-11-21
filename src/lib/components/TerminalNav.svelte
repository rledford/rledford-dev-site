<script lang="ts">
  import { onMount } from 'svelte';
  import type { SectionLink } from '#lib/content.ts';

  let { sections }: { sections: SectionLink[] } = $props();
  let active = $state('identity');
  let menuOpen = $state(false);
  let mounted = $state(false);
  let menuButton = $state<HTMLButtonElement>();
  let mobile: MediaQueryList | undefined;

  function closeMenu() {
    if (!mobile?.matches || !menuOpen) return;
    menuOpen = false;
    menuButton?.focus({ preventScroll: true });
  }

  function selectSection(id: string) {
    active = id;
    closeMenu();
  }

  onMount(() => {
    mounted = true;
    const viewport = window.matchMedia('(max-width: 640px)');
    mobile = viewport;
    function updateMenu() {
      menuOpen = !viewport.matches;
    }
    updateMenu();
    viewport.addEventListener('change', updateMenu);
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
      viewport.removeEventListener('change', updateMenu);
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
  {#if mounted}
    <button class="menu-toggle" type="button" aria-label="Portfolio sections menu" bind:this={menuButton} aria-expanded={menuOpen} aria-controls="portfolio-navigation" onclick={() => menuOpen = !menuOpen} onkeydown={(event) => { if (event.key === 'Escape') closeMenu(); }}>[ sections ]</button>
  {/if}
  <nav id="portfolio-navigation" aria-label="Portfolio sections" class="terminal-nav" class:mobile-collapsed={mounted && !menuOpen}>
    {#each sections as section}
      <a href={`#${section.id}`} class:active={active === section.id} aria-current={active === section.id ? 'location' : undefined} onclick={() => selectSection(section.id)} onkeydown={(event) => { if (event.key === 'Escape') closeMenu(); }}>
        {section.title}
      </a>
    {/each}
  </nav>
</header>
