# Pocket Curio Website

Marketing and documentation site for [Pocket Curio](https://github.com/Mark-Code-Cowboys/pocket-curio),
the privacy-first souvenir collection journal by Code Cowboys LLC. Serves the
landing page, user guide, FAQ, help, and the privacy policy URL required by
the Google Play Console listing.

Built with [Astro](https://astro.build) as a fully static site, mirroring the
structure and design system of the Table Encore site (Playfair Display +
DM Sans, Tabler icons, paper background, one accent). The accent is the app's
Material seed colour, curio violet `#7A4E7E`, with brass for souvenir hardware
(keychain rings, tag eyelets, spoon bowls). Souvenir illustrations are inline
SVG in `src/components/Souvenir.astro`, one per collection kind the app offers.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero, souvenir kinds, how it works, features, pricing, privacy, about |
| `/privacy/` | Privacy policy — **paste this URL into the Play Console listing** (`/privacy-policy` redirects here) |
| `/user-guide/` | First launch, collections, adding a souvenir, reading the print, shelf scan, map, backup, Pro |
| `/faq/` | Frequently asked questions |
| `/help/` | Troubleshooting and support contact |
| `/404` | Not-found page |

The privacy policy content is kept in sync by hand with
`pocket-curio/docs/privacy-policy.md` (effective date September 8, 2026) —
update both together. `code-cowboys.com/privacy/pocketcurio/` redirects here.

## Screenshots

`public/shots/*.webp` are the Pixel 7 emulator captures from
`pocket-curio/docs/store-assets/raw/phone/` (DEMO_SEED build, 1080×2400),
resized to 540×1200. Re-shoot there, then regenerate:

```sh
python3 - <<'EOF'
from PIL import Image
from pathlib import Path
src = Path('../pocket-curio/docs/store-assets/raw/phone')
for p in sorted(src.glob('*.png')):
    Image.open(p).convert('RGB').resize((540, 1200), Image.LANCZOS) \
        .save(f'public/shots/{p.stem}.webp', 'WEBP', quality=84, method=6)
EOF
```

`public/shots/00-fridge-magnets.webp` is a real-device capture (Pixel, dark theme,
real magnets) used for the hero and the user guide's grid section; its source
PNG is `pocket-curio/docs/store-assets/raw/phone/08-fridge-magnets-pixel.png`.

`public/images/og-feature.png` is the Play feature graphic (social preview);
`public/images/app-icon.png` is the launcher icon at 256 px.

## Development

Requires Node ≥ 22.12.

```sh
npm install
npm run dev       # local dev server
npm run build     # static build into dist/
npm run preview   # serve the built site
```

## Deployment

Cloudflare Workers, static assets only — `wrangler.jsonc` points the Worker
at `dist/` with 404 handling. Connect the GitHub repo in the Cloudflare
dashboard (Workers & Pages → Create → import repository) with build command
`npm run build`; every push to `main` deploys. Or from a logged-in shell:

```sh
npm run build && npx wrangler deploy
```

Then add the custom domain `mypocketcurio.app` to the Worker. The production
domain is set in `astro.config.mjs` (`site:`); `public/_redirects` handles
the `/privacy-policy` → `/privacy/` redirect.

© 2026 Code Cowboys LLC. All rights reserved.
