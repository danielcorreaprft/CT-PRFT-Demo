import { Router } from 'express'
import { ProductController } from '../controller'

const productController = new ProductController()

const router = Router()
const { getProducts, getProductByKey } = productController

/**
 * TODO: fill properties
 * @swagger
 * /products:
 *   get:
 *     summary: Returns all products.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Product ID.
 *                   name:
 *                     type: string
 *                     description: Product's name.
 */
router.get('/products', getProducts.bind(productController))

router.get('/product/:key', getProductByKey.bind(productController))

export default router
