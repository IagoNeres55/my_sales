import { customerOrderMock, productsOrderMock } from './../domain/factories/OrdersFactory'
import FakeOrdersRepositories from '../domain/repositories/fakes/FakeOrdersRepositories'
import { CreateOrderService } from './CreateOrderService'

let fakeOrdersRepositories: FakeOrdersRepositories
let createOrder: CreateOrderService

describe('CreateOrderService', () => {
  beforeEach(() => {
    fakeOrdersRepositories = new FakeOrdersRepositories()
    createOrder = new CreateOrderService(fakeOrdersRepositories)
  })

  test('Shoul be able to create a new order', async () => {
    const customer_id = customerOrderMock[0].id.toString()
    const products = productsOrderMock

    const order = await createOrder.execute({ customer_id, products })

    expect(order).toHaveProperty('id') // Verifique se o pedido foi criado corretamente
    expect(order.order_products).toHaveLength(products.length) // Verifique os produtos no pedido
  })
})
