# Tabithaduke Studio — Website

A production-ready, multi-page front-end for a custom VRChat avatar design studio: premium dark theme, glassmorphism cards, and a real page-per-section structure (not a single scrolling file).

## Project structure

```
tabithaduke-studio/
├── index.html        # Home — hero, trusted-by, portfolio preview, why-choose-us, CTA
├── portfolio.html     # Full avatar portfolio grid
├── services.html      # Services + 4-step process
├── pricing.html        # Pricing packages
├── about.html          # Studio bio, tools, timeline, testimonials
├── faq.html             # FAQ accordion
├── contact.html         # Contact form + Fiverr / social info
├── css/
│   └── style.css        # All styles for every page, in one shared file
├── js/
│   └── main.js           # Shared behavior: mobile nav, FAQ accordion, contact form
├── assets/
│   └── favicon.svg       # Placeholder logo mark used as the favicon
└── README.md
```

Every page shares the exact same `<header>` and `<footer>` markup and links to the same `css/style.css` and `js/main.js` — there's no build step or templating engine, so the header/footer HTML is duplicated across files by design (standard practice for a static multi-page site). If you later want a single source of truth for the header/footer, that's a good candidate for a static site generator (11ty, Astro) or a simple templating step — flag it if you want that added.

## Running it

No build step required. Open `index.html` directly in a browser, or serve the folder with any static server so relative links behave exactly like they will in production:

```bash
npx serve .
# or
python3 -m http.server
```

## Navigation

Each page's nav link to itself carries `aria-current="page"` so the active page is visually and semantically marked. `js/main.js` handles the mobile hamburger menu identically on every page.

## Outstanding items before launch

1. **Logo** — `assets/favicon.svg` and every `.logo-mark` span (in the header and footer of all 7 pages) use a placeholder "T" mark. Replace with your real logo:
   - Save your logo file into `assets/` (e.g. `assets/logo.png`, `assets/favicon.png`)
   - Update the `<link rel="icon">` href in the `<head>` of every page
   - Replace `<span class="logo-mark">T</span>` with `<img src="assets/logo.png" alt="Tabithaduke Studio logo">` in the header and footer of every page

2. **Discord invite** — no working invite link is set yet; `contact.html` just says "coming soon." Generate a permanent invite via **Server Settings → Invites → Create Invite** in Discord, then add the link to the Discord card in `contact.html` (and anywhere else you'd like a Discord button).

3. **Fiverr** — currently links to `https://www.fiverr.com/maltindazee` (your public profile, derived from your dashboard URL). Replace with your exact gig URL across all pages if you'd rather link a specific gig — it appears in `index.html`, `contact.html`, and every footer.

4. **Portfolio images/video** — `portfolio.html` and the homepage preview currently use CSS-drawn placeholder graphics (`.avatar-cover`, `.showcase-card`, `.avatar-silhouette`). To use real renders:
   - Add image files to `assets/` (e.g. `assets/portfolio/kitsune-01.jpg`)
   - Swap the relevant `<div class="avatar-cover">...</div>` blocks for `<img>` tags, or set them as a CSS `background-image` if you want to keep the gradient overlay effect
   - For video, add a `<video>` tag or a YouTube/Vimeo `<iframe>` embed in place of the showcase card

5. **Contact form backend** — `js/main.js` currently only shows a confirmation message locally; it does not send data anywhere. See the `TODO` comment inside `initContactForm()` for a starting point to wire it up to a form backend (Formspree, Getform, a custom API endpoint, etc.).

6. **Pricing figures** — the three tiers on `pricing.html` ($150+/$400+/$800+) are placeholder numbers. Update `.price-amount` and `.price-features` to match your real rates.

## Notes on approach

- All CSS lives in one shared `css/style.css`, organized into numbered sections (reset → tokens → header → hero → each content section → footer → responsive breakpoints) so the same file styles all 7 pages consistently.
- All interactivity lives in one shared `js/main.js`, split into three independent functions (`initMobileNav`, `initFaqAccordion`, `initContactForm`). Each checks for its own elements before running, so the same file is safe to include on every page even though only `faq.html` has an accordion and only `contact.html` has a form.
- Schema.org `Organization` structured data is included on `index.html` for SEO; consider adding page-specific structured data (e.g. `Product` on portfolio items) if you want richer search results.
- Accessibility basics included on every page: skip link, visible focus states, `aria-current="page"` on the active nav link, `aria-expanded` on the FAQ accordion and mobile menu toggle, a honeypot field on the contact form, and `prefers-reduced-motion` support in the CSS.
