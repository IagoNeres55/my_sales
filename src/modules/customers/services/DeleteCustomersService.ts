import AppError from '@shared/erros/AppError'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer'

export default class DeleteCustomersService {
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Customer não existe', 404)
    }

    await customersRepositories.remove(customer)
  }
}
