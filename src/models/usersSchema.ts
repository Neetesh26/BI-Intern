import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  isverified:{
    type: Boolean,
    default: false,
  },
  token:{
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
});

export default mongoose.model("User", userSchema);
