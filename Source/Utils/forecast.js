const request = require("postman-request")


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=0037e068ae888ea2b0a4393f67a4cb6c&query=" + latitude + "," + longitude + "&units=m"

    request({ url, json: true }, (error, {body }) => {
        if (error) {
            callback("Unable to connect to weather services!", undefined)
        } else if (body.error) {
            callback("Unable to find location. Please try again!", undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}


module.exports = forecast