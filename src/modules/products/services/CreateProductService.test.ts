import { createProductMock } from '../domain/factories/productFactory'
import FakeProductsRepositories from '../domain/repositories/fakes/FakeProductsRepositories'
import CreateProductService from './CreateProductService'

let fakeProductsRepositories: FakeProductsRepositories
let createProduct: CreateProductService
describe('CreateProductService', () => {
  beforeEach(() => {
    fakeProductsRepositories = new FakeProductsRepositories()
    createProduct = new CreateProductService(fakeProductsRepositories)
  })

  test('Should be able create new product', async () => {
    const product = await createProduct.execute(createProductMock)
    expect(product.name).toHaveProperty('maça')
  })
})
