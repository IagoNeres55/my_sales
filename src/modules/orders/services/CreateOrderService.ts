import { Product } from '@modules/products/database/entities/Product'
import { Order } from '../database/entities/Order'
import { customersRepositories } from '@modules/customers/database/repositories/CustomersRepositories'
import AppError from '@shared/erros/AppError'
import { productsRepositories } from '@modules/products/database/repositories/ProductsRepositories'
import { orderRepositories } from '../database/repositories/OrderRepositories'

interface ICreateOrder {
  customer_id: string
  products: Product[]
}

export default class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customersRepositories.findById(
      Number(customer_id),
    )

    if (!customerExists) {
      throw new AppError('Não existe clientes com o id informado')
    }

    const existsProducts = await productsRepositories.findAllByIds(products)

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

    console.log(quantityAvalible)

    if (quantityAvalible.length > 0) {
      throw new AppError(`Produto não tem estoque suficiente`, 409)
    }

    // Pegando somente os dados que devem ser inseridos
    const serializadProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }))

    const order = await orderRepositories.createOrder({
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

    await productsRepositories.save(updateProductQuantity)

    return order
  }
}
