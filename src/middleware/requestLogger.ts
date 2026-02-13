import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

export const requestLoggerGlobal = (
  req: Request,_res: Response,next: NextFunction) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};
