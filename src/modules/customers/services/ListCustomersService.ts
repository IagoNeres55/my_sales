import { Customers } from '../database/entities/Customers'
import { customersRepositories } from '../database/repositories/CustomersRepositories'

export class ListCustomersService {
  public async execute(): Promise<Customers[]> {
    const customers = customersRepositories.find()
    return customers
  }
}
