import {CustomerDraft} from "@commercetools/platform-sdk";

export enum AuthenticationMode {
    Password = "Password",
    ExternalAuth = "ExternalAuth"
}

export interface ExternalCustomerDraft extends CustomerDraft{
    authenticationMode?: AuthenticationMode;
}

export default ExternalCustomerDraft;
