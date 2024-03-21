import {ApiRoot, CustomerDraft, CustomerSignin} from '@commercetools/platform-sdk'
import {createClient} from "../utils/Client";
import {CustomerItemDraft} from "../types/Auth";

interface ICustomerRepository {
    apiRoot: ApiRoot
    projectKey: string

    registerCustomer(customer: CustomerDraft): any
    checkCustomerExist(email:string):any
    signInCustomer(customer: CustomerSignin):any
    getCustomerById(customerId: string):any
    getCustomerEmailById(customerId: string):any
    getCustomerInfoForTypeAndId(itemDraft: CustomerItemDraft):any
}

class Customer implements ICustomerRepository {
    apiRoot: ApiRoot
    projectKey: string

    constructor(options: any) {
        createClient.call(this, options);
    }

    async registerCustomer(customer: CustomerDraft) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .customers()
                .post({
                    body: customer
                }).execute()
        } catch (error) {
            return error
        }
    }

    async checkCustomerExist(email: string) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .customers()
                .get({
                    queryArgs: {
                        where: "email=\""+email+"\""
                    }
                }).execute()
        } catch (error) {
            return error
        }
    }

    async signInCustomer(customer: CustomerSignin) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .login()
                .post({
                    body: customer
                }).execute()
        } catch (error) {
            return error
        }
    }

    async getCustomerById(customerId: string) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .customers()
                .withId({ID:customerId})
                .get()
                .execute()
        } catch (error) {
            return error
        }
    }

    async getCustomerEmailById(customerId: string) {
        try {
            return await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .graphql()
                .post({
                    body:{
                        query: "query ($customerId: String!){customer(id:$customerId){id, email}}",
                        variables: {"customerId" : customerId}
                    }
                })
                .execute()
        } catch (error) {
            return error
        }
    }

    async getCustomerInfoForTypeAndId(itemDraft: CustomerItemDraft) {
        try {
            const item = await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .graphql()
                .post({
                    body:{
                        query: `query ($itemId: String!){
                                    item: ${itemDraft.itemType}(id:$itemId){
                                        id,
                                        customerId: ${itemDraft.customerIdField},
                                        customerEmail: ${itemDraft.customerEmailField}
                                    }
                                }`,
                        variables: {"itemId" : itemDraft.itemId}
                    }
                })
                .execute();
            return item.body.data;
        } catch (error) {
            return error
        }
    }
}

export default Customer
