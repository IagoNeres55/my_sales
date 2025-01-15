import { ICreateUser } from '../models/ICreateUser'
import { IUser } from '../models/IUser'

export default interface IUsersRepository {
  create(user: ICreateUser): Promise<IUser>
  save(user: IUser): Promise<IUser>
  findByName(name: string): Promise<IUser | null>
  findById(id: number): Promise<IUser | null>
  findByEmail(email: string): Promise<IUser | null>
  find(): Promise<IUser[]>
}
