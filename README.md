# tôra studio

Next.js App Router website. The active application lives in `app/` (the legacy `src/app/` starter is unused).

## Development

```sh
npm ci
npm run dev
```

## Validation

```sh
npm run lint
npm run build
npm run test:e2e
```

The browser tests use installed Google Chrome. Run them after building; Playwright starts the production server automatically, or reuses an existing local server on port 3000. Tests cover mobile and desktop navigation, browser back/forward, scroll restoration, direct URLs, gallery loading, menu gestures and responsive overflow.

## Navigation

- `/`: mobile landing menu with works, journal, shop and studio.
- `/works`, `/journal`, `/shop`, `/studio`: section lists.
- `/<section>/<project id>`: project details, generated from `data/projects.ts`.

Navigation uses Next.js links and real browser history. Native edge swipes, Android back and browser forward follow the same history. Opening a detail URL directly and refreshing keep the selected project. The visible back link uses browser back when entered from its section; direct visits fall back to the section link.

The site does not cancel document touch events. Only the open mobile menu handles a short horizontal swipe to dismiss itself; vertical scrolling and gallery gestures remain available. Confirm native OS edge gestures on a physical iPhone and Android device before release, since browser automation cannot reproduce those OS gestures.

## Images

Cards and gallery previews use `next/image` with responsive sizes, reserved space and lazy loading. The first visible images receive priority. LightGallery and its plugins load when an image is opened; its large images and thumbnails also use optimized URLs. Original assets remain in `public/images/`. Section data stays in server components, and all existing section/detail routes are prerendered at build time.
