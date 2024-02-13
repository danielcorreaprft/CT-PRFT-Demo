import { Router } from 'express'
import { ProductController } from '../controller'

const productController = new ProductController()

const router = Router()
const { getProducts, getProductByKey } = productController

router.get('/products', getProducts.bind(productController))

router.get('/product/:key', getProductByKey.bind(productController))

export default router
