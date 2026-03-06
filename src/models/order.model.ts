import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        images: [String],
      },
    ],

    paymentId: String,

    status: {
      type: String,
      default: "paid",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);