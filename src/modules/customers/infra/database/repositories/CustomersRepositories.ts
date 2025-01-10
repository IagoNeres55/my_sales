import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { Customers } from '../entities/Customers'
import {
  ICustomersRepository,
  Pagination,
} from '@modules/customers/domain/repositories/ICustomersRepositories'
import { Repository } from 'typeorm'
import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer'
// import { Like } from 'typeorm'

export default class customersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Customers)
  }

  async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email })
    await this.ormRepository.save(customer)
    return customer
  }

  async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer)
    return customer
  }

  async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer)
    return
  }

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ email })
    return customer
  }
  async findById(id: number): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ id })
    return customer
  }

  async findAndCount({
    take,
    skip,
  }: Pagination): Promise<[ICustomer[], number]> {
    const [customer, total] = await this.ormRepository.findAndCount({
      take,
      skip,
    })

    return [customer, total]
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({ name })
    return customer
  }
}

// export const customersRepositories = AppDataSource.getRepository(
//   Customers,
// ).extend({
//   async findById(id: number): Promise<Customers | null> {
//     return this.findOneBy({ id })
//   },

//   async findByName(name: string): Promise<Customers | null> {
//     return this.findOneBy({ name })
//   },

//   async findByEmail(email: string): Promise<Customers | null> {
//     return this.findOneBy({ email })
//   },
// })

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
