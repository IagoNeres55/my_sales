import { instanceToInstance } from 'class-transformer'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../domain/repositories/IUsersRepositories'
import { IUser } from '../domain/models/IUser'

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserRepository')
    private readonly usersRepositories: IUsersRepository,
  ) {}

  async execute(): Promise<IUser[]> {
    const users = await this.usersRepositories.find()
    return instanceToInstance(users)
  }
}
