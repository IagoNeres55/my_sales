import { Order } from '../infra/database/entities/Order'
import AppError from '@shared/erros/AppError'
import { ICreateOrder } from '../domain/models/ICreateOrder'
import { container, inject, injectable } from 'tsyringe'
import { customersRepository } from '@modules/customers/infra/database/repositories/CustomersRepositories'
import IOrdersRepository from '../domain/repositories/IOrdersRepositories'
import { productRepository } from '@modules/products/infra/database/repositories/ProductsRepositories'
@injectable()
export class CreateOrderService {
  constructor (
    // @ts-ignore
    @inject('OrdersRepository') private readonly ordersRepositories: IOrdersRepository,
  ){}
  public async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customer = container.resolve(customersRepository)

    const customerExists = await customer.findById(Number(customer_id))

    if (!customerExists) {
      throw new AppError('Não existe clientes com o id informado')
    }

    const product = container.resolve(productRepository)
    const existsProducts = await product.findAllByIds(products)

    if (!existsProducts.length) {
      throw new AppError('Não existe produtos com o id informado')
    }

    // avisar o cliente que os produtos enviados não existe
    const existsProductsIds = products.map(product => product.id)

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    )

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
        404,
      )
    }

    // validar se existe a quantidade em estoque, caso não existir retornar um erro
    const quantityAvalible = products.filter(product => {
      // Encontra o produto correspondente no estoque
      const estoqueExists = existsProducts.find(
        productExisten => productExisten.id === product.id,
      )

      // Verifica se o estoque é insuficiente
      return estoqueExists && estoqueExists.quantity < product.quantity
    })

    if (quantityAvalible.length > 0) {
      throw new AppError(`Produto não tem estoque suficiente`, 409)
    }

    // Pegando somente os dados que devem ser inseridos
    const serializadProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }))

    const order = await this.ordersRepositories.createOrder({
      customer: customerExists,
      products: serializadProducts,
    })

    // atualizando o estoque ao fazer uma venda
    const { order_products } = order

    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }))

    await product.update(updateProductQuantity[0])

    return order
  }
}
