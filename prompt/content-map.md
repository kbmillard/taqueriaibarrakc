# Content map

## Brand / marketing copy

- **Hero & primary story:** `components/hero/Hero.tsx`, `components/prologue/Prologue.tsx`, `components/story/StorySection.tsx`.
- **Essence narratives:** `lib/data/essence.ts` (`ESSENCE_CARDS`).
- **Services blurbs / CTAs:** `lib/data/services.ts` (`SERVICE_ROWS`).
- **Locations (Google Sheet + fallback):** `lib/locations/*`, `GET /api/locations`, `context/LocationsCatalogContext.tsx`, `components/locations/LocationsSection.tsx`.
- **Contact + hours fallback lines:** `lib/data/locations.ts` (`CONTACT`, `HOURS_LINES`).
- **Catering persuasive copy:** `components/catering/CateringSection.tsx` (intro paragraphs).
- **Footer visit + hours:** `components/footer/SiteFooter.tsx` via `LocationsCatalogContext` + `lib/locations/footer-visit-from-catalog.ts` (fallbacks in `footer-visit-fallbacks.ts`).
- **SEO title/description + JSON-LD base:** `lib/seo.ts` and `app/layout.tsx`.

## Menu data

- **Menufy snapshot (reference):** `prompt/menufy-location-32419-categories-all.json` + extraction log `prompt/taqueria-ibarra-menu-scrape-notes.md`.
- **Fallback menu (TypeScript):** `lib/menu/local-menu.ts` (regenerate: `node scripts/build-menu-from-menufy-snapshot.mjs`).
- **Sheet template (full mirror of fallback):** `prompt/google-sheet-menu-template.csv`.
- **Category order + meat modal defaults:** `lib/menu/schema.ts` (`MENU_CATEGORY_ORDER`, `meatChoices`).
- **Category tab styling (labels/colors):** `lib/menu/category-meta.ts`.
- **Schema / types:** `lib/menu/schema.ts` (optional `section`, `englishName`, `availabilityLabel`, `optionGroups`, `imageAlt`).
- **Google Sheet CSV parsing:** `lib/menu/google-sheet-menu.ts`, `lib/menu/csv-utils.ts`.
- **Merged catalog (Sheet → fallback):** `lib/menu/get-menu.ts`.
- **HTTP:** `GET /api/menu` in `app/api/menu/route.ts` (revalidate ~5m).
- **Client load:** `context/MenuCatalogContext.tsx` (homepage fetches `/api/menu`).
- **Menu UI:** `components/menu/InteractiveMenu.tsx`, `components/menu/MeatChoiceModal.tsx`, `components/menu/MenuOptionGroupsModal.tsx`.
- **Popular grid:** `featuredItems` from `/api/menu` — `components/popular/PopularOrders.tsx`.
- **Owner how-to:** `prompt/menu-management.md`.
- **Compatibility re-export:** `lib/data/menu.ts` → `lib/menu/*`.

## Truck / hours / status

- **Static location + hours copy:** `lib/data/locations.ts`.
- **Truck status:** From each `food_truck` row’s `status` / `statusNote` in the locations Sheet (or local fallback).

## Catering form

- **Form layout + fields:** `components/catering/CateringSection.tsx`.
- **Behavior:** Submit shows an on-page confirmation; guests are directed to email or phone for a firm booking. Wire the form to email, server action, or CRM when ready.
