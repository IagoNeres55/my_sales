import FakeProductsRepositories from '../domain/repositories/fakes/FakeProductsRepositories'
import DeleteProductService from './DeleteProductService'

let fakeProductsRepositories: FakeProductsRepositories
let deleteProduct: DeleteProductService

jest.mock('@shared/cache/RedisCache', () => {
  return jest.fn().mockImplementation(() => ({
    invalidade: jest.fn().mockResolvedValue(undefined), // Mock do método invalidate
  }))
})

describe('DeleteProductService', () => {
  beforeEach(() => {
    fakeProductsRepositories = new FakeProductsRepositories()
    deleteProduct = new DeleteProductService(fakeProductsRepositories)
  })

  test('should be able delete product', async () => {
    const product = await fakeProductsRepositories.create({
      name: 'maça',
      price: 150,
      quantity: 85,
    })

    await expect(
      deleteProduct.execute({ id: product.id }),
    ).resolves.toBeUndefined()
  }),
    test('should be able error product not exists', async () => {
      await expect(deleteProduct.execute({ id: '10' })).rejects.toHaveProperty(
        'statusCode',
        404,
      )
    })
})
