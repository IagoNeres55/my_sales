import AppError from '@shared/erros/AppError'
import { usersRepositories } from '../database/repositories/UserRepositories'
import { User } from '../database/entities/User'
import { hash } from 'bcrypt'
import { removeFields } from 'src/utils/removeFields'

interface ICreateUser {
  name: string
  email: string
  password: string
}

export default class CreateUserService {
  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await usersRepositories.findByEmail(email)

    if (emailExists) {
      throw new AppError('Email já está em uso', 409)
    }

    const hashedPassword = await hash(password, 10)

    const user = usersRepositories.create({
      name,
      email,
      password: hashedPassword,
    })

    await usersRepositories.save(user)

    return removeFields(user, ['password', 'updated_at']) as User
  }
}
