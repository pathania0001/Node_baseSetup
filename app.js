
const express = require('express');
const cors = require('cors')
const app = express()
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

app.use(cors({
    origin : "*",
    credentials : true  
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public"))

// app.use(cookieParser())

app.use("/api",routes)

app.use(errorMiddleware)

module.exports = app