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
            posts
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
        const post = await Blog.findOne({ _id: req.params.id }).populate('comments', 'comment').exec() 
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
            likes: post?.likes.length,
            comments: post?.comments
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
                        message: 'Blog Created Successfuly',
                        data: post
                    })
                })

            })
        } else {
            const post = new Blog({ 
                "title": req.body.title, 
                "content": req.body.content, 
                }) 
            await post.save().then( cb =>{
                res.status(201).json({
                    id: post._id,
                    status: 'Success', 
                    message: 'Blog Created Succesfully',
                    data: post
                })
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 'Failed', 
            error: 'There was some error creating your blog | ' + error
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
        if(!req.body.content && !req.body.title){
            res.status(400).json({
                status: 'Fail',
                message: 'Pleaase specify the field to update'
            })
            return
        }
        if(post){
            await post.save() 
        }
        res.status(200).json({
            status: 'Successful',
            message: 'Blog updated successfully',
            data: post
        })
    } catch { 
        res.status(404).json({
            status: 'Failed', 
            error: "Post doesn't Exist, Please use a valid ID"
        })
    } 
}

const deleteBlog = async (req:Request, res: Response)=>{
    try { 
      const result =   await Blog.deleteOne({ _id: req.params.id }) 
        if(!result){
            throw new Error('Post does not exist')
        }
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