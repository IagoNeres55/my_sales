import IOrderRepositories from '@modules/orders/domain/repositories/IOrdersRepositories'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { Order } from '../entities/Order'
import { ICreateOrderCustomer } from '@modules/orders/domain/models/ICreateOrderCustomer'
import { plainToInstance } from 'class-transformer'
import { Repository } from 'typeorm'
import { IOrder } from '@modules/orders/domain/models/IOrder'

export class orderRepository implements IOrderRepositories {
  private ormRepository: Repository<Order>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order)
  }

  async findByid(id: number): Promise<IOrder | null> {
    const order = await this.ormRepository.findOne({
      where: { id },
      relations: ['order_products.product', 'order_products', 'customer'],
    })
    return plainToInstance(Order, order)
  }

  async createOrder({
    customer,
    products,
  }: ICreateOrderCustomer): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    })
    await this.ormRepository.save(order)
    return order
  }
}

// export const orderRepositories = AppDataSource.getRepository(Order).extend({
//   async findById(id: number): Promise<Order | null> {
//     const order = await this.findOne({
//       where: { id },
//       relations: ['order_products.product', 'order_products', 'customer'],
//     })

//     return plainToInstance(Order, order)
//   },

//   async createOrder({
//     customer,
//     products,
//   }: ICreateOrderCustomer): Promise<Order> {
//     const order = this.create({
//       customer,
//       order_products: products,
//     })

//     await this.save(order)

//     return order
//   },
// })
