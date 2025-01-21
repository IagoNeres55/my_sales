import { Order } from '@modules/orders/infra/database/entities/Order'
import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts'
import { ICreateOrderCustomer } from '../../models/ICreateOrderCustomer'
import { IOrder } from '../../models/IOrder'
import IOrdersRepository from '../IOrdersRepositories'

export default class FakeOrdersRepositories implements IOrdersRepository {
  private orders: Order[] = []

  public async findByid(id: number): Promise<IOrder | null> {
    const order = this.orders.find(orders => orders.id === id)
    return order as IOrder | null
  }
  public async createOrder({
    customer,
    products,
  }: ICreateOrderCustomer): Promise<IOrder> {
    const newOrder = new Order()

    // Gerando um ID fictício para o pedido
    newOrder.id = this.orders.length + 1
    newOrder.customer = customer
    newOrder.created_at = new Date()
    newOrder.updated_at = new Date()

    // Criando os objetos OrdersProducts e associando-os ao pedido
    newOrder.order_products = products.map(product => {
      const orderProduct = new OrdersProducts()
      orderProduct.id = Math.random() // Gerar um ID fictício
      orderProduct.product_id = product.product_id
      orderProduct.quantity = product.quantity
      orderProduct.price = product.price
      orderProduct.created_at = new Date()
      orderProduct.updated_at = new Date()
      orderProduct.order = newOrder // Associação com o pedido
      orderProduct.order_id = newOrder.id.toString()

      // Se necessário, associe a entidade de produto
      // orderProduct.product = ...;

      return orderProduct
    })

    this.orders.push(newOrder)
    return newOrder as IOrder
  }
}
