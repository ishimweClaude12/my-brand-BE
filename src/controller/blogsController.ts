import Blog from "../model/blog_model";
import {Response, Request} from 'express'

const  getAllBlogs = async (req: Request , res: Response ) =>{
    try{
       const post = await Blog.find()
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


const getOneBlog = async (req: Request, res: Response) => {
    try {
        const post = await Blog.findOne({ _id: req.params.id }) 
        res.status(200).json({
            status: 'Success', 
            results: post
        })
    } catch (error) {
        res.status(400).json({
            status: 'Failed', 
            error: 'The blog you are looking for is not available  ' + error
        })
    }
}


const createBlog = async (req: Request, res: Response) =>{
    try {
        const post = new Blog({ 
            "title": req.body.title, 
            "content": req.body.content, 
        }) 
         await post.save() 
         res.status(201).json({
            status: 'Success', 
            results: {
                title: req.body.title,
                content: req.body.content
            }
         })
    } catch (error) {
        res.status(400).json({
            status: 'Failed', 
            error: 'There was some error creating your blog  ' + error
        })
    }
}

const editBlog = async (req: Request, res: Response) =>{
    try { 
        const post = await Blog.findOne({ _id: req.params.id }) 
        if (req.body.title) { 

            if(post) {
                post.title = req.body.title
            } 
        } 
        if (req.body.content) { 
            if(post) {
                post.content = req.body.content
            }
           // post.content = req.body.content 
        } 
        if(post){
            await post.save() 
        }
        res.send(post) 
    } catch { 
        res.status(404).json({
            status: 'Failed', 
            error: "Post doesn't Exist, Please use a valid ID"
        })
    } 
}

const deleteBlog = async (req:Request, res: Response)=>{
    try { 
        await Blog.deleteOne({ _id: req.params.id }) 
        res.status(204)
    } catch { 
        res.status(404).json({ 
            status: 'Failed',
            error: "Post doesn't exist!" })
    } 
}
export {getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog} 