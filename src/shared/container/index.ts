import IProductsRepository from '@modules/products/domain/repositories/IProductsRepositories'
import ICustomersRepository from '@modules/customers/domain/repositories/ICustomersRepositories'
import { customersRepository } from '@modules/customers/infra/database/repositories/CustomersRepositories'
import IOrdersRepository from '@modules/orders/domain/repositories/IOrdersRepositories'
import { orderRepository } from '@modules/orders/infra/database/repositories/OrderRepositories'
import { container } from 'tsyringe'
import { productRepository } from '@modules/products/infra/database/repositories/ProductsRepositories'
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepositories'
import { userRepositories } from '@modules/users/infra/database/repositories/UserRepositories'
import IUserTokensRepository from '@modules/users/domain/repositories/IUserTokensRepositories'
import { userTokenRepositories } from '@modules/users/infra/database/repositories/UserTokensRepositories'

// criando container de injeção para o controllers
container.registerSingleton<ICustomersRepository>(
  'CustomerRepository',
  customersRepository,
)

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  orderRepository,
)

container.registerSingleton<IProductsRepository>(
  'ProductRepository',
  productRepository,
)

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  userRepositories,
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokenRepository',
  userTokenRepositories,
)
