import { Customers } from "@modules/customers/infra/database/entities/Customers"
import { ICreateProduct } from "./ICreateProduct"

export interface ICreateOrderCustomer {
  customer: Customers
  products: ICreateProduct[]
}
