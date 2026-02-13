import { Router } from "express";
import { HttpMessage, HttpStatus } from "../constants";

const router = Router();

router.get("/", (_, res) => {
  res.status(HttpStatus.OK).json({
    status: HttpMessage.OK,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
