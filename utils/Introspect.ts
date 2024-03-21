import axios from "axios";
import AuthRequest, {AuthenticationProvider, IntrospectResponse, CustomerItemDraft, CustomerSimpleDraft} from "../types/Auth";
import {Options} from "./options";
import {CustomerRepository} from "../repository";
import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';

export async function introspectToken(request:AuthRequest) : Promise<IntrospectResponse> {
    try {
        let introspectUrl : string;
        let provider : string = !!request.user ? request.user.authenticationProvider.toString() : <string>request.headers.tokenprovider;
        let accessToken : string;
        let expires_in : number;
        let response : any;
        switch (provider) {
            case AuthenticationProvider.GOOGLE:
                introspectUrl = process.env.GOOGLE_INTROSPECT_URL;
                accessToken = request.user.accessToken.access_token;
                response = await axios.get(introspectUrl+accessToken);
                break
            case AuthenticationProvider.FACEBOOK:
                introspectUrl = process.env.FACEBOOK_INTROSPECT_URL;
                expires_in = request.user.accessToken.expires_in;
                accessToken = request.user.accessToken.access_token;
                response = await axios.get(introspectUrl+accessToken);
                break
            case AuthenticationProvider.COMMERCE_TOOLS:
                introspectUrl = process.env.CTP_INTROSPECT_URL;
                accessToken = <string>request.headers.accesstoken;
                const authClient = new SdkAuth({
                    host: process.env.CTP_AUTH_URL,
                    projectKey: process.env.CTP_PROJECT_KEY,
                    disableRefreshToken: false,
                    credentials: {
                        clientId: process.env.CTP_CLIENT_ID,
                        clientSecret: process.env.CTP_CLIENT_SECRET,
                    },
                    scopes: [`manage_project:${process.env.CTP_PROJECT_KEY}`],
                    fetch,
                })

                response = await authClient.introspectToken(accessToken);
                break
        }

        return await mapIntrospectionResponse(response, {provider: provider, expires_in: expires_in }, request);
    } catch (error) {
        console.error('Error during token introspection:', error);
        throw error;
    }
}

async function mapIntrospectionResponse(response : any, args : any, request:AuthRequest) : Promise<IntrospectResponse>{
    let introspectResponse : IntrospectResponse = {};
    switch (args.provider) {
        case AuthenticationProvider.GOOGLE:
            introspectResponse.email = response.data.email;
            introspectResponse.expires_in = response.data.expires_in;
            introspectResponse.valid = undefined != response.data.email;
            break
        case AuthenticationProvider.FACEBOOK:
            introspectResponse.email = response.data.email;
            introspectResponse.expires_in = args.expires_in;
            introspectResponse.valid = undefined != response.data.email;
            break
        case AuthenticationProvider.COMMERCE_TOOLS:
            if(!!response.scope) {
                const customerId: string = response.scope.split(' ').filter(value => value.startsWith("customer_id"))[0].split(":")[1];
                const options = await new Options().getOptions(request);
                const data = await new CustomerRepository(options).getCustomerById(customerId);

                introspectResponse.email = data.body.email;
                introspectResponse.customerId = customerId;
                introspectResponse.expires_in = response.exp - Date.now();
                introspectResponse.valid = response.active;
            }
            break
    }
    return introspectResponse;
}

export async function validateCustomer(introspectResponse:IntrospectResponse, item:CustomerItemDraft, request:AuthRequest) : Promise<boolean> {
    let itemValidation = await abstractValidate(introspectResponse,
        {customerEmail: item.customerEmail, customerId: item.customerId}, request);
    if (itemValidation != undefined){
        return itemValidation;
    }
    if(!!item.itemId) {
        const options = await new Options().getOptions(request);
        const data = await new CustomerRepository(options).getCustomerInfoForTypeAndId(item);
        console.log(data);
        itemValidation = await abstractValidate(introspectResponse,
                {customerEmail: data.item.customerEmail, customerId: data.item.customerId}, request);
    }

    return itemValidation ?? true;
}

async function abstractValidate(introspectResponse:IntrospectResponse, customerDraft:CustomerSimpleDraft, request:AuthRequest): Promise<boolean>{
    if (!!customerDraft.customerEmail){
        return introspectResponse.email == customerDraft.customerEmail;
    }
    const options = await new Options().getOptions(request);
    if (!!customerDraft.customerId){
        if(!!introspectResponse.customerId){
            return introspectResponse.customerId == customerDraft.customerId;
        }
        const customer = await new CustomerRepository(options).getCustomerEmailById(customerDraft.customerId);
        if (!!customer.email){
            return introspectResponse.email == customer.email;
        }
    }
    return undefined;
}
