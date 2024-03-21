import {Request} from 'express'

interface Profile {
    id: string;
    displayName: string;
    username: string;
    provider: string;
    given_name: string;
    family_name: string;
    email: string;
    emails: Email[];
}

export interface User {
    profile: Profile;
    accessToken: AccessToken;
    authenticationProvider: AuthenticationProvider;
}

export interface AccessToken {
    access_token: string;
    token_type?: string;
    expires_in?: number;
}

export interface IntrospectResponse {
    email?: string;
    customerId?: string;
    expires_in?: number;
    valid?: boolean;
}

export interface ICustomerItemDraft {
    itemType: string;
    itemId?: string;
    customerEmailField: string;
    customerIdField: string;
    customerEmail?: string;
    customerId?: string;
}

export class CustomerItemDraft implements ICustomerItemDraft{
    constructor(
        public itemType: string,
        public customerEmailField: string,
        public customerIdField: string,
        public itemId?: string,
        public customerEmail?: string,
        public customerId?: string
    ) {}
}

export class CustomerItemDraftBuilder {
    private itemType: string;
    private itemId?: string;
    private customerEmailField: string;
    private customerIdField: string;
    private customerEmail?: string;
    private customerId?: string;

    constructor(itemType: string, customerEmailField: string, customerIdField: string) {
        this.itemType = itemType;
        this.customerEmailField = customerEmailField;
        this.customerIdField = customerIdField;
    }

    withItemId(itemId: string): this {
        this.itemId = itemId;
        return this;
    }

    withCustomerEmail(email: string): this {
        this.customerEmail = email;
        return this;
    }

    withCustomerId(id: string): this {
        this.customerId = id;
        return this;
    }

    build(): CustomerItemDraft {
        return new CustomerItemDraft(
            this.itemType,
            this.customerEmailField,
            this.customerIdField,
            this.itemId,
            this.customerEmail,
            this.customerId
        );
    }
}


export interface CustomerSimpleDraft {
    customerEmail?: string;
    customerId?: string;
}

interface Email {
    value:string;
}

interface AuthRequest extends Request{
    user?: User;
    accessToken?: AccessToken;
}

export enum AuthenticationProvider {
    FACEBOOK = "Facebook",
    GOOGLE = "Google",
    COMMERCE_TOOLS = "Commerce_tools"
}

export default AuthRequest;
