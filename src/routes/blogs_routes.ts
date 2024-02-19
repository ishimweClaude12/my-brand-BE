import express, {Request, Response, NextFunction} from "express" 
import {getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog} from "../controller/blogsController";
import { adminAuth } from "../middleware/auth.middleware";
import upload from "../middleware/multer";
import blogValidator from "../middleware/validateBlog";
    const router = express.Router() 
    
    router.get('/blogs', getAllBlogs)
          .get("/blogs/:id", getOneBlog)
          .post('/blogs/new',upload.single('image'),blogValidator, adminAuth, createBlog)
          .patch("/blogs/edit/:id", adminAuth, editBlog)
          .delete("/blogs/delete/:id", adminAuth, deleteBlog)
    export default router