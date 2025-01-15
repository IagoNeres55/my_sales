import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { User } from '../entities/User'
import IUsersRepository from '@modules/users/domain/repositories/IUsersRepositories'
import { ICreateUser } from '@modules/users/domain/models/ICreateUser'
import { IUser } from '@modules/users/domain/models/IUser'
import { Repository } from 'typeorm'
export class userRepositories implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async create(user: ICreateUser): Promise<IUser> {
    const createUser = this.ormRepository.create(user)
    await this.ormRepository.save(user)
    return createUser
  }

  async save(user: IUser): Promise<IUser> {
    await this.ormRepository.save(user)
    return user
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ name })
    return user
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ id })
    return user
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({ email })
    return user
  }

  async find(): Promise<IUser[]> {
    const users = await this.ormRepository.find()
    return users
  }
}
