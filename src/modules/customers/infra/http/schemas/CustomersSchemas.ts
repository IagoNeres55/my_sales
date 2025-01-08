import { celebrate, Joi, Segments } from 'celebrate'

export const CreateCustomersSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
  },
})

export const UpdateCustomersSchema = celebrate({
  [Segments.BODY]: {
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
  },
})

export const idParamsValidation = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().required(),
  },
})
