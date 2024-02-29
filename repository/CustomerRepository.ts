import { ApiRoot, CustomerDraft } from '@commercetools/platform-sdk'
import { createClient } from "../utils/Client";

interface ICustomerRepository {
    apiRoot: ApiRoot
    projectKey: string

    registerCustomer(customer: CustomerDraft): any
    checkCustomerExist(email:string):any
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
                        where: "email%3D\""+email+"\""
                    }
                }).execute()
        } catch (error) {
            return error
        }
    }
}

export default Customer