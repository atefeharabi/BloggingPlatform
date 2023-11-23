/*
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'

//in the ppt this line and its dependecies was in server.js but in this project I got error there and moved here
// start
import mongoose from 'mongoose' 
import config from '../config/config.js'  
// end

const app = express()
app.get('/', (req, res) => {
    res.status(200).send(Template()) 
})
//in the ppt this line and its dependecies was in server.js but in this project I got error there and moved here
// start
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true,
    useCreateIndex: true, 
    useUnifiedTopology: true } )
    .then(() => {
        console.log("Connected to the database!");
    })
        
mongoose.connection.on('error', () => {
    throw new Error('unable to connect to database: ${config.mongoUri}') 
})
// end

app.use('/', userRoutes)    
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app
*/

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import router from './routes/user.routes.js'
const app = express()
//...
app.get('/', (req, res) => {
res.status(200).send(Template()) 
})
//...
app.use('/', router)    
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app

