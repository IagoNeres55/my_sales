export const customerMock = {
  name: 'Iago',
  email: 'iago.neres@gmail.com',
}

export const customersListMock = {
  data: [
    {
      id: 2,
      name: 'Alice',
      email: 'alice@example.com',
      created_at: new Date('2023-01-03T00:00:00Z'),
      updated_at: new Date('2023-01-04T00:00:00Z'),
    },
    {
      id: 3,
      name: 'Bob',
      email: 'bob@example.com',
      created_at: new Date('2023-01-05T00:00:00Z'),
      updated_at: new Date('2023-01-06T00:00:00Z'),
    },
    {
      id: 4,
      name: 'Chalton',
      email: 'Chalton@example.com',
      created_at: new Date('2023-01-05T00:00:00Z'),
      updated_at: new Date('2023-01-06T00:00:00Z'),
    },
  ],
  pagination: {
    per_page: 3,
    total: 3,
    current_page: 1,
    total_pages: 1,
    next_page: null,
    prev_page: null,
  },
}
