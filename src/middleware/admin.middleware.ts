import { Response, NextFunction, Request } from "express";

interface AuthRequest extends Request {
  user?: any;
}

export const isAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {

  if (!req.user || req.user.role !== "admin") {

    res.status(403).json({
      success: false,
      message: "Admin access only"
    });

    return;
  }

  next();
};