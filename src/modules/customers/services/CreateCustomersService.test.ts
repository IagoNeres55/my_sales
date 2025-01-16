import AppError from '@shared/erros/AppError'
import { customerMock } from '../domain/factories/customerFactory'
import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import { CreateCustomersService } from './CreateCustomersService'

let fakeCustomersRepositories: FakeCustomersRepositories
let createCustomer: CreateCustomersService
describe('CreateCustomerService', () => {
  beforeEach(() => {
    fakeCustomersRepositories = new FakeCustomersRepositories()
    // criar uma injeçao para o meu fake repository
    createCustomer = new CreateCustomersService(fakeCustomersRepositories)
  })
  test('shoul be able to create a new customer', async () => {
    const customer = await createCustomer.execute(customerMock)
    expect(customer).toHaveProperty('id')
    expect(customer.email).toBe('iago.neres@gmail.com')
  }),
    test('should not be able to create a new customer with email that is already in use', async () => {
      await createCustomer.execute(customerMock)

      await expect(createCustomer.execute(customerMock)).rejects.toBeInstanceOf(
        AppError,
      )
    })
})
