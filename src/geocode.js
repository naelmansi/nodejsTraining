const request = require ('postman-request')



const geoCode = (address, callback) =>{ // address is the input, callback is the fucntion return ...
//geoCode(userInput,(error, {longtitude,latitude,location} = {})=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFlbG1hbnNpIiwiYSI6ImNrZnFvOG83NDBtbW8zMW10cjB1NDNqMXEifQ.mBKibyqAOS8EXlTS8zCPPg&limit=1'

    request ({url , json: true},(error, response)=>{ //(error, response) are the callback
        const response1 =  response.body.features
        if (error){
            callback('unable to connect to locatin services',undefined) // explicit declear data = undefined 
        }else if (response.body.features.length === 0 ){ // there is no syntax error, however, there are no result for the query
            callback('unable to find the location, check your query and try again', undefined)
        } else{
            callback(undefined,{ // this will return the callback with (error,response), the error is undefied , and the output/response is the three variale.
                latitude: response1[0].center[1],                
                longtiude: response1[0].center[0],
                location: response1[0].place_name
                //  latitude: response.body.features[0].center[1],
                // longtiude: response.body.features[0].center[0],
                // location: response.body. features[0].place_name
            })
         }

    })
}//const geoCode

module.exports = geoCode
