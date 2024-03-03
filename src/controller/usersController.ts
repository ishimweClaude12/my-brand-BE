import User from '../model/user_model'
import jwt from 'jsonwebtoken'
import {Response, Request, response} from 'express'
import { signUpValidator } from '../utils/validation'
import 'dotenv/config'
import bcrypt from 'bcrypt'

const  getAllUsers = async (req: Request , res: Response ) =>{
    try{
       const users  = await User.find()
    res.status(200).json({
        status: 'Success', 
        results: users.length,
        data: {
            users
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

const register = async (req: Request, res: Response) =>{
    try {
        

        // Destructure variables from the body object passed
        const {firstName, lastName, email, password, role} = req.body  
        const isEmailAlreadyExist = await User.findOne({
            email: email
        })
        if(isEmailAlreadyExist){
            res.status(400).json({
                status: 'Fail',
                error: 'Email Already Registered'
            })
            return;
        }
        const salt = await bcrypt.genSalt(6)
        const hashedPsw = await bcrypt.hash(password, salt)
        const maxAge = 3 * 60 * 60;
        
        const user =  new User({ 
            "first_name": firstName, 
            "last_name": lastName, 
            email, 
            password: hashedPsw, 
            role
        }) 
        const token = jwt.sign({ id: user?._id, email: email}, process.env.JWT_SECRET as string, {expiresIn: maxAge} )

         await user.save()
         res.status(201).json({
            status: 'Success', 
            results: {
                firstName,
                lastName,
                email
            },
            token
         })
    } catch (error) {
        res.status(400).json({
            status: 'Failed', 
            error: 'Can not create User  ' + error
        })
    }
}

const login = async (req: Request, res: Response) =>{
    try {
        
        const {email, password} = req.body
        const user = await User.findOne({ email: email})
        if(!user){
            res.status(404).json({
                status: 'Failed',
                error: 'User Not Found'
            })
            return ;
        }
        
        // If the user is found, Compare the password passed with the one in database
        
        const pswMatch = await bcrypt.compare(password, user.password as string)
        if(!pswMatch){
            res.status(400).json({
                status: 'Failed',
                error: 'Oops!!. Incorrect Email or Password'
            })
            return;
        }

        // If the password matches, Create a token
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign({_id: user?._id, email: user?.email, role: user?.role}, process.env.JWT_SECRET as string,   {expiresIn: maxAge,})
       
          
        res.status(200).send({
            status: 'Success',
            message: 'Login Successful',
            token
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed', 
            error: 'Something went wrong  ' + error
        })
    }
}

const deleteUser = async(req: Request, res: Response) =>{
    const id = req.params.id
   
    try {
         await User.deleteOne({_id: id}).then(c =>{
            res.status(200).json({
                status: 'Success', 
                message: 'Successfuly deleted user'
            })
         })
    } catch (error: any) {
        res.status(400).json({
            status: 'Fail',
            message: 'User not found  |' + error?.message
        })
    }
}

const getUser = async (req: Request, res: Response) =>{
    const id = req.params.id
    try {
        await User.findOne({_id: id}).then(c =>{
            res.status(200).json({
                status: 'Success', 
                data: c
            })
         })
    } catch (error: any) {
        res.status(400).json({
            status: 'Fail',
            message: 'User not found  |'
        })
    }
}

const editUser = async (req: Request, res: Response) =>{
    try { 
        const user = await User.findOne({ _id: req.params.id }) 
        if (req.body.firstName) { 

            if(user) {
                user.first_name = req.body.firstName
            } 
        } 
        if (req.body.lastName) { 
            if(user) {
                user.last_name = req.body.lastName
            }
           
        } 
        if (req.body.role) { 
            if(user) {
                user.role = req.body.role
            }
        } 
        if(user)
        await user.save() 
      
        res.status(201).json({
            status: 'Success',
            data: user
        }) 
    } catch { 
        res.status(404).json({
            status: 'Failed', 
            error: "Such User doesn't Exist, Please use a valid ID"
        })
    } 
}

const logOut = async(req: Request, res: Response) =>{
    res.clearCookie('jwt')
    res.status(200).json({
        status: 'Success', 
        message: 'Logout Successful'
    })
}
export {getAllUsers, register, login, deleteUser , getUser , editUser, logOut}