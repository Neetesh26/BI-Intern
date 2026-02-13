import express from "express"
import { addProductController, adminLogin } from "../controllers/adminAuth.controller"
import { upload } from "../services/multer.service"


const router = express.Router()

// router.get('/', (_req,res)=>{
//     res.send("working admin route")
// })

router.post('/login',adminLogin)
router.post('/create-Product',upload.array("images"),addProductController)




export default router