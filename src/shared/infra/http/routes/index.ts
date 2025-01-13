import uploadConfig from '@config/upload'

import express, { Router } from 'express'
import customerRouter from 'src/modules/customers/infra/http/routes/CustomersRoutes'
import orderRouter from 'src/modules/orders/infra/http/routes/OrdersRoutes'
import productsRouter from 'src/modules/products/infra/http/routes/ProductsRouts'
import avatarRouter from 'src/modules/users/infra/http/routes/AvatarRoutes'
import passwordRouter from 'src/modules/users/infra/http/routes/PasswordRoutes'
import profileRouter from 'src/modules/users/infra/http/routes/ProfileRoutes'
import sessionsRouter from 'src/modules/users/infra/http/routes/SessionRoutes'
import usersRouter from 'src/modules/users/infra/http/routes/UserRoutes'
// import express from 'express';
const routes = Router()
// const port = 3000
// const app = express();

// app.use(express.json());

/**
 * @swagger
 * /test:
 *   get:
 *     description: Rota de teste
 *     responses:
 *       200:
 *         description: Sucesso
 */
routes.get('/test', (req, res) => {
  res.send('Rota de teste funcionando!')
})

routes.use('/products', productsRouter)


routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/avatar', avatarRouter)

// ao acessar a rota statica ele mostra a foto
// ex: http://localhost:3333/files/8fa4305b1178a84c4b17-257610.jpg
routes.use('/files', express.static(uploadConfig.directory))

routes.use('/passwords', passwordRouter)
routes.use('/profiles', profileRouter)
routes.use('/customers', customerRouter)
routes.use('/orders', orderRouter)

routes.get('/health', (req, res) => {
  res.json({ message: 'Hellow Dev!' })
})

// routes.listen(port, () => {
//   console.log(`Server
//  is running at http://localhost:${port}`)
// })

export default routes
