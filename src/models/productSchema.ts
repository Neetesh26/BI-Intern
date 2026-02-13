import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      currency: {
        type: String,
        enum: ["INR", "USD"],
        default: "INR",
      },
      amount: {
        type: Number,
        required: true,
      },
    },
    category: {
      type: String,
      enum: ["MENS", "WOMENS", "KIDS"],
      default: "KIDS",
    },
    sizes: [
      {
        type: String,
        default: "L",
      },
    ],
    colors: [
      {
        type: String,
        required: true,
      },
    ],
    images: [
      {
        type: String,
        required: true,
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const ProductModel = mongoose.model("product", productSchema);
