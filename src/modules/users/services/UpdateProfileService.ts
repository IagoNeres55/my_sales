import AppError from '@shared/erros/AppError'
import { User } from '../database/entities/User'
import { usersRepositories } from '../database/repositories/UserRepositories'
import { compare, hash } from 'bcrypt'

interface IUpdateProfile {
  user_id: number
  name: string
  email: string
  password?: string
  old_password?: string
}

export default class UodateProfileService {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<User> {
    const user = await usersRepositories.findById(user_id)

    // validar usuário existente
    if (!user) {
      throw new AppError('User not found', 404)
    }
    if (email) {
      const userUpdateEmail = await usersRepositories.findByEmail(email)

      // validar se o email informado não esta sendo utilizado
      if (userUpdateEmail) {
        throw new AppError('E-mail informado já está sendo utilizado', 409)
      }
      user.email = email
    }

    if (password && !old_password) {
      throw new AppError('informe a senha anterior')
    }

    // valida e compara as senhas se confere se for igual ele atualiza para a nova
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Password informado não condiz com o anterior')
      }
      user.password = await hash(password, 10)
    }

    // se enviar o nome ele atualiza caso não envie ele não altera1
    if (name) {
      user.name = name
    }

    await usersRepositories.save(user)

    return user
  }
}
