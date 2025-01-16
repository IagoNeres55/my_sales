import UserToken from '@modules/users/infra/database/entities/UserToken'
import IUserTokensRepository from '../IUserTokensRepositories'

export default class FakeUserTokenRepositories
  implements IUserTokensRepository
{
  private userTokens: UserToken[] = []

  public async findByToken(token: string): Promise<UserToken | null> {
    throw new Error('method not implemented')
  }

  public async generate(user_id: number): Promise<UserToken | undefined> {
    throw new Error('method not implemented')
  }
}
