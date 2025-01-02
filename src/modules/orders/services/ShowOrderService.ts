import AppError from '@shared/erros/AppError'
import { Order } from '../database/entities/Order'
import { orderRepositories } from '../database/repositories/OrderRepositories'

export default class ShowOrderService {
  async execute(id: number): Promise<Order> {
    const order = await orderRepositories.findById(id)

    if (!order) {
      throw new AppError('Order if not exists')
    }

    return order
  }
}
