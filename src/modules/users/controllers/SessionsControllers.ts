import { Request, Response} from 'express'
import SessionUserService from '../services/SessionUserService'

export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<void> {
    const { email, password } = request.body

    const createSession = new SessionUserService()

    const userToken = await createSession.execute({ email, password })

     response.json(userToken)
    return

  }
}
