import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  stripePaymentMethodId: String,
  brand: String,
  last4: String,
  expMonth: Number,
  expYear: Number,
});

export const Card = mongoose.model("Card", cardSchema);