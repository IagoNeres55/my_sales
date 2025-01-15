import { Router } from 'express'
import { createUserSchema } from '../schemas/UserSchema'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'
import UsersControllers from '../controllers/UsersControllers'

const usersRouter = Router()

const usersController = new UsersControllers()

usersRouter.get('/', AuthMiddleware.execute, usersController.index)
usersRouter.post('/', createUserSchema, usersController.create)

export default usersRouter
