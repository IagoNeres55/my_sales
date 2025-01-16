import { User } from '@modules/users/infra/database/entities/User'
import { ICreateUser } from '../../models/ICreateUser'
import { IUser } from '../../models/IUser'
import IUsersRepository from '../IUsersRepositories'

export default class FakeUserRepositories implements IUsersRepository {
  private users: User[] = []

  public async create(user: ICreateUser): Promise<IUser> {
    const users = new User()

    users.id = this.users.length + 1
    users.name = user.name
    users.email = user.email
    users.password = user.password
    this.users.push(users)

    return users
  }

  public async save(user: IUser): Promise<IUser> {
    const findIndex = this.users.findIndex(
      findUser => findUser.email === user.email,
    )

    const userEntity = Object.assign(new User(), user)

    if (findIndex !== -1) {
      this.users[findIndex] = userEntity
    } else {
      this.users.push(userEntity)
    }

    return userEntity
  }

  public async findById(id: number): Promise<IUser | null> {
    const user = this.users.find(users => users.id === id)
    return user as IUser | null
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find(users => users.email === email)
    return user as IUser | null
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = this.users.find(users => users.name === name)
    return user as IUser | null
  }

  public async find(): Promise<IUser[]> {
    throw new Error('method not implemented')
  }
}
