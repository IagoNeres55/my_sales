import AppError from '@shared/erros/AppError'
import { User } from '../infra/database/entities/User'
import { usersRepositories } from '../infra/database/repositories/UserRepositories'
import { instanceToInstance } from 'class-transformer'

export default class ShowProfileService {
  async execute({ user_id }: { user_id: number }): Promise<User> {
    const user = await usersRepositories.findById(user_id)

    if (!user) {
      throw new AppError('User Not Found', 404)
    }

    return instanceToInstance(user)
  }
}
