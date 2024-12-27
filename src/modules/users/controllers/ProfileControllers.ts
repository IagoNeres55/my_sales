import { Request, Response } from 'express'
import ShowProfileService from '../services/ShowProfileService'
import UpdateProfileService from '../services/UpdateProfileService'

export default class ProfileControllers {
  public async show(request: Request, response: Response): Promise<void> {
    const showProfileService = new ShowProfileService()
    const user_id = Number(request.user.id)

    const user = await showProfileService.execute({ user_id })
    response.json(user)
    return
  }

  public async update(request: Request, response: Response): Promise<void> {
    const user_id = Number(request.user.id)

    const { name, email, password, old_password } = request.body

    const updateProfile = new UpdateProfileService()

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
