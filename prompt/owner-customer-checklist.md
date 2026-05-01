# Taqueria Ibarra — owner / customer confirmation checklist

Use this list before turning on live Clover payments or publishing final copy.

1. **Final prices** — Confirm every menu `price` in Google Sheets (or keep `null` / blank for Price TBD until confirmed).
2. **Exact menu item names** — Match printed menu and POS labels (tacos, burros, tortas, quesadillas, sides, desserts, drinks).
3. **Exact option choices** — Validate `optionGroupsJson` for protein/style groups (spelling, bilingual labels, required vs optional).
4. **Protein list** — Confirm taco and burro protein lists match kitchen prep.
5. **Delivery rules** — Confirm delivery zones, fees, and hours (Mon closed; Tue–Sat window) vs carryout.
6. **Carryout vs delivery** — Confirm how the team wants pickup vs delivery represented in the order drawer and on the phone.
7. **Clover payment readiness** — Merchant ID, OAuth, test charges, and whether `Send Order Request` stays primary while prices are TBD.
8. **Photos** — Replace gallery Unsplash placeholders and menu `imageUrl` cells with owned photography; allowlist hosts in `next.config.ts` if needed.
9. **Logo approval** — Confirm nav, footer, prologue wash, favicon, manifest, and Open Graph assets match brand guidelines (no distortion; retina crisp).
10. **Catering rules** — Wire the catering form to email/CRM; confirm minimums, deposits, and truck vs drop-off catering.

When `NEXT_PUBLIC_SITE_URL` is final, update production metadata and JSON-LD `url` / `sameAs` as needed.
