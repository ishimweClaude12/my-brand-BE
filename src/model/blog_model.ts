import mongoose from "mongoose"

     

    const blogSchema = new mongoose.Schema({ 

        title: String, 

        content: String, 

    }) 

     

 export default mongoose.model("blog", blogSchema)