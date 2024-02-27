import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const blogSchema = Joi.object({
    title: Joi.string().min(3).required(),
    image: Joi.optional(),
    content: Joi.string().required(),
    likes: Joi.number()
}); 

const blogValidator = async (req: Request, res: Response, next: NextFunction) =>{
    const { error } = blogSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

export default blogValidator