import express from "express";
import {
  createOrderController,
  getUserOrdersController,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/create", createOrderController);
router.get("/user/:userId", getUserOrdersController);

export default router;