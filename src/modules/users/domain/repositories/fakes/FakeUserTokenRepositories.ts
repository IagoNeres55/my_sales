import UserToken from '@modules/users/infra/database/entities/UserToken'
import IUserTokensRepository from '../IUserTokensRepositories'
import { v4 as uuidv4 } from 'uuid'
export default class FakeUserTokenRepositories
  implements IUserTokensRepository
{
  private userTokens: UserToken[] = []

  public async findByToken(token: string): Promise<UserToken | null> {
    const user = this.userTokens.find(t => t.token === token)
    return user as UserToken | null
  }

  public async generate(user_id: number): Promise<UserToken> {
    const newToken = new UserToken()

    newToken.id = this.userTokens.length + 1
    newToken.token = uuidv4()
    newToken.user_id = user_id;
    newToken.created_at = new Date()
    newToken.updated_at = new Date()
    this.userTokens.push(newToken)

    return newToken
  }
}
