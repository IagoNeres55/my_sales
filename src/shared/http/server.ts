import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import ErrorHandleMiddleware from '../middlewares/ErrorHandleMiddleware'
import { AppDataSource } from '@shared/typeorm/data-source'
import { errors } from 'celebrate'

AppDataSource.initialize()
  .then(async () => {
    const app = express()

    app.use(cors())
    app.use(express.json())
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
