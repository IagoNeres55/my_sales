import uploadConfig from '@config/upload'
import productsRouter from '@modules/products/routes/ProductsRouts'
import avatarRouter from '@modules/users/routes/AvatarRoutes'
import passwordRouter from '@modules/users/routes/PasswordRoutes'
import sessionsRouter from '@modules/users/routes/SessionRoutes'
import usersRouter from '@modules/users/routes/UserRoutes'
import express, { Router } from 'express'
// import express from 'express';
const routes = Router()
// const port = 3000
// const app = express();

// app.use(express.json());
routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/avatar', avatarRouter)

// ao acessar a rota statica ele mostra a foto
// ex: http://localhost:3333/files/8fa4305b1178a84c4b17-257610.jpg
routes.use('/files', express.static(uploadConfig.directory))
routes.use('password', passwordRouter)

routes.get('/health', (req, res) => {
  res.json({ message: 'Hellow Dev!' })
})

// routes.listen(port, () => {
//   console.log(`Server
//  is running at http://localhost:${port}`)
// })

export default routes
