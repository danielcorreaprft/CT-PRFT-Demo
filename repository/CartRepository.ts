import {ApiRoot, CartDraft, CartUpdate} from '@commercetools/platform-sdk'
import {createClient} from "../utils/Client";

interface ICartRepository {
    apiRoot: ApiRoot
    projectKey: string
    createCart(cartDraft: CartDraft): any
    updateCart(cartId: string, cartUpdate: CartUpdate): any
    getCartById(cartId: string): any
}

class Cart implements ICartRepository {
    apiRoot: ApiRoot
    projectKey: string

    constructor(options) {
        createClient.call(this, options);
    }

    async createCart(cartDraft: CartDraft) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .carts()
                .post({
                    body: cartDraft
                })
                .execute()
        } catch (error) {
            return error
        }
    }

    async updateCart(cartId: string, cartUpdate: CartUpdate) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .carts()
                .withId({ID: cartId})
                .post({
                    body:{
                        version: cartUpdate.version,
                        actions: cartUpdate.actions
                    }
                })
                .execute()
        } catch (error) {
            return error
        }
    }

    async getCartById(cartId: string) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .carts()
                .withId({ID: cartId})
                .get()
                .execute()
        } catch (error) {
            return error
        }
    }
}

export default Cart
