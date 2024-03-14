import {
  createAuthForPasswordFlow,
  createAuthForAnonymousSessionFlow, createAuthWithExistingToken,
} from '@commercetools/sdk-client-v2'
import fetch from 'node-fetch'
import AuthRequest from "../types/Auth";

let _credentials = null
let _token = null

export function getOptions(
  headers = null,
  credentials?: { email: string; password: string },
  token?
) {
  let authMiddleware
  let { destroy } = headers

  if (destroy == 'true') _credentials = null
  if(_token || token){
    if (token) _token = token
    authMiddleware = createAuthWithExistingToken(_token, {force:false})
  }
  else if (_credentials || credentials) {
    if (credentials) _credentials = credentials
    authMiddleware = createAuthForPasswordFlow({
      host: process.env.CTP_AUTH_URL,
      projectKey: process.env.CTP_PROJECT_KEY,
      credentials: {
        clientId: process.env.CTP_CLIENT_ID || '',
        clientSecret: process.env.CTP_CLIENT_SECRET || '',
        user: {
          username: _credentials.email,
          password: _credentials.password
        },
      },
      scopes: [`manage_project:${process.env.CTP_PROJECT_KEY}`],
      fetch,
    })
  } else {
    authMiddleware = createAuthForAnonymousSessionFlow({
      host: process.env.CTP_AUTH_URL,
      projectKey: process.env.CTP_PROJECT_KEY || '',
      credentials: {
        clientId: process.env.CTP_CLIENT_ID || '',
        clientSecret: process.env.CTP_CLIENT_SECRET || '',
      },
      scopes: [`manage_project:${process.env.CTP_PROJECT_KEY}`],
      fetch,
    })
  }

  const tokenMiddleware = (next: any) => (request: AuthRequest, response: any) => {
    if (request?.headers?.Authorization) {
      _token = request.headers.Authorization.toString().split(' ')[1];
      console.log(`commercetools token: ${_token}`)
    }
    next(request, response);
  };


  return {
    authMiddleware,
    tokenMiddleware: tokenMiddleware,
    projectKey: process.env.CTP_PROJECT_KEY,
    credentials: !!_credentials,
    httpMiddlewareOptions: {
      host: process.env.CTP_API_URL,
      fetch,
    }
  }
}
