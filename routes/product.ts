import { Router } from 'express'
import { ProductController } from '../controller'

const productController = new ProductController()

const router = Router()
const { getProducts, getProductByKey, getProductById, getVariantByIdForProduct } = productController

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
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/product/:key', getProductByKey.bind(productController))

/**
 * TODO: fill properties
 * @swagger
 * /product/{ID}:
 *   get:
 *     summary: Returns product for given ID.
 *     parameters:
 *      - in: path
 *        name: ID
 *        description: ID of the product
 *     responses:
 *       200:
 *         description: A single products.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/product/:ID', getProductById.bind(productController))

/**
 * TODO: fill properties
 * @swagger
 * /product/variant/{variantId}:
 *   get:
 *     summary: Returns variant for given ID and product.
 *     parameters:
 *      - in: path
 *        name: variantId
 *        description: ID of the variant
 *     responses:
 *       200:
 *         description: A single variant.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/product/variant/:variantId', getVariantByIdForProduct.bind(productController))

export default router
