import { expect, test, type Page } from '@playwright/test';
import baseline from './fixtures/content.json' with { type: 'json' };
import assets from './fixtures/assets.json' with { type: 'json' };

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
const galleryName = 'Positive Fusion image gallery';
const sectionTitles = ['Agentic Engineering', 'Software Engineering', ...baseline.sectionTitles.slice(1)];

async function stubServices(page: Page) {
  await page.route(/https:\/\/((fonts\.(googleapis|gstatic)\.com)|(kit\.fontawesome\.com)|([^/]*google-analytics\.com)|([^/]*googletagmanager\.com))\//, async (route) => {
    const stylesheet = route.request().resourceType() === 'stylesheet';
    await route.fulfill({ status: 200, contentType: stylesheet ? 'text/css' : 'application/javascript', body: '' });
  });
}

async function decodeAssets(page: Page, paths: string[]) {
  return page.evaluate(async (urls) => Promise.all(urls.map(async (url) => {
    const image = new Image();
    image.src = url;
    await image.decode();
    return { path: url, decoded: image.naturalWidth > 0 && image.naturalHeight > 0 };
  })), paths);
}

function projectArticle(page: Page, title: string) {
  return page.locator('main article').filter({ has: page.locator('.project-name').filter({ hasText: title }) });
}

async function openProjectViewer(page: Page) {
  const gallery = page.getByRole('region', { name: galleryName });
  await expect(gallery.locator('dialog')).toHaveCount(1);
  const opener = gallery.getByRole('link', { name: 'View Positive Fusion image 1 of 3 full size' });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  return { dialog, opener };
}

test.beforeEach(async ({ page }) => {
  await stubServices(page);
});

test('preserves complete project paragraphs, emphasis, identity, and social destinations', async ({ page }) => {
  await page.goto('/');
  const main = page.getByRole('main');
  await expect(main.getByRole('heading', { level: 1 })).toHaveText(baseline.identity.name);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const text of [baseline.identity.motto, baseline.identity.role]) {
    await expect(main.getByText(text, { exact: true })).toBeVisible();
  }
  for (const link of baseline.socialLinks) {
    await expect(main.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
  }
  for (const project of baseline.projects) {
    const article = projectArticle(page, project.title);
    await expect(article).toBeVisible();
    await expect(article.locator('.project-summary')).toBeVisible();
    await expect(article.locator('.project-prose')).not.toBeVisible();
    await article.locator('summary').click();
    await expect(article.locator('.project-year')).toHaveText(project.year);
    await expect(article.locator('.project-prose p')).toHaveText(project.paragraphs.map((parts) => normalize(parts.map((part) => part.text).join(''))));
    for (const paragraph of project.paragraphs) {
      for (const part of paragraph) {
        if (part.strong) await expect(article.locator('strong').filter({ hasText: part.text })).toBeVisible();
      }
    }
  }
});

test('separates agentic capabilities and AI tools from software engineering', async ({ page }) => {
  await page.goto('/');
  const agentic = page.getByRole('region', { name: 'Agentic Engineering', exact: true });
  const software = page.getByRole('region', { name: 'Software Engineering', exact: true });
  await expect(agentic).toBeVisible();
  await expect(software.getByRole('heading', { name: 'Languages', exact: true })).toBeVisible();
  expect({
    headings: (await page.locator('main h2').allTextContents()).slice(0, 2),
    agenticTools: await agentic.getByText(/^(LangChain|Langfuse)$/).allTextContents(),
    softwareTools: await software.getByText(/^(LangChain|Langfuse)$/).allTextContents(),
    firstCapability: await agentic.locator('.content-group').first().locator('li').first().innerText(),
  }).toEqual({
    headings: ['Agentic Engineering', 'Software Engineering'],
    agenticTools: ['LangChain', 'Langfuse'],
    softwareTools: [],
    firstCapability: 'Agentic Workflow Automation',
  });
});

test('provides keyboard accessible section navigation and skip link', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  const navigation = page.getByRole('navigation', { name: 'Portfolio sections' });
  await expect(navigation.getByRole('link')).toHaveCount(sectionTitles.length);
  for (const title of sectionTitles) {
    const link = navigation.getByRole('link', { name: title, exact: true });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/^#[a-z]+(?:-[a-z]+)*$/);
    if (!href) throw new Error(`Missing navigation destination for ${title}`);
    await expect(page.locator(href).getByRole('heading', { name: title, exact: true })).toBeVisible();
  }
  await navigation.getByRole('link', { name: 'Hobbies & Interests', exact: true }).click();
  await expect(page).toHaveURL(/#hobbies$/);
  await expect(navigation.getByRole('link', { name: 'Hobbies & Interests', exact: true })).toHaveAttribute('aria-current', 'location');
  await page.locator('.workspace-name').click();
  await expect(page).toHaveURL(/#identity$/);
  await expect(navigation.locator('[aria-current="location"]')).toHaveCount(0);
});

for (const width of [375, 768, 1440]) {
  test(`renders decoded images and accessible controls without overflow at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (new URL(response.url()).pathname.startsWith('/images/') && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const image of await page.getByRole('main').getByRole('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
    }
    const gallery = page.getByRole('region', { name: galleryName });
    await expect(gallery.getByRole('link', { name: 'View Positive Fusion image 1 of 3 full size' })).toBeVisible();
    await expect(gallery.getByRole('button')).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: 'Portfolio sections' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('serves complete content and accessible screenshots without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await stubServices(page);
    await page.goto('/');
    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { level: 1 })).toHaveText(baseline.identity.name);
    for (const title of sectionTitles) await expect(main.getByRole('heading', { name: title, exact: true })).toBeVisible();
    for (const project of baseline.projects) {
      const article = projectArticle(page, project.title);
      await article.locator('summary').click();
      await expect(article.locator('.project-prose')).toBeVisible();
      await expect(article.locator('.project-prose p')).toHaveText(project.paragraphs.map((parts) => normalize(parts.map((part) => part.text).join(''))));
      await expect(article.getByRole('img', { name: `${project.title}, image 1 of ${project.images.length}` })).toBeVisible();
      for (const [index, image] of project.images.entries()) {
        await expect(article.getByRole('link', { name: `View ${project.title} image ${index + 1} of ${project.images.length}`, exact: true })).toHaveAttribute('href', image);
      }
      await expect(article.getByRole('button')).toHaveCount(0);
    }
  } finally {
    await context.close();
  }
});

test('preserves external service destinations and initializes GA4 exactly once', async ({ page }) => {
  const missingFontRequests: string[] = [];
  page.on('request', (request) => {
    if (new URL(request.url()).pathname === '/fonts/ShareTechMono-Regular.ttf') missingFontRequests.push(request.url());
  });
  await page.goto('/');
  await expect(page.locator(`link[href="${baseline.services.font}"]`)).toHaveCount(1);
  await expect(page.locator(`script[src="${baseline.services.icons}"]`)).toHaveCount(1);
  await expect(page.locator(`script[src="${baseline.services.analytics}"]`)).toHaveCount(1);
  const initialization = await page.evaluate(() => {
    const layer: unknown = Reflect.get(window, 'dataLayer');
    if (!Array.isArray(layer)) throw new Error('Missing analytics data layer');
    return layer.map((entry: unknown) => {
      if (typeof entry !== 'object' || entry === null) throw new Error('Invalid analytics entry');
      const command: unknown = Reflect.get(entry, '0');
      const value: unknown = Reflect.get(entry, '1');
      return { command, value: typeof value === 'string' ? value : null };
    });
  });
  expect(initialization).toEqual([{ command: 'js', value: null }, { command: 'config', value: baseline.services.analyticsId }]);
  expect(missingFontRequests).toEqual([]);
});

test('fitted overlay wraps and changes images through controls and arrow keys', async ({ page }) => {
  await page.goto('/');
  const { dialog } = await openProjectViewer(page);
  const image = dialog.getByRole('img');
  await dialog.getByRole('button', { name: 'Previous image', exact: true }).click();
  await expect(image).toHaveAttribute('src', baseline.projects[1].images[2]);
  await dialog.getByRole('button', { name: 'Next image', exact: true }).click();
  await expect(image).toHaveAttribute('src', baseline.projects[1].images[0]);
  const next = dialog.getByRole('button', { name: 'Next image', exact: true });
  await next.focus();
  await page.keyboard.press('ArrowRight');
  await expect(image).toHaveAttribute('src', baseline.projects[1].images[1]);
  await expect(next).toBeFocused();
  await expect(dialog.getByRole('button', { name: /Show image/ })).toHaveCount(0);
});

test('thumbnail continues to showcase the first image after overlay browsing', async ({ page }) => {
  await page.goto('/');
  const { dialog, opener } = await openProjectViewer(page);
  await dialog.getByRole('button', { name: 'Next image', exact: true }).click();
  await expect(dialog.getByRole('img')).toHaveAttribute('src', baseline.projects[1].images[1]);
  await page.keyboard.press('Escape');
  await expect(opener.getByRole('img')).toHaveAttribute('src', baseline.projects[1].images[0]);
  await expect(opener).not.toContainText(/\d/);
  await opener.click();
  await expect(dialog.getByRole('img')).toHaveAttribute('src', baseline.projects[1].images[0]);
});

test('overlay navigation remains keyboard accessible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const { dialog } = await openProjectViewer(page);
  const next = dialog.getByRole('button', { name: 'Next image', exact: true });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(dialog.getByRole('img')).toHaveAttribute('src', baseline.projects[1].images[1]);
  await page.keyboard.press('ArrowLeft');
  await expect(dialog.getByRole('img')).toHaveAttribute('src', baseline.projects[1].images[0]);
});

test('scroll reveals settle without scaling and respond to reduced motion changes', async ({ page }) => {
  await page.goto('/');
  const root = page.locator('html');
  const panel = page.locator('#timeline');
  await expect(root).toHaveAttribute('data-scroll-effects', 'enabled');
  await expect(panel).toHaveAttribute('data-scroll-reveal', 'pending');
  await panel.evaluate((element) => element.scrollIntoView({ block: 'center' }));
  await expect(panel).toHaveAttribute('data-scroll-reveal', 'revealed');
  await panel.evaluate(async (element) => {
    await Promise.all(element.getAnimations().map((animation) => animation.finished));
  });
  await expect(panel).toHaveCSS('transform', 'none');
  await expect.poll(() => root.evaluate((element) => Number(element.style.getPropertyValue('--scroll-progress')))).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(root).toHaveAttribute('data-scroll-effects', 'reduced');
  await expect(page.locator('[data-scroll-reveal="pending"]')).toHaveCount(0);
  await expect(panel).toHaveCSS('animation-name', 'none');
  await expect(panel).toHaveCSS('transform', 'none');
});

for (const width of [375, 1440]) {
  test(`thumbnail opens a fitted-only overlay at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const gallery = page.getByRole('region', { name: galleryName });
    await expect(gallery.locator('dialog')).toHaveCount(1);
    const thumbnail = gallery.getByRole('link', { name: 'View Positive Fusion image 1 of 3 full size' });
    await thumbnail.hover();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(thumbnail).not.toContainText(/\d/);
    const { dialog, opener } = await openProjectViewer(page);
    const fittedViewport = dialog.getByRole('region', { name: 'Image fitted to viewer' });
    await expect(fittedViewport).toBeVisible();
    await expect(dialog.getByRole('button', { name: 'Close image viewer' })).toBeFocused();
    expect(await fittedViewport.evaluate((element) => ({ horizontal: element.scrollWidth <= element.clientWidth + 1, vertical: element.scrollHeight <= element.clientHeight + 1 }))).toEqual({ horizontal: true, vertical: true });
    await expect(dialog.getByRole('button', { name: /100%|Fit image|Play slideshow|Show image/ })).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

test('details reveal text at its final layout and support rapid reversal', async ({ page }) => {
  await page.goto('/');
  const article = projectArticle(page, 'NWEA Labs');
  await expect(article.locator('dialog')).toHaveCount(1);
  await article.locator('summary').scrollIntoViewIfNeeded();
  const layout = await article.evaluate((element) => {
    const summary = element.querySelector('summary');
    const wrapper = element.querySelector('.project-reveal');
    const prose = element.querySelector('.project-prose');
    const paragraph = prose?.querySelector('p');
    if (!(summary instanceof HTMLElement) || !wrapper || !prose || !paragraph) throw new Error('Missing project details');
    summary.click();
    const animation = wrapper.getAnimations()[0];
    if (!animation) throw new Error('Missing details reveal animation');
    animation.pause();
    const duration = animation.effect?.getComputedTiming().duration;
    if (typeof duration !== 'number') throw new Error('Missing reveal duration');
    animation.currentTime = duration / 2;
    function measure(textElement: Element, contentElement: Element) {
      const text = textElement.getBoundingClientRect();
      const container = contentElement.getBoundingClientRect();
      return { width: text.width, height: text.height, offset: text.top - container.top, transform: getComputedStyle(textElement).transform };
    }
    const during = measure(paragraph, prose);
    animation.finish();
    return { during, after: measure(paragraph, prose) };
  });
  expect({ unchanged: JSON.stringify(layout.during) === JSON.stringify(layout.after), transform: layout.after.transform }).toEqual({ unchanged: true, transform: 'none' });
  const wrapper = article.locator('.project-reveal');
  await expect.poll(() => wrapper.evaluate((element) => element.getAnimations().length)).toBe(0);
  await article.evaluate((element) => {
    const summary = element.querySelector('summary');
    const reveal = element.querySelector('.project-reveal');
    if (!(summary instanceof HTMLElement) || !reveal) throw new Error('Missing project details');
    summary.click();
    summary.click();
    for (const animation of reveal.getAnimations()) animation.finish();
  });
  await expect(article.locator('details')).toHaveJSProperty('open', true);
});

test('reduced motion finishes details animation and preserves native keyboard disclosure', async ({ page }) => {
  await page.goto('/');
  const article = projectArticle(page, 'NWEA Labs');
  await expect(article.locator('dialog')).toHaveCount(1);
  const wrapper = article.locator('.project-reveal');
  await article.locator('summary').click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => wrapper.evaluate((element) => element.getAnimations().length)).toBe(0);
  await article.locator('summary').click();
  await expect(article.locator('details')).toHaveJSProperty('open', false);
  await article.locator('summary').press('Space');
  await expect(article.locator('details')).toHaveJSProperty('open', true);
  expect(await wrapper.evaluate((element) => ({ animations: element.getAnimations().length, transform: getComputedStyle(element).transform }))).toEqual({ animations: 0, transform: 'none' });
});

test('projects stay compact until original details are requested', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await expect(page.locator('#projects details[open]')).toHaveCount(0);
  expect(await page.locator('#projects').evaluate((element) => element.getBoundingClientRect().height)).toBeLessThan(1100);
  for (const project of baseline.projects) {
    const article = projectArticle(page, project.title);
    await expect(article.locator('.project-summary')).toBeVisible();
    await expect(article.locator('.project-prose')).not.toBeVisible();
  }
});

for (const dismissal of ['close button', 'backdrop']) {
  test(`overlay dismissal by ${dismissal} preserves scroll and focus`, async ({ page }) => {
    await page.goto('/');
    const gallery = page.getByRole('region', { name: galleryName });
    await expect(gallery.locator('dialog')).toHaveCount(1);
    const thumbnail = gallery.getByRole('link', { name: 'View Positive Fusion image 1 of 3 full size' });
    await thumbnail.scrollIntoViewIfNeeded();
    const position = await page.evaluate(() => window.scrollY);
    const { dialog, opener } = await openProjectViewer(page);
    if (dismissal === 'close button') await dialog.getByRole('button', { name: 'Close image viewer' }).click();
    else await page.mouse.click(1, 1);
    await expect(dialog).not.toBeVisible();
    await expect(opener).toBeFocused();
    expect(await page.evaluate(() => window.scrollY)).toBe(position);
  });
}

test('hosting serves and decodes every preserved asset, PNG portraits, and missing asset 404; legacy PNG MIME enforced on emulator only', async ({ page, request, baseURL }) => {
  await page.goto('/');
  const paths = [...assets.map((asset) => asset.path), '/images/profile-picture.png'];
  for (const path of paths) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    if (!path.includes('profile-picture')) continue;
    expect((await response.body()).subarray(0, 8).toString('hex'), path).toBe('89504e470d0a1a0a');
    if (path.endsWith('.png') || (baseURL && new URL(baseURL).port === '5000')) expect(response.headers()['content-type'], path).toContain('image/png');
  }
  expect(await decodeAssets(page, paths)).toEqual(paths.map((path) => ({ path, decoded: true })));
  expect((await request.get('/images/nonexistent-preservation-test.png')).status()).toBe(404);
});
