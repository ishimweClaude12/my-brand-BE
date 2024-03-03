import { Response, Request, NextFunction } from "express";

const errorVerse = async (req: Request, res: Response, next: NextFunction) =>{
    res.status(404).json({
        status: 'Failed',
        message: "Oops!, You seem to have landed in a 404 Error Verse"
    })
}

export default errorVerse