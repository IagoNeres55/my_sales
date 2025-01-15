import AppError from '@shared/erros/AppError'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcrypt'
import { IResetPassword } from '../domain/models/IResetPassword'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../domain/repositories/IUsersRepositories'
import IUserTokensRepository from '../domain/repositories/IUserTokensRepositories'
@injectable()
export default class ResetPasswordService {
  constructor(
    //@ts-ignore
    @inject('UserRepository')
    private readonly usersRepositories: IUsersRepository,

    //@ts-ignore
    @inject('UserTokenRepository')
    private readonly UserTokensRepositories: IUserTokensRepository,
  ) {}

  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.UserTokensRepositories.findByToken(token)

    if (!userToken) {
      throw new AppError('token não existe', 404)
    }

    const user = await this.usersRepositories.findById(userToken.user_id)

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

    await this.usersRepositories.save(user)
  }
}
