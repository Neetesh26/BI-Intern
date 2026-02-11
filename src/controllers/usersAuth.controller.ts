import asyncWrapper from "../middleware/asyncWrapper";
import { Request, Response } from "express";
import { registerUser, verifyUserOTP } from "../services/auth.service";
import { HttpMessage, HttpStatus } from "../constants";

export const signupUser = asyncWrapper(async (req: Request, res: Response) => {
  const { phone } = req.body as { phone: string };

  const user = await registerUser(phone);

  return res.status(HttpStatus.CREATED).json({
    message: HttpMessage.CREATED,
    data: user,
  });
});

export const verifyUserOTPController = asyncWrapper(
  async (req: Request<{ phone: string }>, res: Response) => {
    console.log("bkjbkjkjb");
    
    console.log(req.params);
    
    const { phone } = req.params;
    console.log(phone);
    
    const { otp } = req.body as { otp: string };

    const user = await verifyUserOTP(phone, otp);

    return res.status(HttpStatus.OK).json({
      message: "OTP verified successfully",
      data: user,
    });
  }
);
