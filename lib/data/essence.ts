export type EssenceCard = {
  id: string;
  number: string;
  title: string;
  teaser: string;
  body: string;
  image: string;
};

export const ESSENCE_CARDS: EssenceCard[] = [
  {
    id: "fire",
    number: "01",
    title: "Plancha",
    teaser: "Char, heat, and discipline.",
    body: "Proteins hit the plancha with purpose — edges that caramelize, salsas that cut richness, and portions built for real hunger.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "masa",
    number: "02",
    title: "Tortilla",
    teaser: "Warm masa, crisp edges.",
    body: "Tacos and quesadillas start with tortillas that behave — soft where they should be, toasted where the cheese needs grip.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "family",
    number: "03",
    title: "KC truck",
    teaser: "North Brighton regulars.",
    body: "Taqueria Ibarra Food Truck is family-run Kansas City energy — fast lines, honest portions, and a crew that cooks like neighbors are watching.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1600&q=80",
  },
];
