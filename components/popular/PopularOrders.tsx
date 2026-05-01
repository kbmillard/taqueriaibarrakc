"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMenuCatalog } from "@/context/MenuCatalogContext";
import { useOrder } from "@/context/OrderContext";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { POPULAR_VISUAL_SLOTS } from "@/lib/data/popular-visual-grid";
import type { MenuItem } from "@/lib/menu/schema";

type OpenSheet = { item: MenuItem; imageSrc: string };

export function PopularOrders() {
  const { data, loading } = useMenuCatalog();
  const [open, setOpen] = useState<OpenSheet | null>(null);
  const { addItem, openOrderPanel, scrollToSection } = useOrder();

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
          subtitle="Twelve house favorites—tap a photo for details and add to your order."
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
                aria-label={`${item.name} — view details`}
                onClick={() => setOpen({ item, imageSrc })}
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
        {open ? (
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
              onClick={() => setOpen(null)}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              className="relative z-[76] w-full max-w-lg rounded-t-3xl border border-white/10 bg-charcoal p-6 shadow-2xl sm:rounded-3xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="popular-dialog-title"
            >
              <button
                type="button"
                className="absolute right-4 top-4 rounded-full border border-white/10 p-2 text-cream"
                onClick={() => setOpen(null)}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative mb-4 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-charcoal">
                <Image
                  src={open.imageSrc}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-xs uppercase tracking-editorial text-cream/60">
                {open.item.category}
              </p>
              <h3 id="popular-dialog-title" className="mt-1 font-display text-3xl text-cream">
                {open.item.name}
              </h3>
              <p className="mt-3 text-sm text-cream/75">{open.item.description}</p>
              <p className="mt-4 text-lg font-semibold text-cream">
                {open.item.price === null ? "Price TBD" : `$${open.item.price.toFixed(2)}`}
              </p>
              <button
                type="button"
                className="mt-6 w-full rounded-full bg-salsa py-3 text-sm font-semibold uppercase tracking-editorial text-cream"
                onClick={() => {
                  if (open.item.meatChoiceRequired) {
                    setOpen(null);
                    scrollToSection("menu");
                    return;
                  }
                  addItem(open.item.id, { quantity: 1 });
                  openOrderPanel();
                  setOpen(null);
                }}
              >
                {open.item.meatChoiceRequired
                  ? "Go to menu to choose meat"
                  : "Add to order"}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
