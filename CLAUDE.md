# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page website for a local henna art business in Texas. No build system — pure HTML/CSS/JS served via GitHub Pages.

- **Live site**: https://vinaybollineni.github.io/henna-arts/
- **Deployment**: Automatic via GitHub Actions on push to `main`

## Local Development

```bash
python -m http.server 8000
# or
npx serve
```

No install step required. No build step required.

## Architecture

All content lives in three files:

- [index.html](index.html) — Single-page app with all sections: nav, hero, about, services, homemade henna, gallery, testimonials, contact, footer
- [styles.css](styles.css) — All styles using CSS variables, Grid, Flexbox; breakpoints at 768px (mobile) and 1200px (desktop)
- [script.js](script.js) — Vanilla JS: mobile nav toggle, gallery filtering, Formspree contact form submission, scroll animations via Intersection Observer, scroll-to-top button

Gallery images are in [images/gallery/](images/gallery/) (23 photos, named Pic1–Pic25 with gaps).

## Key Integrations

- **Formspree**: Contact form posts to a Formspree endpoint (in `index.html`) — no backend needed
- **Font Awesome 6.4.0** and **Google Fonts** loaded via CDN
- **GitHub Actions** workflow at [.github/workflows/deploy.yml](.github/workflows/deploy.yml) deploys to Pages on every push to `main`

## Content Notes

- The business emphasizes **100% organic homemade henna cones** — maintain this messaging in any content edits
- Services offered: bridal, party/event, prenatal, and custom henna applications
- Service area: Texas
