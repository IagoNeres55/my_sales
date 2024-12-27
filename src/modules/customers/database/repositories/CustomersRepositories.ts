import { AppDataSource } from '@shared/typeorm/data-source'
import { Customers } from '../entities/Customers'
import { Like } from 'typeorm'

export const customersRepositories = AppDataSource.getRepository(
  Customers,
).extend({
  async findById(id: number): Promise<Customers | null> {
    return this.findOneBy({ id })
  },

  async findByName(name: string): Promise<Customers | null> {
    return this.findOneBy({ name })
  },

  async findByEmail(email: string): Promise<Customers | null> {
    return this.findOneBy({ email })
  },


  // caso precise buscar varios dadoss

  // async findAllByName(name: string): Promise<Customers[]> {
  //   return this.find({
  //     where: {
  //       name: Like(`%${name}%`),
  //     },
  //   })
  // },

  // async findAllByEmail(email: string): Promise<Customers[]> {
  //   return this.find({
  //     where: {
  //       email: Like(`%${email}%`),
  //     },
  //   })
  // },
})
