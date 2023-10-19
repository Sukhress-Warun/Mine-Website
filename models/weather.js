// packages
const mongoose = require('mongoose')

// schema
const WeatherSchema = new mongoose.Schema({
    temperature: {
        type: String
    },
    pressure: {
        type: String
    },
    rain: {
        type: String
    },
    humidity: {
        type: String
    }
})

// hooks

// static-methods
WeatherSchema.statics.createWeather = async function (temperature, pressure, rain, humidity){
    const response = {
        created: false,
        message: "",
    }
    try{
        const weather = await this.create({
            temperature: temperature,
            pressure: pressure,
            rain: rain,
            humidity: humidity
        })
        response.created = true
        response.message = "ok"
    }
    catch(err){
        response.message = "server error " + err
    }
    return response
}

WeatherSchema.statics.updateWeather = async function (weatherData){
    const response = {
        created: false,
        updated: false
    }
    const weather = await this.findOne({})
    if(weather !== null){
        weather.temperature = weatherData.temperature
        weather.pressure = weatherData.pressure
        weather.rain = weatherData.rain
        weather.humidity = weatherData.humidity
        await weather.save()
        response.updated = true
        return response
    }
    else{
        const createResponse = await this.createWeather(weatherData.temperature, weatherData.pressure, weatherData.rain, weatherData.humidity)
        response.created = createResponse.created
        return response
    }    
}

WeatherSchema.statics.getWeather = async function (){
    const weather = await this.findOne({}, '-_id -__v')
    return weather
}

module.exports = mongoose.model('Weather', WeatherSchema)