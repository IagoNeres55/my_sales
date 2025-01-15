import ShowProfileService from '@modules/users/services/ShowProfileService'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ProfileControllers {
  public async show(request: Request, response: Response): Promise<void> {
    const showProfileService = container.resolve(ShowProfileService)
    const user_id = Number(request.user.id)

    const user = await showProfileService.execute({ user_id })
    response.json(user)
    return
  }

  public async update(request: Request, response: Response): Promise<void> {
    const user_id = Number(request.user.id)

    const { name, email, password, old_password } = request.body

    const updateProfile = container.resolve(UpdateProfileService)

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    })
    response.json(user)
    return
  }
}
