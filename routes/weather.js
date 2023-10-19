// packages
const express = require('express')

// constants
const router = express.Router()

// models
const Weather = require('../models/weather')

// sessions middlewares & functions
const {isLogged} = require('../sessions')

// routes /weather/
router.get('/', async (req, res) => {
    return res.render('weather/weather.ejs',{logged: await isLogged(req)})
})

module.exports = router