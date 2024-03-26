import { ApiRoot, OrderFromCartDraft } from '@commercetools/platform-sdk';
import { createClient } from '../utils/Client';

interface IOrderRepository {
    apiRoot: ApiRoot
    projectKey: string

    submitOrderWithCartId(orderFromCart: OrderFromCartDraft): any
}

class OrderRepository implements IOrderRepository {
    apiRoot: ApiRoot
    projectKey: string

    constructor(options: any) {
        createClient.call(this, options);
    }

    async submitOrderWithCartId(orderFromCart: OrderFromCartDraft) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .orders()
                .post(
                    {
                        body: orderFromCart
                    }
                )
                .execute()
        } catch (error) {
            return error
        }
    }
}

export default OrderRepository