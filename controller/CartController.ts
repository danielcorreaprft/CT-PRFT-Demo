import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CartRepository } from '../repository'
import { getOptions } from '../utils/options'
import {CartDraft, CartUpdate} from "@commercetools/platform-sdk";

/**
 * @description CartController
 *
 */
class CartController {

    async createCart(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const cartDraft: CartDraft = req.body
        const data = await new CartRepository(options).createCart(cartDraft)

        ResponseHandler.handleResponse(res, data)
    }

    async updateCart(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const cartUpdate: CartUpdate = req.body
        const data = await new CartRepository(options).updateCart(req.params.cartId, cartUpdate)

        ResponseHandler.handleResponse(res, data)
    }

    async getCartById(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const data = await new CartRepository(options).getCartById(req.params.cartId)

        ResponseHandler.handleResponse(res, data)
    }
}

export default CartController
