import mongoose from "mongoose"

    const blogSchema = new mongoose.Schema({ 

        title: {
            type: String 
        }, 
        image:  {
            type: String
        },
        content: {
            type: String
        }, 
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments:[{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]

    }) 
 export default mongoose.model("blog", blogSchema)