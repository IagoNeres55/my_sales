import { Request, Response } from 'express'
import { ListCustomersService } from '../services/ListCustomersService'
import CreateCustomersService from '../services/CreateCustomersServeice'
import { ShowCustomersService } from '../services/ShowCustomersService'
import { UpdateCustomersService } from '../services/UpdateCustomersService'
import DeleteCustomersService from '../services/DeleteCustomersService'

export default class CustomersControllers {
  public async index(_request: Request, response: Response): Promise<void> {
    const listCustomers = new ListCustomersService()
    const customers = await listCustomers.execute()
    response.json(customers)
    return
  }

  public async show(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id)
    const showCustomers = new ShowCustomersService()
    const customers = await showCustomers.execute({ id })
    response.json(customers)
    return
  }

  public async create(request: Request, response: Response): Promise<void> {
    const { name, email } = request.body
    const createCustomers = new CreateCustomersService()
    const customers = await createCustomers.execute({ name, email })
    response.json(customers)
    return
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { name, email } = request.body
    const id = Number(request.params.id)
    const updateCustomers = new UpdateCustomersService()
    const customers = await updateCustomers.execute({ id, name, email })
    response.json(customers)
    return
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const id = Number(request.params.id)
    const deleteCustomers = new DeleteCustomersService()
    const customers = await deleteCustomers.execute({ id })
    response.json(customers)
    return
  }
}
