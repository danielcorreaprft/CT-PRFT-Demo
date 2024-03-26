import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { ProductRepository } from '../repository'
import { Options} from '../utils/options'

/**
 * @description ProductController
 *
 * @function registerUser
 */
class ProductController {

  async getProducts(req: Request, res: Response) {
    const options = await new Options().getOptions(req)
    const data = await new ProductRepository(options).getProducts()

    ResponseHandler.handleResponse(req,res, data)
  }

  async getProductByKey(req: Request, res: Response) {
    const options = await new Options().getOptions(req)
    const data = await new ProductRepository(options).getProductByKey(req.params.key)

    ResponseHandler.handleResponse(req,res, data)
  }

  async getProductById(req: Request, res: Response) {
    const options = await new Options().getOptions(req)
    const data = await new ProductRepository(options).getProductById(req.params.ID)

    ResponseHandler.handleResponse(req,res, data)
  }

  async getVariantByIdForProduct(req: Request, res: Response) {
    const options = await new Options().getOptions(req)
    const data = await new ProductRepository(options).getVariantForProduct(req.params.variantId)

    ResponseHandler.handleResponse(req,res, data)
  }

  async getFreeTextSearchResult(req: Request, res: Response) {
    const options = await new Options().getOptions(req)
    const data = await new ProductRepository(options).getFreeTextSearchResult(<string>req.query.textSearch)

    ResponseHandler.handleResponse(req,res, data)
  }
}

export default ProductController
