import AppError from '@shared/erros/AppError'
import { Product } from '../infra/database/entities/Product'
import { productsRepositories } from '../infra/database/repositories/ProductsRepositories'
import RedisCache from '@shared/cache/RedisCache'
import { ICreateProduct } from '../domain/models/ICreateProduct'

export default class CreateProductService {
  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {

const redisCache = new RedisCache()

    // Verifica se já existe um produto com o mesmo nome no banco de dados.
    const productExists = await productsRepositories.findByName(name)

    if (productExists) {
      throw new AppError('Existe Produtos cadastrado com esse nome', 409)
    }

    // Cria uma nova instância de produto com os dados fornecidos.
    const product = productsRepositories.create({
      name,
      price,
      quantity,
    })
    // Salva o novo produto no banco de dados.
    await productsRepositories.save(product)

    // remover os dados em cache
    await redisCache.invalidade('api-mysales-PRODUCT_LIST')

    return product
  }
}
