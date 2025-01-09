import { Router } from 'express'

import { sessionSchema } from '../schemas/SessionSchema'
import SessionsControllers from '../controllers/SessionsControllers'

const sessionsRouter = Router()

const sessionsController = new SessionsControllers()

sessionsRouter.post('/', sessionSchema, sessionsController.create)

export default sessionsRouter
