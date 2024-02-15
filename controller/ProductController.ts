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

  async getProducts(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getProducts()

    ResponseHandler.handleResponse(res, data)
  }

  async getProductByKey(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getProductByKey(req.params.key)

    ResponseHandler.handleResponse(res, data)
  }

  async getProductById(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getProductById(req.params.ID)

    ResponseHandler.handleResponse(res, data)
  }

  async getVariantByIdForProduct(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getVariantForProduct(req.params.variantId)

    ResponseHandler.handleResponse(res, data)
  }

  async getFreeTextSearchResult(req: Request, res: Response) {
    const options = getOptions(req.headers)
    const data = await new ProductRepository(options).getFreeTextSearchResult(<string>req.query.textSearch)

    ResponseHandler.handleResponse(res, data)
  }
}

export default ProductController
