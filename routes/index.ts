import {Router} from "express";
import product from "./product"
import category from "./category"

const router = Router();

router.use(product)
router.use(category)
export default router;

