import {Request, Response, NextFunction} from 'express'
import User from '../model/user_model'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { userInfo } from 'os'



const userAuth = async (req: Request, res: Response, next: NextFunction) =>{
   
    try {
        let token:any
        if(req.headers.authorization){
              token = req.headers.authorization.split(' ')[1]    
        }       
        if(!token){
            throw new Error('Please login to access this route')
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string )
       
        const {_id, email, role} = decodedToken
        // Find the user in the database who has the same id
        const user = await User.findOne({_id: _id, email: email})
        if(!user){
            throw new Error('Try logging in again')
        }
        if(role !== 'Basic'){
            throw new Error('Login as a Basic User | You are an Admin')
        }
        next()
    } catch (error: any) {
        res.status(400).json({
            status: 'Fail', 
            error: 'Something went wrong  |' + error?.message
        })
    }
}

const adminAuth = async (req: Request, res: Response, next: NextFunction) =>{
   
    try {
        let token:any
        if(req.headers.authorization){
              token = req.headers.authorization.split(' ')[1]    
        }
        if(!token){
            throw new Error('Please login to access this route')
        }
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string )
       
        const {_id, email, role} = decodedToken
        // Find the user in the database who has the same id
        const user = await User.findOne({_id: _id, email: email})
        if(!user){
            throw new Error('Try logging in again')
        }
        if(role !== 'Admin'){
            throw new Error('You are not authorized | You have to be an Admin')
        }
        
        next()
    } catch (error: any) {
        res.status(400).json({
            status: 'Fail', 
            error: 'Something went wrong  | ' + error?.message
        })
    }
}
  export {userAuth, adminAuth} 