import { Customers } from "@modules/customers/infra/database/entities/Customers"
import { ICreateProductOrder } from "./ICreateProductOrder"

export interface ICreateOrderCustomer {
  customer: Customers
  products: ICreateProductOrder[]
}
