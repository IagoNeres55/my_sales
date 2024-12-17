import { Router } from 'express'
import UsersControlleres from '../controllers/UsersControllers'
import { createUserSchema } from '../schemas/UserSchema'

const usersRouter = Router()

const usersController = new UsersControlleres()

usersRouter.get('/', usersController.index)
usersRouter.post('/', createUserSchema, usersController.create)


export default usersRouter