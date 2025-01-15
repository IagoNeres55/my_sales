import AppError from '@shared/erros/AppError'
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer'
import ICustomersRepository from '../domain/repositories/ICustomersRepositories'
import { inject, injectable } from 'tsyringe'

@injectable()
export default class DeleteCustomersService {
  constructor(

    @inject('CustomerRepository') private readonly customersRepositories: ICustomersRepository,
  ) {}
  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepositories.findById(id)

    if (!customer) {
      throw new AppError('Customer não existe', 404)
    }

    await this.customersRepositories.remove(customer)
  }
}
