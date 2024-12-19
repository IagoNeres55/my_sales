import { Router } from 'express'
import UsersControlleres from '../controllers/UsersControllers'
import { createUserSchema } from '../schemas/UserSchema'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'

const usersRouter = Router()

const usersController = new UsersControlleres()

usersRouter.get('/', AuthMiddleware.execute, usersController.index)
usersRouter.post('/', createUserSchema, usersController.create)

export default usersRouter
