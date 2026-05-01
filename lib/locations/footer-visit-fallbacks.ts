/**
 * Hardcoded fallbacks when `/api/locations` is loading, failed, or a row type is missing.
 * Matches canonical business info; keep in sync with `lib/locations/local-locations.ts`.
 */
export const FOOTER_VISIT_FALLBACK = {
  restaurant: {
    address: "5005 North Brighton Avenue",
    cityLine: "Kansas City, MO 64117",
  },
  truck: {
    address: "5005 North Brighton Avenue",
    detail: "",
    cityLine: "Kansas City, MO 64117",
  },
  hoursPrimary: "Mon 11:00 AM – 9:00 PM; Tue–Sat 11:00 AM – 9:30 PM; Sun closed (carryout).",
} as const;
