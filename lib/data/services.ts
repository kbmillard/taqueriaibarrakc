export type ServiceRow = {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
  ctas: { label: string; action: "order" | "locations" | "catering" | "scroll"; target?: string }[];
};

export const SERVICE_ROWS: ServiceRow[] = [
  {
    id: "pickup",
    number: "01",
    title: "Pickup ordering",
    summary: "Order online, skip the guesswork, grab it hot.",
    detail:
      "Your cart updates live on this page — pickup notes, optional choices, and Price TBD lines stay visible until the team confirms.",
    ctas: [{ label: "Open order panel", action: "order" }],
  },
  {
    id: "truck",
    number: "02",
    title: "Food truck — North Brighton",
    summary: "5005 North Brighton Avenue, Kansas City.",
    detail:
      "Taqueria Ibarra Food Truck is the same window for carryout and the truck pin — check the hours strip for today’s computed open/closed status.",
    ctas: [{ label: "Find us", action: "scroll", target: "locations" }],
  },
  {
    id: "delivery",
    number: "03",
    title: "Delivery",
    summary: "Tue–Sat delivery window (Mon closed).",
    detail:
      "Delivery follows its own schedule from carryout — see the hours block. Add your address in the order drawer when you choose delivery.",
    ctas: [{ label: "Start order", action: "order" }],
  },
  {
    id: "catering",
    number: "04",
    title: "Catering",
    summary: "Trays, tacos, and crowd-ready heat.",
    detail:
      "School events, office lunches, and neighborhood parties — send a catering request with headcount and date; we will follow up directly.",
    ctas: [{ label: "Catering form", action: "catering" }],
  },
  {
    id: "hours",
    number: "05",
    title: "Hours",
    summary: "Carryout Mon–Sat; Sun closed.",
    detail:
      "Carryout runs Mon 11–9 and Tue–Sat 11–9:30 (CT). Delivery is closed Monday. Special sheet statuses like Catering Event still override the badge.",
    ctas: [{ label: "View hours", action: "scroll", target: "hours" }],
  },
];
