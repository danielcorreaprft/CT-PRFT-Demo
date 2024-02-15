import { ApiRoot } from '@commercetools/platform-sdk'
import {createClient} from "../utils/Client";

interface ICategoryRepository {
    apiRoot: ApiRoot
    projectKey: string
    getProductsForCategory(id: string): any
}

class Category implements ICategoryRepository {
    apiRoot: ApiRoot
    projectKey: string

    constructor(options) {
        createClient.call(this, options);
    }

    async getProductsForCategory(id: string) {
        try {
            const products = await this.apiRoot
                .withProjectKey({projectKey: this.projectKey})
                .productProjections()
                .search()
                .get({
                    queryArgs: {
                        filter: "categories.id: subtree(\""+id+"\")",
                        markMatchingVariants: true,
                        staged: false
                    }
                })
                .execute()

            return products
        } catch (error) {
            return error
        }
    }
}

export default Category
