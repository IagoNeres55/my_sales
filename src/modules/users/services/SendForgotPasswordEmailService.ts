import AppError from '@shared/erros/AppError'
import { usersRepositories } from '../database/repositories/UserRepositories'
import { UserTokensRepositories } from '../database/repositories/UserTokensRepositories'

interface IForgotPassword {
  email: string
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email)


    if (!user) {
      throw new AppError('Usuário não existe', 404)
    }


    const token = await UserTokensRepositories.generate(user.id)

    console.log(token)
  }
}
