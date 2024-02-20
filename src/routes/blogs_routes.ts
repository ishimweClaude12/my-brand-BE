import express, {Request, Response, NextFunction} from "express" 
import {getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog} from "../controller/blogsController";
import { adminAuth } from "../middleware/auth.middleware";
import upload from "../middleware/multer";
    const router = express.Router() 
    
    router.get('/blogs', getAllBlogs)
          .get("/blogs/:id", getOneBlog)
          .post('/blogs',upload.single('image'), adminAuth, createBlog)
          .patch("/blogs/:id", adminAuth, editBlog)
          .delete("/blogs/:id", adminAuth, deleteBlog)
    export default router