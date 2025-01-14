import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { Product } from '../entities/Product'
import { In, Repository } from 'typeorm'
import IProductsRepository from '@modules/products/domain/repositories/IProductsRepositories'
import { ICreateProduct } from '@modules/orders/domain/models/ICreateProduct'
import { IProduct } from '@modules/products/domain/models/IProduct'
import { IFindProducts } from '@modules/products/domain/models/IFindProducts'

// export const productsRepositories = AppDataSource.getRepository(Product).extend(
//   {
//     // Busca produtos pro nome.
//     async findByName(name: string): Promise<Product | null> {
//       return this.findOneBy({ name })
//     },

//     //busca produto por Id.
//     async findById(id: string): Promise<Product | null> {
//       return this.findOneBy({ id })
//     },

//     async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
//       const productsIds = products.map(product => product.id)

//       const existentProducts = await this.find({
//         where: { id: In(productsIds) },
//       })

//       return existentProducts
//     },
//   },
// )

export class productRepository implements IProductsRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product)
  }

  async create(data: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create(data)
    await this.ormRepository.save(product)
    return product
  }

  async remove(product: IProduct): Promise<void> {
    await this.ormRepository.remove(product)
    return
  }

  async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.remove(product)
    return product
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({ name })
    return product
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.ormRepository.findOneBy({ id })
    return product
  }

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id)
    const produtos = await this.ormRepository.find({
      where: { id: In(productsIds) },
    })
    return produtos
  }
}
