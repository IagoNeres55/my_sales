import AppError from '@shared/erros/AppError'
import { Customers } from '../infra/database/entities/Customers'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'

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
      throw new AppError('Cliente não encontrado', 404)
    }

    // Verifica se o email já está em uso por outro cliente
    if (email && email !== customer.email) {
      const customerEmailExists = await customersRepositories.findByEmail(email)

      if (customerEmailExists) {
        throw new AppError('Já existe um cliente utilizando este email', 409)
      }

      customer.email = email
    }

    // Atualiza o nome caso tenha sido informado
    if (name) {
      customer.name = name
    }

    await customersRepositories.save(customer)

    return customer
  }
}
