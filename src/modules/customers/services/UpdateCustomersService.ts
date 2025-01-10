import AppError from '@shared/erros/AppError'
import { Customers } from '../infra/database/entities/Customers'
import { IUpdateCustomers } from '../domain/models/IUpdateCustomers'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories'



export class UpdateCustomersService {

  constructor(private readonly customersRepositories: ICustomersRepository) {}
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomers): Promise<Customers> {

    const customer = await this.customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Cliente não encontrado', 404)
    }

    // Verifica se o email já está em uso por outro cliente
    if (email && email !== customer.email) {
      const customerEmailExists = await this.customersRepositories.findByEmail(email)

      if (customerEmailExists) {
        throw new AppError('Já existe um cliente utilizando este email', 409)
      }

      customer.email = email
    }

    // Atualiza o nome caso tenha sido informado
    if (name) {
      customer.name = name
    }

    await this.customersRepositories.save(customer)

    return customer
  }
}
