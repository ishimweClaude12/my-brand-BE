import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
    "email": Joi.string().email().required(),
    "password": Joi.string().min(8).max(16).required()
    
})

const loginValidator = async (req: Request, res: Response, next: NextFunction) =>{
    const { error } = userSchema.validate(req.body);
 
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

export default loginValidator