import axios from "axios";
import {AuthenticationProvider, AccessToken, IntrospectResponse} from "../types/Auth";

export async function introspectToken(accessToken:AccessToken, provider:AuthenticationProvider) : Promise<IntrospectResponse> {
    try {
        let introspectUrl : string;
        switch (provider) {
            case AuthenticationProvider.GOOGLE:
                introspectUrl = process.env.GOOGLE_INTROSPECT_URL;
                break
            case AuthenticationProvider.FACEBOOK:
                introspectUrl = process.env.FACEBOOK_INTROSPECT_URL;
                break
            case AuthenticationProvider.COMMERCE_TOOLS:
                introspectUrl = ""
        }
        const response = await axios.get(introspectUrl+accessToken.access_token);
        return {email: response.data.email,
            expires_in: response.data.expires_in ? response.data.expires_in : accessToken.expires_in,
            valid: undefined != response.data.email};
    } catch (error) {
        console.error('Error during token introspection:', error);
        throw error;
    }
}
