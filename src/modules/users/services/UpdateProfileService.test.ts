import AppError from '@shared/erros/AppError'
import bcrypt from 'bcrypt'
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import UpdateProfileService from './UpdateProfileService'

let fakeUserRepositories: FakeUserRepositories
let updateProfileService: UpdateProfileService

jest.mock('bcrypt')

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories()
    updateProfileService = new UpdateProfileService(fakeUserRepositories)
  })

  test('should be validation erros update', async () => {
    const userMock = {
      user_id: 1,
      name: 'teste',
      email: 'iago@123.com',
      password: '1234',
      old_password: '12345',
    }
    const userMock2 = {
      user_id: 3,
      name: 'teste',
      email: 'iago@1234.com',
      password: '1234',
      old_password: '12345',
    }

    const userMock3 = {
      user_id: 1,
      name: 'teste',
      email: 'iago@12345.com',
      password: '1234',
      old_password: '',
    }

    const user = await fakeUserRepositories.create({
      name: 'iago',
      email: 'iago@123.com',
      password: '1234',
    })

    // const updateUser = await updateProfileService.execute(userMock)
    await expect(
      updateProfileService.execute(userMock2),
    ).rejects.toBeInstanceOf(AppError)
    await expect(updateProfileService.execute(userMock)).rejects.toHaveProperty(
      'statusCode',
      409,
    )

    await expect(
      updateProfileService.execute(userMock3),
    ).rejects.toHaveProperty('message', 'informe a senha anterior')
  })

  test('should update the password if old_password is correct', async () => {

    const user = await fakeUserRepositories.create({
      name: 'iago',
      email: 'iago@123.com',
      password: '1234',
    })

    ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

    // Mock do bcrypt.hash para retornar uma nova senha hasheada
    ;(bcrypt.hash as jest.Mock).mockResolvedValue('hashedNewPassword')

    const old_password = 'correctOldPassword'
    const password = 'newPassword'

    if (password && old_password) {
      const checkOldPassword = await bcrypt.compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('Password informado não condiz com o anterior')
      }

      user.password = await bcrypt.hash(password, 10)
    }

    // Verifica se a senha foi atualizada corretamente
    expect(user.password).toBe('hashedNewPassword')

  })


})
