import { Router } from 'express'

import {
  CreateProductSchema,
  idParamsValidation,
  UpdateProductSchema,
} from '../schemas/ProductSchemas'
import ProductsControllers from '../controllers/ProductsControllers'

const productsRouter = Router()

const productsController = new ProductsControllers()

productsRouter.get('/', productsController.index)
productsRouter.get('/:id', idParamsValidation, productsController.show)
productsRouter.post('/', CreateProductSchema, productsController.create)
productsRouter.put('/:id', UpdateProductSchema, productsController.update)
productsRouter.delete('/:id', idParamsValidation, productsController.delete)

export default productsRouter
