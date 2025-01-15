import AppError from '@shared/erros/AppError'
import { hash } from 'bcrypt'
import { instanceToInstance } from 'class-transformer'
import { ICreateUser } from '../domain/models/ICreateUser'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../domain/repositories/IUsersRepositories'
import { IUser } from '../domain/models/IUser'

@injectable()
export default class CreateUserService {
  constructor(
    // @ts-ignore
    @inject('UserRepository')
    private readonly usersRepositories: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExists = await this.usersRepositories.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email já está em uso', 409)
    }

    const hashedPassword = await hash(password, 10)

    const user = await this.usersRepositories.create({
      name,
      email,
      password: hashedPassword,
    })

    // remove a senha do get
    return instanceToInstance(user)
  }
}
