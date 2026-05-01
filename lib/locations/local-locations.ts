import type { LocationItem } from "./schema";

const TAQUERIA_WEEKLY_CARRYOUT = {
  mon: [{ open: "11:00", close: "21:00", label: "Carryout and delivery" }],
  tue: [{ open: "11:00", close: "21:30", label: "Carryout and delivery" }],
  wed: [{ open: "11:00", close: "21:30", label: "Carryout and delivery" }],
  thu: [{ open: "11:00", close: "21:30", label: "Carryout and delivery" }],
  fri: [{ open: "11:00", close: "21:30", label: "Carryout and delivery" }],
  sat: [{ open: "11:00", close: "21:30", label: "Carryout and delivery" }],
  sun: [],
};

export const localLocationItems: LocationItem[] = [
  {
    id: "taqueria-ibarra-north-brighton",
    active: true,
    type: "food_truck",
    sortOrder: 0,
    name: "Taqueria Ibarra Food Truck",
    label: "Food Truck Location",
    address: "5005 North Brighton Avenue",
    city: "Kansas City",
    state: "MO",
    zip: "64117",
    hours:
      "Carryout: Mon 11:00 AM – 9:00 PM; Tue–Sat 11:00 AM – 9:30 PM; Sun closed. Delivery: Mon closed; Tue–Sat 11:00 AM – 9:30 PM; Sun closed.",
    phone: "(816) 585-2257",
    email: "",
    status: "Open",
    statusNote: "",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=5005+North+Brighton+Avenue+Kansas+City+MO+64117",
    embedUrl: "",
    lat: null,
    lng: null,
    lastUpdated: "",
    timezone: "America/Chicago",
    weeklyHoursJson: JSON.stringify(TAQUERIA_WEEKLY_CARRYOUT),
  },
];
