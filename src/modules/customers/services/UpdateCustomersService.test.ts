import { customerMock } from '../domain/factories/customerFactory'
import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import { UpdateCustomersService } from './UpdateCustomersService'

let fakeCustomersRepositories: FakeCustomersRepositories
let updateCustomer: UpdateCustomersService
describe('UpdateCustomersService', () => {
  beforeEach(() => {
    fakeCustomersRepositories = new FakeCustomersRepositories()
    updateCustomer = new UpdateCustomersService(fakeCustomersRepositories)
  })

  test('shold be able to update a customer', async () => {
    const customer = await fakeCustomersRepositories.create(customerMock)

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
})
