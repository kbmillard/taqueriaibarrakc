export const RESTAURANT = {
  label: "Restaurant",
  shortLabel: "North Brighton",
  address: "5005 North Brighton Avenue",
  cityLine: "Kansas City, MO 64117",
  mapsQuery: "5005 North Brighton Avenue, Kansas City, MO 64117",
  role: "food truck home base",
  description:
    "Taqueria Ibarra Food Truck serves tacos, burritos, tortas, and quesadillas from North Brighton — carryout and delivery windows follow the posted schedule.",
} as const;

export const TRUCK = {
  label: "Food Truck",
  shortLabel: "North Brighton",
  address: "5005 North Brighton Avenue",
  detail: "",
  cityLine: "Kansas City, MO 64117",
  mapsQuery: "5005 North Brighton Avenue, Kansas City, MO 64117",
  role: "KC street taquería",
  description:
    "Warm tortillas, salsa, and plancha-fired proteins — built for lines that move and orders that travel.",
} as const;

export const HOURS_LINES = [
  "Carryout: Mon 11:00 AM – 9:00 PM; Tue–Sat 11:00 AM – 9:30 PM; Sun closed.",
  "Delivery: Mon closed; Tue–Sat 11:00 AM – 9:30 PM; Sun closed. Follow taqueriaibarrakc.com for updates.",
] as const;

export const CONTACT = {
  phoneDisplay: "(816) 585-2257",
  phoneTel: "+18165852257",
  email: "",
  socialHandle: "@taqueriaibarrakc",
  socialUrl: "https://www.taqueriaibarrakc.com/",
  facebookUrl: "https://www.taqueriaibarrakc.com/",
} as const;

export const TRUCK_STATUS_OPTIONS = [
  "open",
  "moving_soon",
  "closed",
  "catering_event",
  "serving_now",
  "next_stop",
] as const;

export type TruckStatusId = (typeof TRUCK_STATUS_OPTIONS)[number];

export const TRUCK_STATUS_COPY: Record<
  TruckStatusId,
  { badge: string; detail: string }
> = {
  open: { badge: "Open", detail: "Swing by North Brighton — we are on the plancha." },
  moving_soon: {
    badge: "Moving Soon",
    detail: "We are packing up; arrive within the next few minutes.",
  },
  closed: { badge: "Closed", detail: "See hours below — we will be back on schedule." },
  catering_event: {
    badge: "Catering Event",
    detail: "Booked for a private event — send a catering note for your date.",
  },
  serving_now: {
    badge: "Serving Now",
    detail: "Serving now at 5005 North Brighton Avenue.",
  },
  next_stop: {
    badge: "Next Stop",
    detail: "Catch us at our next stop — check the site for the pin.",
  },
};
