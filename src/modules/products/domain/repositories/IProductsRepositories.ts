import { Product } from '@modules/products/infra/database/entities/Product'
import { IFindProducts } from '../models/IFindProducts'
import { IProduct } from '../models/IProduct'
import { ICreateProduct } from '../models/ICreateProduct'
import { IUpdateProduct } from '../models/IUpdateProduct'

// cria um contrato com o repositorio e controllers de products
export default interface IProductsRepository {
  create(data: ICreateProduct): Promise<Product>
  remove(product: IProduct): Promise<void>
  save(product: IProduct): Promise<IProduct>
  findByName(name: string): Promise<Product | null>
  findById(id: string): Promise<Product | null>
  findAllByIds(products: IFindProducts[]): Promise<Product[]>
  find(): Promise<Product[]>
  update(product: IUpdateProduct): Promise<Product>
}
