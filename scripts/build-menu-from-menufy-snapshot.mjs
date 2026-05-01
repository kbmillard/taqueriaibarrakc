/**
 * Regenerates `lib/menu/local-menu.ts` and `prompt/google-sheet-menu-template.csv`
 * from `prompt/menufy-location-32419-categories-all.json` (Menufy public categories payload).
 *
 * Run: node scripts/build-menu-from-menufy-snapshot.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const snap = path.join(root, "prompt", "menufy-location-32419-categories-all.json");
const outTs = path.join(root, "lib", "menu", "local-menu.ts");
const outCsv = path.join(root, "prompt", "google-sheet-menu-template.csv");

const CATEGORY_LABEL = {
  TACOS: "Tacos",
  BURRITOS: "Burritos",
  TORTAS: "Tortas",
  QUESADILLAS: "Quesadillas",
  PIZADILLA: "Pizadilla",
  COMBOS: "Combos",
  PLATTERS: "Platters",
  SIDES: "Sides",
  "POSTRES (DESSERTS)": "Postres (Desserts)",
  "BEBIDAS (DRINKS)": "Bebidas (Drinks)",
};

const COMBO_MEAT_CHOICE_IDS = new Set([8042268, 8042269, 8042270, 8042271]);

const MEAT_GROUP_COMBO = {
  id: "meat",
  label: "Choice of meat",
  required: true,
  options: [
    "Asada (Steak)",
    "Pastor (Marinated Pork)",
    "Pollo (Chicken)",
    "Chorizo",
    "Birria (Stewed Beef)",
  ],
};

const TACO_PLATTER_MEAT_GROUP = {
  id: "meat",
  label: "Choice of meat",
  required: true,
  options: ["Asada (Steak)", "Pollo (Chicken)", "Pastor (Marinated Pork)", "Chorizo"],
};

const FEATURED_IDS = new Set([
  7255495, 7255493, 8041843, 8042243, 7255504, 12772879, 8042268, 8042271, 8042250, 8042251,
  7255509,
]);

/** 3 Leches — verify id */
function fixFeatured(j) {
  const desserts = j.categories.find((c) => c.name.includes("POSTRES"));
  const leches = desserts?.items?.find((i) => String(i.name).includes("Leches"));
  if (leches) FEATURED_IDS.add(leches.id);
}

function csvEscape(s) {
  if (s == null) return "";
  const t = String(s);
  if (/[",\n]/.test(t)) return `"${t.replace(/"/g, '""')}"`;
  return t;
}

function build() {
  const j = JSON.parse(fs.readFileSync(snap, "utf8"));
  fixFeatured(j);

  const categories = [...j.categories].sort((a, b) => a.sort - b.sort);
  const menuOrder = categories.map((c) => CATEGORY_LABEL[c.name] ?? c.name);

  const items = [];
  for (const c of categories) {
    const catLabel = CATEGORY_LABEL[c.name] ?? c.name;
    const sorted = [...(c.items ?? [])].sort((a, b) => a.sort - b.sort);
    sorted.forEach((it, idx) => {
      const name = String(it.name ?? "").trim();
      const desc = it.description ? String(it.description).trim() : "";
      const price = typeof it.itemPrice === "number" ? it.itemPrice : null;
      let optionGroups = undefined;
      if (COMBO_MEAT_CHOICE_IDS.has(it.id)) {
        optionGroups = [MEAT_GROUP_COMBO];
      } else if (it.id === 8042252) {
        optionGroups = [TACO_PLATTER_MEAT_GROUP];
      }
      items.push({
        id: `mf-${it.id}`,
        active: true,
        category: catLabel,
        section: "",
        sortOrder: idx + 1,
        name,
        englishName: undefined,
        description: desc || undefined,
        price,
        includesFries: false,
        meatChoiceRequired: false,
        featured: FEATURED_IDS.has(it.id),
        imageUrl: it.imageLink?.startsWith("http") ? it.imageLink : undefined,
        imageAlt: undefined,
        availabilityLabel: undefined,
        optionGroups,
      });
    });
  }

  const tsLines = [];
  tsLines.push(`/**`);
  tsLines.push(` * Local fallback menu — generated from Menufy snapshot (location 32419).`);
  tsLines.push(` * Source: prompt/menufy-location-32419-categories-all.json`);
  tsLines.push(` * Regenerate: node scripts/build-menu-from-menufy-snapshot.mjs`);
  tsLines.push(` * PIZADILLA rows have itemPriceHasUpgrades in Menufy; modifier prices are NOT in categories/all — no optionGroups until owner maps upgrades.`);
  tsLines.push(` */`);
  tsLines.push(`import type { MenuItem } from "./schema";`);
  tsLines.push(``);
  tsLines.push(`export const localMenuItems: MenuItem[] = ${JSON.stringify(items, null, 2)};`);

  fs.writeFileSync(outTs, tsLines.join("\n") + "\n");

  const headers = [
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
  const csvRows = [headers.join(",")];
  for (const row of items) {
    const og = row.optionGroups?.length
      ? JSON.stringify(row.optionGroups).replace(/"/g, '""')
      : "";
    const line = [
      row.id,
      row.active ? "TRUE" : "FALSE",
      row.category,
      row.section ?? "",
      row.sortOrder,
      csvEscape(row.name),
      row.englishName ?? "",
      csvEscape(row.description ?? ""),
      row.price ?? "",
      row.includesFries ? "TRUE" : "FALSE",
      row.meatChoiceRequired ? "TRUE" : "FALSE",
      row.featured ? "TRUE" : "FALSE",
      row.imageUrl ?? "",
      row.imageAlt ?? "",
      row.availabilityLabel ?? "",
      og ? `"${og}"` : "",
    ];
    csvRows.push(line.join(","));
  }
  fs.writeFileSync(outCsv, csvRows.join("\n") + "\n");

  console.log("Wrote", outTs);
  console.log("Wrote", outCsv);
  console.log("Categories:", menuOrder.join(" | "));
  console.log("Items:", items.length);
}

build();
