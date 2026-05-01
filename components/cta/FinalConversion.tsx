"use client";

import { useOrder } from "@/context/OrderContext";

export function FinalConversion() {
  const { openOrderPanel, focusCatering } = useOrder();

  return (
    <section className="border-t border-white/10 bg-gradient-to-br from-salsa/30 via-charcoal to-charcoal py-24">
      <div className="mx-auto max-w-[900px] px-5 text-center sm:px-8">
        <p className="text-xs uppercase tracking-editorial text-cream/70">Ready</p>
        <h2 className="mt-3 font-display text-5xl text-cream sm:text-6xl">READY TO EAT?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-cream/80">
          Pick up on North Brighton or start a delivery request in the cart drawer. Catering stays
          one scroll away.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={openOrderPanel}
            className="w-full rounded-full bg-cream px-8 py-3 text-xs font-semibold uppercase tracking-editorial text-charcoal sm:w-auto"
          >
            Start order
          </button>
          <button
            type="button"
            onClick={focusCatering}
            className="w-full rounded-full border border-cream/40 px-8 py-3 text-xs font-semibold uppercase tracking-editorial text-cream sm:w-auto"
          >
            Catering request
          </button>
        </div>
      </div>
    </section>
  );
}
