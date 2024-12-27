import { Router } from 'express'
import ProfileControllers from '../controllers/ProfileControllers'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'

const profileRouter = Router()
const profileControllers = new ProfileControllers()

profileRouter.use(AuthMiddleware.execute)
profileRouter.get('/', profileControllers.show)
profileRouter.patch('/', profileControllers.update)


export default profileRouter
