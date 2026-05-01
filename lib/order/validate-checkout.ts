import type { CustomerInfo, FulfillmentType } from "@/lib/types/order";

export type CheckoutValidationInput = {
  fulfillment: FulfillmentType;
  cartLength: number;
  customer: CustomerInfo;
};

/** Field keys match OrderDrawer error display slots. */
export function getCheckoutBlockingErrors(
  input: CheckoutValidationInput,
): Record<string, string> {
  const e: Record<string, string> = {};
  if (input.cartLength === 0) {
    e.cart = "Add at least one item to your cart.";
  }
  if (input.customer.name.trim().length < 2) {
    e.name = "Please enter your name.";
  }
  if (input.customer.phone.trim().length < 7) {
    e.phone = "Please enter a valid phone number.";
  }
  if (input.fulfillment === "delivery") {
    const addr = input.customer.addressLine1?.trim() ?? "";
    if (addr.length < 5) {
      e.deliveryAddress = "Delivery address is required.";
    }
  }
  return e;
}

export function isCheckoutValid(errors: Record<string, string>): boolean {
  return Object.keys(errors).length === 0;
}
