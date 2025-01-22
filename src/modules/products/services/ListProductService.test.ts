import FakeProductsRepositories from '../domain/repositories/fakes/FakeProductsRepositories'
import ListProdutcService from './ListProductService'

let fakeProductsRepositories: FakeProductsRepositories
let listProduct: ListProdutcService

// Mock do RedisCache
jest.mock('@shared/cache/RedisCache', () => {
  return jest.fn().mockImplementation(() => {
    let cache = new Map() // Simula o cache usando um Map interno
    return {
      recover: jest.fn().mockImplementation((key: string) => {
        return cache.get(key) || null // Retorna o valor do cache ou null se não existir
      }),
      save: jest.fn().mockImplementation((key: string, value: string) => {
        cache.set(key, JSON.parse(value)) // Salva o valor no cache
      }),
      invalidade: jest.fn().mockResolvedValue(undefined),
    }
  })
})
describe('ListProductService', () => {
  beforeEach(() => {
    fakeProductsRepositories = new FakeProductsRepositories()
    listProduct = new ListProdutcService(fakeProductsRepositories)
  })

  test('should be able list products', async () => {
    await fakeProductsRepositories.create({
      name: 'maça',
      price: 150,
      quantity: 85,
    })
    await fakeProductsRepositories.create({
      name: 'banana',
      price: 120,
      quantity: 166,
    })

    const products = await listProduct.execute()

    expect(products).toHaveLength(2)
    expect(products).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'maça' }),
        expect.objectContaining({ name: 'banana' }),
      ]),
    )
  })
})
