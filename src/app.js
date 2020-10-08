const path = require('path')
const express = require('express') // for express
const hbs = require('hbs')


//weather app utils
const geoCode = require ('./geocode')
const forecast = require('./forecast')

const app = express() // for express
const port = process.env.PORT ||3000 // this ask heroku about the avialable port  , Heroku will assign you with a port number this means, if process.env.PORT does not exists, get the 3000 

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') // where is the static files
const viewsPath = path.join(__dirname, '../templates/views') // for Handle bars
const partialsPath = path.join(__dirname, '../templates/partials')

const name = 'Nael'

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // handel bars
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
        geoCode(userInput,(error, {longtitude,latitude,location} = {})=>{  // this is the callback : (error, {longtitude,latitude,location}
            // console.log ('error:',error)
            // console.log ('data: ',geoCodeData)
            if (error){
                return res.send({error}) // this is to let the functin exit if there is an error
            }
        // the response of the geoCode will be the input to the forecast 
        

            forecast(longtitude,latitude, (error, forecastData) => { // the longtitude and the latiude are responses from the geoCode
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
 console.log (req.query.search) // return what is after the search in the url string http://xyz.com?search=PPPPPPPPPPPPPPPP. this will return the PPPPPPPPPPPPPPPPP
})

app.get('/help/*', (req, res) => { // any unfound reout in help will be handle by this section 
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Help article not found.'
    })
})


app.get('*', (req, res) => { // any unhandel route will be handle in this way 
    res.render('404', {
        title: '404',
        name,
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ', port)
})