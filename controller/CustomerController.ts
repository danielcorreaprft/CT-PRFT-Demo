import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CustomerRepository } from '../repository'
import { getOptions } from '../utils/options'
import {CustomerDraft, CustomerSignin} from "@commercetools/platform-sdk";
import AuthRequest from "../types/AuthRequest";
import {AuthenticationMode, ExternalCustomerDraft} from "../types/ExternalCustomerDraft";


class CustomerController {

    async createCustomer(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const customerDraft: CustomerDraft = req.body
        const data = await new CustomerRepository(options).registerCustomer(customerDraft)
        ResponseHandler.handleResponse(res, data)
    }

    async processExternalAuth(req: AuthRequest, res: Response) {
        const options = getOptions(req.headers)
        const customerRepository : CustomerRepository = new CustomerRepository(options);
        const email : string = req.user.emails[0].value;
        let data = await customerRepository.checkCustomerExist(email)
        if (data.body.count == 0){
            const customerDraft: ExternalCustomerDraft = {email: email, authenticationMode: AuthenticationMode.ExternalAuth, password : undefined};
            data = await customerRepository.registerCustomer(customerDraft);
        }
        ResponseHandler.handleResponse(res, data)
    }

    async processLogin(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const customer: CustomerSignin = req.body
        const data = await new CustomerRepository(options).signInCustomer(customer)
        ResponseHandler.handleResponse(res, data)
    }
}

export default CustomerController
