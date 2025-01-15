import AppError from '@shared/erros/AppError'
import { Product } from '../infra/database/entities/Product'
import { inject, injectable } from 'tsyringe'
import IProductsRepository from '../domain/repositories/IProductsRepositories'

@injectable()
export default class ShowProductService {
  constructor(

    @inject('ProductRepository')
    private readonly productsRepositories: IProductsRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<Product> {
    // busca os produtos pelo Id informado.
    const product = await this.productsRepositories.findById(id)

    //faz uma validação caso não tenha nenhum produto encontrado.
    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    return product
  }
}
