import express, {Request, Response, NextFunction} from "express"
import { getAllUsers, register, login, deleteUser, getUser, editUser } from "../controller/usersController"
import { adminAuth } from "../middleware/auth.middleware"
const usersRouter = express.Router()

usersRouter
          .get('/users',adminAuth, getAllUsers)
          .get('/users/:id', getUser)
          .post('/users/register',adminAuth, register)
          .post('/users/login', login)
          .delete('/users/:id',adminAuth, deleteUser)
          .patch('/users/:id', adminAuth, editUser)
export default usersRouter