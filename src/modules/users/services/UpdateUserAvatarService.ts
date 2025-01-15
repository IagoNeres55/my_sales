import AppError from '@shared/erros/AppError'
import { User } from '../infra/database/entities/User'
import path from 'path'
import uploadConfig from '@config/upload'
import fs from 'fs'
import { instanceToInstance } from 'class-transformer'
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar'
import IUsersRepository from '../domain/repositories/IUsersRepositories'
import { inject, injectable } from 'tsyringe'
import { IUser } from '../domain/models/IUser'


@injectable()
export default class UpdateUserAvatarService {

  constructor(
    //@ts-ignore
    @inject('UserRepository')
    private readonly usersRepositories: IUsersRepository,


  ) {}
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepositories.findById(Number(userId))

    if (!user) {
      throw new AppError('user not found', 404)
    }

    // validar se já existe e apagar
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      // o stat() valida se o userAvatar existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    // adicionando o novo avatar
    user.avatar = avatarFileName

    await this.usersRepositories.save(user)
    return instanceToInstance(user)
  }
}
