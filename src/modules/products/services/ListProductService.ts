import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/entities/repositories/ProductsRepositories'

export default class ListProdutcService {
  async execute(): Promise<Product[]> {
    const products = await productsRepositories.find()
    return products
  }
}
