import { name } from './../../../../../../node_modules/ci-info/index.d'
import { Customers } from '@modules/customers/infra/database/entities/Customers'
import ICustomersRepository, { Pagination } from '../ICustomersRepositories'
import { ICustomer } from '../../models/ICustomer'
import { error } from 'console'

export default class FakeCustomersRepositories implements ICustomersRepository {
  private customers: Customers[] = []

  public async create(customer: ICustomer): Promise<ICustomer> {
    const customers = new Customers()

    customers.id = this.customers.length + 1
    customers.name = customer.name
    customers.email = customer.email

    this.customers.push(customers)

    return customers
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    )
    this.customers[findIndex] = customer
    return customer
  }

  public async remove(customer: ICustomer): Promise<void> {
    const index = this.customers.findIndex(c => c.id === customer.id)

    if (index !== 1) {
      this.customers.splice(index, 1)
    }
  }

  public async findByName(name: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customers => customers.name === name)
    return customer as ICustomer | null
  }
  public async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customers => customers.email === email)
    return customer as ICustomer | null
  }
  public async findById(id: number): Promise<ICustomer | null> {
    const customer = this.customers.find(customers => customers.id === id)
    return customer as ICustomer | null
  }
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    throw new Error('method not implemented')
  }
}
