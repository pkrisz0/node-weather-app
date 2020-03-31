const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine, views, partials
app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Zeldus'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About - from HBS page',
        name: 'Zeldus'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Consider taking a nap',
        title: 'halp',
        name: 'Zeldus'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        weather(lat, lon, (error, forecast) => { 
            if (error) {
                return res.send({ error });
            }
            return res.send({
                address: req.query.address, 
                location, 
                forecast,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.send('My help 404 page')
})

// match anything that has not been matched so far
app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})