import AppError from '@shared/erros/AppError'
import { productsRepositories } from '../database/repositories/ProductsRepositories'
import { Product } from '../database/entities/Product'

export default class ShowProductService {
  async execute({ id }: { id: string }): Promise<Product> {
    // busca os produtos pelo Id informado.
    const product = await productsRepositories.findById(id)

    //faz uma validação caso não tenha nenhum produto encontrado.
    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    return product
  }
}
