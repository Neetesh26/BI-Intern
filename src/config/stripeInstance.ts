import Stripe from "stripe";
import { getEnv } from "./env";


if (!getEnv('STRIPE_SECRET_KEY')) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

export const stripe = new Stripe(getEnv('STRIPE_SECRET_KEY'), {
  apiVersion: "2026-01-28.clover", // use latest stable version
});

export default stripe;


/*
[User Clicks Purchase]
        ↓
[Frontend → Backend: Product + User Data]
        ↓
[Backend: Check stripeCustomerId in DB]
        ↓
[If No Customer → Create in Stripe → Save ID]
        ↓
[Backend: Create PaymentIntent → Save ID + client_secret]
        ↓
[Backend → Frontend: client_secret]
        ↓
[Frontend: stripe.confirmCardPayment()]
        ↓
[Stripe Processes Payment]
        ↓
[Stripe → Backend Webhook: payment_intent.succeeded]
        ↓
[Backend: Verify → Update Order Status → Fulfill] 
*/  





// stripe
//  firstly the stripe is click on  purchase button then the frontend will send a request to backend with the product details and user details then the backend will create a payment intent with the stripe and send the client secret to the frontend then the frontend will use the client secret to confirm the payment with the stripe and then the stripe will send a webhook to the backend with the payment status then the backend will update the order status in the database accordingly.

// no the stripe firstly checkout it is stripe customer or if it is not  so checkout   the steps is 1: in backend we define two keys in  user collection stripe page and customer id .
// 2: frontend call the backend. and backend will  check  is customer is exist or not behalf of that  validation we will create the customer in stripe and send it frontend and frontend takes the   debit card detailsin case payment id not exist and then it generate the unique payment id  and both keys in backend backend will maek this payment id  to the respective customer id and store it user collection 