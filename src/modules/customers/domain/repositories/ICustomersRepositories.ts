import { ICreateCustomer } from '../models/ICreateCustomer'
import { ICustomer } from '../models/ICustomer'

export interface Pagination {
  take: number
  skip: number
}

// criando um contrato de dominio
export default interface ICustomersRepository {
  create(data: ICreateCustomer): Promise<ICustomer>
  save(customer: ICreateCustomer): Promise<ICustomer>
  remove(customer: ICustomer): Promise<void>
  findByEmail(email: string): Promise<ICustomer | null>
  findById(id: number): Promise<ICustomer | null>
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]>
  findByName(name: string): Promise<ICustomer | null>
}
