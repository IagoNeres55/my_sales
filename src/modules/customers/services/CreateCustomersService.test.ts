import FakeCustomersRepositories from "../domain/repositories/fakes/FakeCustomersRepositories"
import { CreateCustomersService } from "./CreateCustomersService"

describe('CreateCustomerService', () => {

  test('shoul be able to create a new customer', async () => {
    const fakeCustomersRepositories = new FakeCustomersRepositories()
    // criar uma injeçao para o meu fake repository
    const createCustomer =  new CreateCustomersService(fakeCustomersRepositories)

    const customer = await createCustomer.execute({
      name: 'iago neres rufino',
      email: 'teste123@gmail.com.br'
    })
    expect(customer).toHaveProperty('id')
    expect(customer.email).toBe('teste123@gmail.com.br')
  })

  //   const

  // test('shoul be 10', () => {
  //   expect(5 + 5).toBe(10)
  // })
})

