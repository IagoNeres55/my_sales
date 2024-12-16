import AppError from '@shared/erros/AppError'
import { productsRepositories } from '../database/repositories/ProductsRepositories'

export default class DeleteProductService {
  async execute({ id }: { id: string }): Promise<void> {
    const product = await productsRepositories.findById(id)

    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    await productsRepositories.remove(product)
  }
}
