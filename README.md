# noahark.org

Website for NoahArk, built with Next.js and deployed to GitHub Pages.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```

The site is published in English, Spanish and French. English keeps the unprefixed URLs (`/about/`); the other languages live under `/es/` and `/fr/`, and the language menu in the header switches between them.

- Copy lives in `content/i18n/en.ts`, with translations in `es.ts` and `fr.ts`. They must have the same keys and list lengths; a missing translation fails `npm run build`.
- Facts shared by every language (URLs, address, booking link) live in `content/site.ts`, legal details in `content/legal.ts`.
- Pages are shared templates in `components/pages/`; `app/(en)` and `app/[lang]` only route to them.
- To add a language: add it to `LOCALES` in `lib/i18n.ts` and write its dictionary; type-checking then points to every other per-language setting. Add its social image to `scripts/render-og.mjs` (`npm run og`) and its locale to `scripts/check-site.mjs`.

Pushing to `main` deploys through GitHub Actions.
