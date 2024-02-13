import Client from '../client/Client'
import { ApiRoot } from '@commercetools/platform-sdk'

interface IProductRepository {
  apiRoot: ApiRoot
  projectKey: string
  getProducts(): any | Error
}

class Product implements IProductRepository {
  apiRoot: ApiRoot
  projectKey: string
  constructor(options) {
    const rootClient = new Client(options)
    this.apiRoot = rootClient.getApiRoot(
      rootClient.getClientFromOption(options)
    )
    this.projectKey = rootClient.getProjectKey()
  }

  async getProducts() {
    try {
      const products = await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .products()
        .get()
        .execute()

      return products
    } catch (error) {
      return error
    }
  }

  async getProductByKey(key: string) {
    try {
      const product = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .products()
          .withKey({key})
          .get()
          .execute()

      return product
    } catch (error) {
      return error
    }
  }

  async getProductById(ID: string) {
    try {
      const product = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .products()
          .withId({ID})
          .get()
          .execute()

      return product
    } catch (error) {
      return error
    }
  }

  async getVariantForProduct(key: string, variantID: string) {
    try {
      const serverResponse = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .productProjections()
          .withKey({ key })
          .get()
          .execute();

      const variants = serverResponse.body.variants;
      const variant = variants.find(v => v.sku === variantID);

      return { serverResponse, variant };
    } catch (error) {
      return error
    }
  }
}

export default Product
