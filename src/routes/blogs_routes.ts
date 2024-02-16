import express, {Request, Response, NextFunction} from "express" 
import {getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog} from "../controller/blogsController";
    const router = express.Router() 
interface Post {
    title: string; 
    content: string
}
    // Get all posts 
    router.get('/blogs', async (req, res) =>{
        getAllBlogs(req,res)
    })

    // Get a Single Blog
    router.get("/blogs/:id", async (req, res) => { 
        getOneBlog(req, res)
     })

    // Create a post

    router.post('/blogs', async(req : Request, res : Response) =>{
        await createBlog(req, res)
    
    })
    // Edit the Blog
    
    router.patch("/blogs/:id", async (req, res) => { 
        editBlog(req,res)
    })

    // Delete a Blog

    router.delete("/blogs/:id", async (req, res) => { 
       deleteBlog(req,res)
    })
    export default router