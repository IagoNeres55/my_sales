import AppError from '@shared/erros/AppError'
import { Customers } from '../database/entities/Customers'
import { customersRepositories } from '../database/repositories/CustomersRepositories'
import e from 'express'

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

    const customerEmailExists = await customersRepositories.findByEmail(email)

    if (customerEmailExists && email !== customer.email) {
      throw new AppError('Já existe usuários utilizando esse email', 409)
    }

    customer.email = email

    if (name) {
      customer.name = name
    }

    await customersRepositories.save(customer)

    return customer
  }
}
