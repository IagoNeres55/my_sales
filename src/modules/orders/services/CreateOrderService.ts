import { Product } from '@modules/products/database/entities/Product'
import { Order } from '../database/entities/Order'
import { customersRepositories } from '@modules/customers/database/repositories/CustomersRepositories'
import AppError from '@shared/erros/AppError'
import { productsRepositories } from '@modules/products/database/repositories/ProductsRepositories'

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
      throw new AppError('Não existe customer com o id informado')
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
      existsProducts.filter(
        productExisten => productExisten.id === product.id,
      )[0].quantity < product.quantity
    })

    if (quantityAvalible.length) {
      throw new AppError(
        `the quantity ${quantityAvalible[0].quantity} id not avaliable for ${quantityAvalible[0].id}`,
        409,
      )
    }


  }
}
