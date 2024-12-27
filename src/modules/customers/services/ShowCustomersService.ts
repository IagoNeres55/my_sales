import AppError from '@shared/erros/AppError'
import { Customers } from '../database/entities/Customers'
import { customersRepositories } from '../database/repositories/CustomersRepositories'

interface IShowCustomer {
  id: number
}

export class ShowCustomersService {
  public async execute({ id }: IShowCustomer): Promise<Customers> {
    const customer = await customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Customers não encontrado', 404)
    }

    return customer
  }
}
