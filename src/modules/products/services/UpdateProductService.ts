import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/erros/AppError'
import { Product } from '../infra/database/entities/Product'
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import IProductsRepository from '../domain/repositories/IProductsRepositories';
import { injectable } from 'tsyringe';

@injectable()
export default class UpdateProductService {

  constructor(
    // @ts-ignore
    @inject('ProductRepository')
    private readonly productsRepositories: IProductsRepository,
  ) {}

  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {

    // instanciando o cache para apagar
    const redisCache = new RedisCache()


    // busca os produtos pelo Id informado.
    const product = await this.productsRepositories.findById(id)

    //faz uma validação caso não tenha nenhum produto encontrado.
    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    const productsExists = await this.productsRepositories.findByName(name)

    if (productsExists) {
      throw new AppError('Existe Produtos já cadastrados com esse nome', 409)
    }

    // pega o product encontrado e altera com os novos valores
    product.name = name
    product.price = price
    product.quantity = quantity

    //salva no banco as informações
    await this.productsRepositories.save(product)

    await redisCache.invalidade('api-mysales-PRODUCT_LIST')

    return product
  }


}
