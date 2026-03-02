import { Request, Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { adminLoginServices } from "../services/adminAuth.service";
import NotFoundHandler from "../errors/NotFoundHandler";
import { HttpMessage, HttpStatus } from "../constants";
import { uploadToImageKit } from "../services/storage.service";
import { ProductModel } from "../models/productSchema";


export const adminLogin = asyncWrapper(
  async (req: Request, res: Response) => {
  const { phone } = req.body;
  const user = await adminLoginServices(phone)
  if (!user) {
    throw new NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND)
  }
  return res.status(HttpStatus.OK).json({
    message: HttpMessage.OK,
    user: user
  });
}
)


export const addProductController = async (
  req: Request,
  res: Response
) => {
  try {

    // ✅ Properly cast req.files
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    // ✅ Now TypeScript knows it's an array
    const uploadedImages = await Promise.all(
      files.map((file: Express.Multer.File) =>
        uploadToImageKit(file.buffer, file.originalname)
      )
    );

    // ✅ Safe sizes parsing
    let sizes: string[] = [];
    if (req.body.sizes) {
      try {
        sizes = JSON.parse(req.body.sizes);
      } catch {
        sizes = [];
      }
    }

    const product = await ProductModel.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      subCategory: req.body.subCategory || "General",
      sizes: sizes,
      image: uploadedImages.map((img: any) => img.url),
      bestseller: req.body.bestseller === "true",
    });

    return res.status(201).json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.error("Add product error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// export const updateProductController = asyncWrapper(
//   async (req: Request, res: Response) => {

//     const { productId } = req.params;
//     console.log("product id",productId);
    
//     const updatedProduct = await updateProductService(
//       productId,
//       req.body,
//       req.files as Express.Multer.File[]
//     );

//     return res.status(HttpStatus.OK).json({
//       message: HttpMessage.OK,
//       data: updatedProduct,
//     });
//   }
// );

