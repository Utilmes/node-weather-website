const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1c0e231745b15d0626f6b95b8fc3977c&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    
    request({url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined,'Observation time is : ' + body.current.observation_time + ' .' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Wind speed is ' + body.current.wind_speed + 'km/h blowing from ' + body.current.wind_degree + body.current.wind_dir)
        }
    })

}
module.exports = forecast