import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const userSchema = Joi.object({
    "firstName": Joi.string().min(2).max(12),
    "lastName": Joi.string().min(2).max(12),
    "email": Joi.string().email().required(),
    "password": Joi.string().min(8).max(16).required(),
    "role": Joi.string().optional()
})

const userValidator = async (req: Request, res: Response, next: NextFunction) =>{
    const { error } = userSchema.validate(req.body);
 
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

export default userValidator