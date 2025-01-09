import { Router } from 'express'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'
import ProfileControllers from '../controllers/ProfileControllers'

const profileRouter = Router()
const profileControllers = new ProfileControllers()

profileRouter.use(AuthMiddleware.execute)
profileRouter.get('/', profileControllers.show)
profileRouter.patch('/', profileControllers.update)


export default profileRouter
