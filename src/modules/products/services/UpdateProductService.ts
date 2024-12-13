import AppError from '@shared/erros/AppError'
import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/entities/repositories/ProductsRepositories'

interface IUpdateProduct {
  id: string
  name: string
  price: number
  quantity: number
}

export default class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    // busca os produtos pelo Id informado.
    const product = await productsRepositories.findById(id)

    //faz uma validação caso não tenha nenhum produto encontrado.
    if (!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    const productsExists = await productsRepositories.findByName(name)

    if (productsExists) {
      throw new AppError('Existe Produtos já cadastrados com esse nome', 409)
    }

    // pega o product encontrado e altera com os novos valores
    product.name = name
    product.price = price
    product.quantity = quantity

    //salva no banco as informações
    await productsRepositories.save(product)

    return product
  }
}
