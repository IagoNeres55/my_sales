import AppError from '@shared/erros/AppError'
import { compare, hash } from 'bcrypt'
import { instanceToInstance } from 'class-transformer'
import { IUpdateProfile } from '../domain/models/IUpdateProfile'
import { inject, injectable } from 'tsyringe'
import IUsersRepository from '../domain/repositories/IUsersRepositories'
import { IUser } from '../domain/models/IUser'


@injectable()
export default class UpdateProfileService {

  constructor(
    @inject('UserRepository')
    private readonly usersRepositories: IUsersRepository,
  ) {}


  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepositories.findById(user_id)

    // validar usuário existente
    if (!user) {
      throw new AppError('User not found', 404)
    }
    if (email) {
      const userUpdateEmail = await this.usersRepositories.findByEmail(email)

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

    await this.usersRepositories.save(user)

    return instanceToInstance(user)
  }
}
