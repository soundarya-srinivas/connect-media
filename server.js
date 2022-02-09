
require('dotenv').config({path:"./config.env"})
const connectDB = require('./config/db')
const express = require('express')
const app = express();
const port = process.env.PORT || 5000;
const errorHandler = require('./middleware/error')


connectDB();
require('./models/User')
require('./models/Stream')
require('./models/Technologies')
require('./models/UserInterest')
require('./models/Question')
require('./models/Feedback')


app.use(express.json())



app.use(require('./routes/auth'))
app.use(require('./routes/userInterest'))
app.use(require('./routes/Question'))
app.use(require('./routes/userProfile'))
app.use(require('./routes/technologies'))




//error handler
app.use(errorHandler)

const server = app.listen(port, () => {
    console.log("server", port)
})

process.on("unhandledRejection",(err,promise)=>{
console.log(`logged error :${err}`)
server.close(()=>process.exit(1))


})