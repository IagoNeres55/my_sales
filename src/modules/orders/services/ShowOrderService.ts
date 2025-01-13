import AppError from '@shared/erros/AppError'
import { Order } from '../infra/database/entities/Order'
import { inject, injectable } from 'tsyringe'
import IOrdersRepository from '../domain/repositories/IOrdersRepositories'

@injectable()
export class ShowOrderService {
  constructor(
    // @ts-ignore
    @inject('OrdersRepository')
    private readonly ordersRepositories: IOrdersRepository,
  ) {}

  public async execute(id: number): Promise<Order> {
    const order = await this.ordersRepositories.findByid(id)

    if (!order) {
      throw new AppError('Order if not exists')
    }

    return order
  }
}
