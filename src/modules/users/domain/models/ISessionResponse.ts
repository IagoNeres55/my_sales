import { User } from '@modules/users/infra/database/entities/User'

export interface ISessionResponse {
  user: User
  access_token: string
  token_type: string
}
