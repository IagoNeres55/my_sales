import AppError from '@shared/erros/AppError'
import { Product } from '../infra/database/entities/Product'
import RedisCache from '@shared/cache/RedisCache'
import { ICreateProduct } from '../domain/models/ICreateProduct'
import { inject, injectable } from 'tsyringe'
import IProductsRepository from '../domain/repositories/IProductsRepositories'

@injectable()
export default class CreateProductService {
  constructor(

    @inject('ProductRepository')
    private readonly productsRepositories: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const redisCache = new RedisCache()

    // Verifica se já existe um produto com o mesmo nome no banco de dados.
    const productExists = await this.productsRepositories.findByName(name)

    if (productExists) {
      throw new AppError('Existe Produtos cadastrado com esse nome', 409)
    }

    // Cria uma nova instância de produto com os dados fornecidos.
    // já esta salvando o item no repositorio
    const product = this.productsRepositories.create({
      name,
      price,
      quantity,
    })

    // remover os dados em cache
    await redisCache.invalidade('api-mysales-PRODUCT_LIST')

    return product
  }
}
