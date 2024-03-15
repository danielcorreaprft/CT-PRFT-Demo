import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CategoryRepository } from '../repository'
import { Options} from '../utils/options'

/**
 * @description CategoryController
 *
 * @function registerUser
 */
class CategoryController {

    async getProductsForCategory(req: Request, res: Response) {
        const options = await new Options().getOptions(req)
        const data = await new CategoryRepository(options).getProductsForCategory(req.params.id)

        ResponseHandler.handleResponse(req,res, data)
    }
}

export default CategoryController
