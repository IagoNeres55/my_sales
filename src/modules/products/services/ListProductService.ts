import RedisCache from '@shared/cache/RedisCache'
import { Product } from '../infra/database/entities/Product'
import { inject, injectable } from 'tsyringe'
import IProductsRepository from '../domain/repositories/IProductsRepositories';

@injectable()
export default class ListProdutcService {

  constructor(

    @inject('ProductRepository') private readonly productsRepositories: IProductsRepository
  ) {}

  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache()

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCT_LIST',
    )

    if (!products) {
      products = await this.productsRepositories.find()

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
