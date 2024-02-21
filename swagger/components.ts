/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Product ID.
 *         name:
 *           type: string
 *           description: Product's name.
 *     Cart:
 *       type: object
 *       properties:
 *         cartId:
 *           type: string
 *           description: Cart ID.
 *         currency:
 *           type: string
 *           description: Cart's currency.
 *     CartDraft:
 *       type: object
 *       properties:
 *         key:
 *           type: string
 *           description: Cart key.
 *         currency:
 *           type: string
 *           description: Cart's currency.
 *         customerId:
 *           type: string
 *           description: Customer that the cart belongs to.
 *     CartUpdate:
 *       type: object
 *       properties:
 *         version:
 *           type: number
 *           description: Cart Version.
 *         actions:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/CartUpdateAction'
 *           description: Action details.
 *     CartUpdateAction:
 *       type: object
 *       properties:
 *         action:
 *           type: string
 *           description: Requested action to execute.
 *         key:
 *           type: string
 *           description: Cart key.
 *         lineItemId:
 *           type: string
 *           description: id of the line item.
 *         sku:
 *           type: string
 *           description: SKU to add.
 *         quantity:
 *           type: number
 *           description: qty to add.
 */

