import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import ResetPasswordService from './ResetPasswordService'
import FakeUserTokenRepositories from '../domain/repositories/fakes/FakeUserTokenRepositories'
import { hash } from 'bcrypt'
import 'reflect-metadata'
import AppError from '@shared/erros/AppError'
import { addHours } from 'date-fns'
let fakeUserTokensRepositories: FakeUserTokenRepositories
let fakeUserRepositories: FakeUserRepositories
let resetPasswordUser: ResetPasswordService

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}))
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserTokensRepositories = new FakeUserTokenRepositories()
    fakeUserRepositories = new FakeUserRepositories()

    resetPasswordUser = new ResetPasswordService(
      fakeUserRepositories,
      fakeUserTokensRepositories,
    )
  })

  test('should reset password with a valid token', async () => {
    ;(hash as jest.Mock).mockReturnValue('hashed-password')

    const user = await fakeUserRepositories.create({
      email: 'test@example.com',
      password: 'old-password',
      name: 'Test User',
    })

    const token = await fakeUserTokensRepositories.generate(user.id)

    await resetPasswordUser.execute({
      token: token.token,
      password: 'new-password',
    })

    const users = await fakeUserRepositories.findById(user.id)

    expect(users?.password).toBe('hashed-password')
    expect(hash).toHaveBeenCalledWith('new-password', 10)
  })

  test('should not reset password if token does not exist', async () => {
    await expect(
      resetPasswordUser.execute({
        token: 'invalid-token',
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  test('should not reset password if user does not exist', async () => {
    const token = await fakeUserTokensRepositories.generate(999) // Invalid user_id

    await expect(
      resetPasswordUser.execute({
        token: token.token,
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  test('should not reset password if token is expired', async () => {
    const user = await fakeUserRepositories.create({
      email: 'test@example.com',
      password: 'old-password',
      name: 'Test User',
    })

    const token = await fakeUserTokensRepositories.generate(user.id)

    // Mock token creation date to simulate expiration
    token.created_at = addHours(new Date(), -3) // 3 hours ago

    await expect(
      resetPasswordUser.execute({
        token: token.token,
        password: 'new-password',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
