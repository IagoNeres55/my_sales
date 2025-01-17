import {
  customerMock,
  customersListMock,
} from '../domain/factories/customerFactory'
import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import { ShowCustomersService } from './ShowCustomersService'

let fakeCustomersRepositories: FakeCustomersRepositories
let showCustomer: ShowCustomersService
let customer
describe('ShowCustomersService', () => {
  beforeEach(() => {
    fakeCustomersRepositories = new FakeCustomersRepositories()
    showCustomer = new ShowCustomersService(fakeCustomersRepositories)
  })

  test('shuld be able to show all customers', async () => {
    await fakeCustomersRepositories.create(customerMock)

    // customer = await fakeCustomersRepositories.findById(1)
    // expect(customer?.email).toBe('iago.neres@gmail.com')
    // expect(customer?.name).toBe('Iago')

    let id: number = 10
    await expect(showCustomer.execute({ id })).rejects.toHaveProperty(
      'statusCode',
      404,
    )
    id = 1
    const teste = await showCustomer.execute({ id })
    expect(teste.name).toBe('Iago')

    // customer = await fakeCustomersRepositories.findById(10)
    // expect(customer).toBeUndefined()
  })
})
