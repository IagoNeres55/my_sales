import { Request, Response } from 'express'
import { ListCustomersService } from '../../../services/ListCustomersService'
import CreateCustomersService from '../../../services/CreateCustomersService'
import { ShowCustomersService } from '../../../services/ShowCustomersService'
import { UpdateCustomersService } from '../../..//services/UpdateCustomersService'
import DeleteCustomersService from '../../../services/DeleteCustomersService'
import { container } from 'tsyringe'
import { ICustomer } from '@modules/customers/domain/models/ICustomer'

export default class CustomersControllers {
  public async index(request: Request, response: Response): Promise<void> {
    const page = parseInt(request.query.page as string) || 1
    const limit = parseInt(request.query.limit as string) || 10

    const listCustomers = container.resolve(ListCustomersService)
    const customers = await listCustomers.execute(page, limit)
    response.json(customers)
    return
  }

  public async show(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id)
    const showCustomers = container.resolve(ShowCustomersService)
    const customers = await showCustomers.execute({ id })
    response.json(customers)
    return
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, email } = request.body

    // solicitando ao o container resolver a dependencia de CreateCustomersService está injetando a classe
    const createCustomers = container.resolve(CreateCustomersService)
    const customers = await createCustomers.execute({ name, email })
    response.json(customers)
    return
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { name, email } = request.body
    const id = Number(request.params.id)
    const updateCustomers = container.resolve(UpdateCustomersService)
    const customers = await updateCustomers.execute({ id, name, email })
    response.json(customers)
    return
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id)
    const deleteCustomers = container.resolve(DeleteCustomersService)
    const customers = await deleteCustomers.execute({ id })
    response.json(customers)
    return
  }
}
