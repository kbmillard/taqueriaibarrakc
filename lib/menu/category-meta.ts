import type { MenuCategoryMeta } from "./schema";

/**
 * Editorial styling for menu category tabs. Labels must match sheet `category` values
 * (case-insensitive match in `InteractiveMenu`).
 * Subtitles mirror Menufy category descriptions where provided (location 32419).
 */
export const MENU_CATEGORY_META: MenuCategoryMeta[] = [
  {
    id: "tacos",
    label: "Tacos",
    panelKickerEn: "Tacos",
    subtitle: "Made with cilantro and onions.",
    color: "green",
    number: "01",
  },
  {
    id: "burritos",
    label: "Burritos",
    panelKickerEn: "Burritos",
    subtitle: "Sour cream, lettuce, beans and pico de gallo.",
    color: "yellow",
    number: "02",
  },
  {
    id: "tortas",
    label: "Tortas",
    panelKickerEn: "Tortas",
    subtitle: "Lettuce and tomato.",
    color: "orange",
    number: "03",
  },
  {
    id: "quesadillas",
    label: "Quesadillas",
    panelKickerEn: "Quesadillas",
    subtitle: "Made with cilantro and onions.",
    color: "pink",
    number: "04",
  },
  {
    id: "pizadilla",
    label: "Pizadilla",
    panelKickerEn: "Pizadilla",
    subtitle: "Large quesadilla-style plates — upgrades exist on Menufy; confirm add-ons in Sheets.",
    color: "cyan",
    number: "05",
  },
  {
    id: "combos",
    label: "Combos",
    panelKickerEn: "Combos",
    subtitle: "Value plates — some include required meat choice where noted.",
    color: "red",
    number: "06",
  },
  {
    id: "platters",
    label: "Platters",
    panelKickerEn: "Platters",
    subtitle: "Feeds the table — confirm multi-meat builds with the kitchen.",
    color: "yellow",
    number: "07",
  },
  {
    id: "sides",
    label: "Sides",
    panelKickerEn: "Sides",
    subtitle: "Rice, beans, salsas, and extras.",
    color: "cyan",
    number: "08",
  },
  {
    id: "postres",
    label: "Postres (Desserts)",
    panelKickerEn: "Desserts",
    subtitle: "Sweet finish.",
    color: "pink",
    number: "09",
  },
  {
    id: "bebidas",
    label: "Bebidas (Drinks)",
    panelKickerEn: "Drinks",
    subtitle: "Sodas, aguas, and classics.",
    color: "red",
    number: "10",
  },
];
