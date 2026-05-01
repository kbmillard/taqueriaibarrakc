"use client";

import { useEffect, useState } from "react";
import type { LocationItem } from "@/lib/locations/schema";
import { cn } from "@/lib/utils/cn";
import { formatAddressLine, resolvedMapsUrl } from "@/lib/locations/helpers";
import { loadGoogleMapsScript } from "@/lib/maps/load-google-maps-script";
import { GoogleMapGreedy } from "@/components/locations/GoogleMapGreedy";
import { MapButton } from "@/components/locations/MapButton";

type Props = {
  loc: LocationItem;
  title?: string;
  className?: string;
};

/**
 * When the API has no lat/lng yet, resolve placeId or address in the browser with the
 * Maps JavaScript Geocoder (HTTP-referrer key). On failure, shows an Open in Maps link
 * instead of a Maps iframe (iframes use cooperative ⌘+scroll zoom).
 */
export function GoogleMapClientResolved({ loc, title, className }: Props) {
  const line = formatAddressLine(loc);
  const placeId = loc.placeId?.trim();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showMapsLinkFallback, setShowMapsLinkFallback] = useState(false);

  useEffect(() => {
    setCoords(null);
    setShowMapsLinkFallback(false);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
    if (!apiKey) {
      setShowMapsLinkFallback(true);
      return;
    }
    if (!placeId && !line.trim()) {
      return;
    }

    let cancelled = false;

    void (async () => {
      try {
        await loadGoogleMapsScript(apiKey);
      } catch {
        if (!cancelled) setShowMapsLinkFallback(true);
        return;
      }
      if (cancelled) return;

      const geocoder = new google.maps.Geocoder();
      const request: google.maps.GeocoderRequest = placeId
        ? { placeId }
        : { address: line.trim() };

      geocoder.geocode(request, (results, status) => {
        if (cancelled) return;
        const first = results?.[0];
        const point = first?.geometry?.location;
        if (status !== "OK" || !point) {
          setShowMapsLinkFallback(true);
          return;
        }
        setCoords({ lat: point.lat(), lng: point.lng() });
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [line, placeId, loc.id]); // eslint-disable-line react-hooks/exhaustive-deps -- loc fields reflected in line/placeId/id

  if (coords) {
    return (
      <GoogleMapGreedy
        lat={coords.lat}
        lng={coords.lng}
        title={title ?? loc.name}
        className={className}
      />
    );
  }

  if (showMapsLinkFallback) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 bg-charcoal/60 p-6 text-center text-sm text-cream/80",
          className ?? "h-[220px] w-full min-h-[220px]",
        )}
      >
        <p>Map could not be loaded here. Open in Google Maps for directions and street view.</p>
        <MapButton label="Open in Google Maps" href={resolvedMapsUrl(loc)} />
      </div>
    );
  }

  return <div className={className ?? "h-[220px] w-full min-h-[220px] animate-pulse bg-charcoal/60"} />;
}
