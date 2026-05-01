"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMenuCatalog } from "@/context/MenuCatalogContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { POPULAR_VISUAL_SLOTS } from "@/lib/data/popular-visual-grid";
import type { MenuItem } from "@/lib/menu/schema";

export function PopularOrders() {
  const { data, loading } = useMenuCatalog();
  const [openImageSrc, setOpenImageSrc] = useState<string | null>(null);

  const tiles = useMemo(() => {
    if (!data) return [];
    const byId = new Map(data.items.map((i) => [i.id, i]));
    return POPULAR_VISUAL_SLOTS.map((slot) => {
      const item = byId.get(slot.menuItemId);
      return item ? { item, imageSrc: slot.imageSrc } : null;
    }).filter((t): t is { item: MenuItem; imageSrc: string } => t !== null);
  }, [data]);

  return (
    <section id="popular" className="py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <SectionHeading
          kicker="Popular orders"
          title="Featured picks from the street."
          align="center"
          subtitle="Twelve house favorites—tap a photo to view it larger."
        />

        {loading || !data ? (
          <div className="mt-14 grid animate-pulse grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-3xl bg-white/10" />
            ))}
          </div>
        ) : (
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {tiles.map(({ item, imageSrc }) => (
              <button
                key={item.id}
                type="button"
                aria-label={`${item.name} — enlarge photo`}
                onClick={() => setOpenImageSrc(imageSrc)}
                className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 ring-offset-2 ring-offset-charcoal transition hover:ring-2 hover:ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-salsa"
              >
                <Image
                  src={imageSrc}
                  alt=""
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {openImageSrc ? (
          <motion.div
            className="fixed inset-0 z-[75] flex items-end justify-center sm:items-center sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-label="Close"
              onClick={() => setOpenImageSrc(null)}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative z-[76] w-full max-w-[min(100vw-2rem,420px)] p-4 sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label="Photo preview"
            >
              <button
                type="button"
                className="absolute right-6 top-6 z-[77] rounded-full border border-white/20 bg-charcoal/90 p-2 text-cream shadow-lg sm:right-8 sm:top-8"
                onClick={() => setOpenImageSrc(null)}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-charcoal shadow-2xl">
                <Image
                  src={openImageSrc}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 640px) 420px, 100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
