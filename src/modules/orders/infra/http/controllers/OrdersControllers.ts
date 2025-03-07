import { CreateOrderService } from '@modules/orders/services/CreateOrderService'
import { ShowOrderService } from '@modules/orders/services/ShowOrderService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class OrdersController {
  async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const showOrder = container.resolve(ShowOrderService)
    const order = await showOrder.execute(Number(id))
    response.json(order)
    return
  }

  async create(request: Request, response: Response): Promise<void> {
    const { customer_id, products } = request.body

    const createOrder = container.resolve(CreateOrderService)

    const order = await createOrder.execute({
      customer_id,
      products,
    })

    response.json(order)
    return
  }
}
