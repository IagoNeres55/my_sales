import { IPagination } from '@shared/interfaces/pagination.interface'
import { Customers } from '../database/entities/Customers'
import { customersRepositories } from '../database/repositories/CustomersRepositories'

export class ListCustomersService {
  public async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<IPagination<Customers>> {
    const [data, total] = await customersRepositories.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    })

    const totalPages = Math.ceil(total / limit)

    return {
      data,
      pagination: {
        total,
        per_page: limit,
        current_page: page,
        total_pages: totalPages,
        next_page: page < totalPages ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null,
      },
    }
  }
}
