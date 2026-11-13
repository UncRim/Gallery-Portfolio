# denelsen/docs

A docs-site themed portfolio for a content designer: sidebar, reading column, case studies filed like documents, a writing lab, and a hand-inked "Docs Quarter" scene that runs a full day and night. Built with Vite and TypeScript, no framework.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typechecks, then writes dist/
npm run preview    # serve dist/ locally
```

Needs Node 20.19+ (or 22+).

## Host it

`npm run build` produces a static `dist/` folder. Upload it anywhere that serves static files.

| Host | Settings |
|---|---|
| Netlify / Cloudflare Pages / Vercel | Build command `npm run build`, publish directory `dist` |
| GitHub Pages | Build locally or in an Action, publish `dist/`. Asset paths are relative (`base: './'`), so a project sub-path works |
| Any server | Copy the contents of `dist/` to the web root |

## Where things live

```
index.html          page markup (hero, practice, library, lab, about, contact)
src/style.css       all styles and light/dark design tokens
src/page.js         content data (DOCS, VOICES, SCEN, SAMPLE), library, voice dial, linter, palette, scrollspy
src/scene.ts        the Docs Quarter scene (buildings, people, birds, sky, clock)
src/loader.ts       page loader: you holding a plank bridge between IT infrastructure and design (once per session)
src/courier.ts      the marketplace courier in the "What I'm writing now" card, looping run that ends in a LISTED stamp
src/rope.ts         the pull-cord light/dark switch
src/lib/            line-art-animation library (ink, gait, motion, daynight), MIT, see src/lib/LICENSE
public/favicon.png, logo.png, logo-portrait.webp  favicon and the two faces of the flipping header logo (src/logo.ts)
```

## Edit your content

- **Case studies:** the `DOCS` array at the top of `src/page.js`. Each entry has `title`, `ctx`, `tags`, `role`, `brief`, `work[]`, `results[]` and an optional live URL.
- **MCSP card:** the `#now` article in `index.html`. The dashed "Add time-to-onboard result" chip is a placeholder: replace it with a real number once you have one.
- **Contact email:** the form posts to FormSubmit and forwards to `data-to` on `<form id="issue">` in `index.html` (the same address is shown in the Email card and in the copy button in `src/page.js`). First submission after deploy sends an activation email to that inbox: click the link once and delivery starts.
- **Career timeline:** the changelog block in `index.html`.
- **Colours and fonts:** CSS variables at the top of `src/style.css`. Fonts are self-hosted through [fontsource](https://fontsource.org) (imported at the top of `src/main.ts`), so there is no third-party font request: Open Sans for body text, Fraunces for headings and IBM Plex Mono for labels. To try another heading face, install its fontsource package, import it in `src/main.ts` and change `--display` at the top of `src/style.css`. Heading flair lives in `src/style.css`: Fraunces' `SOFT` and `WONK` axes on the h1 and brand mark, and the hand-inked squiggle under each h2 (`h2::after`).

## Useful URL flags

| Flag | Effect |
|---|---|
| `?noboot` | skip the page loader |
| `?tau=0.75` | set the scene's time of day (0 to 1 covers one day; try 0.3, 0.62, 0.75, 0.95) |
| `?debug` | freeze real time and expose `window.__step(seconds)` for exact stepping |

The page loader also skips itself for reduced-motion users and after the first visit in a browser session. The courier in the MCSP card loops while it is on screen: run, LISTED stamp, hold, fade, run again. With reduced motion it shows the finished LISTED state instead, and the pull cord is frozen but still works as a plain button.

## Things to check before you publish

- SafeScroll's results (+40% weekly active use, -35% task time, 4.7/5) are copied from your current site, which labels them launch results. If it is a concept, reword them.
- Location reads Austin here; the old site said New York.
- The Chapman and Ticketmaster live prototype links are in `DOCS` in `src/page.js`.

## Credits

The line-art animation helpers in `src/lib/` come from [JDhruv14/line-art-animation](https://github.com/JDhruv14/line-art-animation) (MIT).

## Case study pages

Every case study lives on this site at `/projects/<slug>/`, in the same theme as the home page.

- Content: edit `src/data/cases.js`. The HTML pages are generated from it by `scripts/gen-pages.mjs`, which runs automatically before `npm run dev` and `npm run build`. Don't edit `projects/*/index.html` by hand.
- Add a case study: add one object to `CASES`, then `npm run build`. It gets its own page, a sidebar entry and previous/next links. Add a matching card in the DOCS list in `src/page.js` for the home page library.
- Images and video: run `npm run assets` once, on a machine with internet access. It downloads every image, GIF and video from the old portfolio into `public/media/`, so the site no longer depends on it. Until a file exists locally, the page quietly falls back to the original URL, so nothing breaks if you skip this step. Commit `public/media/` and deploy it with the site.
- Hosting: upload the whole `dist/` folder. The pages use relative paths, so it works from a sub-folder as well as a domain root. If your host doesn't serve `projects/<slug>/` as a folder index automatically, most static hosts (Netlify, Vercel, GitHub Pages, Cloudflare Pages) do.

## Sharing and search

Share previews (Open Graph, Twitter cards) and the sitemap need absolute URLs, so tell the build where the site lives:

```sh
SITE_URL=https://your-domain.com npm run build
```

or set `"url"` in `site.config.json`. Without it the build still works but skips canonical and share-image tags, `robots.txt` and `sitemap.xml`, and prints a warning.

- `public/og/` holds the 1200×630 share images (one for the home page, one per case study). They are regenerated by screenshotting the live pages, so redo them if a vignette changes.
- Titles, descriptions and keywords for each case study live in `src/data/cases.js` (`seoTitle`, `seoDesc`, `keywords`). The home page head is in `index.html`.
- Structured data (Person, WebSite, ProfessionalService, FAQPage on the home page; CreativeWork and BreadcrumbList on case pages) is inline JSON-LD. The FAQ on the page and the FAQPage markup must say the same thing, so edit both together.
- After deploying, ask LinkedIn (Post Inspector) and Facebook (Sharing Debugger) to re-scrape the URL, because they cache old previews. Then submit `sitemap.xml` in Google Search Console.

## Weather

Click any cloud in the Docs Quarter (or use Clear / Rain / Snow under the scene) to change the weather. Click the sun or moon for clear skies. Tap the street while it rains for ripples, or while it snows for a gust.
