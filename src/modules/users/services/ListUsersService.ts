import { instanceToInstance } from 'class-transformer'
import { User } from '../infra/database/entities/User'
import { usersRepositories } from '../infra/database/repositories/UserRepositories'

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await usersRepositories.find()
    return instanceToInstance(users)
  }
}
