// packages
const express = require('express')

// constants
const router = express.Router()

// models
const Dumper = require('../models/dumper')
const Weather = require('../models/weather')

// sessions middlewares & functions
const {allowOnlyUnauth} = require('../sessions')

// routes /api/
router.get('/data', async (req, res) => {
    console.log("requested")

    const response = {
        "dumpers": {},
        "weather": {}
    }
    response.dumpers = await Dumper.getDumpers()
    response.weather = await Weather.getWeather()
    res.status(200);
    return res.json(response)
})

router.get('/data/dumper', async (req, res) => {
    const response = {
        "dumpers": {}
    }
    response.dumpers = await Dumper.getDumpers()
    return res.json(response)
})

router.get('/data/weather', async (req, res) => {
    const response = {
        "weather": {}
    }
    response.weather = await Weather.getWeather()
    return res.json(response)
})

router.post('/data', async (req, res) => {
    console.log("requested")
    const response ={
        "dumpersResponse": {},
        "weatherResponse": {}
    }
    if (req.body.dumpers !== undefined){
        let dumpers = req.body.dumpers

        dumpers = dumpers.map((dumper) => {
            return {
                id: Number(dumper.id),
                status: dumper.status,
                lat: Number(dumper.lat),
                long: Number(dumper.long)
            }
        })
        response.dumpersResponse = await Dumper.updateDumper(dumpers)
    }
    if (req.body.weather !== undefined){
        response.weatherResponse = await Weather.updateWeather(req.body.weather)
    }
    return res.json(response)
})

module.exports = router