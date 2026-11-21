<script lang="ts">
  import type { Snippet } from 'svelte';

  let { id, title, children }: { id: string; title: string; children: Snippet } = $props();
</script>

<section {id} class="terminal-panel" aria-labelledby={`${id}-heading`}>
  <div class="panel-heading">
    <h2 id={`${id}-heading`}>{title}</h2>
    <a class="section-anchor" href={`#${id}`} aria-label={`Link to ${title}`}>#</a>
  </div>
  <div class="panel-content">{@render children()}</div>
</section>
