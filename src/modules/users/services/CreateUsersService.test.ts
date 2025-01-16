import 'reflect-metadata'
import { userMock } from '../domain/factories/userFactory'
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import CreateUserService from './CreateUsersService'
import { hash } from 'bcrypt'

// criar um mock do bcrypt
// gera uma function do mock
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}))

let fakeUserRepositories: FakeUserRepositories
let createUser: CreateUserService
describe('CreateUsersService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories()
    createUser = new CreateUserService(fakeUserRepositories)
  })

  test('shoul be able create a new user', async () => {
    ;(hash as jest.Mock).mockReturnValue('hashed-password')

    const user = await createUser.execute(userMock)

    expect(user).toHaveProperty('id')
    expect(user.email).toBe('iago.neres@gmail.com')
  })
})
