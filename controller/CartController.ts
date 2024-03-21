import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CartRepository } from '../repository'
import { Options} from '../utils/options'
import {CartDraft, CartUpdate} from "@commercetools/platform-sdk";
import AuthRequest, {CustomerItemDraft, IntrospectResponse, CustomerItemDraftBuilder} from "../types/Auth";
import {introspectToken, validateCustomer} from "../utils/Introspect";

/**
 * @description CartController
 *
 */
class CartController {

    async createCart(req: AuthRequest, res: Response) {
        const introspect : IntrospectResponse = await introspectToken(req);
        if (introspect.valid && introspect.expires_in > 0) {
            const options = await new Options().getOptions(req)
            const cartDraft: CartDraft = req.body
            const data = await new CartRepository(options).createCart(cartDraft)

            ResponseHandler.handleResponse(req, res, data);
        }else {
            ResponseHandler.handleUnauthorizedResponse(res);
        }
    }

    async updateCart(req: Request, res: Response) {
        const introspect : IntrospectResponse = await introspectToken(req);
        if (introspect.valid && introspect.expires_in > 0) {
            const itemDraft: CustomerItemDraft =
                new CustomerItemDraftBuilder("cart", "customerEmail", "customerId")
                    .withItemId(req.params.cartId)
                    .build();
            const validOperation: boolean = await validateCustomer(introspect, itemDraft, req);
            if (validOperation) {
                const options = await new Options().getOptions(req)
                const cartUpdate: CartUpdate = req.body
                const data = await new CartRepository(options).updateCart(req.params.cartId, cartUpdate)

                ResponseHandler.handleResponse(req, res, data)
            }
        }
        ResponseHandler.handleUnauthorizedResponse(res);
    }

    async getCartById(req: Request, res: Response) {
        const options = await new Options().getOptions(req)
        const data = await new CartRepository(options).getCartById(req.params.cartId)

        ResponseHandler.handleResponse(req,res, data)
    }
}

export default CartController
