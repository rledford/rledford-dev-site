import { cleanup, fireEvent, render, screen, within } from '@testing-library/svelte';
import { tick } from 'svelte';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { galleryImages, galleryLabel } from '../../../tests/fixtures/gallery';
import ImageGallery from './ImageGallery.svelte';

beforeEach(() => {
  Object.defineProperties(HTMLDialogElement.prototype, {
    showModal: { configurable: true, value: vi.fn(function (this: HTMLDialogElement) { this.open = true; }) },
    close: { configurable: true, value: vi.fn(function (this: HTMLDialogElement) {
      this.open = false;
      this.dispatchEvent(new Event('close'));
    }) }
  });
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  vi.stubGlobal('PointerEvent', class extends MouseEvent {
    pointerId: number;
    constructor(type: string, options: PointerEventInit = {}) {
      super(type, options);
      this.pointerId = options.pointerId ?? 1;
    }
  });
});

afterEach(async () => {
  cleanup();
  await tick();
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
  Reflect.deleteProperty(HTMLDialogElement.prototype, 'close');
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderGallery(images = galleryImages) {
  return render(ImageGallery, { images, label: galleryLabel });
}

async function openViewer() {
  await fireEvent.click(screen.getByRole('link'));
  return screen.getByRole('dialog');
}

describe('ImageGallery', () => {
  it.each([[], galleryImages.slice(0, 1), galleryImages].map((images) => ({ images })))('shows only the first thumbnail and no page controls for $images.length images', ({ images }) => {
    renderGallery(images);
    expect({
      images: screen.queryAllByRole('img').map((image) => image.getAttribute('src')),
      links: screen.queryAllByRole('link').map((link) => link.getAttribute('href')),
      controls: screen.queryAllByRole('button')
    }).toEqual({ images: images.slice(0, 1), links: images.slice(0, 1), controls: [] });
    if (images.length === 0) expect(screen.getByText('No images available.')).toBeTruthy();
  });

  it('does not open a viewer on hover or page arrow keys', async () => {
    renderGallery();
    const thumbnail = screen.getByRole('link');
    await fireEvent.pointerEnter(thumbnail);
    await fireEvent.keyDown(thumbnail, { key: 'ArrowRight' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(within(thumbnail).getByRole('img').getAttribute('src')).toBe(galleryImages[0]);
  });

  it.each([galleryImages, galleryImages.slice(0, 1)].map((images) => ({ images })))('opens a fitted preview with appropriate navigation for $images.length images', async ({ images }) => {
    renderGallery(images);
    const dialog = await openViewer();
    expect({
      source: within(dialog).getByRole('img').getAttribute('src'),
      header: within(dialog).getByText(galleryLabel).textContent,
      viewport: within(dialog).getByRole('region').getAttribute('aria-label'),
      buttons: within(dialog).getAllByRole('button').map((button) => button.getAttribute('aria-label'))
    }).toEqual({
      source: images[0],
      header: galleryLabel,
      viewport: 'Image fitted to viewer',
      buttons: images.length > 1 ? ['Close image viewer', 'Previous image', 'Next image'] : ['Close image viewer']
    });
    expect(document.activeElement).toBe(within(dialog).getByRole('button', { name: 'Close image viewer' }));
  });

  it.each([
    { control: 'Previous image', index: 2 },
    { control: 'Next image', index: 1 },
    { key: 'ArrowLeft', index: 2 },
    { key: 'ArrowRight', index: 1 }
  ])('navigates the modal without changing the first thumbnail: %j', async ({ control, key, index }) => {
    renderGallery();
    const thumbnail = screen.getByRole('link');
    const dialog = await openViewer();
    const close = within(dialog).getByRole('button', { name: 'Close image viewer' });
    if (control) await fireEvent.click(within(dialog).getByRole('button', { name: control }));
    if (key) await fireEvent.keyDown(close, { key });
    expect({
      source: within(dialog).getByRole('img').getAttribute('src'),
      thumbnail: within(thumbnail).getByRole('img').getAttribute('src'),
      destination: thumbnail.getAttribute('href')
    }).toEqual({ source: galleryImages[index], thumbnail: galleryImages[0], destination: galleryImages[0] });
    if (key) expect(document.activeElement).toBe(close);
  });

  it('wraps forward and resets to the first image on reopening', async () => {
    renderGallery();
    let dialog = await openViewer();
    await fireEvent.click(within(dialog).getByRole('button', { name: 'Previous image' }));
    await fireEvent.click(within(dialog).getByRole('button', { name: 'Next image' }));
    expect(within(dialog).getByRole('img').getAttribute('src')).toBe(galleryImages[0]);
    await fireEvent.click(within(dialog).getByRole('button', { name: 'Next image' }));
    await fireEvent.click(within(dialog).getByRole('button', { name: 'Close image viewer' }));
    dialog = await openViewer();
    expect(within(dialog).getByRole('img').getAttribute('src')).toBe(galleryImages[0]);
  });

  it.each([{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }])('preserves original-image link behavior for %j', async (modifiers) => {
    renderGallery();
    expect(await fireEvent.click(screen.getByRole('link'), modifiers)).toBe(true);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });

  it.each([
    { startOutside: true, endOutside: true, closed: true },
    { startOutside: false, endOutside: true, closed: false },
    { startOutside: true, endOutside: false, closed: false },
    { startOutside: false, endOutside: false, closed: false }
  ])('dismisses only a complete backdrop gesture: %j', async ({ startOutside, endOutside, closed }) => {
    renderGallery();
    const dialog = await openViewer();
    vi.spyOn(dialog, 'getBoundingClientRect').mockReturnValue(new DOMRect(20, 20, 200, 200));
    await fireEvent.pointerDown(dialog, { pointerId: 7, clientX: startOutside ? 1 : 100, clientY: 100, button: 0 });
    await fireEvent.pointerUp(dialog, { pointerId: 7, clientX: endOutside ? 1 : 100, clientY: 100, button: 0 });
    expect(screen.queryByRole('dialog') === null).toBe(closed);
  });

  it('restores page position and focuses the opener without scrolling after closing', async () => {
    vi.stubGlobal('scrollX', 30);
    vi.stubGlobal('scrollY', 1200);
    renderGallery();
    const link = screen.getByRole('link');
    const focus = vi.spyOn(link, 'focus');
    const dialog = await openViewer();
    await fireEvent.click(within(dialog).getByRole('button', { name: 'Close image viewer' }));
    expect({ scroll: vi.mocked(window.scrollTo).mock.calls, focus: focus.mock.calls, active: document.activeElement }).toEqual({
      scroll: [[{ left: 30, top: 1200, behavior: 'instant' }]],
      focus: [[{ preventScroll: true }]],
      active: link,
    });
  });

  it('closes the viewer and restores page position when unmounted', async () => {
    const { unmount } = renderGallery();
    await openViewer();
    unmount();
    await tick();
    expect({
      closes: vi.mocked(HTMLDialogElement.prototype.close).mock.calls.length,
      scrolls: vi.mocked(window.scrollTo).mock.calls.length,
      dialog: screen.queryByRole('dialog'),
    }).toEqual({ closes: 1, scrolls: 1, dialog: null });
  });
});
