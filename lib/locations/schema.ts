export type LocationType = "restaurant" | "food_truck";

export type LocationsSource = "google-sheet" | "local-fallback";

export type LocationGeocodeSource = "sheet" | "google-geocode" | "fallback";

export type LocationItem = {
  id: string;
  active: boolean;
  type: LocationType;
  sortOrder: number;
  name: string;
  label: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  phone: string;
  email: string;
  status: string;
  statusNote: string;
  mapsUrl: string;
  embedUrl: string;
  lat: number | null;
  lng: number | null;
  lastUpdated: string;
  /** IANA timezone for public hours (default America/Chicago in code). */
  timezone?: string;
  /** Optional CSV JSON override for weekly windows; invalid values are ignored. */
  weeklyHoursJson?: string;
  placeId?: string;
  formattedAddress?: string;
  geocodeSource?: LocationGeocodeSource;
  geocodedAt?: string;
  /** Server-built Maps Embed v1 URL (uses NEXT_PUBLIC key only; never secret keys). */
  mapEmbedSrc?: string;
};

export type LocationsResponse = {
  locations: LocationItem[];
  restaurantLocations: LocationItem[];
  foodTruckLocations: LocationItem[];
  source: LocationsSource;
  updatedAt: string;
};
