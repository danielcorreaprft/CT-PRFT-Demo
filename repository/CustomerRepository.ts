import {ApiRoot, CustomerDraft, CustomerSignin} from '@commercetools/platform-sdk'
import {createClient} from "../utils/Client";
import {AuthenticationMode, ExternalCustomerDraft} from "../types/ExternalCustomerDraft"

interface ICustomerRepository {
    apiRoot: ApiRoot
    projectKey: string

    registerCustomer(customer: CustomerDraft): any
    checkCustomerExist(email:string):any
    signInCustomer(customer: CustomerSignin):any
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
}

export default Customer
