import AppError from '@shared/erros/AppError'
import bcrypt, { compare } from 'bcrypt'
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import UpdateProfileService from './UpdateProfileService'

let fakeUserRepositories: FakeUserRepositories
let updateProfileService: UpdateProfileService

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}))

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

    await fakeUserRepositories.create({
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

    ;(compare as jest.Mock).mockImplementation(
      async (old_password, password) => {
        if (old_password === password) {
          return true
        } else {
          throw new AppError('Password informado não condiz com o anterior')
        }
      },
    )

    const userMock4 = {
      user_id: 1,
      name: 'teste',
      email: 'iago@123.com',
      password: '12345',
      old_password: '1234',
    }
    const userMock5 = {
      user_id: 1,
      name: 'teste',
      email: 'iago@123.com',
      password: '12345',
      old_password: '55555',
    }




    await expect(updateProfileService.execute(userMock4)).resolves.toHaveProperty('id', 1)


  })

  // test('should be able erros', async () => {


  //   // await expect(
  //   //   updateProfileService.execute(userMock2),
  //   // ).rejects.toBeInstanceOf(AppError)


  //   // await expect(compare('teste','teste')).

  //   // const teste = await compare('teste', 'teste')
  //   // console.log('teste => ', teste)
  //   // expect(teste).toEqual(true)
  //   // const testes = await compare('tesste', 'teste')

  //   // expect(testes).toEqual(' Password informado não condiz com o anterior')

  //   // expect(teste).rejects.toBeInstanceOf(AppError)
  // })
})
