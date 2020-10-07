const request = require ('postman-request')



const geoCode = (address, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFlbG1hbnNpIiwiYSI6ImNrZnFvOG83NDBtbW8zMW10cjB1NDNqMXEifQ.mBKibyqAOS8EXlTS8zCPPg&limit=1'

    request ({url , json: true},(error, response)=>{
        const response1 =  response.body.features
        if (error){
            callback('unable to connect to locatin services',undefined)
        }else if (response.body.features.length === 0 ){
            callback('unable to find the location, check your query and try again', undefined)
        } else{
            callback(undefined,{
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
