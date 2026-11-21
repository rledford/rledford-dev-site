<script lang="ts">
  import type { ContentGroup } from '#lib/content.ts';

  let { groups, compact = false }: { groups: ContentGroup[]; compact?: boolean } = $props();
</script>

<div class="grouped-list" class:compact>
  {#each groups as group}
    <div class="content-group">
      <h3><span aria-hidden="true">/</span> {group.title}</h3>
      <ul>
        {#each group.items as item}
          <li>{item}</li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
