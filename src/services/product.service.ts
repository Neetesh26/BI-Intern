import { ProductModel } from "../models/productSchema";

const getAllProducts = async () => {
    // find all products from the database and return them
    const products = await ProductModel.find();
    return products;
}
export default getAllProducts;