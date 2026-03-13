import { Request, Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { adminLoginServices, deleteProductService, getAllOrdersService, updateOrderStatusService } from "../services/adminAuth.service";
import NotFoundHandler from "../errors/NotFoundHandler";
import { HttpMessage, HttpStatus } from "../constants";
import { uploadToImageKit } from "../services/storage.service";
// import { ProductModel } from "../models/productSchema";
import { createProducts } from "../services/adminAuth.service";



export const adminLogin = asyncWrapper(async (req: Request, res: Response) => {

  const { phone } = req.body;

  const user = await adminLoginServices(phone);

  if (!user) {
    throw new NotFoundHandler(HttpMessage.NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  return res.status(HttpStatus.OK).json({
    message: HttpMessage.OK,
    user,
  });

});



export const addProductController = asyncWrapper(
  async (req: Request, res: Response) => {

    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const uploadedImages = await Promise.all(
      files.map((file) =>
        uploadToImageKit(file.buffer, file.originalname)
      )
    );

    let sizes: string[] = [];

    if (req.body.sizes) {
      try {
        sizes = JSON.parse(req.body.sizes);
      } catch {
        sizes = [];
      }
    }

    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      subCategory: req.body.subCategory || "General",
      sizes,
      image: uploadedImages.map((img: any) => img.url),
      bestseller: req.body.bestseller === "true",
    };

    const product = await createProducts(productData);

    return res.status(201).json({
      success: true,
      data: product,
    });

  }
);



export const getAllOrdersController = asyncWrapper(
  async (_req: Request, res: Response) => {

    const orders = await getAllOrdersService();

    return res.status(200).json({
      success: true,
      data: orders
    });

  }
);



export const updateOrderStatusController = asyncWrapper(
  async (req: Request, res: Response) => {

    const { id } = req.params;
    const { status } = req.body;

    const order = await updateOrderStatusService(id, status);

    return res.status(200).json({
      success: true,
      data: order
    });

  }
);

export const deleteProductController = async (
  req: Request,
  res: Response
) => {

  const { id } = req.params;

  const deletedProduct = await deleteProductService(id);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    product: deletedProduct
  });

};