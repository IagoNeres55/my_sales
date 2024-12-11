import { Request, Response } from 'express'
import ListProdutcService from '../services/ListProductService'
import ShowProductService from '../services/ShowProductService'

export default class {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProdutcService()
    const products = await listProductsService.execute()
    return response.json(products)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showProductsService = new ShowProductService()
    const products = await showProductsService.execute({ id })
    return response.json(products)
  }
}
