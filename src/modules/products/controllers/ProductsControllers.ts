import { Request, Response } from 'express'
import ListProdutcService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'
import CreateProductService from '../services/CreateProductService'
import DeleteProductService from '../services/DeleteProductService'
import UpdateProductService from '../services/UpdateProductService'


export default class ProductsControllers {
  public async index(_: Request, response: Response): Promise<void> {
    const listProductsService = new ListProdutcService()
    const products = await listProductsService.execute()
    response.json(products)
  }

  public async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const showProductsService = new ShowProductService()
    const products = await showProductsService.execute({ id })
    response.json(products)
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, price, quantity } = request.body

    const createProductService = new CreateProductService()
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    })
    response.json(product)
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const { name, price, quantity } = request.body
    const updateProductService = new UpdateProductService()
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    })
    response.json(product)
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params
    const deleteProductService = new DeleteProductService()
    await deleteProductService.execute({ id })

    response.status(204).send({})
  }
}
