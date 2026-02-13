import express from "express"
import { addProductController, adminLogin, updateProductController,  } from "../controllers/adminAuth.controller"
import { upload } from "../services/multer.service"


const router = express.Router()

// router.get('/', (_req,res)=>{
//     res.send("working admin route")
// })

router.post('/login',adminLogin)
router.post('/create-Product',upload.array("images"),addProductController)
router.put('/product-update/:productId', updateProductController)




export default router