import express, {Express} from 'express'
import mongoose from 'mongoose';
import router from './routes/blogs_routes'
import usersRouter from './routes/users_routes'
import bodyParser = require('body-parser');
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import commentRoutes from './routes/comments_routes';
import likeController from './controller/likeController';
import likeRouter from './routes/like_route';

const app: Express = express()
// Use Cors 
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Cookie parser to store the token
app.use(cookieParser())
    // Connect to MongoDB database

mongoose
.connect(process.env.DB as string)
.then(()=>{console.log('DB connected')})
.catch(err => console.log(err))

 const port = process.env.PORT || 3005
 app.listen(port, function(){
    
    app.use('/api', router)
    app.use('/api', usersRouter)
    app.use('/api', commentRoutes)
    app.use('/api', likeRouter)
    console.log('the server is running on port'+ `  ${port}`);
})