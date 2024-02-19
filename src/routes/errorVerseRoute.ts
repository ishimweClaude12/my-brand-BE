import express, {Request, Response, NextFunction} from "express"
import errorVerse from "../controller/404"

const errorVerseRouter = express.Router()

errorVerseRouter.get('/*', errorVerse)

export default errorVerseRouter