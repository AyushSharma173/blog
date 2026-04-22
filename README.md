# ayush.blog

Source for [ayush.blog](https://ayush.blog). Astro static site, Cloudflare Pages hosting, PagesCMS dashboard.

---

## Publishing a new post

Two equivalent paths. Pick whichever is convenient.

### Via the dashboard (any device with a browser)

1. Go to https://app.pagescms.org and sign in with GitHub.
2. Open the `AyushSharma173/blog` project.
3. **Posts** → **+ New**.
4. Fill in: title, date, font (`serif` for essays, `sans` for technical notes), optional description, body.
5. Save. The dashboard commits to `main`, Cloudflare Pages rebuilds in ~90 seconds, and the post is live at `https://ayush.blog/writing/<slug>/`.

### Via git (local editor, e.g. VS Code)

```sh
cd "/Users/ayushsharma/Library/Mobile Documents/com~apple~CloudDocs/blog"
git pull                          # always pull first — dashboard may have committed
```

Create `src/content/posts/your-slug.md`:

```markdown
---
title: "Your title"
date: 2026-04-22
font: serif           # or: sans
description: "Short blurb for RSS and meta tags (optional)"
draft: false          # true = hidden from production build
---

Your markdown body. Standard GFM — **bold**, *italic*,
`inline code`, headings with `#` `##` `###`, > blockquotes,
```code blocks```, [links](https://example.com), and [^footnotes].

[^footnotes]: Footnote text.
```

Then:

```sh
git add src/content/posts/your-slug.md
git commit -m "new post: your title"
git push
```

Cloudflare Pages rebuilds and the post is live in ~90 seconds.

---

## Editing the About page and site settings

### From the dashboard

- **About page** section → edit markdown body, change font, save.
- **Site settings** section → site title, description, author name/email, home heading, home bio paragraph, home page font, home bio font.

### From the repo directly

- About page: `src/content/pages/about.md`
- Site-wide settings: `src/data/site.json`

Both are committed like any other file and trigger a rebuild.

---

## Font and text controls

### Page / post level (via dashboard fields)

| Where | Field |
|---|---|
| Each post | `Font` → serif \| sans |
| About page | `Font` → serif \| sans |
| Site settings | `Home page font` (whole home page) |
| Site settings | `Home bio paragraph font` (just the bio paragraph) |

### Inline in any markdown body

Drop plain HTML — GFM passes it through.

**Font family**
```html
<span class="font-serif">serif text</span>
<span class="font-sans">sans text</span>
<span class="font-mono">monospace text</span>
```

**Size** (use inside a `<span>` or `<p>`)
```
text-xs  text-sm  text-base  text-lg  text-xl  text-2xl  text-3xl
```

**Style and weight**
```
italic  not-italic  font-normal  font-semibold
```

**Color and alignment**
```
text-muted  text-center  text-right
```

Classes combine freely:
```html
<p class="text-xl italic font-serif text-center">
  "Everything should be made as simple as possible, but not simpler."
</p>
```

### What standard markdown already covers

- `**bold**` and `*italic*`
- `# H1` through `###### H6` for size hierarchy
- `> blockquote`
- ``` `inline code` ``` and fenced code blocks
- `[link text](url)`
- Lists (`-`, `1.`), tables (`|`), horizontal rules (`---`)
- `[^1]` footnotes rendered at the bottom of the post

You rarely need the utility classes. Reach for them only when the heading hierarchy can't produce the effect you want.

---

## Images

Uploading via the dashboard writes to `public/uploads/`. Reference from markdown:

```markdown
![Caption text](/uploads/your-image.png)
```

The leading `/` is important — it's the site root.

---

## Infrastructure reference

| Layer | Provider | Detail |
|---|---|---|
| **Domain** | Porkbun | `ayush.blog` — account `Sharma112233` — renews **2027-04-17** |
| **DNS** | Cloudflare | Nameservers: `clint.ns.cloudflare.com`, `val.ns.cloudflare.com` (set once at Porkbun, never change) |
| **Hosting** | Cloudflare Pages | Project: `ayushsharma` — auto-deploys every push to `main` |
| **Source** | GitHub | [`AyushSharma173/blog`](https://github.com/AyushSharma173/blog) (public) |
| **CMS** | PagesCMS | [app.pagescms.org](https://app.pagescms.org) — sign in with GitHub |

### Cloudflare

- Dashboard: https://dash.cloudflare.com (login: `ayush.psr@gmail.com`)
- The Pages project lives under **Workers & Pages** → `ayushsharma`
- Deploy logs: project page → **Deployments** tab
- Custom domain wiring: project page → **Custom domains** → `ayush.blog` (Active)
- Fallback URL (still works): `https://ayushsharma-1x1.pages.dev`

### Porkbun

- Login at porkbun.com (username `Sharma112233`)
- Nothing to do day-to-day — DNS is managed at Cloudflare
- Auto-renewal is on; expires 2027-04-17 otherwise

### Changing the canonical domain

If you ever migrate off `ayush.blog`, update `site:` in `astro.config.mjs` and push. Everything (RSS feed, OpenGraph meta tags, canonical URLs) derives from that one field.

---

## Local development

```sh
cd "/Users/ayushsharma/Library/Mobile Documents/com~apple~CloudDocs/blog"
npm install       # first time only
npm run dev       # http://localhost:4321, hot reload
npm run build     # produces dist/
npm run preview   # serve dist/ on localhost to test the production build
```

No environment variables required. Site is pure static output — zero JavaScript shipped to visitors.

---

## Project structure

```
astro.config.mjs              Site URL and integrations
.pages.yml                    PagesCMS dashboard schema
package.json                  Dependencies and scripts
tsconfig.json                 Extends astro/strict

src/
  consts.ts                   Imports from src/data/site.json
  content/
    config.ts                 Content-collection schemas (posts, pages)
    posts/*.md                Blog posts
    pages/about.md            About page body
  data/
    site.json                 Site title, description, home bio, fonts, etc.
  layouts/
    BaseLayout.astro          HTML shell, font preloads, RSS link
    PostLayout.astro          Post article wrapper, per-post font class
  pages/
    index.astro               Home: bio + year-grouped post list
    about.astro               Renders src/content/pages/about.md
    writing/[...slug].astro   Individual post route
    rss.xml.ts                RSS feed
  styles/
    global.css                Single stylesheet, ~140 lines, no framework

public/
  favicon.svg
  fonts/                      Self-hosted Source Serif 4, Inter, JetBrains Mono (woff2)
  uploads/                    Images uploaded via the CMS
```

---

## Deploy flow

Every commit to `main` — whether from the dashboard, from a local `git push`, or from anywhere else — triggers Cloudflare Pages to run `npm run build` and publish `dist/` to `https://ayush.blog` in about 60–90 seconds. No manual deploy step exists or is needed.

If a deploy fails, the build log lives at Cloudflare dash → Workers & Pages → `ayushsharma` → Deployments → click the failed deployment.

---

## Common gotchas

- **Always `git pull` before editing locally.** The dashboard may have committed in between your sessions.
- **Draft posts** — set `draft: true` in the frontmatter to exclude from the production build and RSS. They still appear in `npm run dev` for preview.
- **Images** must be referenced with an absolute path starting with `/` (e.g. `/uploads/img.png`), not a relative one.
- **RSS feed** lives at `https://ayush.blog/rss.xml` — share this with readers who want to subscribe.
