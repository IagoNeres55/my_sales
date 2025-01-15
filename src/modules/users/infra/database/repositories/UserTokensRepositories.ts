import { AppDataSource } from '@shared/infra/typeorm/data-source'
import UserToken from '../entities/UserToken'
import IUserTokensRepository from '@modules/users/domain/repositories/IUserTokensRepositories'
import { Repository } from 'typeorm'

// export const UserTokensRepositories = AppDataSource.getRepository(
//   UserToken,
// ).extend({
//   // busca o usuário pelo token
//   async findByToken(token: string): Promise<UserToken | null> {
//     const userToken = await this.findOneBy({ token })
//     return userToken
//   },

//   // é criado um token a partir do user_id informado "obs: o token é gerado de forma automatica pelo banco no formato uuid"
//   async generate(user_id: number): Promise<UserToken | undefined> {
//     const userToken = this.create({
//       user_id,
//     })

//     return await this.save(userToken)
//   },
// })

export class userTokenRepositories implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken)
  }

  async findByToken(token: string): Promise<UserToken | null> {
    const tokenValidate = await this.ormRepository.findOneBy({ token })
    return tokenValidate
  }

  async generate(user_id: number): Promise<UserToken | undefined> {
    const token = this.ormRepository.create({ user_id })
    return await this.ormRepository.save(token)
  }
}
