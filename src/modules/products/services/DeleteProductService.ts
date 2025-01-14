import AppError from '@shared/erros/AppError'
import RedisCache from '@shared/cache/RedisCache'
import IProductsRepository from '../domain/repositories/IProductsRepositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class DeleteProductService {

  constructor(
    // @ts-ignore
    @inject('ProductRepository')
    private readonly productsRepositories: IProductsRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<void> {
    const redisCache = new RedisCache()

    const product = await this.productsRepositories.findById(id)

    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    await redisCache.invalidade('api-mysales-PRODUCT_LIST')

    await this.productsRepositories.remove(product)
  }
}
