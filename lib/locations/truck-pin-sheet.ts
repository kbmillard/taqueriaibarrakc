import { parseCsvRows } from "@/lib/menu/csv-utils";
import type { LocationItem } from "./schema";

export type TruckPinRow = {
  active: boolean;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number | null;
  lng: number | null;
  placeId: string;
};

function parseBool(raw: string): boolean {
  const v = raw.trim().toLowerCase();
  return v === "true" || v === "yes" || v === "1" || v === "y";
}

function parseCoord(raw: string): number | null {
  const t = raw.trim();
  if (t === "") return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
}

/**
 * Parses the first active row from a published “Truck map pin” Google Sheet tab (CSV).
 * Headers: active,address,city,state,zip,lat,lng,placeId
 */
export function parseTruckPinCsv(csvText: string): TruckPinRow | null {
  const rows = parseCsvRows(csvText);
  if (rows.length < 2) return null;

  const header = rows[0]!.map((h) => h.toLowerCase().trim());
  const idx = (name: string) => header.indexOf(name);

  const iActive = idx("active");
  const iAddr = idx("address");
  const iCity = idx("city");
  const iState = idx("state");
  const iZip = idx("zip");
  const iLat = idx("lat");
  const iLng = idx("lng");
  const iPlace = idx("placeid");

  if (iAddr < 0) return null;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]!;
    if (row.every((c) => c === "")) continue;
    const active = iActive < 0 ? true : parseBool(row[iActive] ?? "TRUE");
    if (!active) continue;

    const address = (row[iAddr] ?? "").trim();
    if (!address) continue;

    return {
      active: true,
      address,
      city: iCity >= 0 ? (row[iCity] ?? "").trim() : "",
      state: iState >= 0 ? (row[iState] ?? "").trim() : "",
      zip: iZip >= 0 ? (row[iZip] ?? "").trim() : "",
      lat: iLat >= 0 ? parseCoord(row[iLat] ?? "") : null,
      lng: iLng >= 0 ? parseCoord(row[iLng] ?? "") : null,
      placeId: iPlace >= 0 ? (row[iPlace] ?? "").trim() : "",
    };
  }

  return null;
}

function mergeOne(loc: LocationItem, pin: TruckPinRow): LocationItem {
  return {
    ...loc,
    address: pin.address || loc.address,
    city: pin.city || loc.city,
    state: pin.state || loc.state,
    zip: pin.zip || loc.zip,
    lat: pin.lat ?? loc.lat,
    lng: pin.lng ?? loc.lng,
    placeId: pin.placeId || loc.placeId,
  };
}

/** Applies pin row to the primary (lowest sortOrder) active food truck row. */
export function applyTruckPinToLocations(
  items: LocationItem[],
  pin: TruckPinRow | null,
): LocationItem[] {
  if (!pin?.active) return items;

  const trucks = items
    .filter((i) => i.active && i.type === "food_truck")
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const target = trucks[0];
  if (!target) return items;

  return items.map((loc) => (loc.id === target.id ? mergeOne(loc, pin) : loc));
}

export async function fetchTruckPinRow(): Promise<TruckPinRow | null> {
  const url =
    process.env.TRUCK_PIN_CSV_URL?.trim() ||
    process.env.NEXT_PUBLIC_TRUCK_PIN_CSV_URL?.trim();
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const text = await res.text();
    return parseTruckPinCsv(text);
  } catch {
    return null;
  }
}
