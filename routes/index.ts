import {Router} from "express";
import product from "./product"
import category from "./category"
import cart from "./cart"
import customer from "./customer";

const router = Router();

router.use(product)
router.use(category)
router.use(cart)
router.use(customer)
export default router;

