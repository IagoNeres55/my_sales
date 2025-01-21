import { Customers } from '@modules/customers/infra/database/entities/Customers'
import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts'

export interface IOrder {
  id: number
  customer: Customers
  created_at: Date
  updated_at: Date
  order_products: OrdersProducts[]
}

export interface IOrderFake {
  id: number
  customer: Customers
  created_at: Date
  updated_at: Date
}

