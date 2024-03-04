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
 *     Customer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Customer id.
 *         version:
 *           type: string
 *           description: Customer version.
 *         email:
 *           type: string
 *           description: Customer email.
 *     CustomerDraft:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Customer email.
 *         password:
 *           type: string
 *           description: Customer password.
 *     CustomerSignin:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Customer email.
 *         password:
 *           type: string
 *           description: Customer password.
 *         anonymousCart:
 *           type: string
 *           description: Identifies a Cart that will be assigned to the Custome.
 *         anonymousCartSignInMode:
 *           type: string
 *           description: MergeWithExistingCustomerCart or UseAsNewActiveCustomerCart.
 *         anonymousId:
 *           type: string
 *           description: If both anonymousCart and anonymousId are provided, the anonymousId on the CustomerSignin must match that of the anonymous Cart.
 *     CustomerSignInResult:
 *       type: object
 *       properties:
 *         customer:
 *           type: Customer
 *           description: Customer.
 *         actions:
 *           type: Cart
 *           description: Cart.
 */

