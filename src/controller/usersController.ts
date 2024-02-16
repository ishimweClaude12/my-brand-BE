import User from '../model/user_model'
import jwt from 'jsonwebtoken'
import {Response, Request} from 'express'
import { signUpValidator } from '../utils/validation'
import 'dotenv/config'
const  getAllUsers = async (req: Request , res: Response ) =>{
    try{
       const post  = await User.find()
    res.status(200).json({
        status: 'Success', 
        results: post.length,
        data: {
            posts: post
        }
    })
    }
    catch(err) {
        res.status(400).json({
            status: 'Failed', 
            error: 'Sorry this operation failed' + err,
        })
    } 
}

const createUser = async (req: Request, res: Response) =>{
    try {
        const userValidatin = signUpValidator(req.body)
        if(userValidatin.error){
            throw new Error(`${userValidatin.error?.details[0].message}`)
        }
        const {firstName, lastName, email, password} = req.body
    
        const oldUser = User.findOne({
            email
        })

        console.log(oldUser)
        const newUser = { 
            "first_name": req.body.firstName, 
            "last_name": req.body.lastName, 
            "email": req.body.email, 
            'password': req.body.password
        }
        const token = jwt.sign({ email: newUser.email}, 'mysecretisthatthereisnosecrete', {expiresIn: '1h'} )
        
        const post = new User() 

        
         await post.save() 
         res.status(201).json({
            status: 'Success', 
            results: {
                "first_name": req.body.firstName, 
                "last_name": req.body.lastName, 
                "email": req.body.email, 
                'password': req.body.password
            }
         })
    } catch (error) {
        res.status(400).json({
            status: 'Failed', 
            error: 'Can not create Blog  ' + error
        })
    }
}


export {getAllUsers, createUser}