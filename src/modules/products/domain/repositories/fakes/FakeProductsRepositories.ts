import { customerMock } from './../../../../customers/domain/factories/customerFactory'
import { Product } from '@modules/products/infra/database/entities/Product'
import { ICreateProduct } from '../../models/ICreateProduct'
import { IFindProducts } from '../../models/IFindProducts'
import { IProduct } from '../../models/IProduct'
import { IUpdateStockProduct } from '../../models/IUpdateStockProduct'
import IProductsRepository from '../IProductsRepositories'
import { v4 as uuidv4 } from 'uuid'

export default class FakeProductsRepositories implements IProductsRepository {
  private product: Product[] = []

  public async create(data: ICreateProduct): Promise<Product> {
    const products = new Product()

    products.id = uuidv4()
    products.name = data.name
    products.price = data.price
    products.quantity = data.quantity
    products.created_at = new Date()
    products.updated_at = new Date()

    this.product.push(products)
    return products
  }

  public async save(products: IProduct): Promise<IProduct> {
    const findIndex = this.product.findIndex(
      findProduct => findProduct.id === products.id,
    )
    this.product[findIndex] = products
    return products
  }
  public async remove(product: IProduct): Promise<void> {
    const index = this.product.findIndex(i => i.id === product.id)
    if (index !== 1) {
      this.product.splice(index, 1)
    }
  }
  public async findByName(name: string): Promise<Product | null> {
    const products = this.product.find(product => product.name === name)
    return products as IProduct | null
  }
  public async findById(id: string): Promise<Product | null> {
    const products = this.product.find(product => product.id === id)
    return products as IProduct | null
  }
  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsId = products.map(product => product.id)
    const foundProducts = this.product.filter(product =>
      productsId.includes(product.id),
    )
    return foundProducts
  }
  public async find(): Promise<Product[]> {
    return this.product
  }
  public async update(product: IUpdateStockProduct): Promise<Product> {
    const existingProduct = this.product.find(p => p.id === product.id)
    if (existingProduct) {
      existingProduct.quantity = product.quantity
    }
    return existingProduct!
  }
}
