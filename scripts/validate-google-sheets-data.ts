/**
 * Validates exported Menu + Locations CSV against app parsers and business rules.
 * Run after: python3 scripts/xlsx_export_menu_locations.py [workbook.xlsx]
 *
 * Usage: npx tsx scripts/validate-google-sheets-data.ts [menu.csv] [locations.csv]
 */
import { readFileSync, existsSync } from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseMenuFromCsvText } from "../lib/menu/google-sheet-menu";
import { parseLocationsFromCsvText } from "../lib/locations/google-sheet-locations";
import { MENU_CATEGORY_META } from "../lib/menu/category-meta";
import { MENU_CATEGORY_ORDER, meatChoices } from "../lib/menu/schema";
import { itemRequiresOptionSelections } from "../lib/menu/option-groups";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_MENU = path.join(ROOT, "prompt", "google-sheet-menu-template.csv");
const DEFAULT_LOC = path.join(ROOT, "tmp", "locations-sheet-test.csv");

const MAIN_CATEGORY_LABELS = new Set(
  MENU_CATEGORY_META.map((m) => m.label.toLowerCase()),
);

const ALLOWED_IMAGE_HOSTS = new Set([
  "images.unsplash.com",
  "lh3.googleusercontent.com",
  "lh4.googleusercontent.com",
  "lh5.googleusercontent.com",
  "lh6.googleusercontent.com",
  "storage.googleapis.com",
]);

function fail(msg: string): never {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

function warn(msg: string) {
  console.warn(`WARN: ${msg}`);
}

function pass(msg: string) {
  console.log(`OK: ${msg}`);
}

function validateRemoteImageUrl(url: string) {
  if (!url.startsWith("http")) return;
  let host: string;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    fail(`Invalid imageUrl URL: ${url.slice(0, 80)}`);
    return;
  }
  if (!ALLOWED_IMAGE_HOSTS.has(host)) {
    warn(
      `imageUrl host "${host}" is not in next.config.ts remotePatterns — next/image may fail until the host is allowlisted.`,
    );
  }
}

function main() {
  const menuPath = process.argv[2] || DEFAULT_MENU;
  const locPath = process.argv[3] || DEFAULT_LOC;

  if (!existsSync(menuPath)) {
    fail(`Menu CSV missing: ${menuPath} (run python3 scripts/xlsx_export_menu_locations.py first)`);
    return;
  }
  if (!existsSync(locPath)) {
    fail(`Locations CSV missing: ${locPath}`);
    return;
  }

  const menuText = readFileSync(menuPath, "utf8");
  const locText = readFileSync(locPath, "utf8");

  const menuRows = parseMenuFromCsvText(menuText);
  const locRows = parseLocationsFromCsvText(locText);

  if (menuRows.length === 0) {
    fail("Menu parser returned zero items — check headers (category + name required).");
    return;
  }
  pass(`Menu: ${menuRows.length} active rows parsed`);

  if (locRows.length === 0) {
    fail("Locations parser returned zero rows — check type + name headers.");
    return;
  }
  pass(`Locations: ${locRows.length} active rows parsed`);

  const headerLine = menuText.split(/\r?\n/)[0] ?? "";
  const requiredMenuHeaders = [
    "id",
    "active",
    "category",
    "section",
    "sortOrder",
    "name",
    "englishName",
    "description",
    "price",
    "includesFries",
    "meatChoiceRequired",
    "featured",
    "imageUrl",
    "imageAlt",
    "availabilityLabel",
    "optionGroupsJson",
  ];
  const menuHeaderCells = headerLine.split(",").map((c) => c.trim().toLowerCase());
  for (const h of requiredMenuHeaders) {
    if (!menuHeaderCells.includes(h.toLowerCase())) {
      fail(`Menu CSV header row missing column: ${h}`);
    }
  }
  pass("Menu header row contains all expected column names (order-independent).");

  const locHeader = locText.split(/\r?\n/)[0] ?? "";
  const requiredLocHeaders = [
    "id",
    "active",
    "type",
    "sortOrder",
    "name",
    "label",
    "address",
    "city",
    "state",
    "zip",
    "hours",
    "phone",
    "email",
    "status",
    "statusNote",
    "mapsUrl",
    "embedUrl",
    "lat",
    "lng",
    "lastUpdated",
    "timezone",
    "weeklyHoursJson",
  ];
  const locHeaderCells = locHeader.split(",").map((c) => c.trim().toLowerCase());
  for (const h of requiredLocHeaders) {
    if (!locHeaderCells.includes(h.toLowerCase())) {
      fail(`Locations CSV header row missing column: ${h}`);
    }
  }
  pass("Locations header row contains all expected column names.");
  console.log(
    "NOTE: placeId, formattedAddress are optional Sheet columns; geocodeSource/geocodedAt/mapEmbedSrc are server-filled and should not appear in the Sheet.",
  );

  const ids = new Map<string, string>();
  for (const item of menuRows) {
    const prev = ids.get(item.id);
    if (prev) {
      fail(`Duplicate menu id "${item.id}"`);
    }
    ids.set(item.id, item.name);
    if (item.imageUrl) validateRemoteImageUrl(item.imageUrl);
  }
  pass("Menu ids are unique within active rows.");

  for (const item of menuRows) {
    const cat = item.category.trim();
    const catLower = cat.toLowerCase();
    if (!MAIN_CATEGORY_LABELS.has(catLower)) {
      fail(`Unknown menu category "${cat}" on item ${item.id}`);
    }
  }
  pass("Every menu item category matches MENU_CATEGORY_META labels.");

  for (const item of menuRows) {
    if (item.optionGroups?.length && itemRequiresOptionSelections(item)) {
      const ok = item.optionGroups.some((g) => g.required && g.options.length > 0);
      if (!ok) {
        warn(`Item "${item.id}" has optionGroups but none look required — verify sheet JSON.`);
      }
    }
  }

  const locIds = new Set<string>();
  for (const loc of locRows) {
    if (locIds.has(loc.id)) fail(`Duplicate location id "${loc.id}"`);
    locIds.add(loc.id);
  }
  pass("Location ids are unique.");

  const truck = locRows.find((l) => l.type === "food_truck");
  if (truck?.id !== "taqueria-ibarra-north-brighton") {
    warn(`Food truck id is "${truck?.id}" (expected taqueria-ibarra-north-brighton for parity with local fallback).`);
  }
  if (truck && truck.address.toLowerCase().includes("brighton")) {
    pass("Food truck address matches expected North Brighton row.");
  }

  const orderSet = new Set(MENU_CATEGORY_ORDER.map((c) => c.toLowerCase()));
  for (const item of menuRows) {
    if (!orderSet.has(item.category.toLowerCase())) {
      fail(`Category "${item.category}" not in MENU_CATEGORY_ORDER`);
    }
  }
  pass("All categories appear in MENU_CATEGORY_ORDER.");

  console.log(
    `\nMeat choice list (${meatChoices.length} options) is app-defined in MeatChoiceModal — sheet only sets meatChoiceRequired TRUE/FALSE.`,
  );

  console.log("\nValidation passed. Safe next steps:");
  console.log("- Publish Menu tab as CSV → MENU_CSV_URL");
  console.log("- Publish Locations tab as CSV → LOCATIONS_CSV_URL");
  console.log("- Optional Sheet columns: placeId, formattedAddress (geocodeSource/geocodedAt are server-only).");
}

main();
