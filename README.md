# Taqueria Ibarra Food Truck — `taqueriaibarrakc`

One-page Next.js site: editorial nav, cinematic hero, interactive menu (Google Sheets or local fallback), order drawer with Clover-ready demo flow, Google Maps, and America/Chicago hours logic — same interaction model as the prior `foodtruck` project, rebranded for **Taqueria Ibarra**.

## Local setup

```bash
cd /Users/kyle/Desktop/taqueriaibarrakc
npm install
npm run dev
```

Optional: `npm run icons` regenerates `public/icons` favicon + PWA PNGs from `public/images/brand/prologue-logo.webp`.

Open [http://localhost:3000](http://localhost:3000).

## Google Sheets

- **Menu:** Publish CSV → `MENU_CSV_URL` or `NEXT_PUBLIC_MENU_CSV_URL`. Full template (80 items, 10 categories): `prompt/google-sheet-menu-template.csv`. How to edit: **`prompt/menu-management.md`**.
- **Locations:** Publish CSV → `LOCATIONS_CSV_URL` or `NEXT_PUBLIC_LOCATIONS_CSV_URL`. Template: `prompt/google-sheet-locations-template.csv`.
- **Owner checklist:** `prompt/owner-customer-checklist.md`.
- **Menufy extraction log:** `prompt/taqueria-ibarra-menu-scrape-notes.md` (live order page + API snapshot notes).

## Environment variables

See `.env.example` — especially `NEXT_PUBLIC_SITE_URL`, Sheet CSV URLs, `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, optional `GOOGLE_MAPS_SERVER_KEY`, and Clover sandbox keys when enabling payments.

## Brand assets

Source pack: `taqueria_ibarra_web_logo_assets/`. Production copies live under `public/icons/` and `public/images/brand/` (nav/prologue WebP, Open Graph WebP, hero JPEG).

## Scripts

- `node scripts/build-menu-from-menufy-snapshot.mjs` — rebuild `lib/menu/local-menu.ts` + `prompt/google-sheet-menu-template.csv` from `prompt/menufy-location-32419-categories-all.json`.
- `npx tsx scripts/validate-google-sheets-data.ts` — validate exported CSVs against parsers (defaults to `prompt/google-sheet-menu-template.csv`).
- `npm run validate:location-hours` — hours helper checks.

Creative brief: `prompt/taqueria_ibarra_one_page_cursor_prompt.txt`.
