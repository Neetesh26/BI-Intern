import { Response } from "express";

export const getMyProfileController = async (req: any, res: Response) => {
  try {

    const user = req.user;

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
};