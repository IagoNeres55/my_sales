import AppError from '@shared/erros/AppError'
import { customerMock } from '../domain/factories/customerFactory'
import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import { UpdateCustomersService } from './UpdateCustomersService'

let fakeCustomersRepositories: FakeCustomersRepositories
let updateCustomer: UpdateCustomersService
describe('UpdateCustomersService', () => {
  beforeEach(async () => {
    fakeCustomersRepositories = new FakeCustomersRepositories()
    updateCustomer = new UpdateCustomersService(fakeCustomersRepositories)

    await fakeCustomersRepositories.create(customerMock)
  })

  test('shold be able to update a customer', async () => {
    await expect(
      updateCustomer.execute({
        id: 1,
        name: 'Iago Neres',
        email: 'iagoneres90@gmail.com',
      }),
    ).resolves.toEqual({
      id: 1,
      name: 'Iago Neres',
      email: 'iagoneres90@gmail.com',
    })
  })

  test('shold be able a error for update emails equals', async () => {
    const customer = await fakeCustomersRepositories.create({
      name: 'iago neres',
      email: 'teste@gmail.com',
    })
    console.log(customer)
    await expect(
      updateCustomer.execute({
        id: 1,
        name: 'Iago Neres teste',
        email: 'teste@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  test('shold be able a error for update id if not exist', async () => {
    await expect(
      updateCustomer.execute({
        id: 8,
        name: 'teste teste',
        email: 'teste@teste.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
