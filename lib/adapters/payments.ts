export type CheckoutSessionInput = { email: string; items: Array<{ slug: string; quantity: number }>; fulfillment: "pickup" | "shipping" };
export interface PaymentsAdapter { createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string }>; refund(orderId: string, amount?: number): Promise<void>; }
class DisabledPaymentsAdapter implements PaymentsAdapter {
  async createCheckoutSession(): Promise<{ url: string }> { throw new Error("Payments are disabled until church-confirmed settings are configured."); }
  async refund(): Promise<void> { throw new Error("Payments are disabled."); }
}
export const paymentsAdapter: PaymentsAdapter = new DisabledPaymentsAdapter();
