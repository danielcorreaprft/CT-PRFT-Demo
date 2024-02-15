import { ApiRoot } from '@commercetools/platform-sdk'
import {createClient} from "../utils/Client";


interface IProductRepository {
  apiRoot: ApiRoot
  projectKey: string
  getProducts(): any
  getProductByKey(key: string): any
  getProductById(ID: string): any
  getVariantForProduct(variantID: string): any
}

class Product implements IProductRepository {
  apiRoot: ApiRoot
  projectKey: string
  constructor(options) {
    createClient.call(this,options)
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

  async getVariantForProduct(variantID: string) {
    try {
      const variant = await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .productProjections()
          .search()
          .get({
            queryArgs: {
              filter: "variants.sku:\""+variantID+"\"",
              staged: false
            }
          })
          .execute();

      return variant;
    } catch (error) {
      return error
    }
  }
}

export default Product
