import express from "express";
import { verifyToken } from "../middleware/auth.middleware";
import { getMyProfileController } from "../controllers/profile.controller";

const router = express.Router();

// PRIVATE ROUTE
router.get("/my-profile", verifyToken, getMyProfileController);

export default router;