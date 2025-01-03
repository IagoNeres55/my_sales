import AppError from '@shared/erros/AppError'
import { productsRepositories } from '../database/repositories/ProductsRepositories'
import RedisCache from '@shared/cache/RedisCache'

export default class DeleteProductService {
  async execute({ id }: { id: string }): Promise<void> {
    const redisCache = new RedisCache()

    const product = await productsRepositories.findById(id)

    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    await redisCache.invalidade('api-mysales-PRODUCT_LIST')

    await productsRepositories.remove(product)
  }
}
