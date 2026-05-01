"use client";

import { BrandLogo } from "@/components/ui/BrandLogo";
import { CONTACT, HOURS_LINES } from "@/lib/data/locations";
import { useLocationsCatalog } from "@/context/LocationsCatalogContext";
import {
  footerHoursLines,
  footerRestaurantVisit,
  footerTruckVisit,
} from "@/lib/locations/footer-visit-from-catalog";
import { telHrefFromDisplay } from "@/lib/locations/helpers";

export function SiteFooter() {
  const { error, data } = useLocationsCatalog();

  const restaurantLoc = data?.restaurantLocations?.[0];
  const truckLoc = data?.foodTruckLocations?.[0];

  const visitRestaurant = footerRestaurantVisit(data);
  const visitTruck = footerTruckVisit(data);

  const phoneDisplay =
    truckLoc?.phone?.trim() ||
    restaurantLoc?.phone?.trim() ||
    CONTACT.phoneDisplay;
  const phoneTel = telHrefFromDisplay(phoneDisplay, CONTACT.phoneTel);

  const emailAddr =
    truckLoc?.email?.trim() || restaurantLoc?.email?.trim() || CONTACT.email;

  const hoursLines = footerHoursLines(data, HOURS_LINES[1]);

  const hasRestaurant = Boolean(restaurantLoc);
  const introWhere = hasRestaurant
    ? `${visitRestaurant.address}, ${visitRestaurant.cityLine} and the food truck at ${visitTruck.address}, ${visitTruck.cityLine}`
    : `${visitTruck.address}, ${visitTruck.cityLine}`;

  return (
    <footer
      id="contact"
      className="scroll-mt-[calc(var(--nav-h)+16px)] bg-charcoal py-16"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10 px-5 sm:flex-row sm:justify-between sm:px-8">
        <div className="max-w-sm space-y-4">
          <BrandLogo width={72} height={72} />
          <p className="text-sm leading-relaxed text-cream/70">
            {CONTACT.socialHandle} — Taqueria Ibarra Food Truck. Authentic Mexican Food. Find us at{" "}
            {introWhere}.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a className="text-cream underline-offset-4 hover:underline" href={phoneTel}>
              {phoneDisplay}
            </a>
            {emailAddr ? (
              <a
                className="text-cream underline-offset-4 hover:underline"
                href={`mailto:${emailAddr}`}
              >
                {emailAddr}
              </a>
            ) : null}
            <a
              className="text-cream underline-offset-4 hover:underline"
              href={CONTACT.socialUrl}
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-editorial text-cream/50">Visit</p>
            {hasRestaurant ? (
              <>
                <p className="mt-2 text-sm text-cream/85">{visitRestaurant.address}</p>
                <p className="text-sm text-cream/85">{visitRestaurant.cityLine}</p>
                <p className="mt-4 text-sm text-cream/85">{visitTruck.address}</p>
                {visitTruck.detail ? (
                  <p className="text-sm text-cream/85">{visitTruck.detail}</p>
                ) : null}
                <p className="text-sm text-cream/85">{visitTruck.cityLine}</p>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-cream/85">{visitTruck.address}</p>
                {visitTruck.detail ? (
                  <p className="text-sm text-cream/85">{visitTruck.detail}</p>
                ) : null}
                <p className="text-sm text-cream/85">{visitTruck.cityLine}</p>
              </>
            )}
            {error ? (
              <p className="mt-3 text-xs text-cream/50">
                Visit could not refresh from the server; showing saved addresses.
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-xs uppercase tracking-editorial text-cream/50">Hours</p>
            <ul className="mt-2 space-y-1 text-sm text-cream/80">
              {hoursLines.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-cream/50">
              Menu updates from Google Sheets (see README). Order requests are demo-only until
              Clover and email workflows are confirmed — final price and pickup time are confirmed by
              phone.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
