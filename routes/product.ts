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
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/products', getProducts.bind(productController))

/**
 * TODO: fill properties
 * @swagger
 * /product/{key}:
 *   get:
 *     summary: Returns product for given key.
 *     parameters:
 *      - in: path
 *        name: key
 *        description: key of the product
 *     responses:
 *       200:
 *         description: A single products.
 *         content:
 *           application/json:
 *             schema:
 *               type: Product
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/product/:key', getProductByKey.bind(productController))

export default router
