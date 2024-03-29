const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Thomas Gatley'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Thomas Gatley'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help related with the app',
        info: 'Here is some relevant info',
        name: 'Thomas Gatley'
    })
})
app.get('/weatherApp', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    geocode(req.query.search, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                Address: req.query.search,
                forecastData: forecastData,
                location
            })
          })
    
})})

app.get('/currentlocationweather', (req, res) => {
    if (!req.query) {
        return res.send({
            error: 'You must provide a location'
        })
    }
    forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
        if (error){
            return res.send({
                error
            })
        }
        res.send({
            forecastData: forecastData
        })
      })
    
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404Page', {
        title: '404',
        problem: 'Help page not found',
        name: 'Thomas Gatley'
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: '404',
        problem: 'Page not found',
        name: 'Thomas Gatley'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})