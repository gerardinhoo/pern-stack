import express from "express";
import {getAllProducts, createProduct, getProduct, updateProduct, deleteProduct} from "../controllers/productControllers.js"

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.post('/', createProduct);
router.delete('/:id', deleteProduct)



export default router;