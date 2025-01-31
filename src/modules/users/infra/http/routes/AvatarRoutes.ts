import uploadConfig from '@config/upload'
import { Router } from 'express'
import multer from 'multer'
import AuthMiddleware from '@shared/middlewares/AuthMiddleware'
import UpdateAvatarControllers from '../controllers/UpdateAvatarControllers'

const avatarRouter = Router()

const userAvatarController = new UpdateAvatarControllers()
const upload = multer(uploadConfig)

avatarRouter.patch(
  '/',
  AuthMiddleware.execute,
  upload.single('avatar'),
  userAvatarController.update,
)

export default avatarRouter;