import { getEnv } from "../config/env";
import { stripe } from "../config/stripeInstance";
import { HttpMessage } from "../constants";

export const paymentServices =async (product: any[]) => {
    if (!product || !Array.isArray(product) || product.length === 0) {
      throw new Error(HttpMessage.NOT_FOUND);
    }

    const line_items = product.map((item) => {
      const price = Number(item.price);

      if (isNaN(price)) {
        throw new Error(`Invalid price for ${item.name}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            // // images: [item.image],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: getEnv("Payment_Success_URL"),
      cancel_url: getEnv("Payment_Cancel_URL"),
    });
    return session;
}