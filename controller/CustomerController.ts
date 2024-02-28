import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CustomerRepository } from '../repository'
import { getOptions } from '../utils/options'
import { CustomerDraft } from "@commercetools/platform-sdk";

class CustomerController {

    async createCustomer(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const customerDraft: CustomerDraft = req.body
        const data = await new CustomerRepository(options).registerCustomer(customerDraft)
        ResponseHandler.handleResponse(res, data)
    }
}

export default CustomerController