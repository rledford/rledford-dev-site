<script lang="ts">
  import type { TimelineEntry } from '#lib/content.ts';

  let { entries }: { entries: TimelineEntry[] } = $props();
</script>

<ol class="timeline">
  {#each entries as entry, index}
    <li class:current={index === 0}>
      <div class="timeline-period"><span class="timeline-marker" aria-hidden="true"></span>{entry.title}</div>
      <div class="timeline-detail">
        <div class="timeline-title"><h3>{entry.subtitle}</h3><span class="timeline-company">{entry.company}</span></div>
        <p>{entry.content}</p>
      </div>
    </li>
  {/each}
</ol>
