import { Request, Response } from 'express'
import ListUsersService from '../services/ListUsersService'
import CreateUserService from '../services/CreateUsersService'
import SessionUserService from '../services/SessionUserService'

export default class UsersControlleres {
  public async index(_: Request, response: Response): Promise<void> {
    const listUsersService = new ListUsersService()
    const users = await listUsersService.execute()
    response.json(users)
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      name,
      email,
      password,
    })

    response.json(user)
  }

  public async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body
    const sessionUserService = new SessionUserService()
    const userAuth = await sessionUserService.execute({email, password})

    response.json({
      message: 'Sucesso',
      token_type: 'Bearer',
      access_token: userAuth,
    })
  }
}
