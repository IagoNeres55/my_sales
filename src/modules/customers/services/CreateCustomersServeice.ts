import AppError from '@shared/erros/AppError'
import { Customers } from '../infra/database/entities/Customers'
import { customersRepositories } from '../infra/database/repositories/CustomersRepositories'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'


export default class CreateCustomersService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customers> {
    const emailExists = await customersRepositories.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email já esta sendo utilizado', 409)
    }

    const customer = customersRepositories.create({
      name,
      email,
    })

    await customersRepositories.save(customer)

    return customer
  }
}
