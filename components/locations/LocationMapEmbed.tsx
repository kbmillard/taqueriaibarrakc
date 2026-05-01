"use client";

import { GoogleMapClientResolved } from "@/components/locations/GoogleMapClientResolved";
import { GoogleMapGreedy } from "@/components/locations/GoogleMapGreedy";
import { MapButton } from "@/components/locations/MapButton";
import {
  formatAddressLine,
  resolvedEmbedSrc,
  resolvedMapsUrl,
} from "@/lib/locations/helpers";
import type { LocationItem } from "@/lib/locations/schema";

/** True only when the sheet provides a truly custom (non-Google) iframe URL. */
function isThirdPartyEmbedUrl(url: string): boolean {
  const u = url.trim().toLowerCase();
  if (!u) return false;
  return !u.includes("google.com") && !u.includes("maps.google.");
}

function parseCoord(n: number | null | undefined): number | null {
  if (n == null) return null;
  const v = Number(n);
  return Number.isFinite(v) ? v : null;
}

type Props = {
  loc: LocationItem;
  /** e.g. h-[280px] lg:min-h-[360px] */
  className?: string;
};

/**
 * Embedded map + status line for a location (greedy JS map, client geocode, iframe, or fallback).
 */
export function LocationMapEmbed({ loc, className = "h-[280px] w-full min-h-[220px]" }: Props) {
  const line = formatAddressLine(loc);
  const ownerEmbed = loc.embedUrl?.trim();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const placeId = loc.placeId?.trim();
  const lat = parseCoord(loc.lat);
  const lng = parseCoord(loc.lng);
  const coordsOk = lat != null && lng != null;

  const useGreedyJsMap =
    coordsOk && Boolean(apiKey) && (!ownerEmbed || !isThirdPartyEmbedUrl(ownerEmbed));
  const src = useGreedyJsMap ? null : resolvedEmbedSrc(loc);
  /** JS map uses wheel zoom (no ⌘+scroll). Prefer over iframe when a public key exists. */
  const useClientResolve =
    Boolean(apiKey) &&
    !coordsOk &&
    (Boolean(placeId) || Boolean(line.trim())) &&
    !ownerEmbed?.trim();

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
      {useGreedyJsMap && lat != null && lng != null ? (
        <GoogleMapGreedy lat={lat} lng={lng} title={loc.name} className={className} />
      ) : useClientResolve ? (
        <GoogleMapClientResolved
          loc={loc}
          title={loc.name}
          className={className}
          iframeFallbackSrc={src}
        />
      ) : src ? (
        <iframe
          title={`Map — ${loc.name}`}
          className={`${className} bg-charcoal`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={src}
        />
      ) : (
        <div className={`flex flex-col justify-center ${className} bg-charcoal/60 p-6 text-sm text-cream/75`}>
          <p className="font-medium text-cream">Map preview</p>
          <p className="mt-2">{line}</p>
          <div className="mt-4">
            <MapButton label="Open in Google Maps" href={resolvedMapsUrl(loc)} />
          </div>
        </div>
      )}
    </div>
  );
}
