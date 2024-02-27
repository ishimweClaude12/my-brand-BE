import express, {Request, Response, NextFunction} from "express"
import { getAllUsers, register, login, deleteUser, getUser, editUser, logOut } from "../controller/usersController"
import { adminAuth } from "../middleware/auth.middleware"
import userValidator from "../middleware/validateUser"
import loginValidator from "../middleware/validateLogin"
const usersRouter = express.Router()

usersRouter
          .get('/users',adminAuth, getAllUsers)
          .get('/users/:id',adminAuth, getUser)
          .post('/users/register', userValidator, register)
          .post('/users/login',loginValidator, login)
          .delete('/users/:id',adminAuth, deleteUser)
          .patch('/users/:id', adminAuth, editUser)
          .post('/users/logout', logOut)
export default usersRouter