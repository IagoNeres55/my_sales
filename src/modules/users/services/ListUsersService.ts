import { User } from '../database/entities/User'
import { usersRepositories } from '../database/repositories/UserRepositories'

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await usersRepositories.find()

    return users
  }
}
