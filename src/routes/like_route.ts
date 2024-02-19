import express, {Request, Response, NextFunction} from "express"
import likeController from '../controller/likeController'
import { userAuth } from "../middleware/auth.middleware"
const likeRouter = express.Router()

likeRouter.patch('/blogs/:id/like',userAuth, likeController)

export default likeRouter