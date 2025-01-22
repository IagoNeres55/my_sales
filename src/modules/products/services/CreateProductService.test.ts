import AppError from '@shared/erros/AppError'
import { createProductMock } from '../domain/factories/productFactory'
import FakeProductsRepositories from '../domain/repositories/fakes/FakeProductsRepositories'
import CreateProductService from './CreateProductService'

let fakeProductsRepositories: FakeProductsRepositories
let createProduct: CreateProductService

jest.mock('@shared/cache/RedisCache', () => {
  return jest.fn().mockImplementation(() => ({
    invalidade: jest.fn().mockResolvedValue(undefined), // Mock do método invalidate
  }))
})
describe('CreateProductService', () => {
  beforeEach(() => {
    fakeProductsRepositories = new FakeProductsRepositories()
    createProduct = new CreateProductService(fakeProductsRepositories)
  })

  test('Should be able create new product', async () => {
    const product = await createProduct.execute(createProductMock)
    expect(product.name).toBe('maça')
  })
  test('Should be able error product exists', async () => {
    await createProduct.execute(createProductMock)
    await expect(
      createProduct.execute(createProductMock),
    ).rejects.toBeInstanceOf(AppError)
  })
})
