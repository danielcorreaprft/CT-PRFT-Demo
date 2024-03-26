import {Router} from "express";
import product from "./product"
import category from "./category"
import cart from "./cart"
import customer from "./customer";
import order from "./order";

const router = Router();

router.use(product)
router.use(category)
router.use(cart)
router.use(customer)
router.use(order)
export default router;

