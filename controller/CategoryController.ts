import ResponseHandler from '../utils/Response'
import { Request, Response } from 'express'
import { CategoryRepository } from '../repository'
import { getOptions } from '../utils/options'

/**
 * @description CategoryController
 *
 * @function registerUser
 */
class CategoryController {
    constructor() {}

    async getProductsForCategory(req: Request, res: Response) {
        const options = getOptions(req.headers)
        const data = await new CategoryRepository(options).getProductsForCategory(req.params.id)

        ResponseHandler.handleResponse(res, data)
    }
}

export default CategoryController
