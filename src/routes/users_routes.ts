import express, {Request, Response, NextFunction} from "express"
import { getAllUsers, createUser } from "../controller/usersController"
const usersRouter = express.Router()

usersRouter
          .get('/users', async(req, res) =>{
             getAllUsers(req,res)
        })
          .post('/users', async(req, res) =>{
             createUser(req,res)
          })

export default usersRouter