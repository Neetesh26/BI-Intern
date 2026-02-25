import { Request, Response } from "express";
// import stripe from "../config/stripeInstance";
import { paymentServices } from "../services/paymentGateway.service";
import { HttpMessage } from "../constants";

interface ProductItem {
  id: string;
  name: string;
  // image: string;
  price: number;
}

interface CheckoutBody {
  product: ProductItem[];
}

export const createCheckoutSession = async (
  req: Request<{}, {}, CheckoutBody>,
  res: Response
) => {
  try {
    // console.log("BODY:", req.body);

    const { product } = req.body;

    const session = await paymentServices(product);

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({
      error:
        error instanceof Error ? error.message : HttpMessage.INTERNAL_SERVER_ERROR,
    });
  }
};