import { order_products_fake } from './../domain/factories/OrdersFactory'
import FakeOrdersRepositories from '../domain/repositories/fakes/FakeOrdersRepositories'
import { ShowOrderService } from './ShowOrderService'

let fakeOrdersRepositories: FakeOrdersRepositories
let showOrders: ShowOrderService
describe('ShowOrderService', () => {
  beforeEach(() => {
    fakeOrdersRepositories = new FakeOrdersRepositories()
    showOrders = new ShowOrderService(fakeOrdersRepositories)
  })
  test('Shuold be able show all orders', async () => {
    await expect(showOrders.execute(10)).rejects.toHaveProperty(
      'message',
      'Order if not exists',
    )
  })

  test('Shuold be able show return order', async () => {


    const result = await showOrders.execute(1)

    expect(result).toHaveProperty('id', 1)
    expect(result).toHaveProperty('price', 150)
  })
})
