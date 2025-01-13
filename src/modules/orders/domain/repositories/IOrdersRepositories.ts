import { IOrder } from '../models/IOrder'
import { ICreateOrderCustomer } from '../models/ICreateOrderCustomer'

export default interface IOrdersRepository {
  findByid(id: number): Promise<IOrder | null>
  createOrder({ customer, products }: ICreateOrderCustomer): Promise<IOrder>
}
