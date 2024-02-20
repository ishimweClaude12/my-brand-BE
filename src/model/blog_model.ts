import mongoose from "mongoose"

    const blogSchema = new mongoose.Schema({ 

        title: String, 
        image:  {
            type: String
            
        },
        content: String, 
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] 

    }) 
 export default mongoose.model("blog", blogSchema)