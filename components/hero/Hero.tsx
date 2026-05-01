"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useOrder } from "@/context/OrderContext";
import { HERO_BACKGROUND_ALT, HERO_BACKGROUND_IMAGE } from "@/lib/data/hero-background";

export function Hero() {
  const { openOrderPanel, focusMenu, scrollToSection, focusCatering } = useOrder();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-charcoal pt-[var(--nav-h)]"
    >
      {/* Large screens: full-bleed photo */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Image
          src={HERO_BACKGROUND_IMAGE}
          alt={HERO_BACKGROUND_ALT}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      {/* Mobile / tablet: crop band behind the main headline so the logo fills that vertical slice */}
      <div
        className="pointer-events-none absolute inset-x-0 z-0 top-[calc(var(--nav-h)+4.5rem)] h-[min(50svh,26.5rem)] max-lg:block sm:top-[calc(var(--nav-h)+5rem)] sm:h-[min(48svh,28rem)] lg:hidden"
        aria-hidden
      >
        <Image
          src={HERO_BACKGROUND_IMAGE}
          alt=""
          fill
          priority
          className="object-cover object-[50%_40%] sm:object-[50%_38%]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/20" />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-5 pb-16 pt-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs uppercase tracking-editorial text-cream/70">
            Taqueria Ibarra Food Truck · Authentic Mexican Food
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-cream sm:text-6xl lg:text-7xl">
            AUTHENTIC MEXICAN
            <br />
            FOOD, FAST FROM
            <br />
            THE TRUCK.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            Order carryout or delivery from Taqueria Ibarra Food Truck in Kansas City — tacos,
            birria, tortas, burritos, quesadillas, and more made fresh on North Brighton.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-2 lg:w-auto"
        >
          <Cta primary label="Start order" onClick={openOrderPanel} />
          <Cta label="View menu" onClick={focusMenu} />
          <Cta label="Find us" onClick={() => scrollToSection("locations")} />
          <Cta label="Catering" onClick={focusCatering} />
        </motion.div>
      </div>
    </section>
  );
}

function Cta({
  label,
  onClick,
  primary,
}: {
  label: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        primary
          ? "rounded-full bg-salsa px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-editorial text-cream shadow-lg transition hover:bg-salsa/90 sm:text-[11px]"
          : "rounded-full border border-white/20 bg-black/30 px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-editorial text-cream backdrop-blur-sm transition hover:bg-black/40 sm:text-[11px]"
      }
    >
      {label}
    </button>
  );
}
