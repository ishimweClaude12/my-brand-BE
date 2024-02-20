import { Request, Response, NextFunction, response } from "express";
import Blog from "../model/blog_model";
import jwt from 'jsonwebtoken'


 const likeController = async(req:Request, res: Response, next: NextFunction) =>{
        const blogId = req.params.id
        const token = req.cookies.jwt
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string )
    const {_id, email} = decodedToken
        try {
            const blog = await Blog.findOne({_id: blogId})
            
            
            // if the user already is one of those who likes , remove him/her
            if(blog?.likes.includes(_id)){
                
                const index = blog?.likes.indexOf(_id);
                 if (index > -1) {
                    blog?.likes.splice(index, 1);
                }
                await Blog.updateOne({_id: blogId}, {likes: blog?.likes}).then(cb =>{
                    res.status(200).json({
                        status: 'Success',
                        message: 'Unliked this blog', 
                    })
                })
                return
            }
            else{
                // If he/she is not included. Add him/her
                 blog?.likes.push(_id)
            await Blog.updateOne({_id: blogId}, {likes: blog?.likes}).then(cb =>{
                res.status(200).json({
                    status: 'Success',
                    message: 'Liked this blog', 
                })
            })
            }
            
            
          
        } catch (error: any) {
            res.status(400).json({
                status: 'Fail', 
                message: 'Something went wrong  | ' + error?.message
            })
        }
}

export default likeController