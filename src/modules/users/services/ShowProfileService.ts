import AppError from '@shared/erros/AppError'
import { instanceToInstance } from 'class-transformer'
import IUsersRepository from '../domain/repositories/IUsersRepositories'
import { inject, injectable } from 'tsyringe'
import { IUser } from '../domain/models/IUser'

@injectable()
export default class ShowProfileService {

  constructor(
    @inject('UserRepository')
    private readonly usersRepositories: IUsersRepository,

  ) {}

  async execute({ user_id }: { user_id: number }): Promise<IUser> {
    const user = await this.usersRepositories.findById(user_id)

    if (!user) {
      throw new AppError('User Not Found', 404)
    }

    return instanceToInstance(user)
  }
}
