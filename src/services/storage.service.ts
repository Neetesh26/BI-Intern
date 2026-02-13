import ImageKit from "imagekit";
import { getEnv } from "../shared/utils";
import { UploadResponse } from "imagekit/dist/libs/interfaces";

const storageInstance = new ImageKit({
  publicKey: getEnv("IMAGEKIT_PUBLICKEY"),
  privateKey: getEnv("IMAGEKIT_PRIVATEKEY"),
  urlEndpoint: getEnv("IMAGEKIT_URLENDPOINT"),
});

export const uploadToImageKit = async (
  file: Buffer,
  fileName: string
): Promise<UploadResponse> => {
  return await storageInstance.upload({
    file,
    fileName,
    folder: "BI",
  });
};
