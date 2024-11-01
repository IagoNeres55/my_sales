import Router from 'express'

const routes = Router()
const port = 3000

routes.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' })
})

routes.listen(port, () => {
  console.log(`Server
 is running at http://localhost:${port}`)
})

export default routes