import { Customers } from '@modules/customers/infra/database/entities/Customers'
import { Product } from '@modules/products/infra/database/entities/Product'

export interface ICreateOrder {
  customer_id: string
  products: Product[]
}
