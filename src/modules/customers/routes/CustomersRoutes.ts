import { Router } from "express";
import CustomersControllers from "../controllers/CustomersControllers";
import AuthMiddleware from "@shared/middlewares/AuthMiddleware";

const customerRouter = Router()

const costumersControllers = new CustomersControllers()

customerRouter.use(AuthMiddleware.execute)
customerRouter.get('/', costumersControllers.index)
customerRouter.post('/', costumersControllers.create)


export default customerRouter