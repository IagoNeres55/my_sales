import { Product } from '../database/entities/Product'
import { productsRepositories } from '../database/repositories/ProductsRepositories'

export default class ListProdutcService {
  async execute(): Promise<Product[]> {
    // busca todos os produtos.
    const products = await productsRepositories.find()

    //retorna um array com todos os produtos encontrados.
    return products
  }
}
