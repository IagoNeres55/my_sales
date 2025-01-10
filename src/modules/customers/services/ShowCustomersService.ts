import AppError from '@shared/erros/AppError'
import { Customers } from '../infra/database/entities/Customers'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'
import { IShowCustomer } from '../domain/models/IShowCustomer'


export class ShowCustomersService {
  public async execute({ id }: IShowCustomer): Promise<Customers> {
    const customer = await customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Customers não encontrado', 404)
    }

    return customer
  }
}
