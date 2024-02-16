import Joi from "joi";

const signUpValidator = (signin: {}) =>{
    const userSchema = Joi.object({
    "firstName": Joi.string().min(2).max(12),
    "lastName": Joi.string().min(2).max(12),
    "email": Joi.string().email().required(),
    "password": Joi.string().min(8).max(16).required()
})

return userSchema.validate(signin)
}


export {signUpValidator}