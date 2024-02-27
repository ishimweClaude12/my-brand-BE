import mongoose from "mongoose"
    const userSchema = new mongoose.Schema({ 
        first_name: String, 
        last_name: String,
        email: {
            type: String, 
            required: true
        },
        password: {
            type: String, 
            minLength: 8, 
            required: true,
        }, 
        role: {
            type: String, 
            default: 'Basic',
            required: true
        }
    }) 
 export default mongoose.model("User", userSchema)