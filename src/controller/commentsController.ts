import { decode } from "punycode"
import Blog from "../model/blog_model"
import User from "../model/user_model"
import { Request, Response } from "express"
import jwt, { Jwt } from "jsonwebtoken"
import Comment from "../model/comment_model"


const createComment = async (req: Request, res: Response) =>{
    const blogId = req.params.id
    const token = req.cookies.jwt
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string )
    const {_id, email} = decodedToken
    const comment = new Comment({
        blogId,
        email,
        userId: _id,
        comment: req.body.comment
    })
    try {
       
        await comment.save()
        .then(c =>{
            res.status(201).json({
                status: 'Success', 
                message: 'Comment Created Successfully', 
                data: comment
            })
        })
        
    } catch (error:any) {
        res.status(400).json({
            status: 'Fail',
            message: 'Could no comment  |' + error?.message
        })
    }
}
const getAllComments = async (req: Request, res: Response) =>{
    const blogId = req.params.id
    try {
        const comments = await Comment.find({blogId: blogId}).populate('userId', 'email').exec()
        res.status(200).json({
            status: 'Success',
            results: comments.length,
            data: comments
        })

    } catch (error: any) {
        res.status(400).json({
            status: 'Fail',
            message: 'Could no comment  |' + error?.message
        })
    }
}
const deleteComment = async (req: Request, res: Response) =>{
    const commentId = req.params.id
    try {
        await Comment.deleteOne({_id: commentId}).then(c =>{
            res.status(200).json({
                status: 'Success',
                message: 'Comment Deleted Successfuly!'
            })
        })
    } catch (error: any) {
        res.status(400).json({
            status: 'Fail',
            message: 'Could no delete Comment  |' + error?.message
        })
    }
}

const editComment = async (req: Request, res: Response) =>{
    const commentId = req.params.id 
    const content = req.body.comment
    if(!content){
        throw new Error('Please add a new comment')
    }
    try {
        await Comment.findOneAndUpdate({_id: commentId}, {comment: content}).then(c =>{
            res.status(200).json({
                status: 'Success',
                message: 'Successfuly Edited ', 
                comment: 'content'
            })
        })
        
    } catch (error) {
        
    }
}
export {createComment, getAllComments, deleteComment, editComment }