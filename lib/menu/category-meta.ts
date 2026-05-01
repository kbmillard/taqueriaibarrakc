import type { MenuCategoryMeta } from "./schema";

/**
 * Editorial styling for menu category tabs. Labels must match sheet `category` values
 * (case-insensitive match in `InteractiveMenu`).
 */
export const MENU_CATEGORY_META: MenuCategoryMeta[] = [
  {
    id: "tacos",
    label: "Tacos",
    panelKickerEn: "Tacos",
    subtitle: "Street-style on corn tortillas",
    color: "green",
    number: "01",
  },
  {
    id: "burros",
    label: "Burros",
    panelKickerEn: "Burritos",
    subtitle: "Loaded and wrapped to go",
    color: "yellow",
    number: "02",
  },
  {
    id: "quesadillas",
    label: "Quesadillas",
    panelKickerEn: "Quesadillas",
    subtitle: "Melty, griddled, and fresh",
    color: "pink",
    number: "03",
  },
  {
    id: "tortas",
    label: "Tortas",
    panelKickerEn: "Tortas",
    subtitle: "Mexican sandwiches on bolillo",
    color: "orange",
    number: "04",
  },
  {
    id: "sides",
    label: "Sides",
    panelKickerEn: "Sides",
    subtitle: "Beans, rice, and extras",
    color: "cyan",
    number: "05",
  },
  {
    id: "desserts",
    label: "Desserts",
    panelKickerEn: "Desserts",
    subtitle: "Sweet finish",
    color: "red",
    number: "06",
  },
  {
    id: "drinks",
    label: "Drinks",
    panelKickerEn: "Drinks",
    subtitle: "Sodas and classics",
    color: "red",
    number: "07",
  },
];
