"use client";

import { MapPin } from "lucide-react";
import { LocationMapEmbed } from "@/components/locations/LocationMapEmbed";
import { LocationPublicStatus } from "@/components/locations/LocationPublicStatus";
import { MapButton } from "@/components/locations/MapButton";
import {
  formatAddressLine,
  resolvedAppleMapsUrl,
  resolvedMapsUrl,
} from "@/lib/locations/helpers";
import type { LocationItem } from "@/lib/locations/schema";

type Props = {
  truck: LocationItem;
  phoneDisplay: string;
  phoneTel: string;
  emailAddr?: string;
};

export function UnifiedTruckLocationPanel({
  truck,
  phoneDisplay,
  phoneTel,
  emailAddr,
}: Props) {
  const fullAddress =
    truck.formattedAddress?.trim() || formatAddressLine(truck);

  return (
    <div
      id="hours"
      className="scroll-mt-[calc(var(--nav-h)+16px)] rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8 lg:p-10"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-editorial text-cream/60">Food truck</p>
          <h3 className="mt-2 font-display text-3xl text-cream sm:text-4xl">{truck.name}</h3>

          <div className="mt-5 flex items-start gap-2 text-cream/90">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-ember" aria-hidden />
            <p className="text-base leading-snug sm:text-lg">{fullAddress}</p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-editorial text-cream/60">Status</p>
            <div className="mt-3">
              <LocationPublicStatus location={truck} variant="truck" showNote={false} />
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-editorial text-cream/60">Hours</p>
            {truck.hours ? (
              <p className="mt-3 text-sm leading-relaxed text-cream/85">{truck.hours}</p>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <MapButton label="Google Maps" href={resolvedMapsUrl(truck)} />
            <MapButton label="Apple Maps" href={resolvedAppleMapsUrl(truck)} />
            <a
              href={phoneTel}
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-editorial text-cream hover:bg-white/5"
            >
              Call {phoneDisplay}
            </a>
            {emailAddr ? (
              <a
                href={`mailto:${emailAddr}`}
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-4 py-2 text-[10px] uppercase tracking-editorial text-cream hover:bg-white/5"
              >
                Email
              </a>
            ) : null}
          </div>
        </div>

        <div className="min-w-0">
          <p className="text-xs uppercase tracking-editorial text-cream/60">Map</p>
          <p className="mt-2 text-xs text-cream/55">
            The pin updates when you change the truck address in your published Google Sheet (or
            the optional Truck pin tab your developer linked).
          </p>
          <div className="mt-4">
            <LocationMapEmbed loc={truck} className="h-[min(52vw,320px)] w-full min-h-[240px] lg:h-[min(36vw,420px)] lg:min-h-[320px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
