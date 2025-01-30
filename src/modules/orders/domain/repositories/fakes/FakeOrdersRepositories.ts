import { Customers } from '@modules/customers/infra/database/entities/Customers'
import { Order } from '@modules/orders/infra/database/entities/Order'
import { ICreateOrderCustomer } from '../../models/ICreateOrderCustomer'
import { IOrder } from '../../models/IOrder'
import { IOrdersProductsFake } from '../../models/IOrdersProducts'
import IOrdersRepository from '../IOrdersRepositories'

export default class FakeOrdersRepositories implements IOrdersRepository {
  private orders: Order[] = []
  private customers: Customers[] = []
  private OrdersProducts: IOrdersProductsFake[] = []

  // private product: Product[] = []

  public async findByid(id: number): Promise<IOrder | null> {
    const order = this.orders.find(orders => orders.id === id)
    return order as IOrder | null
  }

  async createOrder({
    customer,
    products,
  }: ICreateOrderCustomer): Promise<Order> {
    const order = new Order()
    Object.assign(order, {
      id: this.orders.length + 1,
      customer,
      order_products: products,
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.orders.push(order)
    return order
  }
}
