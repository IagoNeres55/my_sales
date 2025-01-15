import ResetPasswordService from '@modules/users/services/ResetPasswordService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ResetPasswordControllers {
  public async create(request: Request, response: Response): Promise<void> {
    const { password, token } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    await resetPassword.execute({
      password,
      token,
    })

    response.status(204).json({})
    return

  }
}
