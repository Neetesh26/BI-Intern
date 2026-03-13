import express from "express";
import {
  addProductController,
  adminLogin,
  deleteProductController,
  getAllOrdersController,
  updateOrderStatusController,
//   getAllOrdersController,
//   updateOrderStatusController
} from "../controllers/adminAuth.controller";

import { upload } from "../services/multer.service";
import { getEnv } from "../shared/utils";
import { verifyToken } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = express.Router();

router.post(getEnv("ADMIN_LOGIN"), adminLogin);

router.post(
  getEnv("CREATE_PRODUCT_API"),
  verifyToken,isAdmin,
  upload.array("images", 3),
  addProductController
);

// NEW ROUTES

router.get(
  '/orders',
  verifyToken,isAdmin,
  getAllOrdersController
);

router.patch(
  '/orders/:id',
  verifyToken,isAdmin,
  updateOrderStatusController
);
router.delete(
  "/delete-product/:id",
  verifyToken,isAdmin,
  deleteProductController
);

export default router;