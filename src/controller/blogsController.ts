import Blog from "../model/blog_model";
import {Response, Request} from 'express'
import cloudinary from "../utils/cloudinaryConfig";
import multer from "multer";
// import multer  from 'multer'
// const upload = multer({ dest: 'uploads/' })

const  getAllBlogs = async (req: Request , res: Response ) =>{
    try{
       const posts = await Blog.find()
    res.status(200).json({
        status: 'Success', 
        results: posts.length,
        data: {
            title: posts

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
        if(!post){
            res.status(404).json({
                status: 'Fail',
                message: 'Blog not found'
            })
            return
        }
        
        res.status(200).json({
            status: 'Success', 
            title: post?.title,
            content: post?.content,
            likes: post?.likes.length
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
        if(req.file){
            cloudinary.uploader.upload(req.file.path, async (err, result) =>{
                // Create a new post
                const post = new Blog({ 
                    "title": req.body.title, 
                    "image": result?.url,
                    "content": req.body.content, 
                    }) 
                await post.save().then( cb =>{
                    res.status(201).json({
                        status: 'Success', 
                        results: {
                            title: req.body.title,
                            image: req.file?.originalname,
                            content: req.body.content,
                        }
                    })
                })

            })
        }

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
        res.status(204).json({
            status: "Deleted"
        })
    } catch { 
        res.status(404).json({ 
            status: 'Failed',
            error: "Post doesn't exist!" })
    } 
}
export {getAllBlogs, getOneBlog, createBlog, editBlog, deleteBlog} 