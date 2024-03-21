import { Router } from 'express'
import { CartController } from '../controller'

const cartController = new CartController()

const router = Router()
const { createCart, updateCart, getCartById } = cartController

/**
 * TODO: fill properties
 * @swagger
 * /carts:
 *   post:
 *     summary: Creates a cart for anonymous user
 *     parameters:
 *       - in: header
 *         name: AccessToken
 *         description: AccessToken
 *       - in: header
 *         name: TokenProvider
 *         description: TokenProvider
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartDraft'
 *     responses:
 *       200:
 *         description: A created cart.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Cart'
 */
router.post('/carts', createCart.bind(cartController))

/**
 * TODO: fill properties
 * @swagger
 * /carts/{cartId}:
 *   post:
 *     summary: Execute action on cart
 *     parameters:
 *      - in: path
 *        name: cartId
 *        description: id of the cart
 *      - in: header
 *        name: AccessToken
 *        description: AccessToken
 *      - in: header
 *        name: TokenProvider
 *        description: TokenProvider
 *     requestBody:
 *       required: true
 *       description: In action, use "addLineItem" for adding and "removeLineItem" for removing. Specify SKU when adding, specify lineItemId when removing
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartUpdate'
 *     responses:
 *       200:
 *         description: Updated cart.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Cart'
 */
router.post('/carts/:cartId', updateCart.bind(cartController))

/**
 * TODO: fill properties
 * @swagger
 * /carts/{cartId}:
 *   get:
 *     summary: Get cart by ID
 *     parameters:
 *      - in: path
 *        name: cartId
 *        description: id of the cart
 *      - in: header
 *        name: AccessToken
 *        description: AccessToken
 *      - in: header
 *        name: TokenProvider
 *        description: TokenProvider
 *     responses:
 *       200:
 *         description: Cart with given ID.
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/components/schemas/Cart'
 */
router.get('/carts/:cartId', getCartById.bind(cartController))

export default router
