import AppError from '@shared/erros/AppError'
import { Customers } from '../database/entities/Customers'
import { customersRepositories } from '../database/repositories/CustomersRepositories'

interface IUpdateCustomers {
  id: number
  name: string
  email: string
}

export class UpdateCustomersService {
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomers): Promise<Customers> {
    const customer = await customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Customers não encontrado', 404)
    }

    if (email) {
      const customerUpdateEmail = await customersRepositories.findByEmail(email)

      if (customerUpdateEmail) {
        throw new AppError('Email já esta sendo utilizado', 409)
      }

      customer.email = email
    }

    if (name) {
      customer.name = name
    }

    await customersRepositories.save(customer)

    return customer
  }
}
