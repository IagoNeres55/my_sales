import AppError from '@shared/erros/AppError'
import { UserTokensRepositories } from '../infra/database/repositories/UserTokensRepositories'
import { usersRepositories } from '../infra/database/repositories/UserRepositories'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcrypt'

interface IResetPassword {
  token: string
  password: string
}

export default class ResetPasswordService {
  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await UserTokensRepositories.findByToken(token)

    if (!userToken) {
      throw new AppError('token não existe', 404)
    }

    const user = await usersRepositories.findById(userToken.user_id)

    if (!user) {
      throw new AppError('Usuário não existe', 404)
    }

    const tokenCreatedAt = userToken.created_at

    // validar se o token ainda está valido pela data
    const compareDate = addHours(tokenCreatedAt, 2)
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expirado', 401)
    }

    user.password = await hash(password, 10)

    await usersRepositories.save(user)

  }
}
