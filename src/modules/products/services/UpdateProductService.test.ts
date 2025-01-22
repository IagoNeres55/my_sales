import FakeProductsRepositories from '../domain/repositories/fakes/FakeProductsRepositories'
import ListProdutcService from './ListProductService'
import UpdateProductService from './UpdateProductService'

let fakeProductsRepositories: FakeProductsRepositories
let updateProduct: UpdateProductService

jest.mock('@shared/cache/RedisCache', () => {
  return jest.fn().mockImplementation(() => ({
    invalidade: jest.fn().mockResolvedValue(undefined), // Mock do método invalidate
  }))
})
describe('ListProductService', () => {
  beforeEach(() => {
    fakeProductsRepositories = new FakeProductsRepositories()
    updateProduct = new UpdateProductService(fakeProductsRepositories)
  })

  test('should be able update for products', async () => {
    const product = await fakeProductsRepositories.create({
      name: 'maça',
      price: 150,
      quantity: 85,
    })

    const editProduct = await updateProduct.execute({
      id: product.id,
      name: 'maça fuji',
      price: 140,
      quantity: 75,
    })

    expect(editProduct.name).toBe('maça fuji')

    await expect(
      updateProduct.execute({
        id: product.id,
        name: 'maça fuji',
        price: 140,
        quantity: 75,
      }),
    ).rejects.toHaveProperty('statusCode', 409)
    await expect(
      updateProduct.execute({
        id: '10',
        name: 'maça fuji',
        price: 140,
        quantity: 75,
      }),
    ).rejects.toHaveProperty('statusCode', 404)
  })
})
