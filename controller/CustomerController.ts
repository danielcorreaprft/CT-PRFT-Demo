import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CustomerRepository } from '../repository'
import { Options} from '../utils/options'
import {CustomerDraft, CustomerSignin} from "@commercetools/platform-sdk";
import AuthRequest, {IntrospectResponse} from "../types/Auth";
import {AuthenticationMode, ExternalCustomerDraft} from "../types/ExternalCustomerDraft";
import {introspectToken} from "../utils/Introspect"


class CustomerController {

    async createCustomer(req: Request, res: Response) {
        const options = new Options().getOptions(req)
        const customerDraft: CustomerDraft = req.body
        const data = await new CustomerRepository(options).registerCustomer(customerDraft)
        ResponseHandler.handleResponse(req,res, data)
    }

    async processExternalAuth(req: AuthRequest, res: Response) {
        const introspect : IntrospectResponse = await introspectToken(req.user.accessToken, req.user.authenticationProvider);
        if (introspect.valid && introspect.expires_in > 0){
            const options = new Options().getOptions(req)
            const customerRepository : CustomerRepository = new CustomerRepository(options);
            const email : string = req.user.profile.emails[0].value;
            let data = await customerRepository.checkCustomerExist(email)
            if (data.body.count == 0){
                const firstName: string = req.user.profile.given_name;
                const lastName: string = req.user.profile.family_name;
                const customerDraft: ExternalCustomerDraft = {
                    email: email, firstName: firstName, lastName: lastName,
                    authenticationMode: AuthenticationMode.ExternalAuth, password: undefined
                };
                data = await customerRepository.registerCustomer(customerDraft);
            }
            ResponseHandler.handleResponse(req,res, data);
        }else {
            ResponseHandler.handleUnauthorizedResponse(res);
        }
    }

    async processLogin(req: AuthRequest, res: Response) {
        const options = await new Options().getOptions(req, req.body)
        const customer: CustomerSignin = req.body
        const data = await new CustomerRepository(options).signInCustomer(customer)
        ResponseHandler.handleResponse(req,res, data)
    }
}

export default CustomerController
