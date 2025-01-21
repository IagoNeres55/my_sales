import { Customers } from '@modules/customers/infra/database/entities/Customers'
import { ICreateProductOrder } from './ICreateProductOrder'

export interface ICreateOrderCustomer {
  customer: Customers
  products: ICreateProductOrder[]
}

export interface ICreateOrderFake {
  customer_id: number
  products: ICreateProductOrder[]
}

export interface IOrderCustomerFake {
  customer: Customers
  products: IProductOrderFake[]
}

export interface IProductOrderFake {
  id: number
  name: string
  price: number
  quantity: number
  created_at: Date
  updated_at: Date
}
