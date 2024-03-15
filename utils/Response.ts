import AuthRequest from "../types/Auth";

interface Response {
  status: string
  message?: string
  data?: object
}
/**
 * @class Response
 *
 * @description class to handle all http response
 */
class ResponseHandler {
  /**
   *
   * @description method to handle all success responses
   *
   * @param response Object
   * @param statusCode String
   * @param message String
   * @param data Object | Array
   *
   * @return response JSON
   */
  static readonly successResponse = (response, statusCode, message, data) => {
    const responseBody: Response = { status: 'success' }

    if (message !== '') {
      responseBody.message = message
    }

    if (data) {
      responseBody.data = data
    }

    return response.status(statusCode).json({
      ...responseBody,
    })
  }

  /**
   *
   * @description method to handle all error responses
   *
   * @param response
   * @param statusCode
   * @param message
   * @param data
   *
   * @return response JSON
   */
  static readonly errorResponse = (response, statusCode, message, data) => {
    const responseBody: Response = { status: 'error' }
    if (message !== '') {
      responseBody.message = message
    }

    if (data) {
      responseBody.data = data
    }

    return response.status(statusCode).json({
      ...responseBody,
    })
  }

  /**
   *
   * @description method to handle all responses
   *
   * @param res Object
   * @param data Object | Array
   *
   * @return response JSON
   */
  static handleResponse(req:AuthRequest, res, data){
    if (data.statusCode == 200) {
      if(!!req.accessToken){
        data.body.access_token=req.accessToken.access_token
      }
      return this.successResponse(
          res,
          data.statusCode || data.body.statusCode,
          data.message || data.body.message,
          data.body
      )
    }
    return this.handleErrorResponse(res, data);
  }

  /**
   *
   * @description method to handle unauthorized errors
   *
   * @param res Object
   * @param data Object | Array
   *
   * @return response JSON
   */
  static handleUnauthorizedResponse(res) {
    return this.handleErrorResponse(res, {statusCode: 401, message: "Invalid or expired access token"})
  }

  /**
   *
   * @description method to handle all responses
   *
   * @param res Object
   * @param data Object | Array
   *
   * @return response JSON
   */
  static handleErrorResponse(res, data) {
    return this.errorResponse(
        res,
        data.statusCode || data.body.statusCode,
        data.message || data.body.message,
        data.body
    )
  }
}

export default ResponseHandler
