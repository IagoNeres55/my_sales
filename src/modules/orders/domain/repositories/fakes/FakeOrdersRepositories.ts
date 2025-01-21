import { Customers } from '@modules/customers/infra/database/entities/Customers'
import { Order } from '@modules/orders/infra/database/entities/Order'
import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts'
import { Product } from '@modules/products/infra/database/entities/Product'
import { ICreateOrderCustomer } from '../../models/ICreateOrderCustomer'
import { IOrder } from '../../models/IOrder'
import { IOrdersProductsFake } from '../../models/IOrdersProducts'
import IOrdersRepository from '../IOrdersRepositories'

export default class FakeOrdersRepositories implements IOrdersRepository {
  private orders: Order[] = []
  private customers: Customers[] = []
  private OrdersProducts: IOrdersProductsFake[] = []

  // private product: Product[] = []

  public async findByid(id: number): Promise<IOrder | null> {
    const order = this.orders.find(orders => orders.id === id)
    return order as IOrder | null
  }
  public async createOrder({
    customer,
    products,
  }: ICreateOrderCustomer): Promise<IOrder> {
    // Criar um customer para adicionar no order
    // const customers = new Customers()
    // customers.id = customer.id
    // customers.name = customer.name
    // customers.email = customer.email
    // customers.created_at = customer.created_at
    // customers.updated_at = customer.updated_at
    // this.customers.push(customers)

    // // const product = new Product()
    // // product.id = productsOrderMock[0].id
    // // product.name = productsOrderMock[0].name
    // // product.price = productsOrderMock[0].price
    // // product.quantity = productsOrderMock[0].quantity
    // // product.created_at = productsOrderMock[0].created_at
    // // product.updated_at = productsOrderMock[0].updated_at

    // const order = new Order()

    // // const order_products = new OrdersProducts()
    // // order_products.id = this.OrdersProducts.length + 1
    // // order_products.price = productsOrderMock[0].price
    // // order_products.quantity = productsOrderMock[0].quantity
    // // order_products.created_at = new Date()
    // // order_products.updated_at = new Date()
    // // order_products.order_id = order.id.toString()
    // // order_products.product_id = productsOrderMock[0].id

    // const order_products: OrdersProducts[] = products.map((product, index) => ({
    //   id: this.OrdersProducts.length + index + 1,
    //   price: product.price,
    //   quantity: product.quantity,
    //   created_at: new Date(),
    //   updated_at: new Date(),
    //   order_id: order.id.toString(),
    //   product_id: product.product_id,
    // }));

    // order.id = this.orders.length + 1
    // order.customer = customers
    // order.created_at = new Date()
    // order.updated_at = new Date()
    // order.order_products = order_products

    // this.OrdersProducts.push(...order_products);
    // this.orders.push(order)

    // return order

    const customers = new Customers()
    customers.id = customer.id
    customers.name = customer.name
    customers.email = customer.email
    customers.created_at = customer.created_at
    customers.updated_at = customer.updated_at
    this.customers.push(customers)

    const order = new Order()
    order.id = this.orders.length + 1
    order.customer = customers
    order.created_at = new Date()
    order.updated_at = new Date()

    const order_products: OrdersProducts[] = products.map((product, index) => {
      const orderProduct = new OrdersProducts()
      orderProduct.id = this.OrdersProducts.length + index + 1
      orderProduct.price = product.price
      orderProduct.quantity = product.quantity
      orderProduct.created_at = new Date()
      orderProduct.updated_at = new Date()
      orderProduct.order_id = order.id.toString()
      orderProduct.product_id = product.product_id

      // Se necessário, inicialize as propriedades adicionais exigidas pelo tipo
      orderProduct.order = order
      orderProduct.product = new Product() // Aqui você pode criar ou buscar o produto real
      orderProduct.product.id = product.product_id
      orderProduct.product.price = product.price
      orderProduct.product.quantity = product.quantity

      return orderProduct
    })

    order.order_products = order_products

    this.OrdersProducts.push(...order_products)
    this.orders.push(order)

    return order
  }
}
