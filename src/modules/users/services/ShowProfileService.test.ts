import AppError from '@shared/erros/AppError'
import FakeUserRepositories from '../domain/repositories/fakes/FakeUserRepositories'
import ShowProfileService from './ShowProfileService'

let fakeUserRepositories: FakeUserRepositories
let showProfileService: ShowProfileService
describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepositories = new FakeUserRepositories()
    showProfileService = new ShowProfileService(fakeUserRepositories)
  })

  test('Should be return all users profile', async () => {
    const user = await fakeUserRepositories.create({
      name: 'iago',
      email: 'iago@123.com',
      password: '1234',
    })

    const showUser = await showProfileService.execute({ user_id: user.id })
    expect(showUser.name).toBe('iago')
    // )
  })
  test('Should be return error', async () => {
    await expect(
      showProfileService.execute({ user_id: 2 }),
    ).rejects.toBeInstanceOf(AppError)
    // )
  })
})
