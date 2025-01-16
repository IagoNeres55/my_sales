import { customersListMock } from '../domain/factories/customerFactory'
import FakeCustomersRepositories from '../domain/repositories/fakes/FakeCustomersRepositories'
import { ListCustomersService } from './ListCustomersService'

let fakeCustomersRepositories: FakeCustomersRepositories
let listCustomer: ListCustomersService
describe('ListCustomersService', () => {
  beforeEach(() => {
    fakeCustomersRepositories = new FakeCustomersRepositories()
    listCustomer = new ListCustomersService(fakeCustomersRepositories)

    jest
      .spyOn(fakeCustomersRepositories, 'findAndCount')
      .mockResolvedValue([
        customersListMock.data,
        customersListMock.pagination.total,
      ])
  }),
    test('must be able to list all registered users', async () => {
      const page = 1
      const limit = 3

      let result = await listCustomer.execute(page, limit)
      expect(fakeCustomersRepositories.findAndCount).toHaveBeenCalledWith({
        take: limit,
        skip: (page - 1) * limit,
      })
      expect(result).toEqual(customersListMock)
      expect(result.pagination.current_page).toBe(page)
      expect(result.pagination.per_page).toBe(limit)
      expect(result.pagination.total_pages).toBe(
        customersListMock.pagination.total_pages,
      )
      expect(result.pagination.next_page).toBe(
        customersListMock.pagination.next_page,
      )
      expect(result.pagination.prev_page).toBe(
        customersListMock.pagination.prev_page,
      )

      result = await listCustomer.execute(2, 10)
      expect(result.pagination.current_page).toBe(2)
      expect(result.pagination.per_page).toBe(10)

      result = await listCustomer.execute(2, 1)
      expect(result.pagination.next_page).toBe(2 + 1)
    })
})
