import AppError from '@shared/erros/AppError'
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
    expect(foundCustomer).toBeUndefined()
  })
  test('You should be able to give an error if you want to delete a user that doesn`t exist', async () => {
    const fakeCustomersRepositories = new FakeCustomersRepositories()
    const deleteCustomer = new DeleteCustomersService(fakeCustomersRepositories)

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
