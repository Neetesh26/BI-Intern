import { HttpMessage, HttpStatus } from "../constants";
import NotFoundHandler from "../errors/NotFoundHandler";
import { findByCondition } from "../repository/users.repository";
import { generateOTP } from "../shared/helper";
import twillioService from "./twillio.service";
import { createProductDataInDB, findBYIdCondition } from "../repository/product.repository";
import { uploadToImageKit } from "./storage.service";

export const adminLoginServices = async (phone: string) => {
  const user = await findByCondition({ phone: phone })

  if (!user || user.role !== "admin") {
    throw new NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }

  const otp = generateOTP();

  user.isverified = false
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
  if (!product) {
    throw new NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
  return product;
};



export const updateProductService = async (
  productId: string,
  body: any,
  files?: Express.Multer.File[]
) => {

  const product = await findBYIdCondition(productId)

  if (!product) {
    throw new NotFoundHandler(
      HttpMessage.NOT_FOUND,
      HttpStatus.NOT_FOUND
    );
  }

  if (body.productName !== undefined)
    product.productName = body.productName;

  if (body.description !== undefined)
    product.description = body.description;

  if (body.category !== undefined)
    product.category = body.category;

  if (body.sizes !== undefined)
    product.sizes = body.sizes;

  if (body.colors !== undefined)
    product.colors = body.colors;

if ((body.currency !== undefined || body.amount !== undefined) && !product.price) {
  product.price = {
    currency: body.currency,
    amount: Number(body.amount)
  };
}

// if (body.currency !== undefined) {
//   product.price!.currency = body.currency;
// }

// if (body.amount !== undefined) {
//   product.price!.amount = Number(body.amount);
// }


  if (files && files.length > 0) {
    const uploadedImages = await Promise.all(
      files.map((file) =>
        uploadToImageKit(file.buffer, file.originalname)
      )
    );

    product.images = uploadedImages.map((img: any) => img.url);
  }

  await product.save();

  return product;
};


