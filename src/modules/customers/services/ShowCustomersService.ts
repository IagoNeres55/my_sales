import AppError from '@shared/erros/AppError'
import { Customers } from '../infra/database/entities/Customers'
import { IShowCustomer } from '../domain/models/IShowCustomer'
import ICustomersRepository from '../domain/repositories/ICustomersRepositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ShowCustomersService {
  constructor(

    @inject('CustomerRepository')
    private readonly customersRepositories: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customers> {
    const customer = await this.customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Customers não encontrado', 404)
    }

    return customer
  }
}
