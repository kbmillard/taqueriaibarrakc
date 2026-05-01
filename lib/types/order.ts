export type FulfillmentType = "pickup" | "delivery";

export type PickupLocationId = "restaurant" | "truck";

export type PaymentMode = "request" | "clover";

export type OrderStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "confirmed"
  | "error";

export type CartModifier = { id: string; label: string; priceCents: number };

export type CartLine = {
  id: string;
  menuItemId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  /** null until menu price is confirmed */
  unitPriceCents: number | null;
  quantity: number;
  notes?: string;
  modifiers?: CartModifier[];
  selectedMeat?: string;
  /** Values keyed by option group id (e.g. format → Gordita Maíz) */
  selectedOptions?: Record<string, string>;
  includesFries?: boolean;
};

/** Customer + delivery contact fields (flat for forms; API may nest into `delivery`). */
export type CustomerInfo = {
  name: string;
  phone: string;
  email?: string;
  /** Delivery street address (full line acceptable). */
  addressLine1?: string;
  /** Apt / suite / unit */
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  /** Notes for driver / drop-off (delivery). */
  deliveryInstructions?: string;
};

export type TipPreset = "none" | "15" | "18" | "20" | "custom";

export type OrderPickupPayload = {
  locationId?: PickupLocationId;
};

export type OrderDeliveryPayload = {
  address: string;
  unit?: string;
  instructions?: string;
};

export type OrderPayload = {
  paymentMode: PaymentMode;
  /** Primary fulfillment discriminator (backward compatible). */
  fulfillment: FulfillmentType;
  /** Same as `fulfillment` when clients send structured payloads. */
  fulfillmentType?: FulfillmentType;
  pickupLocation?: PickupLocationId;
  pickup?: OrderPickupPayload;
  delivery?: OrderDeliveryPayload;
  items: CartLine[];
  customer: CustomerInfo;
  /** Preferred pickup / arrival window — optional for demo requests. */
  requestedTime?: string;
  /** Special order notes (pickup or delivery). */
  orderNotes?: string;
  subtotalCents: number | null;
  taxCents: number | null;
  tipCents: number | null;
  deliveryFeeCents: number | null;
  totalCents: number | null;
  cloverToken?: string | null;
};
