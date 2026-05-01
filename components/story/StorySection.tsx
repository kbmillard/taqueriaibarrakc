"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

type StorySlide = {
  src: string;
  alt: string;
  lineEs: string;
  lineEn: string;
};

/** Six slides: four owner photos + the two original truck story images. */
const STORY_SLIDES: StorySlide[] = [
  {
    src: "/images/story-slides/01-menu-board.png",
    alt: "Taqueria Ibarra menu board with specials and phone number.",
    lineEs: "Carta en la pared",
    lineEn: "The menu you see at the window",
  },
  {
    src: "/images/story-slides/02-drinks-bucket.png",
    alt: "Assorted bottled sodas in a Farm Fresh bucket at the truck window.",
    lineEs: "Refrescos fríos",
    lineEn: "Cold drinks ready at the pass",
  },
  {
    src: "/images/story-slides/03-service-sign.png",
    alt: "Please hold your horses sign at the Taqueria Ibarra service counter.",
    lineEs: "Con calma",
    lineEn: "Good food is worth the short wait",
  },
  {
    src: "/images/story-slides/04-truck-canopy.png",
    alt: "Taqueria Ibarra food truck with canopy and menu on North Brighton.",
    lineEs: "La troca en KC",
    lineEn: "North Brighton nights, open neon",
  },
  {
    src: "/images/story/taqueria-truck-1.jpeg",
    alt: "Taqueria Ibarra Food Truck service window and warm lighting.",
    lineEs: "La fila avanza",
    lineEn: "the line keeps moving",
  },
  {
    src: "/images/story/taqueria-truck-2.avif",
    alt: "Taqueria Ibarra Food Truck tacos and street food on North Brighton.",
    lineEs: "Noches de KC",
    lineEn: "KC nights, same corner",
  },
];

const AUTO_ADVANCE_MS = 5400;
/** Ken Burns–style zoom-out duration (matches advance rhythm). */
const SLIDE_ZOOM_OUT_S = 5.35;
const ZOOM_START = 1.2;

export function StorySection() {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [zoomKeys, setZoomKeys] = useState(() => STORY_SLIDES.map(() => 0));
  const prevIndexRef = useRef(-1);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % STORY_SLIDES.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prevIndexRef.current === index) return;
    setZoomKeys((keys) => {
      const next = [...keys];
      next[index] += 1;
      return next;
    });
    prevIndexRef.current = index;
  }, [index]);

  const fadeDuration = prefersReducedMotion ? 0 : 1.05;
  const slide = STORY_SLIDES[index]!;

  return (
    <section
      id="story"
      className="scroll-mt-[calc(var(--nav-h)+16px)] bg-charcoal py-24"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            kicker="Family story"
            title="North Brighton regulars. KC nights."
            subtitle="Taqueria Ibarra Food Truck keeps the line moving with honest portions, salsas that bite back, and tortillas treated like they matter — built for carryout, delivery, and the block-party energy Kansas City loves."
          />
          <p className="mt-6 text-sm leading-relaxed text-cream/80">
            From tacos and quesabirria-style plates to burritos and tortas, the throughline is the
            same: practical food truck service with a premium feel — so your order feels as serious
            as the flavors.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none"
        >
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
            role="region"
            aria-roledescription="carousel"
            aria-label="Taqueria Ibarra Food Truck story slideshow"
          >
            {STORY_SLIDES.map((s, i) => (
              <motion.div
                key={s.src}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                }}
                transition={{
                  duration: fadeDuration,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-hidden={i !== index}
              >
                {!prefersReducedMotion ? (
                  <motion.div
                    key={zoomKeys[i]}
                    className="absolute inset-0 h-full w-full"
                    initial={{ scale: ZOOM_START }}
                    animate={{ scale: index === i ? 1 : ZOOM_START * 0.98 }}
                    transition={{
                      duration: index === i ? SLIDE_ZOOM_OUT_S : 0.32,
                      ease: index === i ? [0.08, 0.72, 0.2, 1] : [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 560px, 100vw"
                      priority={i === 0}
                    />
                  </motion.div>
                ) : (
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 560px, 100vw"
                    priority={i === 0}
                  />
                )}
              </motion.div>
            ))}
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent"
              aria-hidden
            />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
                  className="max-w-[18rem] rounded-2xl border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-editorial text-cream">
                    {slide.lineEs}
                  </p>
                  <p className="mt-1 font-display text-sm italic leading-snug text-cream/88">
                    {slide.lineEn}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div
              className="pointer-events-none absolute bottom-3 right-4 flex gap-1.5 sm:bottom-4 sm:right-6"
              aria-hidden
            >
              {STORY_SLIDES.map((dot, i) => (
                <span
                  key={dot.src}
                  className={`h-1.5 w-1.5 rounded-full transition ${i === index ? "bg-cream" : "bg-cream/35"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
