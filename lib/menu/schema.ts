export type MenuOptionGroup = {
  id: string;
  label: string;
  required: boolean;
  options: string[];
};

export type MenuItem = {
  id: string;
  active: boolean;
  category: string;
  /** Subsection within category (optional grouping for Sheets) */
  section?: string;
  sortOrder: number;
  name: string;
  englishName?: string;
  description?: string;
  /** Dollar amount from sheet when priced; null until confirmed */
  price: number | null;
  includesFries: boolean;
  meatChoiceRequired: boolean;
  featured: boolean;
  imageUrl?: string;
  imageAlt?: string;
  /** Optional banner line from Sheets (e.g. seasonal availability) */
  availabilityLabel?: string;
  /** Required/optional choices (e.g. guiso format, chilaquiles sauce) */
  optionGroups?: MenuOptionGroup[];
};

export type MenuCategoryMeta = {
  id: string;
  label: string;
  /** Small "01 / …" line above the category title (English, nav-sized). */
  panelKickerEn: string;
  subtitle: string;
  color: MenuCategoryColor;
  number: string;
};

export type MenuCategoryColor =
  | "cyan"
  | "green"
  | "yellow"
  | "pink"
  | "orange"
  | "red";

export type MenuCatalogSource = "google-sheet" | "local-fallback";

export type MenuCatalogResponse = {
  categories: string[];
  items: MenuItem[];
  featuredItems: MenuItem[];
  source: MenuCatalogSource;
  updatedAt: string;
};

/** API alias — same shape as `MenuCatalogResponse`. */
export type MenuResponse = MenuCatalogResponse;

/** Order matches Menufy `categories/all` sort (location 32419 snapshot). */
export const MENU_CATEGORY_ORDER = [
  "Tacos",
  "Burritos",
  "Tortas",
  "Quesadillas",
  "Pizadilla",
  "Combos",
  "Platters",
  "Sides",
  "Postres (Desserts)",
  "Bebidas (Drinks)",
] as const;

/** Legacy meat modal list — prefer `optionGroups` on menu items; keep aligned with common Menufy proteins. */
export const meatChoices = [
  "Asada (Steak)",
  "Pastor (Marinated Pork)",
  "Pollo (Chicken)",
  "Chorizo",
  "Birria (Stewed Beef)",
] as const;

/** Price in dollars → cents for cart math; null stays null */
export function priceDollarsToCents(price: number | null): number | null {
  if (price === null || Number.isNaN(price)) return null;
  return Math.round(price * 100);
}
