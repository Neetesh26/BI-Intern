
import { ProductModel } from "../models/productSchema";


export const createProductDataInDB = async (data: any) => {
  return await ProductModel.create(data);
};

export const findByCondition = async (obj: Record<string, string | number>) => {

  return await ProductModel.findOne(obj);
};


export const findMany = async (obj: Record<string, string | number>) => {
  return await ProductModel.find(obj);
};

export const updateOne = async (
  condition: Record<string, string | number>,
  data: Record<string, string | number>
) => {
  return await ProductModel.findOneAndUpdate(
    condition,
    data,
    { new: true }
  );
};

export const updateById = async (
  id: string,
  data: Record<string, string | number>
) => {
  return await ProductModel.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

export const deleteOne = async (
  condition: Record<string, string | number>
) => {
  return await ProductModel.findOneAndDelete(condition);
};

export const deleteUserById = async (ids: string | number) => {
  return await ProductModel.findByIdAndDelete(ids);
};
