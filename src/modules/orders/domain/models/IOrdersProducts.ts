import { Order } from '@modules/orders/infra/database/entities/Order'
import { Product } from '@modules/products/infra/database/entities/Product'

export interface IOrdersProducts {
  id: number
  price: number
  created_at: Date
  updated_at: Date
  order: Order
  order_id: string
  product: Product
  product_id: string
}

export interface IOrdersProductsFake {
  id: number
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
  order_id: string
  product_id: string
}

