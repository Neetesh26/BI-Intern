import passport from "../config/passport";
import asyncWrapper from "../middleware/asyncWrapper";
import { Request, Response } from "express";
import { sendOTPService, verifyOTPService } from "../services/auth.service";
import { HttpStatus } from "../constants";
import { generateToken } from "../shared/helper";
import { getEnv } from "../config/env";
import User from "../models/usersSchema";
// import { generateToken } from "../shared/helper";
  // import { getEnv } from "../config/env";

  export const sendOTPController = asyncWrapper(
    async (req: Request, res: Response) => {
      const { email } = req.body;

      const response = await sendOTPService(email);

      return res.status(HttpStatus.OK).json({
        message: response.message,
      });
    }
  );

  export const verifyOTPController = asyncWrapper(
    async (req: Request, res: Response) => {
      const { email, otp } = req.body;

      const data = await verifyOTPService(email, otp);

      return res.status(HttpStatus.OK).json({
        message: "Login successful",
        data,
      });
    }
  );


export const findUserByEmailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("calling controller")
    const { email } = req.query as { email?: string };

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("findUserByEmail error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// Start Google OAuth
export const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Callback after Google login
export const googleAuthCallback = (req: Request, res: Response, next: any) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      // Failed login → redirect to frontend login page
      return res.redirect(`${getEnv("FRONTEND_URL")}/login`);
    }

    // Successful login → generate JWT token
    const token = generateToken({ id: user._id, email: user.email }, process.env.JWT_SECRET!);

    // Redirect to frontend with token in query params
    return res.redirect(
  `${getEnv("FRONTEND_URL")}/oAuth-success?email=${user.email}&id=${user._id}&token=${token}`
);
  })(req, res, next);
};