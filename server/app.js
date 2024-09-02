//IMPORTS
const express = require('express')
const app = express()
const cors = require('cors')
require("dotenv").config();
const Registration = require('./Routes/Registration')
const Login = require('./Routes/Login')
const Blog = require('./Routes/Blog')
const Material = require('./Routes/Material')
const QuestionPaper = require('./Routes/QuestionPaper')


//MIDDLEWARES
app.use(cors())
app.use(express.json())



//ROUTES
app.use('/register',Registration)
app.use('/login',Login)
app.use('/blog',Blog)
app.use('/material',Material)
app.use('/questionpaper',QuestionPaper)




//SERVER LISTENING
app.listen(process.env.PORT,()=>{
    console.log("Connected succesfully to server and running")
})