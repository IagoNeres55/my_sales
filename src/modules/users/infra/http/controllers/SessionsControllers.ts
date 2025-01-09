import SessionUserService from '@modules/users/services/SessionUserService'
import { Request, Response } from 'express'

export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body

    const createSession = new SessionUserService()

    const userToken = await createSession.execute({ email, password })

    response.json(userToken)
    return
  }
}
