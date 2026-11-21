# rledford.dev

A dark terminal-themed portfolio built with SvelteKit, TypeScript, and static generation. The production output needs only a static file host.

## Local development

Use Node.js 24.15 or later in the 24 LTS series and npm. Node.js 22.22.2 or later in the 22 series also works.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Vite normally uses port 5173 and selects another port when necessary.

## Production preview

```sh
npm run build
npm run preview
```

Open the printed preview URL. The static site is in `dist/`, including all images. Serve this directory through an HTTP server; opening `index.html` directly does not reproduce hosting.

## Checks

```sh
npm run check
npm run test:unit
npx playwright install chromium
```

With the development server running, run the browser suite in another terminal:

```sh
BASE_URL=http://127.0.0.1:5173 npm run test:e2e
```

Use the actual server port. For a production preview, set `BASE_URL` to its URL, normally `http://127.0.0.1:4173`.

The tests preserve original content, emphasis, destinations, image associations, and asset hashes. Browser checks cover image decoding, keyboard controls, reduced motion, responsive layouts, analytics initialization, and content without JavaScript. External services are stubbed during browser tests.

## Cloudflare Pages

The existing Cloudflare Pages project, `rledford-dev-site`, is connected to this GitHub repository and serves `rledford.dev`.

Keep these project build settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root |
| Production branch | `main` |
| Node.js | `24.22.3`, selected by `.node-version` |

The static adapter writes to `dist/` to preserve the previous Astro deployment path. Cloudflare reads `.node-version` when the dashboard does not override `NODE_VERSION`.

Push a feature branch and open a pull request to obtain a Cloudflare preview deployment. After its build and browser checks pass, merge the pull request to deploy production through the existing Git integration.

To test a deployed preview or production site:

```sh
BASE_URL=https://YOUR_DEPLOYMENT_URL EXPECT_HOSTING_HEADERS=1 npm run test:e2e
```

Cloudflare reads `static/_headers` to serve the legacy portrait URL with its actual PNG content type. The top-level `static/404.html` makes missing paths return a 404 instead of the portfolio HTML.

The Firebase Hosting site is disabled. Firebase tooling and configuration are no longer part of this project.

## Content and theme

- `src/lib/content.ts` contains the portfolio text and image associations.
- Agentic Engineering contains the confirmed agent capabilities, LangChain, and Langfuse. Software Engineering contains the conventional programming skills; its existing `#skills` link remains valid.
- `src/lib/components/` contains the terminal panels, navigation, and gallery.
- `src/styles/theme.css` contains the dark palette, gradients, glows, and responsive styles.
- `static/` contains the favicon and images. SvelteKit copies them into `dist/`.

The palette uses [iTerm2 default profile colors](https://github.com/gnachman/iTerm2/blob/master/plists/DefaultBookmark.plist), plus statusline indexed purple `#af87ff` and gray `#808080`. The site has no light theme. Motion effects respect the reduced-motion preference.

Agentic Engineering uses the statusline yellow as its gold accent. Software Engineering uses cyan. Gold also highlights the identity divider, page-progress gradient, project detail controls, and emphasized project text.

Sections reveal as they enter the viewport. A gradient accent tracks page progress. Keyboard navigation and reduced motion keep content immediately visible.

Projects lead with a solution summary and domain labels. Expand `[ details ]` to reveal the original write-up. The reveal animates its container height while the text keeps its natural layout. Reduced motion uses an immediate disclosure.

Each project thumbnail shows its first screenshot. Click it to open a fitted overlay; hover only highlights the thumbnail. Browse additional images inside the overlay with Previous/Next or the arrow keys. Press Escape, click the backdrop, or use `[ close ]` to return to the same page position.

The active portrait is `/images/profile-picture.png`. It preserves the original PNG bytes. The legacy `/images/profile-picture.jpg` URL remains available; Cloudflare serves it with the correct PNG content type.

The Google Fonts URL, Font Awesome kit, and GA4 identifier remain in `ExternalServices.svelte`. The site uses a local monospace fallback when fonts are unavailable.
