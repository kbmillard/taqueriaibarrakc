"use client";

import { MapPin } from "lucide-react";
import { CONTACT, HOURS_LINES } from "@/lib/data/locations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLocationsCatalog } from "@/context/LocationsCatalogContext";
import type { LocationItem } from "@/lib/locations/schema";
import { LocationPublicStatus } from "@/components/locations/LocationPublicStatus";
import {
  formatAddressLine,
  resolvedAppleMapsUrl,
  resolvedMapsUrl,
  telHrefFromDisplay,
} from "@/lib/locations/helpers";
import { MapButton } from "@/components/locations/MapButton";
import { UnifiedTruckLocationPanel } from "@/components/locations/UnifiedTruckLocationPanel";

function cardDescription(loc: LocationItem): string {
  if (loc.type === "restaurant") {
    return "Restaurant details for this pin — hours and open/closed follow the posted weekly schedule in Kansas City time.";
  }
  return "Food truck row — hours and status follow this sheet entry.";
}

function addressLines(loc: LocationItem): string[] {
  const cityLine = [loc.city, loc.state, loc.zip].filter(Boolean).join(" ").trim();
  const lines = [loc.address, cityLine].filter(Boolean);
  return lines.length > 0 ? lines : [formatAddressLine(loc)];
}

export function LocationsSection() {
  const { loading, error, data } = useLocationsCatalog();

  const trucks = data?.foodTruckLocations ?? [];
  const restaurants = data?.restaurantLocations ?? [];
  const primaryTruck = trucks[0];
  const primaryRestaurant = restaurants[0];

  const phoneDisplay =
    primaryTruck?.phone?.trim() || primaryRestaurant?.phone?.trim() || CONTACT.phoneDisplay;
  const phoneTel = telHrefFromDisplay(phoneDisplay, CONTACT.phoneTel);
  const emailAddr =
    primaryTruck?.email?.trim() || primaryRestaurant?.email?.trim() || CONTACT.email;

  const extraLocations =
    data?.locations.filter((l) => !primaryTruck || l.id !== primaryTruck.id) ?? [];

  return (
    <section
      id="locations"
      className="scroll-mt-[calc(var(--nav-h)+16px)] py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div id="locations-start" tabIndex={-1} className="outline-none focus:outline-none">
          <SectionHeading
            kicker="Find us"
            title="North Brighton is the pin."
            subtitle="One place for address, live hours status, schedule, and map. Extra locations (if any) follow below."
          />
        </div>

        {error ? (
          <p className="mt-6 rounded-xl border border-salsa/40 bg-salsa/10 p-4 text-sm text-cream">
            {error} — try refreshing. Call{" "}
            <a className="underline" href={`tel:${CONTACT.phoneTel}`}>
              {CONTACT.phoneDisplay}
            </a>{" "}
            {CONTACT.email ? (
              <>
                {" "}
                or email{" "}
                <a className="underline" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </>
            ) : null}
            .
          </p>
        ) : null}

        {loading ? (
          <div className="mt-12 h-[480px] animate-pulse rounded-3xl bg-white/10 lg:h-[420px]" />
        ) : primaryTruck ? (
          <div className="mt-12">
            <UnifiedTruckLocationPanel
              truck={primaryTruck}
              phoneDisplay={phoneDisplay}
              phoneTel={phoneTel}
              emailAddr={emailAddr}
            />
          </div>
        ) : data?.locations.length ? (
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {data.locations.map((loc) => (
              <LocationCard key={loc.id} loc={loc} />
            ))}
          </div>
        ) : (
          <p className="mt-12 rounded-3xl border border-white/10 bg-black/30 p-8 text-sm text-cream/75">
            Add a food truck row in the locations sheet (or fallback) to show address, hours,
            status, and map here.
            <span className="mt-2 block text-cream/60">Fallback hours: {HOURS_LINES[0]}</span>
          </p>
        )}

        {!loading && primaryTruck && extraLocations.length > 0 ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {extraLocations.map((loc) => (
              <LocationCard key={loc.id} loc={loc} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function LocationCard({ loc }: { loc: LocationItem }) {
  const badge =
    loc.label?.trim() ||
    (loc.type === "restaurant" ? "Restaurant Location" : "Food Truck Location");
  const title =
    loc.name?.trim() || (loc.type === "restaurant" ? "Restaurant" : "Food Truck");

  return (
    <article className="flex flex-col rounded-3xl border border-white/10 bg-black/30 p-8">
      <p className="text-xs uppercase tracking-editorial text-cream/60">{badge}</p>
      <h3 className="mt-2 font-display text-3xl text-cream">{title}</h3>
      <div className="mt-4 flex items-start gap-2 text-cream/85">
        <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden />
        <div>
          {addressLines(loc).map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
      <LocationPublicStatus location={loc} variant="card" showNote />
      <p className="mt-4 text-sm leading-relaxed text-cream/70">{cardDescription(loc)}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <MapButton label="Google Maps" href={resolvedMapsUrl(loc)} />
        <MapButton label="Apple Maps" href={resolvedAppleMapsUrl(loc)} />
      </div>
    </article>
  );
}
