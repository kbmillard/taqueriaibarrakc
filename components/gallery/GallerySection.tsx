"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SHOTS = [
  {
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&q=80",
    alt: "Tacos on a platter — Taqueria Ibarra gallery mood",
  },
  {
    src: "https://images.unsplash.com/photo-1626082927739-455c2c2d2b3d?auto=format&fit=crop&w=1200&q=80",
    alt: "Quesabirria-style dish — Mexican street food photography",
  },
  {
    src: "https://images.unsplash.com/photo-1573080496219-b47f71f29daa?auto=format&fit=crop&w=1200&q=80",
    alt: "Loaded street sides — gallery frame",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    alt: "Grilled meat close-up — plancha energy",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    alt: "Mexican torta ingredients — editorial gallery frame",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    alt: "Warm restaurant lighting — hospitality mood",
  },
] as const;

export function GallerySection() {
  return (
    <section
      id="gallery"
      className="scroll-mt-[calc(var(--nav-h)+16px)] py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionHeading
          kicker="Gallery"
          title="Color, char, and chrome."
          align="center"
          subtitle="A wall of inspiration — blistered tortillas, melted edges, and salsa that catches the light. Swap in your own photography when ready."
        />
        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {SHOTS.map((s, i) => (
            <div
              key={s.src}
              className={`relative mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/10 ${
                i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image src={s.src} alt={s.alt} fill className="object-cover" sizes="400px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
