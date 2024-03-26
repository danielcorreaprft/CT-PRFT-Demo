import { Request, Response } from 'express';
import { getOptions } from '../utils/options';
import { OrderFromCartDraft } from '@commercetools/platform-sdk';
import ResponseHandler from '../utils/Response';
import OrderRepository from '../repository/OrderRepository';

class OrderController {

    async createOrderFromCart(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const orderDraft: OrderFromCartDraft = req.body
        const data = await new OrderRepository(options).submitOrderWithCartId(orderDraft)
        ResponseHandler.handleResponse(res, data)
    }

}

export default OrderController