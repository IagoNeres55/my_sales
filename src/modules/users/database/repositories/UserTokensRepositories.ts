import { AppDataSource } from '@shared/typeorm/data-source'
import UserToken from '../entities/UserToken'

export const UserTokensRepositories = AppDataSource.getRepository(
  UserToken,
).extend({
  // busca o usuário pelo token
  async findByToken(token: string): Promise<UserToken | null> {
    const userToken = await this.findOneBy({ token })
    return userToken
  },

  // é criado um token a partir do user_id informado "obs: o token é gerado de forma automatica pelo banco no formato uuid"
  async generate(user_id: number): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id,
    })

    return await this.save(userToken)
  },
})
