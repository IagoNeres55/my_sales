import productsRouter from '@modules/products/routes/ProductsRouts'
import { Router } from 'express'
// import express from 'express';
const routes = Router()
// const port = 3000
// const app = express();

// app.use(express.json());
routes.use('/products', productsRouter)

routes.get('/health', (req, res) => {
  res.json({ message: 'Hellow Dev!' })
})

// routes.listen(port, () => {
//   console.log(`Server
//  is running at http://localhost:${port}`)
// })

export default routes
