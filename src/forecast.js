const request = require ('postman-request')

//more comments 
// // const url2= 'https://api.mapbox.com/geocoding/v5/mapbox.places/whatww.json?access_token=pk.eyJ1IjoibmFlbG1hbnNpIiwiYSI6ImNrZnFvOG83NDBtbW8zMW10cjB1NDNqMXEifQ.mBKibyqAOS8EXlTS8zCPPg&limit=1'

  //request({url: url2, json: true},(error,response )=>{
//  //   const data =JSON.parse (response2)
//  if (error) { 
//      console.log ("unable to connect to the weather service")
//  }
//  else if (response.body.features.length == 0){ // nothing has been returned 
//      console.log (" it seems there is an error in your location input, check and try again!")
//  }
//  else { 
//     const latitude = response.body.features[0].center[1]
//     const longtiude = response.body.features[0].center[0]
   
//     console.log ('Latitude is: ' + latitude +'\nLongtitude is: ' + longtiude)

//  }
 
// })
const forecast = (longtiude,latitude,callback)=>{
   const url = 'http://api.weatherstack.com/current?access_key=6de170891a158f428837180415ed1d25&query=' + latitude+','+ longtiude 
   //const url = 'http://api.weatherstack.com/current?access_key=6de170891a158f428837180415ed1d25&query=37.8267,-122.4233&units=f'
   // console.log (url)

    request ({url /* no need to url: url (using short hand syntax) */, json: true},(error,{body})=>{
         // I can remove the below const section, howerver, it will be easier 

        const success = body.success
       


        if (error){
            callback ('Check your network service and try again', undefined)
        }else if (body.success == false){
            callback  ('check the coordinations and try again',undefined)
        }else {
            const temperature= body.current.temperature
            const feelslike= body.current.feelslike
            const windSpeed = body.current.wind_speed
            const weather_descriptions=  body.current.weather_descriptions
            const humidity = body.current.humidity

            callback(undefined, " it is currently :" + temperature + ' degrees.However it feels like it is ' + feelslike +'! generally speaking  it is ' + weather_descriptions + ', at last , wind is expcted to be: ' + windSpeed + ', as for humidity it will be '+ humidity +'%' )
        }

    }) //request

}
module.exports = forecast