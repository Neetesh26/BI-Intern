import express from "express";
import { 
  loginUserController, 
  signupUser, 
  verifyUserOTPController 
} from "../controllers/usersAuth.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register user and send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "8989071137"
 *     responses:
 *       201:
 *         description: OTP sent successfully
 *       400:
 *         description: Bad request
 */
router.post("/signup", signupUser);


/**
 * @swagger
 * /auth/verify/{phone}:
 *   post:
 *     summary: Verify OTP using phone number
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *         description: User phone number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP or expired
 */
router.post("/verify/:phone", verifyUserOTPController);


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login verified user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "8989071137"
 *     responses:
 *       200:
 *         description: Login successful
 *       404:
 *         description: User not found
 */
router.post("/login", loginUserController);

export default router;
