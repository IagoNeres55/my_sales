import FakeProductsRepositories from '../domain/repositories/fakes/FakeProductsRepositories'
import ListProdutcService from './ListProductService'
import ShowProductService from './ShowProductService'

let fakeProductsRepositories: FakeProductsRepositories
let showProduct: ShowProductService

describe('ListProductService', () => {
  beforeEach(() => {
    fakeProductsRepositories = new FakeProductsRepositories()
    showProduct = new ShowProductService(fakeProductsRepositories)
  })

  test('should be able show product', async () => {
    const createProduc = await fakeProductsRepositories.create({
      name: 'maça',
      price: 150,
      quantity: 25,
    })
    const products = await showProduct.execute({ id: createProduc.id })
    expect(products).toEqual(expect.objectContaining({ name: 'maça' }))
  })

  test('should be able error product not exists', async () => {
    await expect(showProduct.execute({ id: '2' })).rejects.toHaveProperty(
      'statusCode',
      404,
    )
  })
})
