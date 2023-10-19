async function updateWeather(){
    let temperature = document.getElementById('temperature')
    let humidity = document.getElementById('humidity')
    let pressure = document.getElementById('pressure')
    let rain = document.getElementById('rain')

    const response = await fetch("http://" + window.location.host + "/api/data/weather")
    const weatherJson = await response.json()
    const weather = weatherJson.weather
    temperature.innerHTML = weather.temperature
    humidity.innerHTML = weather.humidity
    pressure.innerHTML = weather.pressure
    rain.innerHTML = weather.rain
    
}

updateWeather()
setInterval(updateWeather, 2000)