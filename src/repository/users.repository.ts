import usersSchema from "../models/usersSchema";

export const createUser = async (data: any) => {
  return await usersSchema.create(data);
};

export const findUserByPhone = async (phone: string) => {
  return await usersSchema.findOne({ phone });
};

export const findUserById = async (id: string) => {
  return await usersSchema.findById(id);
};

export const getAllUsers = async () => {
  return await usersSchema.find();
};

export const updateUserByPhone = async (phone: string, data: any) => {
  return await usersSchema.findOneAndUpdate(
    { phone },
    data,
    { new: true } 
  );
};

export const updateUserById = async (id: string, data: any) => {
  return await usersSchema.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

export const deleteUserByPhone = async (phone: string) => {
  return await usersSchema.findOneAndDelete({ phone });
};

export const deleteUserById = async (id: string) => {
  return await usersSchema.findByIdAndDelete(id);
};
