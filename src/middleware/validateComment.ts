import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const commentSchema = Joi.object({
    comment: Joi.string().min(3).required()  
}); 

const commentValidator = async (req: Request, res: Response, next: NextFunction) =>{
    const { error } = commentSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

export default commentValidator