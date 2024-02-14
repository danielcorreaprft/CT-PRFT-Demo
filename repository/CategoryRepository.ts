import Client from '../client/Client'
import { ApiRoot } from '@commercetools/platform-sdk'

interface ICategoryRepository {
    apiRoot: ApiRoot
    projectKey: string
    getProductsForCategory(id: string): any | Error
}

class Category implements ICategoryRepository {
    apiRoot: ApiRoot
    projectKey: string

    constructor(options) {
        const rootClient = new Client(options)
        this.apiRoot = rootClient.getApiRoot(
            rootClient.getClientFromOption(options)
        )
        this.projectKey = rootClient.getProjectKey()
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
