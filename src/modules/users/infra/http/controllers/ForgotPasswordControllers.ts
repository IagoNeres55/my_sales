import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'
import { Request, Response } from 'express'

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email } = request.body

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService()

    await sendForgotPasswordEmailService.execute({ email })

    response.status(204).json({})
    return
  }
}
