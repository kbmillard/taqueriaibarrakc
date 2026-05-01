/**
 * Builds a three-tab .xlsx from the canonical CSV templates so the owner can
 * upload to Google Drive → Open with Google Sheets → Publish CSV URLs.
 *
 * Usage: node scripts/generate-owner-sheets-workbook.mjs [output.xlsx]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as XLSX from "xlsx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const MENU_CSV = path.join(ROOT, "prompt", "google-sheet-menu-template.csv");
const LOC_CSV = path.join(ROOT, "prompt", "google-sheet-locations-template.csv");
const PIN_CSV = path.join(ROOT, "prompt", "google-sheet-truck-pin-template.csv");

const DEFAULT_OUT = path.join(
  ROOT,
  "prompt",
  "taqueria-ibarra-google-sheets-workbook.xlsx",
);

function readCsvSheet(csvPath, displayName) {
  const buf = fs.readFileSync(csvPath);
  const wb = XLSX.read(buf, { type: "buffer", raw: false, codepage: 65001 });
  const name0 = wb.SheetNames[0];
  const ws = wb.Sheets[name0];
  if (!ws) throw new Error(`No sheet parsed from ${csvPath}`);
  return { name: displayName, sheet: ws };
}

const outPath = path.resolve(process.argv[2] || DEFAULT_OUT);

const menu = readCsvSheet(MENU_CSV, "Menu");
const loc = readCsvSheet(LOC_CSV, "Locations");
const pin = readCsvSheet(PIN_CSV, "Truck pin");

const outWb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(outWb, menu.sheet, menu.name);
XLSX.utils.book_append_sheet(outWb, loc.sheet, loc.name);
XLSX.utils.book_append_sheet(outWb, pin.sheet, pin.name);

XLSX.writeFile(outWb, outPath);

const menuRows = XLSX.utils.sheet_to_json(menu.sheet, { header: 1, defval: "" }).length;
const locRows = XLSX.utils.sheet_to_json(loc.sheet, { header: 1, defval: "" }).length;
const pinRows = XLSX.utils.sheet_to_json(pin.sheet, { header: 1, defval: "" }).length;

console.log(`Wrote ${outPath}`);
console.log(`  Tab "Menu": ${menuRows} rows (incl. header) from ${path.relative(ROOT, MENU_CSV)}`);
console.log(`  Tab "Locations": ${locRows} rows from ${path.relative(ROOT, LOC_CSV)}`);
console.log(`  Tab "Truck pin": ${pinRows} rows from ${path.relative(ROOT, PIN_CSV)}`);
