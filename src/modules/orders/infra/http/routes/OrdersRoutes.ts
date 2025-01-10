import { Router } from 'express'
import OrdersController from '../controllers/OrdersControllers'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'
import { createOrderValidate, idParamsValidate } from '../schemas/OrderSchema'

const orderRouter = Router()

const orderController = new OrdersController()

orderRouter.get(
  '/:id',
  AuthMiddleware.execute,
  idParamsValidate,
  orderController.show,
)

orderRouter.post(
  '/',
  AuthMiddleware.execute,
  createOrderValidate,
  orderController.create,
)

export default orderRouter
