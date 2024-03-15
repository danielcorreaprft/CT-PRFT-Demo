import {
  createAuthWithExistingToken,
} from '@commercetools/sdk-client-v2'
import fetch from 'node-fetch'
import AuthRequest, {AuthenticationProvider} from "../types/Auth";
import SdkAuth from '@commercetools/sdk-auth'

export class Options{

  async getOptions(
      authRequest:AuthRequest,
      credentials?: { email: string; password: string },
  ) {

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

    let authMiddleware

    if(!!authRequest.headers.accesstoken && AuthenticationProvider.COMMERCE_TOOLS == authRequest.headers.tokenprovider){
      authRequest.accessToken={
        access_token : <string>authRequest.headers.accesstoken
      }
      authMiddleware = createAuthWithExistingToken(`Bearer ${authRequest.headers.accesstoken}`, {force:false})
    }
    else {
      let token : any;

      if(!!credentials){
        token = await authClient.customerPasswordFlow({
          username: credentials.email,
          password: credentials.password
        })
      }else{
        token = await authClient.anonymousFlow()
      }

      console.log(token)
      authRequest.accessToken={
        access_token : token.access_token
      }
      authMiddleware = createAuthWithExistingToken(`Bearer ${authRequest.accessToken.access_token}`, {force:false})

    }


    return {
      authMiddleware,
      projectKey: process.env.CTP_PROJECT_KEY,
      credentials: credentials,
      httpMiddlewareOptions: {
        host: process.env.CTP_API_URL,
        fetch
      },
    }
  }


}
