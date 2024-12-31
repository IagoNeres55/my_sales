import { AppDataSource } from '@shared/typeorm/data-source'
import { Order } from '../entities/Order'
import { Customers } from '@modules/customers/database/entities/Customers'
import { Product } from '@modules/products/database/entities/Product'

interface ICreateOrder {
  customer: Customers
  products: Product[]
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['order_products', 'customers'],
    })

    return order
  },

  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    })

    await this.save(order)

    return order
  },
})
