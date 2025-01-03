import { Secret, sign } from 'jsonwebtoken'
import 'dotenv/config'
import { usersRepositories } from '../database/repositories/UserRepositories'
import AppError from '@shared/erros/AppError'
import bcrypt from 'bcrypt'
import { User } from '../database/entities/User'
import { instanceToInstance } from 'class-transformer'


interface ISessionResponse {
  user: User
  access_token: string
  token_type: string
}

interface ISessionUser {
  email: string
  password: string
}

const JWT_SECRET = process.env.SECRET_KEY_JWT as Secret

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email)

    if (!user) {
      throw new AppError('E-mail não encontrado', 400)
    }

    const compareHash = bcrypt.compareSync(password, user.password)

    if (!compareHash) {
      throw new AppError('E-mail ou senha incorreto', 400)
    }

    const token = sign({}, JWT_SECRET, {
      subject: String(user.id),
      expiresIn: '24h',
    })
    return {
      user: instanceToInstance(user),
      token_type: 'Bearer',
      access_token: token,
    }
  }
}
