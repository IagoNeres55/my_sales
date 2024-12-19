import AppError from '@shared/erros/AppError'
import { User } from '../database/entities/User'
import { usersRepositories } from '../database/repositories/UserRepositories'
import path from 'path'
import uploadConfig from '@config/upload'
import fs from 'fs'

interface IUpdateUserAvatar {
  userId: string
  avatarFileName: string
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(Number(userId))

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

    await usersRepositories.save(user)
  }
}
