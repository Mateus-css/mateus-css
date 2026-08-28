# Matt Studio — Portfolio Prototype

A premium, dark-themed portfolio website for a short-form video editor. Built with plain HTML, CSS and JavaScript — no frameworks, no backend, no build step.

## Run it

Just open `index.html` in a browser. No server or install required.

For live-reload while editing, you can optionally serve it locally, e.g.:

```
npx serve .
```

## Project structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/     ← add your photo, project thumbnails, etc.
│   └── videos/     ← add project-01.mp4 … project-06.mp4 here
└── README.md
```

## Visual identity

The palette and mark move away from the neon-on-black look of a typical template. Ground colors are a warm charcoal (`#121210` / `#1c1c17`) rather than pure black, text is a soft off-white, and the single accent — signal green (`#7be04d`) — is reserved for interactive elements, glows and the logomark. The logomark itself is an abstract 8-point radiating burst (a nod to the original sketch's silhouette, redrawn as a signal/lens motif rather than a literal illustration), used as the favicon and next to the "MATT · STUDIO" wordmark.

## Customization

Almost everything you'd want to change lives in one place: the `CONFIG` object at the top of [`js/script.js`](js/script.js).

```js
const CONFIG = {
  name: "Matt Studio",
  email: "hello@example.com",
  instagram: "https://instagram.com/",
  tiktok: "https://tiktok.com/",
  youtube: "https://youtube.com/",
  portfolio: [ /* project cards */ ],
  pricing: [ /* package cards */ ],
};
```

- **Social links & email** update the footer and final-CTA links automatically.
- **Portfolio cards** (`CONFIG.portfolio`) drive the Selected Work grid and the video modal. Set `video` to a real file path (e.g. `assets/videos/project-01.mp4`) once you have one — until then, the modal shows a clean placeholder instead of a broken player.
- **Pricing** (`CONFIG.pricing`) drives the three package cards. Prices shown are prototype placeholders — edit freely.

### Replacing placeholders

- **Portfolio thumbnails**: currently CSS gradient placeholders (`.tone-warm` / `.tone-cool` in `script.js`). Swap the `.work-thumb` markup in `renderPortfolio()` for an `<img>` or `<video>` once you have real assets.
- **About photo**: replace the `.photo-placeholder` block in `index.html` with an `<img>` tag pointing to `assets/images/`.
- **Before/After section**: the raw/final panes are CSS placeholders (`#compare .compare-pane`). Swap the backgrounds for real frames once available.
- **Testimonials**: clearly marked placeholder quotes — replace with real client feedback only once you have it. No fake names, numbers or logos are used anywhere on this site.

### Contact form

The form (`#contactForm`) validates in the browser only — nothing is actually sent anywhere yet. `initContactForm()` in `script.js` has a comment showing where to plug in a real form service (Formspree, Netlify Forms, Getform, or a custom backend).

## Notes

- Built for modern evergreen browsers.
- No external JS dependencies. Fonts are loaded from Google Fonts (Space Grotesk + Inter); everything else is self-contained.
- Scroll animations use `IntersectionObserver` and respect `prefers-reduced-motion`.
