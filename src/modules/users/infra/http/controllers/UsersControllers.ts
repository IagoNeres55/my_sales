import CreateUserService from '@modules/users/services/CreateUsersService'
import ListUsersService from '@modules/users/services/ListUsersService'
import SessionUserService from '@modules/users/services/SessionUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'


export default class UsersControllers {
  public async index(_: Request, response: Response): Promise<void> {
    const listUsersService = container.resolve(ListUsersService)
    const users = await listUsersService.execute()
    response.json(users)
  }

  public async create(request: Request, response: Response): Promise<void> {

    const { name, email, password } = request.body

    const createUserService =  container.resolve(CreateUserService)

    const user = await createUserService.execute({
      name,
      email,
      password,
    })

    response.json(user)
  }

  public async login(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body
    const sessionUserService = container.resolve(SessionUserService)
    const userAuth = await sessionUserService.execute({email, password})

    response.json({
      message: 'Sucesso',
      token_type: 'Bearer',
      access_token: userAuth,
    })
  }
}
