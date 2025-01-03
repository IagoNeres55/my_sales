import RedisCache from '@shared/cache/RedisCache'
import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/repositories/ProductsRepositories'

export default class ListProdutcService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCT_LIST',
    )

    if (!products) {
      products = await productsRepositories.find()

      await redisCache.save(
        'api-mysales-PRODUCT_LIST',
        JSON.stringify(products),
      )
    }

    // busca todos os produtos.
    // const products = await productsRepositories.find()

    //retorna um array com todos os produtos encontrados.
    return products
  }
}
