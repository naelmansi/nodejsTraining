const path = require('path')
const express = require('express')
const hbs = require('hbs')


//weather app utils
const geoCode = require ('./geocode')
const forecast = require('./forecast')

const app = express()
const port = process.env.PORT ||3000 // this ask heroku about the avialable port  , Heroku will assign you with a port number

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const name = 'Nael'

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name
    })
})

app.get('/weather', (req, res) => {
    const userInput =  req.query.address // this will get the input after '?address='
    if (!userInput){
        return res.send ('This page can not be accessed without search values! ex. http://localhost:3000/weather?address=Amman')
    }
        geoCode(userInput,(error, {longtitude,latitude,location} = {})=>{ 
            // console.log ('error:',error)
            // console.log ('data: ',geoCodeData)
            if (error){
                return res.send({error}) // this is to let the functin exit if there is an error
            }

        //forecast ({longtitude,latitude})

            forecast(longtitude,latitude, (error, forecastData) => {
                    //  console.log('Error', error)
                    if (error){
                        return res.send ({error})
                    }
                    res.send ({
                        address: userInput,
                        location,
                        forecast: forecastData
                    })
                // console.log ('location: ' + location )
                // console.log('forecast: ', forecastData)
            }) //forecast
        })//geoCode




    // res.send({
    //     forecast: 'It is snowing',
    //     location: req.query.address,
        
    // })//res.send
})

app.get('/product',(req,res)=>{
    if (!req.query.search){
        return res.send ({error: 'You must enter search term'}) // donot user res.send in the same request more than once ..

    }
 res.send ({product:[],msg:'hello' })
 console.log (req.query.search)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ', port)
})