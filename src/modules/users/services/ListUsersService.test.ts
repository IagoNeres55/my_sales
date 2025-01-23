import { userMock } from '../domain/factories/userFactory'
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'

import ListUsersService from './ListUsersService'

let fakeUserRepositories: FakeUserRepositories
let listUser: ListUsersService
describe('ListUsersService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories()
    listUser = new ListUsersService(fakeUserRepositories)
  })

  test('shoul be able list users', async () => {
    await fakeUserRepositories.create(userMock)

    const users = await listUser.execute()
    console.log(users[0].id)
    expect(users[0].id).toBe(1)
  })
})
