import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CustomerRepository } from '../repository'
import { getOptions } from '../utils/options'
import { CustomerDraft } from "@commercetools/platform-sdk";
import AuthRequest from "../types/AuthRequest";


class CustomerController {

    async createCustomer(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const customerDraft: CustomerDraft = req.body
        const data = await new CustomerRepository(options).registerCustomer(customerDraft)
        ResponseHandler.handleResponse(res, data)
    }

    async checkCustomerExist(req: AuthRequest, res: Response) {
        const options = getOptions(req.headers)
        const email = req.user.emails[0].value;
        const data = await new CustomerRepository(options).checkCustomerExist(email)
        ResponseHandler.handleResponse(res, data)
    }

    async processLogin(req: Request, res: Response) {
        console.log("Login");
    }
}

export default CustomerController