import express, {Request, Response, NextFunction} from "express"
const commentRoutes = express.Router()
import {userAuth} from "../middleware/auth.middleware"
import { createComment, getAllComments, deleteComment, editComment } from "../controller/commentsController"

commentRoutes
             .post('/blogs/:id/comments',userAuth, createComment)
             .get('/blogs/:id/comments', getAllComments ) // Get all comments on a single specified blog
             .delete('/blogs/:id/comments', userAuth, deleteComment)
             .patch('/blogs/:id/comments', userAuth, editComment)
            
             
export default commentRoutes