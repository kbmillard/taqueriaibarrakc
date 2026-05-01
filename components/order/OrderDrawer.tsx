"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { useMenuCatalog } from "@/context/MenuCatalogContext";
import { useLocationsCatalog } from "@/context/LocationsCatalogContext";
import { formatOptionLine } from "@/lib/menu/option-groups";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils/cn";

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function linePriceLabel(cents: number | null) {
  if (cents === null) return "Price TBD";
  return `${formatMoney(cents)} each`;
}

function lineLineTotal(cents: number | null, qty: number) {
  if (cents === null) return "Price TBD";
  return formatMoney(cents * qty);
}

export function OrderDrawer() {
  const { itemsById } = useMenuCatalog();
  const { data: locData } = useLocationsCatalog();
  const {
    cart,
    updateQty,
    removeLine,
    fulfillment,
    setFulfillment,
    pickupLocation,
    setPickupLocation,
    customer,
    setCustomer,
    requestedTime,
    setRequestedTime,
    orderNotes,
    setOrderNotes,
    tipPreset,
    setTipPreset,
    customTipCents,
    setCustomTipCents,
    subtotalCents,
    taxCents,
    deliveryFeeCents,
    tipCents,
    totalCents,
    orderDrawerOpen,
    setOrderDrawerOpen,
    setPaymentModalOpen,
    canOpenPayment,
    canSendOrderRequest,
    cartHasUnpricedItems,
    orderStatus,
    orderError,
    confirmationId,
    successMessage,
    submitOrderRequest,
  } = useOrder();

  const restaurants = locData?.restaurantLocations ?? [];
  const trucks = locData?.foodTruckLocations ?? [];
  const primaryRestaurant = restaurants[0];
  const primaryTruck = trucks[0];

  return (
    <AnimatePresence>
      {orderDrawerOpen ? (
        <>
          <motion.button
            key="order-backdrop"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close cart"
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm sm:bg-black/50"
            onClick={() => setOrderDrawerOpen(false)}
          />
          <motion.aside
            key="order-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[70] flex max-h-[92vh] flex-col rounded-t-3xl border border-white/10 bg-charcoal shadow-2xl",
              "sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-[min(440px,100%)] sm:rounded-none sm:rounded-l-3xl",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Order and checkout"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <BrandLogo width={48} height={48} />
                <div>
                  <p className="text-xs uppercase tracking-editorial text-cream/60">
                    Live order
                  </p>
                  <p className="font-display text-xl text-cream">Your cart</p>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 p-2 text-cream hover:bg-white/5"
                onClick={() => setOrderDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-5">
              {confirmationId ? (
                <div className="rounded-2xl border border-agave/40 bg-agave/10 p-4 text-cream">
                  <p className="font-display text-2xl">You are in.</p>
                  <p className="mt-2 text-sm text-cream/80">
                    Reference{" "}
                    <span className="font-mono text-cream">{confirmationId}</span>
                  </p>
                  {successMessage ? (
                    <p className="mt-2 text-sm text-cream/90">{successMessage}</p>
                  ) : null}
                </div>
              ) : null}

              {orderStatus === "error" && orderError ? (
                <p className="rounded-xl border border-salsa/40 bg-salsa/10 p-3 text-sm text-cream">
                  {orderError}
                </p>
              ) : null}

              {cartHasUnpricedItems && cart.length > 0 ? (
                <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-cream/80">
                  Final price confirmed at pickup for items marked Price TBD. You can still send an
                  order request — we will confirm pricing and pickup time.
                </p>
              ) : null}

              <section aria-label="Cart items">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 py-12 text-center text-cream/70">
                    <ShoppingBag className="h-10 w-10 opacity-50" />
                    <p className="text-sm">
                      Add from the menu — your cart updates instantly.
                    </p>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {cart.map((line) => (
                      <li
                        key={line.id}
                        className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex min-w-0 items-baseline gap-2">
                            <span className="truncate font-medium text-cream">{line.name}</span>
                            <span
                              className="min-w-[1rem] flex-1 border-b border-dotted border-cream/20"
                              aria-hidden
                            />
                            <span className="shrink-0 text-xs text-cream/70">
                              {linePriceLabel(line.unitPriceCents)}
                            </span>
                          </div>
                          {line.selectedMeat ? (
                            <p className="mt-1 text-xs text-cream/65">{line.selectedMeat}</p>
                          ) : null}
                          {line.selectedOptions && Object.keys(line.selectedOptions).length > 0
                            ? Object.entries(line.selectedOptions).map(([gid, val]) => {
                                const menuItem = itemsById.get(line.menuItemId);
                                const group = menuItem?.optionGroups?.find((g) => g.id === gid);
                                const label = group
                                  ? formatOptionLine(group, val)
                                  : `${gid}: ${val}`;
                                return (
                                  <p key={gid} className="mt-1 text-xs text-cream/70">
                                    {label}
                                  </p>
                                );
                              })
                            : null}
                          {line.includesFries ? (
                            <span className="mt-1 inline-block rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-editorial text-cream/75">
                              With fries
                            </span>
                          ) : null}
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              type="button"
                              className="rounded-full border border-white/15 p-1.5 hover:bg-white/5"
                              onClick={() => updateQty(line.id, line.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-6 text-center text-sm">{line.quantity}</span>
                            <button
                              type="button"
                              className="rounded-full border border-white/15 p-1.5 hover:bg-white/5"
                              onClick={() => updateQty(line.id, line.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button
                            type="button"
                            className="text-cream/50 hover:text-salsa"
                            onClick={() => removeLine(line.id)}
                            aria-label={`Remove ${line.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <p className="text-sm font-semibold text-cream">
                            {lineLineTotal(line.unitPriceCents, line.quantity)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-editorial text-cream/50">
                  Fulfillment
                </p>
                <div className="flex rounded-full border border-white/10 p-1">
                  <button
                    type="button"
                    className={cn(
                      "flex-1 rounded-full py-2 text-xs uppercase tracking-editorial",
                      fulfillment === "pickup"
                        ? "bg-cream text-charcoal"
                        : "text-cream/70",
                    )}
                    onClick={() => setFulfillment("pickup")}
                  >
                    Pickup
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "flex-1 rounded-full py-2 text-xs uppercase tracking-editorial",
                      fulfillment === "delivery"
                        ? "bg-cream text-charcoal"
                        : "text-cream/70",
                    )}
                    onClick={() => setFulfillment("delivery")}
                  >
                    Delivery
                  </button>
                </div>
                {fulfillment === "pickup" ? (
                  <div className="space-y-2">
                    <p className="text-xs text-cream/50">Pickup location</p>
                    <div className="flex flex-col gap-2">
                      {primaryRestaurant ? (
                        <button
                          type="button"
                          className={cn(
                            "rounded-xl border px-3 py-2 text-left text-xs",
                            pickupLocation === "restaurant"
                              ? "border-cream bg-cream/10 text-cream"
                              : "border-white/10 text-cream/80 hover:bg-white/5",
                          )}
                          onClick={() => setPickupLocation("restaurant")}
                        >
                          {primaryRestaurant.name} — {primaryRestaurant.address}
                        </button>
                      ) : null}
                      {primaryTruck ? (
                        <button
                          type="button"
                          className={cn(
                            "rounded-xl border px-3 py-2 text-left text-xs",
                            pickupLocation === "truck"
                              ? "border-cream bg-cream/10 text-cream"
                              : "border-white/10 text-cream/80 hover:bg-white/5",
                          )}
                          onClick={() => setPickupLocation("truck")}
                        >
                          {primaryTruck.name} — {primaryTruck.address}
                        </button>
                      ) : null}
                      {!primaryRestaurant && !primaryTruck ? (
                        <p className="text-xs text-cream/60">
                          Pickup locations load from the catalog — refresh if this stays empty.
                        </p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
                {fulfillment === "delivery" ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="text-xs text-cream/60 sm:col-span-2">
                      Street
                      <input
                        className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                        value={customer.addressLine1 ?? ""}
                        onChange={(e) => setCustomer({ addressLine1: e.target.value })}
                      />
                    </label>
                    <label className="text-xs text-cream/60">
                      City
                      <input
                        className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                        value={customer.city ?? ""}
                        onChange={(e) => setCustomer({ city: e.target.value })}
                      />
                    </label>
                    <label className="text-xs text-cream/60">
                      State
                      <input
                        className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                        value={customer.state ?? ""}
                        onChange={(e) => setCustomer({ state: e.target.value })}
                      />
                    </label>
                    <label className="text-xs text-cream/60 sm:col-span-2">
                      ZIP
                      <input
                        className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                        value={customer.postalCode ?? ""}
                        onChange={(e) => setCustomer({ postalCode: e.target.value })}
                      />
                    </label>
                  </div>
                ) : null}
              </section>

              <section className="grid gap-3 sm:grid-cols-2">
                <label className="text-xs text-cream/60">
                  Name
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                    value={customer.name}
                    onChange={(e) => setCustomer({ name: e.target.value })}
                    autoComplete="name"
                  />
                </label>
                <label className="text-xs text-cream/60">
                  Phone
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ phone: e.target.value })}
                    inputMode="tel"
                    autoComplete="tel"
                  />
                </label>
                <label className="text-xs text-cream/60 sm:col-span-2">
                  Email (optional)
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                    value={customer.email ?? ""}
                    onChange={(e) => setCustomer({ email: e.target.value })}
                    autoComplete="email"
                  />
                </label>
                <label className="text-xs text-cream/60 sm:col-span-2">
                  Requested time
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    placeholder="e.g. Today 7:30 PM"
                  />
                </label>
                <label className="text-xs text-cream/60 sm:col-span-2">
                  Order notes (optional)
                  <textarea
                    className="mt-1 min-h-[80px] w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  />
                </label>
              </section>

              {!cartHasUnpricedItems ? (
                <section className="space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-editorial text-cream/50">Tip</p>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ["none", "No tip"],
                        ["15", "15%"],
                        ["18", "18%"],
                        ["20", "20%"],
                        ["custom", "Custom"],
                      ] as const
                    ).map(([id, label]) => (
                      <button
                        key={id}
                        type="button"
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-xs uppercase tracking-editorial",
                          tipPreset === id
                            ? "border-cream bg-cream text-charcoal"
                            : "border-white/15 text-cream/80 hover:bg-white/5",
                        )}
                        onClick={() => setTipPreset(id)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  {tipPreset === "custom" ? (
                    <label className="text-xs text-cream/60">
                      Custom tip (USD)
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-charcoal px-3 py-2 text-sm text-cream"
                        value={customTipCents / 100}
                        onChange={(e) =>
                          setCustomTipCents(Math.round(Number(e.target.value || 0) * 100))
                        }
                      />
                    </label>
                  ) : null}
                </section>
              ) : null}

              <section className="space-y-2 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm">
                {cartHasUnpricedItems ? (
                  <>
                    <Row label="Subtotal" value="—" />
                    <p className="text-xs text-cream/55">
                      Subtotal shown once every item has a confirmed menu price.
                    </p>
                  </>
                ) : (
                  <>
                    <Row label="Subtotal" value={formatMoney(subtotalCents)} />
                    {deliveryFeeCents > 0 ? (
                      <Row label="Delivery" value={formatMoney(deliveryFeeCents)} />
                    ) : null}
                    <Row label="Tax (est.)" value={formatMoney(taxCents)} />
                    <Row label="Tip" value={formatMoney(tipCents)} />
                    <div className="my-2 border-t border-white/10" />
                    <Row label="Total" value={formatMoney(totalCents)} strong />
                  </>
                )}
              </section>

              {/* TODO: Wire SMS, email, Toast, Square, or POS when replacing mock order routes. */}
            </div>

            <footer className="space-y-3 border-t border-white/10 p-5">
              {/* TODO: Replace null prices with confirmed restaurant pricing before enabling real payment checkout. */}
              {cartHasUnpricedItems ? (
                <button
                  type="button"
                  disabled={!canSendOrderRequest}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-salsa py-3 text-sm font-semibold uppercase tracking-editorial text-cream shadow-lg transition hover:bg-salsa/90 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => submitOrderRequest()}
                >
                  Send Order Request
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canOpenPayment}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-salsa py-3 text-sm font-semibold uppercase tracking-editorial text-cream shadow-lg transition hover:bg-salsa/90 disabled:cursor-not-allowed disabled:opacity-40"
                  onClick={() => setPaymentModalOpen(true)}
                >
                  Pay with card (Clover)
                </button>
              )}
              {!canSendOrderRequest ? (
                <p className="text-center text-xs text-cream/50">
                  Add items, name, phone, requested time
                  {fulfillment === "delivery" ? ", and delivery address" : ""} to continue.
                </p>
              ) : null}
            </footer>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={strong ? "text-cream" : "text-cream/70"}>{label}</span>
      <span className={strong ? "font-semibold text-cream" : "text-cream"}>{value}</span>
    </div>
  );
}
