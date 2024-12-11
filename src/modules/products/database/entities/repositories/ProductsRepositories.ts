import { AppDataSource } from '@shared/typeorm/data-source'
import { Product } from '../Product'

export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    // Busca produtos pro namo.
    async findByName(name: string): Promise<Product | null> {
      return this.findOneBy({ name })
    },

    //busca produto por Id.
    async findById(id: number): Promise<Product | null> {
      return this.findOneBy({ id })
    },
  },
)

productsRepositories
