import AppError from '@shared/erros/AppError'
import { customerMock } from '../domain/factories/customerFactory'
import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import DeleteCustomersService from './DeleteCustomersService'

let fakeCustomersRepositories: FakeCustomersRepositories
let deleteCustomer: DeleteCustomersService
describe('DeleteCustomersService', () => {

  // BEFOREACH -> ANTES DE DE CADA TESTE FAÇA  ALGUMA COISA EX: LIMPAR OS MOCKS INICIAR CLASS
  beforeEach(() => {
    fakeCustomersRepositories = new FakeCustomersRepositories()
    deleteCustomer = new DeleteCustomersService(fakeCustomersRepositories)
  })

  test('shoul be able to delete a customer', async () => {
    const customer = await fakeCustomersRepositories.create(customerMock)
    await deleteCustomer.execute({ id: customer.id })
    const foundCustomer = await fakeCustomersRepositories.findById(customer.id)
    expect(foundCustomer).toBeUndefined()
  })
  test('You should be able to give an error if you want to delete a user that doesn`t exist', async () => {
    // Testar com um ID inexistente
    const nonExistentCustomerId = 1481

    await expect(
      deleteCustomer.execute({ id: nonExistentCustomerId }),
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      deleteCustomer.execute({ id: nonExistentCustomerId }),
    ).rejects.toHaveProperty('message', 'Customer não existe')

    await expect(
      deleteCustomer.execute({ id: nonExistentCustomerId }),
    ).rejects.toHaveProperty('statusCode', 404)
  })
})
