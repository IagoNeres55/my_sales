import { celebrate, Joi, Segments } from 'celebrate'

export const ForgotPasswordSchema = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
})


// password_confirmation => valida se a senha é igual ao confirmação da senha
export const ResetPasswordSchema = celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
  },
})
