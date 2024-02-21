import {Router} from "express";
import product from "./product"
import category from "./category"
import cart from "./cart"

const router = Router();

router.use(product)
router.use(category)
router.use(cart)
export default router;

