import ICustomersRepository from '@modules/customers/domain/repositories/ICustomersRepositories'
import { customersRepository } from '@modules/customers/infra/database/repositories/CustomersRepositories'
import { container } from 'tsyringe'

// criando container de injeção para o controllers
container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  customersRepository,
)
