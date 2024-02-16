import express from 'express'
import mongoose from 'mongoose';
import router from './routes/blogs_routes'
import usersRouter from './routes/users_routes'
import bodyParser = require('body-parser');
import 'dotenv/config'

const app = express()


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    // Connect to MongoDB database

mongoose
.connect(`${process.env.DB}`)
.then(()=>{console.log('DB connected')})
.catch(err => console.log(err))

 const port = process.env.PORT || 3005
 app.listen(port, function(){
    app.get('/test', async (req, res) =>{
        console.log(port)
        res.send({
            status: 200, 
            message: 'Looks Okay to me', 
            port 
        })
    })
    app.use('/api', router)
    app.use('/api', usersRouter)
    console.log('the server is running on port'+ `  ${port}`);
})