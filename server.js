// environment
require("dotenv").config()

// packages
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')

// constants
const app = express()

// db connection
mongoose.connect(process.env.DATABASE_URL_TESTING, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

// app settings
app.set('view engine', 'ejs')

// app's third party middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use(session({ 		
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 300000
  }
}))

// custom middlewares
// app.use()

// sessions middlewares & functions
const {isLogged} = require('./sessions')

// importing routes
const user = require('./routes/user')
const api = require('./routes/api')
const dumper = require('./routes/dumper')
const weather = require('./routes/weather')

// adding routes
app.use('/user', user)
app.use('/api', api)
app.use('/dumper', dumper)
app.use('/weather', weather)

// home route
app.get('/', async (req, res)=>{
  return res.redirect('/home')
})

app.get('/home', async (req, res)=>{
    return res.render('home.ejs',{logged: await isLogged(req)})
})

// listen on port
app.listen(process.env.PORT, () =>{
    console.log("server started")
})