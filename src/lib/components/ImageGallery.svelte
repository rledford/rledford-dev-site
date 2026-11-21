<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    images: string[];
    label: string;
  }

  let { images, label }: Props = $props();
  let index = $state(0);
  let mounted = $state(false);
  let viewer = $state<HTMLDialogElement>();
  let closeButton = $state<HTMLButtonElement>();
  let opener: HTMLAnchorElement | undefined;
  let savedPosition: { left: number; top: number } | undefined;
  let backdropPointer: number | undefined;
  const firstImage = $derived(images[0]);
  const currentImage = $derived(images[index]);

  function select(nextIndex: number) {
    if (images.length < 2) return;
    index = (nextIndex + images.length) % images.length;
  }

  function openViewer(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (!viewer || !(event.currentTarget instanceof HTMLAnchorElement)) return;
    event.preventDefault();
    opener = event.currentTarget;
    index = 0;
    savedPosition = { left: window.scrollX, top: window.scrollY };
    viewer.showModal();
    closeButton?.focus({ preventScroll: true });
  }

  function restoreFocus() {
    if (savedPosition) window.scrollTo({ ...savedPosition, behavior: 'instant' });
    opener?.focus({ preventScroll: true });
    savedPosition = undefined;
    opener = undefined;
    backdropPointer = undefined;
  }

  function isBackdrop(event: PointerEvent) {
    if (!viewer || event.target !== viewer) return false;
    const bounds = viewer.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  }

  function beginBackdrop(event: PointerEvent) {
    backdropPointer = event.button === 0 && isBackdrop(event) ? event.pointerId : undefined;
  }

  function endBackdrop(event: PointerEvent) {
    const dismiss = backdropPointer !== undefined && backdropPointer === event.pointerId && isBackdrop(event);
    backdropPointer = undefined;
    if (dismiss) viewer?.close();
  }

  function handleKey(event: KeyboardEvent) {
    if (!viewer?.open || images.length < 2) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    select(index + (event.key === 'ArrowRight' ? 1 : -1));
  }

  $effect(() => {
    if (index >= images.length) index = 0;
  });

  onMount(() => {
    mounted = true;
    return () => {
      if (!viewer?.open) return;
      viewer.close();
      restoreFocus();
    };
  });
</script>

<div class="gallery" role="region" aria-label={`${label} image gallery`}>
  {#if firstImage}
    <a
      class="thumbnail"
      href={firstImage}
      aria-label={`View ${label} image 1 of ${images.length} full size`}
      onclick={openViewer}
    >
      <img src={firstImage} alt={`${label}, image 1 of ${images.length}`} loading="lazy" />
      <span class="thumbnail-hint">[ view images ]</span>
    </a>
    <noscript>
      <ul class="image-links">
        {#each images as image, imageIndex}
          <li><a href={image}>View {label} image {imageIndex + 1} of {images.length}</a></li>
        {/each}
      </ul>
    </noscript>
  {:else}
    <p class="placeholder">No images available.</p>
  {/if}

  {#if mounted && currentImage}
    <dialog
      bind:this={viewer}
      aria-label={`${label} image ${index + 1} of ${images.length} viewer`}
      onclose={restoreFocus}
      onpointerdown={beginBackdrop}
      onpointerup={endBackdrop}
      onpointercancel={() => backdropPointer = undefined}
      onkeydown={handleKey}
    >
      <div class="viewer-toolbar">
        <span class="viewer-title">{label}</span>
        <button bind:this={closeButton} type="button" aria-label="Close image viewer" onclick={() => viewer?.close()}>[ close ]</button>
      </div>
      <div class="viewer-viewport" role="region" aria-label="Image fitted to viewer" aria-live="polite" aria-atomic="true">
        <img src={currentImage} alt={`${label}, full-size image ${index + 1} of ${images.length}`} />
      </div>
      {#if images.length > 1}
        <div class="viewer-navigation" aria-label="Gallery controls">
          <button type="button" aria-label="Previous image" onclick={() => select(index - 1)}>[ prev ]</button>
          <button type="button" aria-label="Next image" onclick={() => select(index + 1)}>[ next ]</button>
        </div>
      {/if}
    </dialog>
  {/if}
</div>

<style>
  .gallery {
    min-width: 0;
    width: 100%;
    border: 1px solid var(--border, #606060);
    background: var(--surface, #121212);
  }

  .thumbnail {
    display: block;
    padding: 0.375rem;
    color: var(--green, #8ee389);
  }

  .thumbnail img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: contain;
    background: var(--bg, #090b0a);
  }

  .thumbnail-hint {
    display: block;
    text-align: center;
    padding: 0.5rem 0.25rem 0.125rem;
    font-size: 0.875rem;
  }

  .thumbnail:hover {
    color: var(--purple, #af87ff);
    outline: 1px solid var(--purple, #af87ff);
    box-shadow: 0 0 1rem #af87ff20;
  }

  button {
    min-height: 2.75rem;
    padding: 0.375rem 0.25rem;
    border: 0;
    background: transparent;
    color: var(--green, #8ee389);
    font: inherit;
    cursor: pointer;
  }

  button:hover {
    color: var(--purple, #af87ff);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  button:focus-visible {
    outline: 2px solid var(--green, #8ee389);
    outline-offset: 3px;
  }

  .placeholder {
    margin: 0;
    padding: 0.75rem;
    text-align: center;
    color: var(--muted, #a6aaa6);
  }

  .image-links {
    margin: 0;
    padding: 0.75rem 0.75rem 0.75rem 2rem;
  }

  .image-links a {
    color: var(--green, #8ee389);
    text-decoration: underline;
    text-underline-offset: 0.25em;
  }

  dialog {
    width: min(1200px, calc(100% - 3rem));
    max-width: none;
    height: min(820px, calc(100dvh - 3rem));
    max-height: none;
    padding: 0;
    border: 1px solid var(--green, #8ee389);
    background: var(--bg, #090b0a);
    color: var(--text, #e9e9ec);
    box-shadow: 0 0 2rem #00e5ff26;
  }

  dialog[open] {
    display: flex;
    flex-direction: column;
  }

  dialog::backdrop {
    background: #000d;
  }

  .viewer-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0.75rem;
    border-bottom: 1px solid var(--border, #606060);
    background: var(--surface, #121212);
    flex-shrink: 0;
  }

  .viewer-title {
    min-width: 0;
    color: var(--purple, #af87ff);
    overflow-wrap: anywhere;
  }

  .viewer-viewport {
    flex: 1;
    min-height: 0;
    min-width: 0;
    overflow: hidden;
  }

  .viewer-viewport img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .viewer-navigation {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 0.5rem;
    border-top: 1px solid var(--border, #606060);
    flex-shrink: 0;
    background: var(--surface, #121212);
  }

  :global(html:has(dialog[open])) {
    overflow: hidden;
    scrollbar-gutter: stable;
  }
</style>
