import { HttpMessage, HttpStatus } from "../constants";
import NotFoundHandler from "../errors/NotFoundHandler";
import { findByCondition } from "../repository/users.repository";
import { generateOTP } from "../shared/helper";
import twillioService from "./twillio.service";
import { createProductDataInDB } from "../repository/product.repository";

export const adminLoginServices = async (phone: string) => {
  const user = await findByCondition({ phone :phone})

  if (!user || user.role !== "admin") {
    throw new NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  const otp = generateOTP();

  user.isverified=false
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  const successfullySendOtp = await twillioService.sendOTP(phone, otp);
  if (!successfullySendOtp) {
    throw new NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  await user.save();
  return user;
}


export const createProducts = async (data: any) => {
  const product = await createProductDataInDB(data)
  if(!product){
    throw new NotFoundHandler(HttpMessage.NOT_FOUND,HttpStatus.NOT_FOUND)
  }
  return product;
};
