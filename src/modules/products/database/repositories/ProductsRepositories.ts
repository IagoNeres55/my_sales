import { AppDataSource } from '@shared/typeorm/data-source'
import { Product } from '../entities/Product'
import { In } from 'typeorm'

interface IFindProducts {
  id: string
}

export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    // Busca produtos pro namo.
    async findByName(name: string): Promise<Product | null> {
      return this.findOneBy({ name })
    },

    //busca produto por Id.
    async findById(id: string): Promise<Product | null> {
      return this.findOneBy({ id })
    },

    async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
      const productsIds = products.map(product => product.id)

      const existentProducts = await this.find({
        where: { id: In(productsIds) },
      })

      return existentProducts
    },
  },
)
