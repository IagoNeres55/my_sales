import { IOrdersProductsFake } from '../models/IOrdersProducts'

export const productsOrderMock = [
  {
    id: '1',
    name: 'Product 1',
    price: 2,
    quantity: 153,
    created_at: new Date('2025-01-05T00:00:00Z'),
    updated_at: new Date('2025-01-05T00:00:00Z'),
    order_products: [],
  },
  {
    id: '2',
    name: 'Product 2',
    price: 10,
    quantity: 180,
    created_at: new Date('2025-01-05T00:00:00Z'),
    updated_at: new Date('2025-01-05T00:00:00Z'),
    order_products: [],
  },
]

export const customerOrderMock = [
  {
    id: 1,
    name: 'Customer 1',
    email: 'customer1@example.com',
    created_at: new Date('2025-01-05T00:00:00Z'),
    updated_at: new Date('2025-01-05T00:00:00Z'),
  },
]

export const order_products_fake: IOrdersProductsFake = {
  id: 1,
  price: 50,
  quantity: 150,
  created_at: new Date(),
  updated_at: new Date(),
  order_id: '1',
  product_id: '1',
}
