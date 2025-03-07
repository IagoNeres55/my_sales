import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts'

export interface IProduct {
  id: string
  name: string
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
  order_products: OrdersProducts[]
}
