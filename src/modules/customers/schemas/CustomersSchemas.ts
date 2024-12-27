import { celebrate, Joi, Segments } from 'celebrate'

export const CreateCustomersSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
  }),
})

export const UpdateCustomersSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
  }),
})
