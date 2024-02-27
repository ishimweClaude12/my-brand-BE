import mongoose from "mongoose"

    const commentSchema = new mongoose.Schema({ 
        comment: {
            type: String, 
            required: true
        },
        blogId: {
            type: mongoose.Schema.Types.ObjectId, ref: "Blog",
            required: true
        } ,
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: "User",
            required: true
        }
    }) 
 export default mongoose.model("Comment", commentSchema)