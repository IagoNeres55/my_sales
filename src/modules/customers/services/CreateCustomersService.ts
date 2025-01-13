import AppError from '@shared/erros/AppError'
import { Customers } from '../infra/database/entities/Customers'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'
import { inject, injectable } from 'tsyringe'
import ICustomersRepository from '../domain/repositories/ICustomersRepositories'

// falando que essa class é injetavel
@injectable()
export default class CreateCustomersService {
  // o customersRepositories não pode conhecer a implementação do repositorio
  // fazemos a validação para ele conhecer somente a interface e a partir dela acessar o repositorio
  constructor(
    // referenciando o container criado em shared
    // @ts-ignore
    @inject('CustomerRepository')
    private readonly customersRepositories: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<Customers> {
    const emailExists = await this.customersRepositories.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email já esta sendo utilizado', 409)
    }

    const customer = await this.customersRepositories.create({
      name,
      email,
    })

    return customer
  }
}
