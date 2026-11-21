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

Open the printed preview URL. The static site is in `build/`, including all images. Serve this directory through an HTTP server; opening `index.html` directly does not reproduce hosting.

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

## Firebase Hosting

Firebase support is optional. The current production host and Firebase project are not confirmed.

Build the site, then start the local Hosting emulator:

```sh
npm run build
npm run hosting:emulator
```

Open `http://127.0.0.1:5000`. The emulator uses a demo project and does not need production credentials.

Run the focused Hosting checks in another terminal:

```sh
BASE_URL=http://127.0.0.1:5000 npm run test:e2e -- --grep hosting
```

Before deployment, verify the account, project, and Hosting site:

```sh
npx firebase login
npx firebase projects:list
npx firebase hosting:sites:list --project YOUR_PROJECT_ID
```

Historical repository configuration used `rledford-dev-site`. Treat that ID as a candidate until account verification.

For a verified default Hosting site, build and deploy only Hosting:

```sh
npm run build
npx firebase deploy --only hosting --project YOUR_VERIFIED_PROJECT_ID
```

For a specific site in a project with multiple sites, bind a target:

```sh
npx firebase target:apply hosting portfolio YOUR_VERIFIED_SITE_ID --project YOUR_VERIFIED_PROJECT_ID
```

Add `"target": "portfolio"` to the `hosting` object in `firebase.json`. Then deploy that target explicitly:

```sh
npx firebase deploy --only hosting:portfolio --project YOUR_VERIFIED_PROJECT_ID
```

Keep the generated `.firebaserc` target mapping with the verified project configuration. A live deployment is separate from local development and preview.

## Content and theme

- `src/lib/content.ts` contains the portfolio text and image associations.
- Agentic Engineering contains the confirmed agent capabilities, LangChain, and Langfuse. Software Engineering contains the conventional programming skills; its existing `#skills` link remains valid.
- `src/lib/components/` contains the terminal panels, navigation, and gallery.
- `src/styles/theme.css` contains the dark palette, gradients, glows, and responsive styles.
- `static/` contains the favicon and images. SvelteKit copies them into `build/`.

The palette uses [iTerm2 default profile colors](https://github.com/gnachman/iTerm2/blob/master/plists/DefaultBookmark.plist), plus statusline indexed purple `#af87ff` and gray `#808080`. The site has no light theme. Motion effects respect the reduced-motion preference.

Agentic Engineering uses the statusline yellow as its gold accent. Software Engineering uses cyan. Gold also highlights the identity divider, page-progress gradient, project detail controls, and emphasized project text.

Sections reveal as they enter the viewport. A gradient accent tracks page progress. Keyboard navigation and reduced motion keep content immediately visible.

Projects lead with a solution summary and domain labels. Expand `[ details ]` to reveal the original write-up. The reveal animates its container height while the text keeps its natural layout. Reduced motion uses an immediate disclosure.

Each project thumbnail shows its first screenshot. Click it to open a fitted overlay; hover only highlights the thumbnail. Browse additional images inside the overlay with Previous/Next or the arrow keys. Press Escape, click the backdrop, or use `[ close ]` to return to the same page position.

The active portrait is `/images/profile-picture.png`. It preserves the original PNG bytes. The legacy `/images/profile-picture.jpg` URL remains available; Firebase serves it with the correct PNG content type.

The Google Fonts URL, Font Awesome kit, and GA4 identifier remain in `ExternalServices.svelte`. The site uses a local monospace fallback when fonts are unavailable.
