// packages
const express = require('express')

// constants
const router = express.Router()

// models
const Dumper = require('../models/dumper')

// sessions middlewares & functions
const {isLogged} = require('../sessions')

// routes /dumper/
router.get('/status', async (req, res) => {
    return res.render('dumper/status.ejs',{logged: await isLogged(req)})
})

router.get('/gps', async (req, res) => {
    return res.render('dumper/gps.ejs',{logged: await isLogged(req)})
})

module.exports = router