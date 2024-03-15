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
    email: string;
    expires_in: number;
    valid: boolean;
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
