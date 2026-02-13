import { Request, Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { adminLoginServices, createProducts } from "../services/adminAuth.service";
import NotFoundHandler from "../errors/NotFoundHandler";
import { HttpMessage, HttpStatus } from "../constants";

export const adminLogin = asyncWrapper(async (req: Request, res: Response) => {
     const { phone } = req.body;
      const user = adminLoginServices(phone)
      if(!user){
        throw new NotFoundHandler(HttpMessage.NOT_FOUND,HttpStatus.NOT_FOUND)
      }
    return res.status(HttpStatus.OK).json({
      message: "OTP send Successfully",
      user:user
    });
  
})


export const addProductController = asyncWrapper(async (req: Request, res: Response) => {
    const {
      productName,
      description,
      price,
      category,
      sizes,
      colors,
      images,
      user_id,
    } = req.body;

    if (!productName || !description || !price?.amount || !colors || !images || !user_id) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Required fields are missing",
      });
    }

    const product = await createProducts({
      productName,
      description,
      price,
      category,
      sizes,
      colors,
      images,
      user_id,
    });

    return res.status(HttpStatus.CREATED).json({
      message: "Product created successfully",
      data: product,
    });
  }
);

