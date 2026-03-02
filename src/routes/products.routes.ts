import express from "express";
import getAllProductController from "../controllers/product.controller";

const router = express.Router();

// router.get('/', (_req,res)=>{
//     res.send("working product route")
// })

router.get('/', (_req,res)=>{
    res.send("working product route")
})
router.get('/getAllproducts',getAllProductController)
export default router