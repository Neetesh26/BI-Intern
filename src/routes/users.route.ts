
import express from "express";
import { signupUser, verifyUserOTPController } from "../controllers/usersAuth.controller";

const router = express.Router();

 router.post('/signup', signupUser)
 router.post('/verify/:phone' , verifyUserOTPController)

 export default router;