import express from "express"
import { addProductController, adminLogin } from "../controllers/adminAuth.controller"


const router = express.Router()

// router.get('/', (_req,res)=>{
//     res.send("working admin route")
// })

router.post('/login',adminLogin)
router.post('/create',addProductController)




export default router