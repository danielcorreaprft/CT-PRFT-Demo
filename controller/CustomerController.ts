import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CustomerRepository } from '../repository'
import { getOptions } from '../utils/options'
import {
    CustomerCreatePasswordResetToken,
    CustomerDraft,
    CustomerResetPassword,
    CustomerSignin
} from "@commercetools/platform-sdk";
import AuthRequest from "../types/AuthRequest";
import { AuthenticationMode, ExternalCustomerDraft } from "../types/ExternalCustomerDraft";
import EmailService from '../services/EmailService';

class CustomerController {

    emailService: EmailService

    constructor(emailService: EmailService) {
        this.emailService = emailService
    }

    async createCustomer(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const customerDraft: CustomerDraft = req.body
        const data = await new CustomerRepository(options).registerCustomer(customerDraft)
        ResponseHandler.handleResponse(res, data)
    }

    async processExternalAuth(req: AuthRequest, res: Response) {
        const options = getOptions(req.headers)
        const customerRepository: CustomerRepository = new CustomerRepository(options);
        const email: string = req.user.emails[0].value;
        let data = await customerRepository.checkCustomerExist(email)
        if (data.body.count == 0) {
            const customerDraft: ExternalCustomerDraft = {
                email: email,
                authenticationMode: AuthenticationMode.ExternalAuth,
                password: undefined
            };
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

    async requestForgottenPasswordToken(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const requestTokenBody: CustomerCreatePasswordResetToken = req.body
        const data = await new CustomerRepository(options).getResetCustomerPassword(requestTokenBody)
        ResponseHandler.successResponse(res, 200, "success", {})

        if (res.statusCode === 200) {
            await this.emailService.sendResetPasswordEmail(req.body.email, data.body.value)
        }
    }

    async resetPasswordWithToken(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const resetPassword: CustomerResetPassword = req.body
        const data = await new CustomerRepository(options).resetCustomerPasswordWithToken(resetPassword)
        ResponseHandler.successResponse(res, 200, "success", {})

        if (res.statusCode === 200) {
            //OPTIONAL - Send email to the user from here
            await this.emailService.sendSuccessResetPasswordEmail(data.body.email)
        }
    }
}

export default CustomerController
