import { User } from '../database/entities/User'
import { usersRepositories } from '../database/repositories/UserRepositories'

export default class ListUsersService {
  async execute(): Promise<User[]> {
    const users = await usersRepositories.find({
      select: ['id', 'name', 'email', 'avatar', 'created_at', 'updated_at'],
    })
    return users
  }
}
