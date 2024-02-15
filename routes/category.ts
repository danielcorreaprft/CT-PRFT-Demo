import { Router } from 'express'
import { CategoryController } from '../controller'

const categoryController = new CategoryController()

const router = Router()
const { getProductsForCategory } = categoryController

/**
 * TODO: fill properties
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Returns products for given category id.
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id of the category
 *     responses:
 *       200:
 *         description: A product list for given category.
 *         content:
 *           application/json:
 *             schema:
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/category/:id', getProductsForCategory.bind(categoryController))

export default router
