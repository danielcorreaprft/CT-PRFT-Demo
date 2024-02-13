import { Router } from 'express'
import { ProductController } from '../controller'

const productController = new ProductController()

const router = Router()
const { getProducts } = productController


/**
 * TODO: fill properties
 * @swagger
 * /product:
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
router.get('/product', getProducts.bind(productController))

export default router