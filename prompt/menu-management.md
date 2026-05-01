# Menu management — Taqueria Ibarra

## Source of truth

1. **Google Sheets (production):** Publish the Menu tab as CSV and set `MENU_CSV_URL` (server) or `NEXT_PUBLIC_MENU_CSV_URL` (see `.env.example`). The app merges rows into the same shape as the local fallback.
2. **Local fallback:** `lib/menu/local-menu.ts` — generated from the Menufy snapshot with  
   `node scripts/build-menu-from-menufy-snapshot.mjs`  
   (reads `prompt/menufy-location-32419-categories-all.json`).
3. **Extraction notes:** `prompt/taqueria-ibarra-menu-scrape-notes.md` — what was captured from the order page / Menufy API, TODOs for modifiers, and redacted network log excerpts.

## Sheet columns (required header row)

`id`, `active`, `category`, `section`, `sortOrder`, `name`, `englishName`, `description`, `price`, `includesFries`, `meatChoiceRequired`, `featured`, `imageUrl`, `imageAlt`, `availabilityLabel`, `optionGroupsJson`

- **`category`:** Must match one of the labels in `MENU_CATEGORY_ORDER` / `MENU_CATEGORY_META` (e.g. `Tacos`, `Postres (Desserts)`).
- **`price`:** Numeric dollars (e.g. `10.99`) or blank for **Price TBD** (`null` in the app).
- **`optionGroupsJson`:** Optional. CSV-safe JSON array of `{ "id", "label", "required", "options": ["…"] }`. Invalid JSON on a row is skipped so the rest of the menu still loads.
- **`featured`:** `TRUE` on a handful of rows surfaces them first in the **Popular orders** section (`featuredItems` pipeline).
- **`active`:** `FALSE` hides the item from the board.

## Categories (Menufy order)

Tacos → Burritos → Tortas → Quesadillas → Pizadilla → Combos → Platters → Sides → Postres (Desserts) → Bebidas (Drinks).

## Re-scraping the live Menufy menu

1. Save a fresh JSON export from  
   `https://api.menufy.com/v1/locations/32419/categories/all?api_key=<embed key from browser>`  
   over `prompt/menufy-location-32419-categories-all.json` (or update `scripts/build-menu-from-menufy-snapshot.mjs` to read a new path).
2. Run `node scripts/build-menu-from-menufy-snapshot.mjs`.
3. Run `npx tsx scripts/validate-google-sheets-data.ts` and `npm run build`.

Optional: reinstall Playwright and run `node scripts/scrape-order-menu.mjs` to refresh `prompt/taqueria-ibarra-menu-scrape-notes.md` (requires system Chrome + `playwright` package).
