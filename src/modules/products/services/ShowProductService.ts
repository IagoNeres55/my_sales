import AppError from "@shared/erros/AppError";
import { productsRepositories } from "../database/entities/repositories/ProductsRepositories";
import { Product } from "../database/entities/Product";

export default class ShowProductService{
  async execute({id}: {id: string}): Promise<Product>{
    const product = await productsRepositories.findById(id)
    if(!product){
      throw new AppError('Produto não encontrado', 404)
    }

    return product
  }
}