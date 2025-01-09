import { Router } from 'express'
import { ForgotPasswordSchema, ResetPasswordSchema } from '../schemas/PasswordSchemas'
import ForgotPasswordController from '../controllers/ForgotPasswordControllers'
import ResetPasswordControllers from '../controllers/ResetPasswordControllers'

const passwordRouter = Router()

const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordControllers()

passwordRouter.post('/forgot', ForgotPasswordSchema, forgotPasswordController.create)
passwordRouter.post('/reset', ResetPasswordSchema, resetPasswordController.create)


export default passwordRouter
