import { IUser } from './IUser'

export interface ISessionResponse {
  user: IUser
  access_token: string
  token_type: string
}
