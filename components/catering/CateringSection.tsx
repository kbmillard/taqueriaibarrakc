"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT } from "@/lib/data/locations";
import { scrollDocumentToAnchor } from "@/lib/utils/scroll-to-anchor";

const initial = {
  name: "",
  phone: "",
  email: "",
  eventDate: "",
  guestCount: "",
  message: "",
};

export function CateringSection() {
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section
      id="catering"
      className="scroll-mt-[calc(var(--nav-h)+16px)] py-24"
    >
      <div className="mx-auto max-w-[1100px] px-5 sm:px-8">
        <div id="catering-start" tabIndex={-1} className="outline-none focus:outline-none">
          <SectionHeading
            kicker="Catering & events"
            title="Feed the crowd — keep the line moving."
            subtitle="Office lunches, school celebrations, and block parties deserve hot tortillas and salsas with snap. Taqueria Ibarra scales the truck menu for groups — share your date, headcount, and vibe; we follow up to confirm details (demo form until email or CRM is wired)."
          />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-4 text-sm leading-relaxed text-cream/80"
          >
            <p>
              Catering stays request-only on this page until the team connects email or CRM. Use
              the form for a structured first pass — then call to lock the date.
            </p>
            <p>
              For North Brighton pickup questions, jump to locations and hours — this block is for
              off-site or large-format requests.
            </p>
            <p className="pt-2 text-sm text-cream/85">
              <a
                className="text-cream underline-offset-4 hover:underline"
                href={`tel:${CONTACT.phoneTel}`}
              >
                {CONTACT.phoneDisplay}
              </a>
              {CONTACT.email ? (
                <>
                  {" "}
                  ·{" "}
                  <a
                    className="text-cream underline-offset-4 hover:underline"
                    href={`mailto:${CONTACT.email}?subject=Catering%20inquiry`}
                  >
                    {CONTACT.email}
                  </a>
                </>
              ) : null}
            </p>
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="button"
                className="rounded-full bg-salsa px-5 py-2 text-[10px] font-semibold uppercase tracking-editorial text-cream"
                onClick={() => scrollDocumentToAnchor("catering-form")}
              >
                Catering form
              </button>
            </div>
          </motion.div>

          <form
            id="catering-form"
            onSubmit={onSubmit}
            className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-8"
          >
            {sent ? (
              <p className="rounded-2xl border border-agave/40 bg-agave/10 p-4 text-sm text-cream">
                Thanks — we captured your details on this page as a preview. Call{" "}
                <a className="font-medium underline" href={`tel:${CONTACT.phoneTel}`}>
                  {CONTACT.phoneDisplay}
                </a>{" "}
                to firm up the date and menu.
                {CONTACT.email ? (
                  <>
                    {" "}
                    You can also email{" "}
                    <a className="font-medium underline" href={`mailto:${CONTACT.email}`}>
                      {CONTACT.email}
                    </a>
                    .
                  </>
                ) : null}
              </p>
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                required
              />
              <Field
                label="Phone"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                required
              />
              <Field
                label="Email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                className="sm:col-span-2"
              />
              <Field
                label="Event date"
                value={form.eventDate}
                onChange={(v) => setForm((f) => ({ ...f, eventDate: v }))}
              />
              <Field
                label="Guest count"
                value={form.guestCount}
                onChange={(v) => setForm((f) => ({ ...f, guestCount: v }))}
              />
            </div>
            <label className="block text-xs text-cream/60">
              Additional info
              <textarea
                className="mt-1 min-h-[120px] w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              />
            </label>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="rounded-full bg-salsa px-6 py-3 text-xs font-semibold uppercase tracking-editorial text-cream"
              >
                Send catering request
              </button>
              <button
                type="button"
                className="rounded-full border border-white/15 px-6 py-3 text-xs uppercase tracking-editorial text-cream hover:bg-white/5"
                onClick={() => setForm(initial)}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  className,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className={`block text-xs text-cream/60 ${className ?? ""}`}>
      {label}
      <input
        required={required}
        className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
