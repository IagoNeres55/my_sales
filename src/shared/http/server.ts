import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import ErrorHandleMiddleware from './middlewares/ErrorHandleMiddleware'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use(ErrorHandleMiddleware.handleError as any)
app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333')
})
