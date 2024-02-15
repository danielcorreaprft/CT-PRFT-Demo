import { ApiRoot } from '@commercetools/platform-sdk'
import {createClient} from "../utils/Client";


interface IProductRepository {
  apiRoot: ApiRoot
  projectKey: string
  getProducts(): any
  getProductByKey(key: string): any
  getProductById(ID: string): any
  getVariantForProduct(variantID: string): any
  getFreeTextSearchResult(textSearch: string): any
}

class Product implements IProductRepository {
  apiRoot: ApiRoot
  projectKey: string
  constructor(options) {
    createClient.call(this,options)
  }

  async getProducts() {
    try {
      return await this.apiRoot
        .withProjectKey({ projectKey: this.projectKey })
        .products()
        .get()
        .execute()
    } catch (error) {
      return error
    }
  }

  async getProductByKey(key: string) {
    try {
      return await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .products()
          .withKey({key})
          .get()
          .execute()
    } catch (error) {
      return error
    }
  }

  async getProductById(ID: string) {
    try {
      return await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .products()
          .withId({ID})
          .get()
          .execute()
    } catch (error) {
      return error
    }
  }

  async getVariantForProduct(variantID: string) {
    try {
      return await this.apiRoot
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
    } catch (error) {
      return error
    }
  }

  async getFreeTextSearchResult(textSearch: string) {
    try {
      return await this.apiRoot
          .withProjectKey({ projectKey: this.projectKey })
          .productProjections()
          .search()
          .get({
            queryArgs: {
              "text.en": textSearch,
              staged: false
            }
          })
          .execute();
    } catch (error) {
      return error
    }
  }
}

export default Product
