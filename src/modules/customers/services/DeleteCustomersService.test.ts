import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import DeleteCustomersService from './DeleteCustomersService'

describe('DeleteCustomersService', () => {
  test('shoul be able to delete a customer', async () => {
    const fakeCustomersRepositories = new FakeCustomersRepositories()
    const deleteCustomer = new DeleteCustomersService(fakeCustomersRepositories)
    const customer = await fakeCustomersRepositories.create({
      name: 'Iago',
      email: 'iago.neres@gmail.com',
    })
    await deleteCustomer.execute({ id: customer.id })
    const foundCustomer = await fakeCustomersRepositories.findById(customer.id)
    expect(foundCustomer).toBeUndefined();
  })
})
