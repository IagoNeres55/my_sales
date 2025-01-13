import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import ErrorHandleMiddleware from '../../middlewares/ErrorHandleMiddleware'
import { AppDataSource } from '@shared/infra/typeorm/data-source'
import { errors } from 'celebrate'
import '@shared/container'
import rateLimiter from '@shared/middlewares/rateLimiter'

import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger/swagger-output.json';

AppDataSource.initialize()
  .then(async () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(rateLimiter)


    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    app.use(routes)

    // errors do celebrate - intercepta os erros caso seja de schema
    app.use(errors())

    app.use(ErrorHandleMiddleware.handleError)

    console.log('connection to the database 🎉🎉')
    app.listen(3333, () => {
      console.log('Servidor rodando na porta 3333')
    })
  })
  .catch(error => {
    console.error('falid conection to database', error)
  })
