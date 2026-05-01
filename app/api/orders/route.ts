import { NextResponse } from "next/server";
import type {
  CartLine,
  CustomerInfo,
  FulfillmentType,
  PickupLocationId,
  OrderDeliveryPayload,
} from "@/lib/types/order";

type PaymentMode = "request" | "clover";

type Body = {
  paymentMode?: PaymentMode;
  /** @deprecated use paymentMode: "clover" instead */
  mode?: "request" | "payment";
  fulfillment?: FulfillmentType;
  fulfillmentType?: FulfillmentType;
  pickupLocation?: PickupLocationId;
  pickup?: { locationId?: PickupLocationId };
  delivery?: OrderDeliveryPayload;
  items?: CartLine[];
  customer?: CustomerInfo;
  requestedTime?: string;
  orderNotes?: string;
  subtotalCents?: number | null;
  taxCents?: number | null;
  tipCents?: number | null;
  deliveryFeeCents?: number | null;
  totalCents?: number | null;
  cloverToken?: string;
};

function resolvePaymentMode(body: Body): PaymentMode {
  if (body.paymentMode === "clover") return "clover";
  if (body.paymentMode === "request") return "request";
  if (body.mode === "payment") return "clover";
  return "request";
}

function resolveFulfillment(body: Body): FulfillmentType | null {
  const f = body.fulfillment ?? body.fulfillmentType;
  if (f === "pickup" || f === "delivery") return f;
  return null;
}

function isCartLine(x: unknown): x is CartLine {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const price = o.unitPriceCents;
  const priceOk = price === null || typeof price === "number";
  return (
    typeof o.id === "string" &&
    typeof o.menuItemId === "string" &&
    typeof o.name === "string" &&
    typeof o.quantity === "number" &&
    priceOk
  );
}

function validateCustomer(customer: CustomerInfo | undefined) {
  if (
    !customer ||
    typeof customer.name !== "string" ||
    customer.name.trim().length < 2 ||
    typeof customer.phone !== "string" ||
    customer.phone.trim().length < 7
  ) {
    return "Customer name and phone are required";
  }
  return null;
}

function deliveryAddressFromBody(body: Body): string {
  const nested = body.delivery?.address?.trim();
  if (nested) return nested;
  return body.customer?.addressLine1?.trim() ?? "";
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const paymentMode = resolvePaymentMode(body);
  const fulfillment = resolveFulfillment(body);

  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json({ ok: false, error: "Cart is empty" }, { status: 400 });
  }
  if (!body.items.every(isCartLine)) {
    return NextResponse.json({ ok: false, error: "Invalid line items" }, { status: 400 });
  }

  if (!fulfillment) {
    return NextResponse.json({ ok: false, error: "Invalid fulfillment" }, { status: 400 });
  }

  const custErr = validateCustomer(body.customer);
  if (custErr) {
    return NextResponse.json({ ok: false, error: custErr }, { status: 400 });
  }

  if (fulfillment === "delivery") {
    const addr = deliveryAddressFromBody(body);
    if (addr.length < 5) {
      return NextResponse.json(
        { ok: false, error: "Delivery address is required" },
        { status: 400 },
      );
    }
  }

  if (paymentMode === "clover") {
    if (fulfillment === "delivery") {
      return NextResponse.json(
        { ok: false, error: "Card payment is not enabled for delivery yet" },
        { status: 400 },
      );
    }
    const token = body.cloverToken;
    if (!token || typeof token !== "string" || token.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Missing or invalid Clover token" },
        { status: 400 },
      );
    }
    const hasNull = body.items.some((i) => i.unitPriceCents === null);
    if (hasNull) {
      return NextResponse.json(
        { ok: false, error: "Cannot charge while items have Price TBD" },
        { status: 400 },
      );
    }
    const nums =
      typeof body.subtotalCents === "number" &&
      typeof body.taxCents === "number" &&
      typeof body.tipCents === "number" &&
      typeof body.deliveryFeeCents === "number" &&
      typeof body.totalCents === "number";
    if (!nums) {
      return NextResponse.json({ ok: false, error: "Invalid totals" }, { status: 400 });
    }
  }

  if (paymentMode === "request") {
    const orderId = `REQ-${Date.now()}`;
    const hasNullPrice = body.items.some((i) => i.unitPriceCents === null);
    let message =
      fulfillment === "delivery"
        ? "Delivery request ready. We’ll confirm pricing, delivery availability, and arrival time."
        : "Order request ready. We’ll confirm pricing and pickup time.";
    if (hasNullPrice) {
      message += " Final price confirmed before your order is prepared.";
    }

    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console -- demo / owner visibility
      console.info("[orders:request]", {
        orderId,
        fulfillment,
        fulfillmentType: body.fulfillmentType ?? fulfillment,
        pickup: body.pickup ?? (fulfillment === "pickup" ? { locationId: body.pickupLocation } : undefined),
        delivery:
          body.delivery ??
          (fulfillment === "delivery"
            ? {
                address: deliveryAddressFromBody(body),
                unit: body.customer?.addressLine2?.trim() || undefined,
                instructions: body.customer?.deliveryInstructions?.trim() || undefined,
              }
            : undefined),
        orderNotes: body.orderNotes,
        requestedTime: body.requestedTime,
        lineCount: body.items.length,
      });
    }

    return NextResponse.json({
      ok: true,
      orderId,
      paymentMode: "request",
      message,
    });
  }

  const orderId = `TI-${Date.now().toString(36).toUpperCase()}`;
  return NextResponse.json({
    ok: true,
    orderId,
    paymentMode: "clover",
    message: "Payment recorded (demo).",
    echo: {
      fulfillment,
      lineCount: body.items.length,
      totalCents: body.totalCents,
    },
  });
}
