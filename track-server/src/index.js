require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const authRoutes = require('./routes/authRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middlewares/requireAuth')
const trackRoutes = require('./routes/trackRoutes')

app.use(bodyParser.json())
app.use(authRoutes);
app.use(trackRoutes)


const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.jgwxf.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instance')
})
mongoose.connection.on('error',(e)=>{
    console.error('Error conencting to  mongo',e);
})
app.get('/',requireAuth,(req,res)=>{
    res.send(`your email :${req.user.email}`)
})

app.listen(3000,()=>{
    console.log("connected")
})