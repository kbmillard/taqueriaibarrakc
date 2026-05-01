/**
 * Lightweight checks for `getLocationPublicStatus` (America/Chicago, sheet `Open` ignored).
 * Uses default weekly hours from `hours.ts` (Taqueria-style carryout windows).
 * Run: npx tsx scripts/validate-location-hours.ts
 */
import { getLocationPublicStatus } from "../lib/locations/hours";
import type { LocationItem } from "../lib/locations/schema";

const base: LocationItem = {
  id: "test-loc",
  active: true,
  type: "restaurant",
  sortOrder: 0,
  name: "Test",
  label: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  hours: "",
  phone: "",
  email: "",
  status: "Open",
  statusNote: "Note",
  mapsUrl: "",
  embedUrl: "",
  lat: null,
  lng: null,
  lastUpdated: "",
};

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

// Tuesday 2:28 AM CDT (2025-04-29 07:28 UTC)
const tueEarly = new Date("2025-04-29T07:28:00.000Z");
let s = getLocationPublicStatus(base, tueEarly);
assert(
  s.label === "Closed" &&
    s.detail.includes("Carryout and delivery") &&
    s.detail.includes("11:00 AM"),
  `Tue 2:28 AM: got ${JSON.stringify(s)}`,
);

// Saturday 10:30 AM CDT (2025-05-03 15:30 UTC ≈ 10:30 CDT) — before 11:00 open
const satMorning = new Date("2025-05-03T15:30:00.000Z");
s = getLocationPublicStatus(base, satMorning);
assert(
  s.label === "Closed" &&
    s.detail.includes("Carryout and delivery") &&
    s.detail.includes("11:00 AM"),
  `Sat 10:30 AM: got ${JSON.stringify(s)}`,
);

// Tuesday 10:00 PM CDT (after 9:30 PM close) — 2025-04-30 03:00 UTC = Tue 10pm CDT
const tueLate = new Date("2025-04-30T03:00:00.000Z");
s = getLocationPublicStatus(base, tueLate);
assert(
  s.label === "Closed" &&
    s.detail.includes("Carryout and delivery") &&
    s.detail.includes("tomorrow") &&
    s.detail.includes("11:00 AM"),
  `Tue 10:00 PM after hours: got ${JSON.stringify(s)}`,
);

// Saturday 7:00 PM CDT — 2025-05-04 00:00 UTC = Sat 7pm CDT
const satEvening = new Date("2025-05-04T00:00:00.000Z");
s = getLocationPublicStatus(base, satEvening);
assert(
  s.label === "Open" &&
    s.detail.includes("Carryout and delivery") &&
    s.detail.includes("until") &&
    s.detail.includes("9:30"),
  `Sat 7:00 PM: got ${JSON.stringify(s)}`,
);

console.log("validate-location-hours: all checks passed.");
