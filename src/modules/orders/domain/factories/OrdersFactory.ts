import 'reflect-metadata'
import { Product } from '@modules/products/infra/database/entities/Product';
import { Customers } from '@modules/customers/infra/database/entities/Customers';

export const productsMocks: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
    quantity: 10,
    created_at: new Date(),
    updated_at: new Date(),
    order_products: [], // Array vazio, já que este mock não está relacionado a pedidos específicos
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
    quantity: 5,
    created_at: new Date(),
    updated_at: new Date(),
    order_products: [], // Mesmo tratamento para garantir o alinhamento ao tipo Product
  },
];

export const customerOrderMock: Customers[] = [
  {
    id: 1,
    name: 'Customer 1',
    email: 'customer1@example.com',
    created_at: new Date(),
    updated_at: new Date(),
  },
];
