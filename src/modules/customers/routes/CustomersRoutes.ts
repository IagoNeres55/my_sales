import { Router } from 'express'
import CustomersControllers from '../controllers/CustomersControllers'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'
import {
  CreateCustomersSchema,
  idParamsValidation,
  UpdateCustomersSchema,
} from '../schemas/CustomersSchemas'

const customerRouter = Router()

const costumersControllers = new CustomersControllers()

customerRouter.use(AuthMiddleware.execute)
customerRouter.get('/', costumersControllers.index)
customerRouter.get('/:id', costumersControllers.show)
customerRouter.post('/', CreateCustomersSchema, costumersControllers.create)
customerRouter.patch('/:id',idParamsValidation, UpdateCustomersSchema, costumersControllers.update)
customerRouter.delete('/:id',idParamsValidation, costumersControllers.delete)

export default customerRouter
