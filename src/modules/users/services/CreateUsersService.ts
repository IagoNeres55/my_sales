import AppError from '@shared/erros/AppError'
import { usersRepositories } from '../database/repositories/UserRepositories'
import { User } from '../database/entities/User'
import { hash } from 'bcrypt'

interface ICreateUser {
  name: string
  email: string
  password: string
}

interface IUser {
  id: number
  name: string
  email: string
  created_at: Date
}

export default class CreateUserService {
  async execute({ name, email, password }: ICreateUser): Promise<IUser> {
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    }
  }
}
