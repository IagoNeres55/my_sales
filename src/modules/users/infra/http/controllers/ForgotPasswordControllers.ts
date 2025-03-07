import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<void> {
    const { email } = request.body

    const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService)

    await sendForgotPasswordEmailService.execute({ email })

    response.status(204).json({})
    return
  }
}
