<script lang="ts">
  import type { Snippet } from 'svelte';
  import ExternalServices from '#lib/components/ExternalServices.svelte';
  import ScrollEffects from '#lib/components/ScrollEffects.svelte';
  import '../styles/theme.css';

  let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
  <meta name="author" content="Ryan Ledford" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<ExternalServices />
<ScrollEffects />
{@render children()}
