import express, {Request, Response, NextFunction} from "express"
const commentRoutes = express.Router()
import {userAuth} from "../middleware/auth.middleware"
import { createComment, getAllComments, deleteComment, editComment } from "../controller/commentsController"
import commentValidator from "../middleware/validateComment"
commentRoutes
             .post('/blogs/:id/comments/new',commentValidator,userAuth, createComment)
             .get('/blogs/:id/comments', getAllComments ) // Get all comments on a single specified blog
             .delete('/blogs/:id/comments/delete', userAuth, deleteComment)
             .patch('/blogs/:id/comments/edit',commentValidator, userAuth, editComment)
            
             
export default commentRoutes