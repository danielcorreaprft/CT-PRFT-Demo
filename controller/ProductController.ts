import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { ProductRepository } from '../repository'
import { getOptions } from '../utils/options'

/**
 * @description ProductController
 *
 * @function registerUser
 */
class ProductController {
  constructor() {}

  async getProducts(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getProducts()

    this.handleResponse(res, data)
  }

  async getProductByKey(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getProductByKey(req.params.key)

    this.handleResponse(res, data)
  }

  async getProductById(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getProductById(req.params.ID)

    this.handleResponse(res, data)
  }

  async getVariantByIdForProduct(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getVariantForProduct(req.params.key, req.params.variantId)

    this.handleResponseVariant(res, data.serverResponse, data.variant);
  }

  handleResponse(res, data){
    if (data.statusCode == 200) {
      return ResponseHandler.successResponse(
          res,
          data.statusCode || data.body.statusCode,
          data.message || data.body.message,
          data.body
      )
    }
    return this.handleErrorResponse(res, data);
  }


  handleResponseVariant(res, serverResponse, variant){
    if (serverResponse.statusCode == 200) {
      return ResponseHandler.successResponse(
          res,
          serverResponse.statusCode || serverResponse.body.statusCode,
          serverResponse.message || serverResponse.body.message,
          variant
      )
    }
    return this.handleErrorResponse(res,serverResponse)
  }


  private handleErrorResponse(res, data) {
    return ResponseHandler.errorResponse(
        res,
        data.statusCode || data.body.statusCode,
        data.message || data.body.message,
        data.body
    )
  }
}

export default ProductController
